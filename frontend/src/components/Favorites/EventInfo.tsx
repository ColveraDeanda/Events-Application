import { Event as EventModel } from "../../models/event";
import { EventUpdate } from "../../network/events_api";
import * as EventApi from "../../network/events_api";
import Swal from 'sweetalert2';
import EventDetails from "../EventDetails";
import { MdDelete } from "react-icons/md";
import { useForm } from "react-hook-form";

interface EventInfoModalProps {
    event: EventModel;
    isLogged: boolean;
    onDismiss: () => void;
    onDeleteEvent: (event: EventModel) => void;
    refreshEvents: () => void;
}

const EventInfoModal = ({ isLogged, event, onDismiss, onDeleteEvent, refreshEvents }: EventInfoModalProps) => {

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onDismiss();
        }
    };

    const { register, handleSubmit, formState : {errors, isSubmitting}} = useForm<EventUpdate>({
        defaultValues: {
          review: event?.review || "",
        }
      });

    async function onSubmit(input: EventUpdate){
        try {
            const eventResponse = await EventApi.updateEvent(event._id, input);
            console.log(eventResponse);
            refreshEvents();
            onDismiss();
            Swal.fire({
                title: 'Review saved',
                icon: 'success',
            });
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 sm:p-8 z-20 overflow-auto"
        onClick={handleBackdropClick}
      >
        <div className="bg-gray-800 p-4 sm:p-8 rounded-lg w-full max-w-3xl relative sm:mt-0 mt-72">
          <button
            className="absolute top-2 right-2 text-white"
            onClick={onDismiss}
          >
            &times;
          </button>
          <EventDetails event={event} />
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
              <div className="mb-4">
                <label htmlFor="review" className="block text-gray-300 mb-2">
                  Review
                </label>
                <textarea
                  id="review"
                  {...register("review", { required: "Review is required" })}
                  defaultValue={event?.review || ""}
                  className="w-full p-2 rounded-lg bg-gray-700 text-white"
                  placeholder="Write your review here..."
                />
                {errors.review && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.review.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full sm:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : event.review ? "Update Review" : "Save Review"}
              </button>
            </form>
          <footer className="mt-8 flex flex-col sm:flex-row justify-end">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg mb-2 sm:mb-0 sm:mr-2 hover:bg-green-600 w-full sm:w-auto"
              onClick={() => window.open(event.url, "_blank")}
            >
              {" "}
              Event Link
            </button>
            <button
              className="flex items-center justify-center px-4 py-2 rounded-lg mb-2 sm:mb-0 sm:mr-2 bg-gray-600 hover:bg-gray-700"
              onClick={(e) => {
                e.stopPropagation();
                Swal.fire({
                  title: 'Are you sure?',
                  text: "You won't be able to revert this!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                  if (result.isConfirmed) {
                    onDeleteEvent(event);
                  }
                });
              }}
            >
              <MdDelete className="text-red-500 cursor-pointer text-2xl hover:text-red-700" />
            </button>
          </footer>
        </div>
      </div>
    );
};

export default EventInfoModal;
