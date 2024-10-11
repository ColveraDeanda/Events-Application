import { InferSchemaType, model, Schema } from "mongoose";

const eventSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    name: { type: String },
    image: { type: String },
    url: { type: String },
    type: { type: String },
    info: { type: String },
    date: {
        localDate: { type: String },
        localTime: { type: String },
        timezone: { type: String }
    },
    venue: {
        name: { type: String },
        city: { type: String },
        country: { type: String }
    },
    classifications: { type: [String] },
    priceRanges: {
        type: { type: String },
        currency: { type: String },
        min: { type: Number },
        max: { type: Number }
    },
    review: { type: String },
}, { timestamps: true });

type Event = InferSchemaType<typeof eventSchema>;

export default model<Event>('Event', eventSchema);