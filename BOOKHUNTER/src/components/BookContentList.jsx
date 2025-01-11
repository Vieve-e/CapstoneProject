import PropTypes from "prop-types";
import { FaSearch } from "react-icons/fa";
import BookCard from "./BookCard";

const BookList = ({
  books,
  onSelectBook,
  hasSearched,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (!hasSearched) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full p-4 font-inria serif">
        <p className="text-xs sm:text-sm text-black text-center font-semibold max-w-xs sm:max-w-sm font-inria serif">
          Search for books to see results here...
        </p>
      </div>
    );
  }

  if (hasSearched && books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full p-4">
        <p className="text-xs sm:text-sm text-black text-center font-semibold max-w-xs sm:max-w-sm font-inria serif">
          We could not find any books matching your search.
        </p>
      </div>
    );
  }

  const renderPagination = () => (
    <div className="flex justify-center mt-8">
      <div className="join">
        <button
          className="join-item btn btn-sm sm:btn-md"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          «
        </button>
        <button className="join-item btn btn-sm sm:btn-md">{currentPage}</button>
        <button
          className="join-item btn btn-sm sm:btn-md"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          »
        </button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8 max-w-7xl">
      <div className="flex items-center mb-4 text-gray-400">
        <FaSearch className="mr-2" size={14} />
        <h2 className="text-sm sm:text-md font-semibold uppercase">
          Search Results
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} onSelect={onSelectBook} />
        ))}
      </div>
      {totalPages > 1 && renderPagination()}
    </div>
  );
};

BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      genre: PropTypes.string,
      coverImageUrl: PropTypes.string,
      publicationDate: PropTypes.string,
      rating: PropTypes.number,
      description: PropTypes.string,
      onSelectBook: PropTypes.func.isRequired,
    })
  ).isRequired,
  onSelectBook: PropTypes.func.isRequired,
  hasSearched: PropTypes.bool.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

BookList.defaultProps = {
  books: [],
  hasSearched: false,
  currentPage: 1,
  totalPages: 1,
};

export default BookList;

