import { useEffect, useState, useCallback } from "react";
import { User } from "../models/user";
import * as EventApi from "../network/events_api";
import { Event as EventModel } from "../models/event";
import EventInfoModal from "../components/Landing/EventInfo";
import EventsGrid from "../components/EventsGrid";
import LoadingSpinner from "../components/LoadingSpinner";
import PaginationControls from "../components/PaginationControls";
import EventFilter from "../components/EventFilters";
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
  const [lastPage, setLastPage] = useState(0);
  const [country, setCountry] = useState("MX");
  const [searchTerm, setSearchTerm] = useState("");
  const firsPage = 0;

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
        setLastPage(data.pageInfo.totalPages - 1);
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

  const handlePreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 0));
  const handleNextPage = () => setCurrentPage((prev) => prev + 1);

  return (
    <div className="min-h-[calc(100vh-100px)] flex flex-col text-white mb-4 mt-4">
      <EventFilter
        searchTerm={searchTerm}
        country={country}
        onSearch={(searchTerm, country) => {
          setSearchTerm(searchTerm);
          setCountry(country);
          setCurrentPage(0);
        }}
      />
      <div className="flex-grow container mx-auto px-4">
        {eventsLoading && <LoadingSpinner />}
        {showEventsLoadingError && <ErrorAlert message="No results found, try again later" />}
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
              <ErrorAlert message="No results found, try again later" />
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
      {!showEventsLoadingError && (
        <PaginationControls
          firstPage={firsPage}
          currentPage={currentPage}
          lastPage={lastPage}
          onPreviousPage={handlePreviousPage}
          onNextPage={handleNextPage}
        />
      )}
    </div>
  );
};

export default EventsPage;
