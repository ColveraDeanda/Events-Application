import { useCallback, useEffect, useState } from "react";
import { User } from "../models/user";
import { Event as EventModel } from "../models/event";
import * as EventApi from "../network/events_api";
import EventInfoModal from "../components/Favorites/EventInfo";
import Swal from "sweetalert2";
import EventsGrid from "../components/EventsGrid";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";

interface FavoritePageProps {
  loggedInUser: User | null;
}

const FavoritePage = ({ loggedInUser }: FavoritePageProps) => {
  const [events, setEvents] = useState<EventModel[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [showEventsLoadingError, setShowEventsLoadingError] = useState(false);
  const [showEventInfo, setShowEventInfo] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventModel | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchEvents = useCallback(async (page: number) => {
    try {
      setShowEventsLoadingError(false);
      setEventsLoading(true);
      const { events, totalPages } = await EventApi.getEvents(page);
      setEvents(events);
    } catch (error) {
      console.error("Error fetching events:", error);
      setShowEventsLoadingError(true);
    } finally {
      setEventsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents(currentPage);
  }, [currentPage, fetchEvents]);

  async function deleteEvent(event: EventModel) {
    try {
      await EventApi.deleteEvent(event._id);
      setEvents(events.filter((existingEvent) => existingEvent._id !== event._id));
      setShowEventInfo(false);
      Swal.fire({
        title: "Event has been deleted",
        icon: "success",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
		title: "Error deleting event, please try again later",
		icon: "error",
	  });
    }
  }

  return (
    <div className="min-h-[calc(100vh-100px)] flex flex-col text-white mb-4 mt-4">
      <div className="container flex-grow  mx-auto px-4">
        {eventsLoading && <LoadingSpinner />}
        {showEventsLoadingError && (
          <ErrorAlert message="No results found" />
        )}
        {!eventsLoading && !showEventsLoadingError && (
          <>
            {events.length > 0 ? (
              <EventsGrid
                events={events}
                onEventClick={(event) => {
                  setShowEventInfo(true);
                  setSelectedEvent(event);
                }}
              />
            ) : (
              <p className="text-center text-2xl">No events found</p>
            )}
          </>
        )}
        {showEventInfo && (
          <EventInfoModal
            isLogged={!!loggedInUser}
            event={selectedEvent as EventModel}
            onDismiss={() => {
              setShowEventInfo(false);
              setSelectedEvent(null);
            }}
            onDeleteEvent={deleteEvent}
            refreshEvents={() => {
              fetchEvents(currentPage);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default FavoritePage;