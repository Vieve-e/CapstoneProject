import PropTypes from "prop-types";
import Header from "./Header";
import Footer from "./Footer";

const LandingPage = ({ onSearchResults, onFilterChange, onClearSearch }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white-500">
      <Header
        onSearchResults={onSearchResults}
        onFilterChange={onFilterChange}
        onClearSearch={onClearSearch}
      />
      <main className="flex-grow container mx-auto px-4 pb-12"></main>
      <div className="divider"></div>
      <Footer />
    </div>
  );
};

// Props validation
LandingPage.propTypes = {
  onSearchResults: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onClearSearch: PropTypes.func.isRequired,
};

export default LandingPage;
