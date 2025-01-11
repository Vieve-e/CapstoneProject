import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "./Footer";
import { getBookDetails } from "../services/api";
import {
  FaStar,
  FaCalendar,
  FaHeart,
  FaUser,
} from "react-icons/fa";
import "../index.css";

const BookDetails = () => {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchBookDetails = async () => {
        try {
          setLoading(true);
          const details = await getBookDetails(id);
          
          if (!details) {
            throw new Error("Book details not found");
          }
      
          setBook(details);
      
          try {
            const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
            setIsFavorite(favorites.some((item) => item.id === details.id));
          } catch (localStorageError) {
            console.error("Error accessing favorites:", localStorageError);
            setIsFavorite(false);
          }
      
        } catch (error) {
          console.error("Error fetching book details:", error);
          setError(error.message || "Failed to fetch book details");
        } finally {
          setLoading(false);
        }
      };

    fetchBookDetails();
  }, [id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isFavorite) {
      const updatedFavorites = favorites.filter((item) => item.id !== book.id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      favorites.push(book);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
    setIsFavorite(!isFavorite);
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (error) return <div className="text-center mt-20 text-red-500">{error}</div>;
  if (!book) return <div className="text-center mt-20">No book details found</div>;

  const releaseDate = book.publication_date;
  const categoryColors = [
    "bg-blue-600",
    "bg-green-600",
    "bg-yellow-600",
    "bg-red-600",
    "bg-indigo-600",
  ];

  return (
    <div className="flex flex-col min-h-screen bg-theme-adaptive">
    
      <main className="flex-grow pt-12">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <img
                src={book.cover_image || "/placeholder.png"}
                alt={book.title}
                className="w-full rounded-lg shadow-md"
              />
            </div>
            <div className="md:col-span-2">
              <div className="mb-4">
                <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
                <button
                  onClick={toggleFavorite}
                  className={`btn btn-circle ${
                    isFavorite ? "text-red-500" : "text-gray-400"
                  }`}
                >
                  <FaHeart className="text-2xl" />
                </button>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-2 rounded-full text-sm font-bold bg-purple-600 text-white">
                  Book
                </span>
                <div className="flex items-center">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span className="font-bold">{book.rating?.toFixed(1)}</span>
                </div>
              </div>
              <div className="mb-6">
                {book.genres?.map((genre, index) => (
                  <span
                    key={index}
                    className={`inline-block px-3 py-2 mr-2 mb-2 text-sm font-bold text-white rounded-full ${
                      categoryColors[index % categoryColors.length]
                    }`}
                  >
                    {genre}
                  </span>
                ))}
              </div>
              <p className="text-lg mb-6">{book.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <FaCalendar className="mr-2 text-gray-400" />
                  <span className="font-semibold mr-2">Publication Date:</span>
                  <span>{new Date(releaseDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <FaUser className="mr-2 text-gray-400" />
                  <span className="font-semibold mr-2">Author(s):</span>
                  <span>{book.authors?.join(", ")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookDetails;
