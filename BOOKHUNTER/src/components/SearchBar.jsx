import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { searchBooksWithFilters } from "../services/api";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [error, setError] = useState(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const filterOptions = {
    type: ["book", "author", "subject"],
    sortBy: ["relevance", "title", "date"],
    publishYear: Array.from({ length: 124 }, (_, i) => 2024 - i).map(String),
  };

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const results = await searchBooksWithFilters(value);
      if (results.Response === "True") {
        navigate(`/search?q=${encodeURIComponent(value)}`);
      } else {
        setError(results.Error);
      }
    } catch (err) {
      setError("An error occurred while searching");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = async (filterType, value) => {
    if (!query) return;

    setIsLoading(true);
    setError(null);

    try {
      const results = await searchBooksWithFilters(query, {
        [filterType]: value,
      });
      if (results.Response === "True") {
        console.log(results);
      } else {
        setError(results.Error);
      }
    } catch (err) {
      setError("An error occurred while searching");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative">
        {/* Main Search Bar */}
        <div className="relative flex items-center gap-2">
          <div className="relative flex-1">
            <div className="relative">
              {/* Search Icon */}
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>

              <input
                ref={searchRef}
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="See searched results here..."
                className="w-full h-12 pl-10 pr-10 rounded-xl bg-white/10 
                         border border-gray-200 focus:border-green-500
                         focus:ring-2 focus:ring-green-500/20 focus:outline-none
                         text-base placeholder:text-gray-400"
              />

              {/* Loading Spinner */}
              {isLoading && (
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              )}

              {/* Clear Button */}
              {!isLoading && query && (
                <button
                  onClick={() => {
                    setQuery("");
                    setError(null);
                    searchRef.current?.focus();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 
                           hover:text-gray-600 transition-colors"
                >
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Filter Toggle Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="h-12 px-4 rounded-xl border border-gray-200 
                     hover:bg-green-50 transition-colors flex items-center 
                     gap-2 text-gray-600 hover:text-green-600"
          >
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div
            className="absolute w-full mt-2 p-4 bg-white rounded-xl border 
                       border-gray-200 shadow-lg z-10"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(filterOptions).map(([filterType, options]) => (
                <div key={filterType} className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                  </label>
                  <select
                    onChange={(e) =>
                      handleFilterChange(filterType, e.target.value)
                    }
                    className="w-full h-10 px-3 rounded-lg border border-gray-200 
                             bg-white text-gray-700 text-sm focus:border-green-500 
                             focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                  >
                    <option value="">All</option>
                    {options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 text-sm">
          {error}
        </div>
      )}
    </div>
  );
};
export default SearchBar;
