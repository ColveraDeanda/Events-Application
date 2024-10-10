import { RequestHandler } from "express";
import EventModel from "../models/event";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { assertIsDefined } from "../util/assertIsDefined";

export const getEvents: RequestHandler = async (req, res, next) => {
    const authenticatedUserId = req.session.userId;
    try {
        assertIsDefined(authenticatedUserId);

        const event = await EventModel.find({ userId: authenticatedUserId }).exec();
        res.status(200).json(event);
    } catch (err) {
        next(err);
    }
};

export const getEvent: RequestHandler = async (req, res, next) => {
    const eventId = req.params.id;
    const authenticatedUserId = req.session.userId;
    try{
        assertIsDefined(authenticatedUserId);
        if(!mongoose.isValidObjectId(eventId)) {
            throw createHttpError(400, "Invalid ID");
        }

        const event = await EventModel.findById(eventId).exec();

        if (!event) {
            throw createHttpError(404, "Event not found");
        }

        if (!event.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this event");
        }

        res.status(200).json(event);
    } catch (err) {
        next(err);
    }
};

interface CreateEventBody {
    name?: string,
    image?: string;
    url?: string;
    type?: string;
    info?: string;
    date?: {
        localDate?: string;
        localTime?: string;
        timezone?: string;
    },
    venue?: {
        name?: string;
        city?: string;
        country?: string;
    },
    classifications?: string[];
    priceRanges?: {
        type?: string;
        currency?: string;
        min?: number;
        max?: number;
    };

}

export const createEvent: RequestHandler<unknown, unknown, CreateEventBody, unknown> = async (req, res, next) => {
    const authenticatedUserId = req.session.userId;

    const { name, image, url, type, info, date, venue, classifications, priceRanges } = req.body;

    try {
        assertIsDefined(authenticatedUserId);

        if(!name) {
            throw createHttpError(400, "Event should have name");
        }
        if(!image) {
            throw createHttpError(400, "Event should have image");
        }
        if(!url) {
            throw createHttpError(400, "Event should have url");
        }
        if(!type) {
            throw createHttpError(400, "Event should have type");
        }
        if(!date) {
            throw createHttpError(400, "Event should have date");
        }
        if(!venue) {
            throw createHttpError(400, "Event should have venue");
        }
        if(!classifications) {
            throw createHttpError(400, "Event should have classifications");
        }
        if(!priceRanges) {
            throw createHttpError(400, "Event should have priceRanges");
        }

        const newEvent = await EventModel.create({
            userId: authenticatedUserId,
            name: name,
            image: image,
            url: url,
            type: type,
            info: info,
            date: date,
            venue: venue,
            classifications: classifications,
            priceRanges: priceRanges,
        });

        res.status(201).json(newEvent);
    } catch (err) {
        next(err);
    }
};

interface UpdateEventParams {
    id: string
}

interface UpdateEventBody {
    review: string;
}

export const updateEvent: RequestHandler<UpdateEventParams, unknown, UpdateEventBody, unknown> = async(req, res, next) => {
    const eventId = req.params.id;
    const review = req.body.review;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        if(!mongoose.isValidObjectId(eventId)) {
            throw createHttpError(400, "Invalid ID");
        }

        const event = await EventModel.findById(eventId).exec();

        if (!event) {
            throw createHttpError(404, "Event not found");
        }

        if (!event.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this event");
        }
        
        event.review = review;

        const updatedEvent = await event.save();

        res.status(200).json(updatedEvent);

    } catch(error) {
        next(error);
    }
}

export const deleteEvent: RequestHandler = async (req, res, next) => {
    const eventId = req.params.id;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        if (!mongoose.isValidObjectId(eventId)) {
            throw createHttpError(400, "Invalid ID");
        }

        const event = await EventModel.findById(eventId).exec();

        if (!event) {
            throw createHttpError(404, "event not found");
        }

        if (!event.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this event");
        }

        await event.deleteOne();

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};