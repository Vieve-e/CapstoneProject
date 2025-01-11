import { useState, useEffect, useCallback } from "react";
import { getBooksByCategory } from "../services/api";

const bookCategories = {
  horror: "horror",
  "sci-fi": "science_fiction",
  romance: "romance",
  paranormal: "paranormal_romance",
  historical: "historical_fiction",
  thriller: "thriller",
};

const useBookCategory = (category) => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchPage = useCallback(
    async (page) => {
      try {
        setIsLoading(true);
        const categoryId = bookCategories[category.toLowerCase()];
        if (!categoryId) {
          throw new Error("Invalid book category");
        }

        const data = await getBooksByCategory(categoryId);
        const booksPerPage = 12;
        const startIndex = (page - 1) * booksPerPage;
        const endIndex = startIndex + booksPerPage;
        
        setBooks(data.works.slice(startIndex, endIndex));
        setTotalPages(Math.ceil(data.works.length / booksPerPage));
        setCurrentPage(page);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    },
    [category]
  );

  useEffect(() => {
    fetchPage(1);
  }, [category, fetchPage]);

  return {
    books,
    isLoading,
    error,
    currentPage,
    totalPages,
    fetchPage,
  };
};

export default useBookCategory;