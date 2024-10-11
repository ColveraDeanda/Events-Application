export interface Event {
    _id: string;
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
    review?: string;
    createdAt?: string;
    updatedAt?: string;
}