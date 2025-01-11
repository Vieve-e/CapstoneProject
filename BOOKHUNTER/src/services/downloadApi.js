// services/downloadApi.js

const COVER_URL = 'https://covers.openlibrary.org/b/id/-S.jpg';

// Helper function to get cover URL
const getCoverUrl = (coverId, size = 'S') => 
  coverId ? `${COVER_URL}/id/${coverId}-${size}.jpg` : '/placeholder-book-cover.jpg';

// Mock storage for downloads since OpenLibrary doesn't have download endpoints
let activeDownloads = new Map();
let completedDownloads = new Map();
let downloadCounter = 0;

export const getAllDownloads = async () => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      activeDownloads: Array.from(activeDownloads.values()),
      completedDownloads: Array.from(completedDownloads.values())
    };
  } catch (error) {
    console.error('Error fetching downloads:', error);
    throw new Error('Failed to fetch downloads');
  }
};

export const initiateDownload = async (bookData) => {
  try {
    const downloadId = ++downloadCounter;
    const totalSize = Math.floor(Math.random() * (15000000 - 5000000) + 5000000); // Random size between 5-15MB
    
    const download = {
      id: downloadId,
      bookId: bookData.id,
      bookTitle: bookData.title,
      format: 'PDF',
      totalSize,
      downloadedSize: 0,
      status: 'downloading',
      coverUrl: getCoverUrl(bookData.cover_i, 'S'),
      startTime: new Date().toISOString()
    };

    activeDownloads.set(downloadId, download);

    // Simulate download progress
    simulateDownloadProgress(downloadId, totalSize);

    return download;
  } catch (error) {
    console.error('Error initiating download:', error);
    throw new Error('Failed to start download');
  }
};

export const cancelDownload = async (downloadId) => {
  try {
    if (activeDownloads.has(downloadId)) {
      const download = activeDownloads.get(downloadId);
      download.status = 'cancelled';
      completedDownloads.set(downloadId, download);
      activeDownloads.delete(downloadId);
    }
  } catch (error) {
    console.error('Error cancelling download:', error);
    throw new Error('Failed to cancel download');
  }
};

export const retryDownload = async (downloadId) => {
  try {
    if (completedDownloads.has(downloadId)) {
      const download = completedDownloads.get(downloadId);
      download.status = 'downloading';
      download.downloadedSize = 0;
      download.startTime = new Date().toISOString();
      
      activeDownloads.set(downloadId, download);
      completedDownloads.delete(downloadId);
      
      simulateDownloadProgress(downloadId, download.totalSize);
    }
  } catch (error) {
    console.error('Error retrying download:', error);
    throw new Error('Failed to retry download');
  }
};

export const removeDownload = async (downloadId) => {
  try {
    completedDownloads.delete(downloadId);
  } catch (error) {
    console.error('Error removing download:', error);
    throw new Error('Failed to remove download');
  }
};

// Helper function to simulate download progress
const simulateDownloadProgress = (downloadId, totalSize) => {
  let progress = 0;
  const interval = setInterval(() => {
    if (!activeDownloads.has(downloadId)) {
      clearInterval(interval);
      return;
    }

    const download = activeDownloads.get(downloadId);
    progress += Math.random() * 0.1;

    if (progress >= 1) {
      download.downloadedSize = totalSize;
      download.status = 'completed';
      completedDownloads.set(downloadId, download);
      activeDownloads.delete(downloadId);
      clearInterval(interval);
    } else {
      download.downloadedSize = Math.floor(totalSize * progress);
      activeDownloads.set(downloadId, download);
    }
  }, 500);
};