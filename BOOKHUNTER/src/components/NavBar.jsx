import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import NotificationBar from "./NotificationBar";
import MenuBar from "./MenuBar";
import DownloadBar from "./Downloads";
import { getBookNotifications } from "../services/api";

const NavBar = ({ isDetailPage = false, isfromcategory = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationBarOpen, setIsNotificationBarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDownloadBarOpen, setIsDownloadBarOpen] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      const bookNotifications = await getBookNotifications();
      setNotifications(bookNotifications);
    };
    fetchNotifications();
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.style.backgroundColor = "#1a1a1a";
      document.documentElement.style.color = "#ffffff";
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.backgroundColor = "";
      document.documentElement.style.color = "";
    }
  }, [isDarkMode]);

  const toggleNotificationBar = () =>
    setIsNotificationBarOpen(!isNotificationBarOpen);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={`relative ${isDarkMode ? "dark" : ""}`}>
      {/* Main Navbar */}
      <div
        className={`fixed top-0 z-40 w-full ${
          isDarkMode ? "bg-gray-900" : "bg-green-950"
        } transition-colors duration-300`}
      >
        <div
          className={`navbar ${
            isDarkMode ? "bg-gray-800" : "bg-base-100"
          } py-2 px-4 sm:px-6 rounded-xl max-w-7xl mx-auto transition-colors duration-300`}
        >
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center space-x-4">
              {isDetailPage ? (
                <button
                  onClick={(e) => {
                    if (isfromcategory) {
                      window.history.back();
                    } else {
                      e.preventDefault();
                      if (window.location.pathname === "/") {
                        window.location.reload();
                      } else {
                        window.location.href = "/";
                      }
                    }
                  }}
                  className="btn btn-ghost btn-circle"
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
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={toggleMenu}
                  className="btn btn-ghost btn-circle"
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
                      d="M4 6h16M4 12h16M4 18h7"
                    />
                  </svg>
                </button>
              )}
              <div className="flex items-center space-x-2">
                <h1
                  className={`btn btn-ghost font-black text-lg sm:text-2xl font-inria ${
                    isDarkMode ? "text-white" : ""
                  }`}
                >
                  📚BookHunter
                </h1>
                <span
                  className={`hidden md:inline ml-4 text-sm italic ${
                    isDarkMode ? "text-gray-300" : ""
                  }`}
                >
                  Find the books you love
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="btn btn-ghost btn-circle"
              >
                {isDarkMode ? (
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
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                ) : (
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
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
                    />
                  </svg>
                )}
              </button>
              <button
                className="btn btn-ghost btn-circle"
                onClick={() => setIsDownloadBarOpen(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 16l-4-4h3V4h2v8h3l-4 4z" />
                </svg>
              </button>
              <button
                className="btn btn-ghost btn-circle"
                onClick={toggleNotificationBar}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2zm6-6V11a6 6 0 0 0-5-5.92V4a1 1 0 0 0-2 0v1.08A6 6 0 0 0 6 11v5l-1 1v1h14v-1z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sliding Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 ${
          isDarkMode ? "bg-gray-900" : "bg-green-950"
        } transform transition-all duration-300 ease-in-out z-50 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">
          <button
            onClick={toggleMenu}
            className="btn btn-ghost btn-circle absolute right-4 top-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <MenuBar onClose={toggleMenu} />
        </div>
      </div>

      {/* Sliding Notification Bar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } shadow-lg transform transition-all duration-300 ease-in-out z-50 ${
          isNotificationBarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <NotificationBar
          onClose={() => setIsNotificationBarOpen(false)}
          notifications={notifications}
        />
      </div>

      {/* Overlay */}
      {(isMenuOpen || isNotificationBarOpen) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => {
            setIsMenuOpen(false);
            setIsNotificationBarOpen(false);
          }}
        />
      )}
      {/* Download Bar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-80 md:w-96 ${
          isDarkMode ? "bg-gray-900" : "bg-green-950"
        } shadow-lg transform transition-all duration-300 ease-in-out z-50 ${
          isDownloadBarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <DownloadBar
          isOpen={isDownloadBarOpen}
          onClose={() => setIsDownloadBarOpen(false)}
        />
      </div>
    </div>
  );
};

NavBar.propTypes = {
  isDetailPage: PropTypes.bool,
  isfromcategory: PropTypes.bool,
};

export default NavBar;
