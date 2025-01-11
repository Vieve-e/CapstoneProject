// MenuBar.jsx
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const MenuBar = ({ onClose }) => {
  return (
    <div className="fixed top-0 left-0 h-screen bg-green-950 w-64 flex flex-col text-gray-300">
      {/* Close Button */}
      <div className="absolute top-4 right-4">
        <button 
          onClick={onClose}
          className="text-gray-300 hover:text-white transition-colors"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 pt-16 px-6">
        <ul className="space-y-6 text-base font-inria">
          <li>
            <Link 
              to="/home" 
              onClick={onClose}
              className="flex items-center text-gray-300 hover:text-white transition-colors"
            >
              Home
            </Link>
          </li>
          
          <li>
            <details className="group">
              <summary className="flex items-center justify-between text-gray-300 hover:text-white transition-colors cursor-pointer">
                <span>Categories</span>
                <svg 
                  className="w-4 h-4 transition-transform duration-200 group-open:rotate-180" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <ul className="mt-2 ml-4 space-y-2">
                {[
                  { path: '/category/horror', name: 'Horror' },
                  { path: '/category/romance', name: 'Romance' },
                  { path: '/category/Paranormal', name: 'Paranormal' },
                  { path: '/category/Thriller', name: 'Thriller' },
                  { path: '/category/Historical', name: 'Historical' },
                  { path: '/category/sci-fi', name: 'Sci-Fi' }
                ].map((category) => (
                  <li key={category.path}>
                    <Link 
                      to={category.path}
                      onClick={onClose}
                      className="block text-gray-300 hover:text-white transition-colors py-1"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </li>
          
          <li>
            <Link 
              to="/favorites" 
              onClick={onClose}
              className="flex items-center text-gray-300 hover:text-white transition-colors"
            >
              My Favorites
            </Link>
          </li>
        </ul>
      </nav>

      {/* Footer Logo */}
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold">📚</span>
          <span className="text-lg font-bold">BookHunter</span>
        </div>
      </div>
    </div>
  );
};

MenuBar.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default MenuBar;