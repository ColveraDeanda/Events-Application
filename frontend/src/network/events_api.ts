import { Event } from "../models/event";

const API_URL = process.env.REACT_APP_TICKETMASTER_API;

async function fetchData(input: RequestInfo, init?: RequestInit){
    const response = await fetch(input, init);
    if(response.ok){
        return response;
    } else{
        const errorBody = await response.json();
        const errorMessage = errorBody.message;
        throw Error(errorMessage);
    }
}
export interface EventInput {
    name: string;
    image: string;
    url: string;
    type: string;
    info?: string;
    date: {
        localDate: string;
        localTime: string;
        timezone: string;
    }
    venue: {
        name: string;
        city: string;
        country: string;
    }
    classifications: string[],
    priceRanges: {
        type: string;
        currency: string;
        min: number;
        max: number;
    }
}

export async function createEvent(event: EventInput): Promise<Event>{
    const response = await fetchData(`/api/events`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
    });
    return response.json();
}

export async function getAllEvents(): Promise<Event[]>{
    const response = await fetchData(`/api/events/all`);
    return response.json();
}

export async function getEvents(page: number){
    const response = await fetchData(`/api/events/${page}`);
    return response.json();
}

export async function getEventsExternal(page: number, country: string, searchTerm: string): Promise<{ events: Event[], pageInfo: { totalPages: number, totalElements: number } }> {
    const response = await fetch(`${API_URL}&page=${page}&countryCode=${country}&keyword=${searchTerm}`);
    const data = await response.json();
    const events = data._embedded.events.map((event: any) => ({
      _id: event.id,
      name: event.name ?? "",
      image: event.images?.[0]?.url ?? "",
      url: event.url ?? "",
      type: event.type ?? "",
      info: event.info ?? "",
      date: {
        localDate: event.dates?.start?.localDate ?? "",
        localTime: event.dates?.start?.localTime ?? "",
        timezone: event.dates?.timezone ?? "",
      },
      venue: {
        name: event._embedded?.venues?.[0]?.name ?? "",
        city: event._embedded?.venues?.[0]?.city?.name ?? "",
        country: event._embedded?.venues?.[0]?.country?.name ?? "",
      },
      classifications: [
        event.classifications?.[0]?.segment?.name ?? "",
        event.classifications?.[0]?.genre?.name ?? "",
        event.classifications?.[0]?.subGenre?.name ?? "",
        event.classifications?.[0]?.type?.name ?? "",
        event.classifications?.[0]?.subType?.name ?? "",
      ],
      priceRanges: {
        type: event.priceRanges?.[0]?.type ?? "",
        currency: event.priceRanges?.[0]?.currency ?? "",
        min: event.priceRanges?.[0]?.min ?? 0,
        max: event.priceRanges?.[0]?.max ?? 0,
      },
    }));

    const pageInfo = {
        totalPages: data.page.totalPages,
        totalElements: data.page.totalElements
    };

    return { events, pageInfo };
}

export interface EventUpdate {
    review: string;
}


export async function updateEvent(eventId: string, event: EventUpdate): Promise<Event>{
    const response = await fetchData(`/api/events/${eventId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
    });
    return response.json();
}

export async function deleteEvent(eventId: string): Promise<void>{
    await fetchData(`/api/events/${eventId}`, {method: "DELETE"});
}

