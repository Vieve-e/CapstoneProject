import { useState, useEffect, useCallback } from "react";
import { searchBooksWithFilters } from "../services/api";

function useBookSearch(initialQuery = "") {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [filters, setFilters] = useState({
    author: "",
    publisher: "",
    year: "",
    sortBy: "first_publish_year.desc",
    subjects: "",
  });

  const fetchBooks = useCallback(async (query, currentFilters) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await searchBooksWithFilters(query, currentFilters);

      if (result && result.docs) {
        setBooks(result.docs);
      } else {
        setBooks([]);
        setError("No books found matching your criteria.");
      }
    } catch (err) {
      setBooks([]);
      setError("Failed to fetch books. Please try again.");
      console.error("Book search error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (searchQuery.trim() || Object.values(filters).some((val) => val)) {
      fetchBooks(searchQuery, filters);
    }
  }, [searchQuery, filters, fetchBooks]);

  return {
    books,
    isLoading,
    error,
    setSearchQuery,
    setFilters,
    searchQuery,
    filters,
  };
}

export default useBookSearch;
