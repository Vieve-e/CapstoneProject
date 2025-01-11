import  { useState, } from 'react';
import BookContentList from './BookContentList';

function BooksPage() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasSearched, setHasSearched] = useState(false);

  // Example function to fetch books
  const fetchBooks = async (page) => {
    try {
      // Your API call here
      const response = await fetch(`/api/books?page=${page}`);
      const data = await response.json();
      setBooks(data.books);
      setTotalPages(data.totalPages);
      setHasSearched(true);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchBooks(newPage);
  };

  const handleFavorite = (book) => {
    // Implement your favorite logic here
    console.log('Favorited book:', book);
  };

  const handleViewDetails = (book) => {
    // Implement your view details logic here
    console.log('Viewing details for:', book);
  };

  return (
    <div>
      {/* You might have a search bar or other controls here */}
      <BookContentList
        content={books}
        hasSearched={hasSearched}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onFavorite={handleFavorite}
        onViewDetails={handleViewDetails}
      />
    </div>
  );
}

export default BooksPage;