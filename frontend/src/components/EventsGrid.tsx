import { Event as EventModel } from '../models/event';
import Event from './Event';

interface EventsGridProps {
  events: EventModel[];
  onEventClick: (event: EventModel) => void;
}

const EventsGrid = ({ events, onEventClick }: EventsGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {events.map((event) => (
        <Event
          event={event}
          key={event._id}
          onClick={() => onEventClick(event)}
        />
      ))}
    </div>
  );
};

export default EventsGrid;