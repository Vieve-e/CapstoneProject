const CATEGORIES = {
  HORROR: 'horror',
  SCIFI: 'science_fiction',
  ROMANCE: 'romance',
  PARANORMAL: 'paranormal',
  HISTORICAL: 'historical',
  THRILLER: 'thriller'
};

// Mock Authors Data
const mockAuthors = {
  "author-001": {
    id: "author-001",
    name: "Sarah J. Parker",
    bio: "Bestselling author of supernatural and horror fiction, known for crafting intricate plots that blend historical elements with modern suspense.",
    birth_date: "1985-03-15",
    death_date: null,
    works: 12
  },
  "author-002": {
    id: "author-002",
    name: "Elena Rodriguez",
    bio: "Award-winning science fiction author who combines hard science with deep character development.",
    birth_date: "1978-09-22",
    death_date: null,
    works: 8
  }
};

// Mock Books Data
const mockBooksData = {
  "books": [
    {
      "id": "book-039",
      "title": "Dark Needs at Night's Edge",
      "authors": ["Kresley Cole"],
      "author_keys": ["author-11"],
      "cover_image": "/src/assets/Dark Needs at Night's Edge.png",
      "rating": 4.5,
      "publication_date": "29-04-2008",
      "isbn": "99781416565567, 1416565566",
      "description": "Néomi Laress, a famous ballerina from a past century, became a phantom the night she was murdered. Imbued with otherworldly powers but invisible to the living, she haunts her beloved home, scaring away trespassers—until she encounters a ruthless immortal even more terrifying than Néomi herself.",
      "genres": ["Paranormal_romance"],
      "subjects": ["Supernatural", "Mystery"],
      "pages": 384,
      "language": "English",
      "publisher": "Pocket Books",
      "cover_i": 12345,
      "first_publish_year": 2008
    },
    {
      "id": "book-010",
      "title": "The DaVinci Code",
      "authors": ["Dan Brown"],
      "author_keys": ["author-10"],
      "cover_image": "/src/assets/Dan Brown.jpg",
      "rating": 3.92,
      "publication_date": "2003-0-01",
      "isbn": "9785550155189",
      "description": "Langdon joins forces with a gifted French cryptologist, Sophie Neveu, and learns the late curator was involved in the Priory of Sion -- an actual secret society whose members included Sir Isaac Newton, Botticelli, Victor Hugo, and Da Vinci, among others.",
      "genres": ["Fiction", "Mystery Thriller"],
      "subjects": ["Science Fiction", "Thriler", "Adventure"],
      "pages": 489,
      "language": "English",
      "publisher": "Random House Large Print",
      "cover_i": 10029,
      "first_publish_year": 2003
    }
  ]
};

// Helper Functions
const getCoverUrl = (coverId, size = 'S') => 
  coverId ? `/api/covers/${coverId}-${size}.jpg` : '/src/assets/Dark Needs at Nights Edge.png';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


export const searchBooksWithFilters = async (query, filters, page = 1) => {
  try {
    await delay(500);
    
    let filteredBooks = [...mockBooksData.books];
    
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      filteredBooks = filteredBooks.filter(book => 
        book.title.toLowerCase().includes(lowercaseQuery) ||
        book.authors.some(author => author.toLowerCase().includes(lowercaseQuery))
      );
    }

    if (filters) {
      if (filters.publishYear) {
        filteredBooks = filteredBooks.filter(book => 
          book.first_publish_year === parseInt(filters.publishYear)
        );
      }
      if (filters.subject) {
        filteredBooks = filteredBooks.filter(book => 
          book.subjects.some(subject => 
            subject.toLowerCase() === filters.subject.toLowerCase()
          )
        );
      }
    }

    const itemsPerPage = 10;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

    return {
      Response: filteredBooks.length > 0 ? "True" : "False",
      Search: paginatedBooks,
      totalResults: filteredBooks.length,
      currentPage: page,
      totalPages: Math.ceil(filteredBooks.length / itemsPerPage)
    };
  } catch (error) {
    console.error("Error searching books:", error);
    return {
      Response: "False",
      Error: "We are sorry, we can't find your book😢."
    };
  }
};

export const getBookDetails = async (bookId) => {
  try {
    await delay(500);
    const book = mockBooksData.books.find(b => b.id === bookId);
    
    if (!book) {
      throw new Error('Book not found');
    }

    return {
      ...book,
      coverUrl: getCoverUrl(book.cover_i, 'L')
    };
  } catch (error) {
    console.error('Book details error:', error);
    throw new Error('Ops!Failed to fetch book details😢.');
  }
};

export const getAuthorDetails = async (authorKey) => {
  try {
    await delay(500);
    const author = mockAuthors[authorKey];
    
    if (!author) {
      throw new Error('Author not found');
    }

    return author;
  } catch (error) {
    console.error('Author details error:', error);
    throw new Error('Failed to fetch author details😢.');
  }
};

export const getTrendingBooks = async (limit = 10) => {
  try {
    await delay(500);
    const trendingBooks = mockBooksData.books
      .slice(0, limit)
      .map(book => ({
        ...book,
        trending_rank: Math.floor(Math.random() * 100) + 1
      }));

    return trendingBooks;
  } catch (error) {
    console.error('Trending books error:', error);
    throw new Error('An error occurred while searching 😢. Please try again later.');
  }
};


