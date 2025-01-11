// Import necessary dependencies and components
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AboutMe from "./components/AboutMe";
import Downloads from './components/Downloads';
import LoadingState from "./components/LoadingState";
import { searchBooksWithFilters } from "./services/api";
import './index.css';
import Landingpage from "./components/LandingPage";
import BookContentList from './components/BookContentList';
import BooksPage from "./components/BooksPage";
import MyFavorites from "./components/MyFavorites"
import CategoryPage from "./components/CategoryPage";
import Home from "./components/Home";
import BookDetails from "./components/BookDetails";

function App() {
  // State for search results, loading status, errors, and pagination
  const [searchState, setSearchState] = useState({
    content: [],
    isLoading: false,
    error: null,
    hasSearched: false,
    currentPage: 1,
    totalPages: 1,
  });

  // State for search filters
  const [filters, setFilters] = useState({
    author: "",
    genre: "",
  });

  // Handle search results and update state
  const handleSearchResults = (results) => {
    setSearchState((prevState) => ({
      ...prevState,
      content: results.Search || [],
      isLoading: false,
      error: results.Error || null,
      hasSearched: true,
      totalPages: Math.ceil((results.totalResults || 0) / 8),
    }));
  };

  // Handle page change for pagination
  const handlePageChange = (newPage) => {
    setSearchState((prevState) => ({
      ...prevState,
      currentPage: newPage,
    }));
    performSearchWithFilters(newPage);
  };

  // Get paginated content for current page
  const getPaginatedContent = () => {
    const startIndex = (searchState.currentPage - 1) * 8;
    const endIndex = startIndex + 8;
    return searchState.content.slice(startIndex, endIndex);
  };

  // Handle filter changes and trigger new search
  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
    performSearchWithFilters();
  };

  // Perform search with current filters
  const performSearchWithFilters = async (page = 1) => {
    setSearchState((prevState) => ({
      ...prevState,
      isLoading: true,
      error: null,
    }));

    try {
      const results = await searchBooksWithFilters("", filters, page);
      handleSearchResults(results);
    } catch (error) {
      setSearchState((prevState) => ({
        ...prevState,
        isLoading: false,
        error: error.message || "An error occurred while searching"
      }));
      console.error("Search error:", error);
    }
  };

  // Clear search results and reset filters
  const handleClearSearch = () => {
    setSearchState({
      content: [],
      isLoading: false,
      error: null,
      hasSearched: false,
      currentPage: 1,
      totalPages: 1,
    });
    setFilters({
      author: "",
      genre: "",
    });
  };

  // Handle book selection
  const handleSelectBook = (selectedBook) => {
    console.log('Selected Book:', selectedBook);
    // Implement your logic for handling the selected book here
  };

  // Render the application
  return (
    <Router>
      <Routes>
        {/* Home route */}
        <Route
          path="/"
          element={
            <Landingpage
              onSearchResults={handleSearchResults}
              onFilterChange={handleFilterChange}
              onClearSearch={handleClearSearch}
            >
              {/* Show loading state if isLoading is true */}
              {searchState.isLoading && <LoadingState />}
              {/* Show error message if there's an error */}
              {searchState.error && (
                <p className="text-red-500 flex flex-row mt-3">{searchState.error}</p>
              )}
              {/* Show content list if not loading and no error */}
              {!searchState.isLoading && !searchState.error && (
                <BookContentList
                  content={getPaginatedContent()}
                  hasSearched={searchState.hasSearched}
                  currentPage={searchState.currentPage}
                  totalPages={searchState.totalPages}
                  onPageChange={handlePageChange}
                  onSelectBook={handleSelectBook} // Pass the onSelectBook prop
                />
              )}
            </Landingpage>
          }
        />
       <Route path="/" element={<Landingpage />} />
    <Route path="/home" element={<Home />} /> 
    <Route path="/about" element={<AboutMe />} />
    <Route path="/downloads" element={<Downloads />} />
    <Route path="/books" element={<BooksPage />} />
    <Route path="/favorites" element={<MyFavorites />} />
    <Route path="/category/:category" element={<CategoryPage />} />
    <Route path="/book/:id" element={<BookDetails />} />
      </Routes>
    </Router>
  );
}

export default App;