import PropTypes from "prop-types";

const BookCard = ({ book, onSelect }) => {
  return (
    <div
      className="bg-white shadow rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition duration-300"
      onClick={() => onSelect(book)}
    >
      {/* Book Cover */}
      <div className="h-48 sm:h-56 bg-gray-200">
        {book.coverImageUrl ? (
          <img
            src={book.coverImageUrl}
            alt={book.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            No Image
          </div>
        )}
      </div>

      {/* Book Details */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-sm sm:text-md font-semibold text-gray-800 truncate">
          {book.title}
        </h3>
        {/* Author */}
        <p className="text-xs sm:text-sm text-gray-600 mt-1 truncate">
          {book.author}
        </p>
        {/* Rating */}
        {book.rating && (
          <p className="text-xs sm:text-sm text-yellow-500 mt-1">
            ⭐ {book.rating.toFixed(1)}
          </p>
        )}
      </div>
    </div>
  );
};

BookCard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    genre: PropTypes.string,
    coverImageUrl: PropTypes.string,
    publicationDate: PropTypes.string,
    rating: PropTypes.number,
    description: PropTypes.string,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default BookCard;
