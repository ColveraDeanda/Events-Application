import { useEffect, useState, useCallback } from "react";
import { User } from "../models/user";
import * as EventApi from "../network/events_api";
import { Event as EventModel } from "../models/event";
import EventInfoModal from "../components/Landing/EventInfo";
import EventsGrid from "../components/EventsGrid";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";

interface EventsPageProps {
  loggedInUser: User | null;
}

const EventsPage = ({ loggedInUser }: EventsPageProps) => {
  const [events, setEvents] = useState<EventModel[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [showEventsLoadingError, setShowEventsLoadingError] = useState(false);
  const [showEventInfo, setShowEventInfo] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventModel | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const country = "MX";   // TODO: Filter by country.
  const searchTerm = "";  // TODO: Filter by term.

  const fetchEvents = useCallback(
    async (page: number, country: string, searchTerm: string) => {
      try {
        setShowEventsLoadingError(false);
        setEventsLoading(true);
        const data = await EventApi.getEventsExternal(
          page,
          country,
          searchTerm
        );
        setEvents(data.events);
      } catch (error) {
        setShowEventsLoadingError(true);
      } finally {
        setEventsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchEvents(currentPage, country, searchTerm);
  }, [currentPage, country, searchTerm, fetchEvents]);

  return (
    <div className="min-h-[calc(100vh-100px)] flex flex-col text-white mb-4 mt-4">
      <div className="flex-grow container mx-auto px-4">
        {eventsLoading && <LoadingSpinner />}
        {showEventsLoadingError && <ErrorAlert message="No results found" />}
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
            event={selectedEvent as EventModel}
            onDismiss={() => {
              setShowEventInfo(false);
              setSelectedEvent(null);
            }}
            isLogged={!!loggedInUser}
          />
        )}
      </div>
    </div>
  );
};

export default EventsPage;