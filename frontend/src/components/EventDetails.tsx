import { Event as EventModel } from "../models/event";

interface EventDetailsProps {
    event: EventModel;
}

const EventDetails = ({ event }: EventDetailsProps) => {
  const COLORS = [
    "bg-blue-300 text-blue-900",
    "bg-green-300 text-green-900",
    "bg-red-300 text-red-900",
    "bg-yellow-300 text-yellow-900",
    "bg-purple-300 text-purple-900",
    "bg-pink-300 text-pink-900",
    "bg-indigo-300 text-indigo-900",
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center mb-4">
      <div className="text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center sm:items-start">
          <img
            src={event.image}
            alt={event.name}
            className="w-full sm:w-1/3 h-auto object-cover mb-4 sm:mb-0 sm:mr-4"
          />
          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold text-white">{event.name}</h2>
            <p className="text-gray-300">{event.venue.name}</p>
            <p className="text-gray-300">
              {event.venue.city}, {event.venue.country}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-gray-300">Date:</p>
          <p className="text-white">
            {new Date(event.date.localDate).toLocaleDateString("es-MX")}{" "}
            {event.date.localTime}
          </p>
        </div>
        {event.info && (
          <div className="mt-2">
            <p className="text-gray-300">Description:</p>
            <p className="text-white text-sm">{event.info}</p>
          </div>
        )}
        <div className="mt-2">
          <p className="text-gray-300">Price:</p>
          <p className="text-white">
            {event.priceRanges.min === event.priceRanges.max
              ? `$${event.priceRanges.min} ${event.priceRanges.currency}`
              : `$${event.priceRanges.min} - $${event.priceRanges.max} ${event.priceRanges.currency}`}
          </p>
        </div>
        <div className="mt-2">
          <p className="text-gray-300">Classifications:</p>
          <div className="text-white">
            {Array.from(
              new Set(
                event.classifications.filter(
                  (classification) => classification !== "Undefined"
                )
              )
            ).map((classification, index) => (
              <span
                key={index}
                className={`inline-block ${
                  COLORS[index % COLORS.length]
                } text-xs px-2 py-1 rounded-full mr-2 mb-2`}
              >
                {classification}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;