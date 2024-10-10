import { InferSchemaType, model, Schema } from "mongoose";

const eventSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    url: { type: String, required: true },
    type: { type: String, required: true },
    info: { type: String },
    date: {
        localDate: { type: String, required: true },
        localTime: { type: String, required: true },
        timezone: { type: String, required: true }
    },
    venue: {
        name: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true }
    },
    classifications: { type: [String], required: true },
    priceRanges: {
        type: { type: String, required: true },
        currency: { type: String, required: true },
        min: { type: Number, required: true },
        max: { type: Number, required: true }
    },
    review: { type: String },
}, { timestamps: true });

type Event = InferSchemaType<typeof eventSchema>;

export default model<Event>('Event', eventSchema);