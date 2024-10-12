import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

interface PaginationControlsProps {
  firstPage: number;
  currentPage: number;
  lastPage: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

const PaginationControls = ({ firstPage, currentPage, lastPage, onPreviousPage, onNextPage }: PaginationControlsProps) => {
  return (
    <div className="flex justify-center mt-4 space-x-4 text-white">
      <button
        onClick={onPreviousPage}
        disabled={currentPage === firstPage}
        className={`px-4 py-2 rounded shadow-md transition duration-300 ease-in-out transform ${
          currentPage === firstPage
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-blue-700 hover:bg-blue-900 hover:scale-105"
        }`}
      >
        <FaAngleLeft />
      </button>
      <span className="px-4 py-2">
        Page {currentPage} of {lastPage}
      </span>
      <button
        onClick={onNextPage}
        disabled={currentPage === lastPage || currentPage > lastPage}
        className={`px-4 py-2 rounded shadow-md transition duration-300 ease-in-out transform ${
          (currentPage === lastPage || currentPage > lastPage)
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-blue-700 hover:bg-blue-900 hover:scale-105"
        }`}
      >
        <FaAngleRight />
      </button>
    </div>
  );
};

export default PaginationControls;