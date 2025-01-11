import { useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./Navbar";
import Footer from "./Footer";
import useBookSearch from "../hooks/useBookSearch";

const CategoryPage = () => {
  const { category } = useParams();
  const { books, isLoading, error, setSearchQuery } = useBookSearch();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // Replace with the actual total pages from your API.

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // Example: Update search query or API fetch logic for the new page
    setSearchQuery((prevQuery) => `${prevQuery}&page=${newPage}`);
  };

  const renderPagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      if (currentPage > 3) pageNumbers.push("...");
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(currentPage + 1, totalPages - 1);
        i++
      ) {
        pageNumbers.push(i);
      }
      if (currentPage < totalPages - 2) pageNumbers.push("...");
      pageNumbers.push(totalPages);
    }

    return (
      <div className="flex justify-center mt-8 space-x-2">
        <button
          className={`btn btn-sm ${currentPage === 1 ? "btn-disabled" : ""}`}
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        >
          Prev
        </button>
        {pageNumbers.map((number, index) => (
          <button
            key={index}
            className={`btn btn-sm ${
              currentPage === number ? "btn-active" : ""
            } ${number === "..." ? "btn-disabled" : ""}`}
            onClick={() => number !== "..." && onPageChange(number)}
          >
            {number}
          </button>
        ))}
        <button
          className={`btn btn-sm ${
            currentPage === totalPages ? "btn-disabled" : ""
          }`}
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar isDetailPage={true} />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mt-5 font-inria ">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 capitalize">
          {category} Books
        </h1>

        {isLoading && <p>Loading books...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!isLoading && !error && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {books.map((book) => (
                <div
                  key={book.key}
                  className="p-4 border rounded shadow hover:shadow-lg"
                >
                  <h3 className="font-bold text-lg">{book.title}</h3>
                  <p className="text-sm text-gray-600">
                    By: {book.author_name?.join(", ") || "Unknown"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Published: {book.first_publish_year || "N/A"}
                  </p>
                </div>
              ))}
            </div>

            {/* Use renderPagination */}
            <div className="flex justify-center">
              {totalPages > 1 &&
                renderPagination({
                  currentPage,
                  totalPages,
                  onPageChange: handlePageChange,
                })}
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
