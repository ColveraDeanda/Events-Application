import { Event as EventModel } from "../../models/event";
import * as EventsApi from "../../network/events_api";
import Swal from 'sweetalert2';
import { useEffect, useState } from "react";
import EventDetails from "../EventDetails";

interface EventInfoModalProps {
    event: EventModel;
    isLogged: boolean;
    onDismiss: () => void;      
}

const EventInfoModal = ({ isLogged, event, onDismiss }: EventInfoModalProps) => {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const checkIfFavorite = async () => {
            try {
                if (isLogged) {
                    const favorites = await EventsApi.getAllEvents();
                    const favorite = favorites.find(fav => fav.url === event.url);
                    setIsFavorite(!!favorite);
                }
            } catch (error) {
                console.error(error);
                Swal.fire({
                    title: 'Error',
                    text: 'Failed to check favorites',
                    icon: 'error',
                });
            }
        };
        checkIfFavorite();
    }, [event.url, isLogged]);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onDismiss();
        }
    };

    const addToFavorites = async () => {
        try {
            const eventResponse = await EventsApi.createEvent(event);
            console.log(eventResponse);
            Swal.fire({
                title: 'Event added to favorites',
                icon: 'success',
            });
            onDismiss();
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: 'Error',
                text: 'Failed to add to favorites',
                icon: 'error',
            });
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 sm:p-8"
            onClick={handleBackdropClick}
        >
            <div className="bg-gray-800 p-4 sm:p-8 rounded-lg w-full max-w-3xl relative">
                <button
                    className="absolute top-2 right-2 text-white"
                    onClick={onDismiss}
                >
                    &times;
                </button>
                <EventDetails event={event} />
                <footer className="mt-8 flex flex-col sm:flex-row justify-end">
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded-lg mb-2 sm:mb-0 sm:mr-2 hover:bg-green-600 w-full sm:w-auto"
                        onClick={() => window.open(event.url, "_blank")}
                    >
                        Event Link
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg w-full sm:w-auto ${isFavorite ? "bg-gray-400 text-gray-700 cursor-not-allowed" : "bg-red-500 text-white hover:bg-red-600"}`}
                        onClick={() => {
                            if (!isLogged) {
                                Swal.fire({
                                    title: "Please log in to add to favorites",
                                    icon: "warning",
                                });
                            } else {
                                addToFavorites();
                            }
                        }}
                        disabled={isFavorite}
                    >
                        {isFavorite ? "Already in Favorites" : "Add to Favorites"}
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default EventInfoModal;