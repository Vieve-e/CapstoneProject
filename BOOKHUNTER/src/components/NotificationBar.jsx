import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getBookNotifications } from "../services/api";
import { formatNotificationTime } from "../services/api";

const NotificationBar = ({ onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const newNotifications = await getBookNotifications();
        setNotifications(newNotifications);
      } catch (error) {
        console.error("Error loading notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
  }, []);

  if (loading) {
    return (
      <div className="fixed top-0 right-0 h-screen w-80 bg-green-950 text-gray-300 shadow-xl flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="fixed top-0 right-0 h-screen w-80 bg-green-950 text-gray-300 shadow-xl flex flex-col">
      {/* Header */}
      <div className="p-6 flex justify-between items-center border-b border-green-900">
        <h2 className="text-xl font-bold font-inria">Book Updates</h2>
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

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <p className="text-gray-400">No notifications yet</p>
          </div>
        ) : (
          <div className="px-4 py-2 space-y-2">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="bg-green-900 rounded-lg p-4 hover:bg-green-800 transition-colors"
              >
                <div className="flex gap-4">
                  <img
                    src={notification.cover}
                    alt={notification.title}
                    className="w-16 h-24 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white truncate">
                      {notification.title}
                    </h3>
                    <p className="text-sm text-gray-300 mt-1 line-clamp-2">
                      {notification.content}
                    </p>
                    <div className="mt-2 flex items-center text-xs text-gray-400">
                      <span className="truncate">{notification.author}</span>
                      <span className="mx-2">•</span>
                      <span className="whitespace-nowrap">
                        {formatNotificationTime(notification.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-green-900">
        <button
          onClick={() => {
            /* Add mark all as read functionality */
          }}
          className="w-full py-2 text-sm text-center text-gray-300 hover:text-white transition-colors"
        >
          Mark all as read
        </button>
      </div>
    </div>
  );
};

NotificationBar.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default NotificationBar;
