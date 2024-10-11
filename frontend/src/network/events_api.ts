import { Event } from "../models/event";

const API_URL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=b8mzmTn364mEMOG72AS6e2SpuxtgTCiY";
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
    console.log(response);
    return response.json();
}
export async function getEvents(): Promise<Event[]>{
    const response = await fetchData(`/api/events`, {method: "GET"});
    return response.json();
}
export async function getEventsExternal(page: number, country: string): Promise<Event[]>{
    const response = await fetch(`${API_URL}&page=${page}&countryCode=${country}`);
    const data = await response.json();
    return data._embedded.events.map((event: any) => ({
        _id: event.id,
        name: event.name,
        image: event.images[0].url,
        url: event.url,
        type: event.type,
        info: event.info,
        date: {
            localDate: event.dates.start.localDate,
            localTime: event.dates.start.localTime,
            timezone: event.dates.timezone,
        },
        venue: {
            name: event._embedded.venues[0].name,
            city: event._embedded.venues[0].city.name,
            country: event._embedded.venues[0].country.name,
        },
        classifications: [
            event.classifications[0].segment.name,
            event.classifications[0].genre.name,
            event.classifications[0].subGenre.name,
            event.classifications[0].type.name,
            event.classifications[0].subType.name,
        ],
        priceRanges: {
            type: event.priceRanges[0].type,
            currency: event.priceRanges[0].currency,
            min: event.priceRanges[0].min,
            max: event.priceRanges[0].max,
        }
    }));
}