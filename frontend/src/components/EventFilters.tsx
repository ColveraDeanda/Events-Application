import React, { useEffect, useState } from 'react';

interface EventFiltersProps {
  searchTerm: string;
  country: string;
  onSearch: (searchTerm: string, country: string) => void;
}

const EventFilters = ({ searchTerm: initialSearchTerm, country: initialCountry, onSearch }: EventFiltersProps) => {
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
    const [country, setCountry] = useState(initialCountry);

    useEffect(() => {
      setSearchTerm(initialSearchTerm);
      setCountry(initialCountry);
    }, [initialSearchTerm, initialCountry]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCountry = e.target.checked ? 'US' : 'MX';
    setCountry(newCountry);
    onSearch(searchTerm, newCountry);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm, country);
  };

  return (
    <form onSubmit={handleSearchSubmit} className="mb-4">
      <div className="flex space-x-4 p-4 justify-center items-center">
      <div className="relative w-72">
        <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search events"
        className="w-full px-4 py-2 rounded shadow-md bg-gray-700 text-white placeholder-gray-400"
        />
        <button
        type="submit"
        className="absolute right-0 top-0 mt-2 mr-2 text-gray-400 hover:text-white"
        >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        </button>
      </div>
      <label className="inline-flex items-center me-5 cursor-pointer">
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 mr-3">MX</span>
        <input
        type="checkbox"
        className="sr-only peer"
        checked={country === 'US'}
        onChange={handleCountryChange}
        />
        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">US</span>
      </label>
      </div>
    </form>
  );
};

export default EventFilters;