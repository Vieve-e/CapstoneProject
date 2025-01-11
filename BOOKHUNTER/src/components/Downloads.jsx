import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  getAllDownloads,
  cancelDownload,
  retryDownload,
  removeDownload,
} from "../services/downloadApi";

const DownloadBar = ({ onClose }) => {
  const [activeDownloads, setActiveDownloads] = useState([]);
  const [completedDownloads, setCompletedDownloads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadDownloads();
    const interval = setInterval(loadDownloads, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadDownloads = async () => {
    try {
      const { activeDownloads: active, completedDownloads: completed } =
        await getAllDownloads();
      setActiveDownloads(active);
      setCompletedDownloads(completed);
      setError(null);
    } catch (err) {
      setError("Failed to load downloads");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  if (isLoading) {
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
        <h2 className="text-xl font-bold font-inria">Downloads</h2>
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

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {error && (
          <div className="m-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-200">
            {error}
          </div>
        )}

        {/* Active Downloads */}
        <div className="p-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">
            Downloading
          </h3>
          {activeDownloads.length === 0 ? (
            <p className="text-gray-400 text-sm">No active downloads💔</p>
          ) : (
            <div className="space-y-3">
              {activeDownloads.map((download) => (
                <div
                  key={download.id}
                  className="bg-green-900 rounded-lg p-3 hover:bg-green-800 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1 min-w-0 pr-4">
                      <h4 className="font-medium truncate">
                        {download.bookTitle}
                      </h4>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatFileSize(download.downloadedSize)} of{" "}
                        {formatFileSize(download.totalSize)}
                      </p>
                    </div>
                    <button
                      onClick={() => cancelDownload(download.id)}
                      className="text-xs text-gray-400 hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="w-full bg-green-950 rounded-full h-1.5">
                    <div
                      className="bg-green-500 h-1.5 rounded-full transition-all duration-300"
                      style={{
                        width: `${
                          (download.downloadedSize / download.totalSize) * 100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Completed Downloads */}
        <div className="p-4 border-t border-green-900">
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">
            Download History
          </h3>
          {completedDownloads.length === 0 ? (
            <p className="text-gray-400 text-sm">No download history 💔</p>
          ) : (
            <div className="space-y-2">
              {completedDownloads.map((download) => (
                <div
                  key={download.id}
                  className="bg-green-900 rounded-lg p-3 hover:bg-green-800 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">
                        {download.bookTitle}
                      </h4>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatFileSize(download.totalSize)} •{" "}
                        {download.format.toUpperCase()}
                      </p>
                    </div>
                    <div className="flex gap-2 ml-3">
                      {download.status === "failed" ? (
                        <button
                          onClick={() => retryDownload(download.id)}
                          className="text-xs text-gray-400 hover:text-white"
                        >
                          Retry
                        </button>
                      ) : (
                        <button
                          onClick={() => navigate(`/book/${download.bookId}`)}
                          className="text-xs text-gray-400 hover:text-white"
                        >
                          View
                        </button>
                      )}
                      <button
                        onClick={() => removeDownload(download.id)}
                        className="text-xs text-gray-400 hover:text-white"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-green-900">
        <button
          onClick={() => {
            /* Add clear all functionality */
            completedDownloads.clear();
            setCompletedDownloads([]);
          }}
          className="w-full py-2 text-sm text-center text-gray-300 hover:text-white transition-colors"
        >
          Clear all history
        </button>
      </div>
    </div>
  );
};

DownloadBar.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default DownloadBar;