export const getBooksByCategory = async (category, limit = 12) => {
  try {
    await delay(500);
    
    // Validate that the category exists
    const normalizedCategory = category.toLowerCase();
    const validCategory = Object.values(CATEGORIES).includes(normalizedCategory);
    
    if (!validCategory) {
      throw new Error(`Invalid category: ${category}. Valid categories are: ${Object.values(CATEGORIES).join(', ')}`);
    }

    const categoryBooks = mockBooksData.books
      .filter(book => 
        book.genres.some(genre => 
          genre.toLowerCase() === normalizedCategory
        )
      )
      .slice(0, limit)
      .map(book => ({
        id: book.id,
        title: book.title,
        authors: book.authors,
        coverUrl: getCoverUrl(book.cover_i),
        publishYear: book.first_publish_year
      }));

    if (categoryBooks.length === 0) {
      throw new Error(`No books found in category: ${category}`);
    }

    return categoryBooks;
  } catch (error) {
    console.error(`Category ${category} error:`, error);
    throw new Error(`Failed to fetch ${category} books. Please try again another genre.`);
  }
};

export const getBookNotifications = async () => {
  try {
    await delay(500);
    const count = Math.floor(Math.random() * 5) + 3; // Random count between 3 and 7
    
    const notifications = mockBooksData.books.map(book => {
      const isNovel = book.genres.includes('Romance') || book.genres.includes('Horror');
      
      const notificationTypes = [
        `New review for "${book.title}"`,
        `"${book.title}" is now available in paperback`,
        `Author spotlight: "${book.title}"`,
        `Author interview: "${book.title}"`,
        `Bestseller update: "${book.title}"`,
        `Reader theories about "${book.title}"`
      ];

      return {
        id: book.id,
        title: notificationTypes[Math.floor(Math.random() * notificationTypes.length)],
        content: `Check out the latest updates for ${book.title} (${new Date(book.publication_date).getFullYear()})`,
        cover: getCoverUrl(book.cover_i),
        timestamp: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString(),
        media_type: isNovel ? "novel" : "book"
      };
    });

    return notifications
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, count);
  } catch (error) {
    console.error("Cant generate book notifications😢:", error);
    return [];
  }
};

export const formatNotificationTime = (timestamp) => {
  const now = new Date();
  const notificationDate = new Date(timestamp);
  const diffInMilliseconds = now - notificationDate;
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
  } else {
    return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
  }
};

const mockDownloads = {
  "downloads": [
    {
      "id": "dl-039",
      "bookId": "book-039",
      "title": "Dark Needs at Night's Edge",
      "downloadUrl": "/downloads/dark-needs-at-night's-edge.pdf",
      "size": "1.5 MB",
      "progress": 100,
      "status": "completed",
      "downloadDate": "2024-01-15T10:30:00Z",
      "format": "PDF"
    },
    {
      "id": "dl-002",
      "bookId": "book-002",
      "title": "The DaVinci Code",
      "downloadUrl": "/downloads/the-daVinci-code.epub",
      "size": "2.2 MB",
      "progress": 100,
      "status": "completed",
      "downloadDate": "2024-01-20T15:45:00Z",
      "format": "EPUB"
    }
  ],
  "active_downloads": []
};

export const initiateDownload = async (bookId) => {
  try {
    await delay(500);
    const book = mockBooksData.books.find(b => b.id === bookId);
    
    if (!book) {
      throw new Error('Book not found');
    }

    const newDownload = {
      id: `dl-${Date.now()}`,
      bookId: book.id,
      title: book.title,
      downloadUrl: `/downloads/${book.title.toLowerCase().replace(/ /g, '-')}.pdf`,
      size: `${Math.floor(Math.random() * 15 + 5)} MB`,
      progress: 0,
      status: 'downloading',
      downloadDate: new Date().toISOString(),
      format: Math.random() > 0.5 ? 'PDF' : 'EPUB'
    };

    mockDownloads.active_downloads.push(newDownload);

    const progressInterval = setInterval(() => {
      newDownload.progress += 10;
      if (newDownload.progress >= 100) {
        clearInterval(progressInterval);
        newDownload.status = 'completed';
        mockDownloads.downloads.push({...newDownload});
        mockDownloads.active_downloads = mockDownloads.active_downloads.filter(
          d => d.id !== newDownload.id
        );
      }
    }, 1000);

    return newDownload;
  } catch (error) {
    console.error('Download initiation error:', error);
    throw new Error('Failed to start download😢.');
  }
};

export const getDownloadHistory = async () => {
  try {
    await delay(500);
    return {
      completed: mockDownloads.downloads,
      active: mockDownloads.active_downloads
    };
  } catch (error) {
    console.error('Download history error:', error);
    throw new Error('Failed to fetch download history😢.');
  }
};

export const getDownloadProgress = async (downloadId) => {
  try {
    await delay(200);
    const activeDownload = mockDownloads.active_downloads.find(d => d.id === downloadId);
    if (activeDownload) {
      return {
        id: activeDownload.id,
        progress: activeDownload.progress,
        status: activeDownload.status
      };
    }
    const completedDownload = mockDownloads.downloads.find(d => d.id === downloadId);
    if (completedDownload) {
      return {
        id: completedDownload.id,
        progress: 100,
        status: 'completed'
      };
    }
    throw new Error('Download not found');
  } catch (error) {
    console.error('Download progress error:', error);
    throw new Error('Failed to fetch download progress😢.');
  }
};

export const cancelDownload = async (downloadId) => {
  try {
    await delay(300);
    mockDownloads.active_downloads = mockDownloads.active_downloads.filter(
      d => d.id !== downloadId
    );
    return { success: true, message: 'Download cancelled successfully' };
  } catch (error) {
    console.error('Cancel download error:', error);
    throw new Error('Failed to cancel download😢.');
  }
};

export const getCategories = () => CATEGORIES;