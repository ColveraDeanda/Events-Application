import { Event } from "../models/event";

interface EventProps {
    event: Event,
    onClick?: () => void;
}

const EventCard = ({ event, onClick }: EventProps) => {
    const { name, venue: { city }, image, date: { localDate } } = event;
    return (
      <div
        className="flex flex-col items-center bg-gray-800 shadow-md rounded-lg overflow-hidden text-center cursor-pointer hover:bg-gray-700 transition duration-300 ease-in-out"
        onClick={onClick}
      >
        <img
          className="w-full object-fill object-center"
          src={image}
          alt={`Cover of ${name}`}
        />

        <div className="p-3.5 mt-auto">
          <h2 className="text-l font-semibold text-white">
            {name.length > 28 ? `${name.substring(0, 28)}...` : name}
          </h2>
          <p className="text-gray-400 mt-1 text-sm">{city}</p>
          <p className="text-gray-400 mt-1 text-sm">
            {new Date(localDate).toLocaleDateString("es-ES")}
          </p>
        </div>
      </div>
    );
}

export default EventCard;