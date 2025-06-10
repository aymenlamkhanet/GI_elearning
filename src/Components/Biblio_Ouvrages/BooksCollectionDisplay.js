import React, { useState, useEffect } from "react";
import { FaDownload, FaBookOpen, FaSearch, FaSpinner } from "react-icons/fa";
import Navbar from "../Products/Navbar";
import FooterSection from "../LandingPage/FooterSection";

// API configuration
const SUBJECT_MAP = {
  math: "mathematics",
  physics: "physics",
  chimie: "chemistry",
  info: "computer_science",
  si: "engineering",
};

const API_BASE = "https://openlibrary.org/search.json";
const COVER_BASE = "https://covers.openlibrary.org/b/id/";
// Download library URL
const DOWNLOAD_BASE = "https://1lib.sk/s/";

const BooksCollectionDisplay = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    subject: "",
    level: "",
  });

  // Fetch books from Open Library API
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const collectionsData = await Promise.all(
          Object.entries(SUBJECT_MAP).map(async ([key, subject]) => {
            const response = await fetch(
              `${API_BASE}?subject=${subject}&limit=5`
            );
            const data = await response.json();

            return {
              id: key,
              title: `Collection "${subject.replace("_", " ")}"`,
              books: data.docs.map((book) => ({
                id: book.key,
                title: book.title,
                subject: key,
                level: "all", // Not available in API, keeping static
                author: book.author_name?.[0] || "Unknown",
                year: book.first_publish_year || "N/A",
                coverId: book.cover_i,
                ratings: book.ratings_average || 0,
                editions: book.edition_count || 1,
                // Create a download URL that searches for the book title on 1lib.sk
                downloadUrl: `${DOWNLOAD_BASE}${encodeURIComponent(
                  book.title
                )}`,
              })),
            };
          })
        );

        setCollections(collectionsData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  // Filter function
  const filterBooks = (book) => {
    const searchMatch =
      filters.search === "" ||
      book.title.toLowerCase().includes(filters.search.toLowerCase());

    const subjectMatch =
      filters.subject === "" || book.subject === filters.subject;

    const levelMatch = filters.level === "" || book.level === filters.level;

    return searchMatch && subjectMatch && levelMatch;
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Get unique subjects from collections
  const allSubjects = Object.keys(SUBJECT_MAP);

  // Available levels (static since API doesn't provide this)
  const allLevels = ["all", "beginner", "intermediate", "advanced"];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        {/* Search and filter section */}
        <div className="mb-10 bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 shadow-lg">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
              Academic Book Collections
            </h1>
            <p className="text-gray-400 mt-2">
              Browse our curated collections of academic books by subject
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search input */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="search"
                placeholder="Search by title..."
                value={filters.search}
                onChange={handleFilterChange}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Subject filter */}
            <div>
              <select
                name="subject"
                value={filters.subject}
                onChange={handleFilterChange}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Subjects</option>
                {allSubjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject.charAt(0).toUpperCase() + subject.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Level filter */}
            <div>
              <select
                name="level"
                value={filters.level}
                onChange={handleFilterChange}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Levels</option>
                {allLevels.map((level) => (
                  <option key={level} value={level}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Collections */}
        {collections.map((collection) => {
          const filteredBooks = collection.books.filter(filterBooks);

          if (filteredBooks.length === 0) return null;

          return (
            <div key={collection.id} className="mb-16">
              <div className="mb-8 relative">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                  {collection.title}
                </h2>
                <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 w-40" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {filteredBooks.map((book) => (
                  <div
                    key={book.id}
                    className="group relative transition-all duration-500 transform"
                  >
                    <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 shadow-lg transition-all duration-500 h-full group-hover:border-purple-500/50">
                      {/* Book cover */}
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900/90 z-10" />
                        {book.coverId ? (
                          <img
                            src={`${COVER_BASE}${book.coverId}-L.jpg`}
                            alt={book.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                            <FaBookOpen className="text-3xl text-gray-500" />
                          </div>
                        )}

                        {/* Download button (appears on hover) */}
                        <a
                          href={book.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute bottom-4 right-4 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                          title={`Find "${book.title}" on 1lib.sk`}
                        >
                          <FaDownload className="text-lg" />
                        </a>
                      </div>

                      {/* Book info */}
                      <div className="p-4 z-20 relative">
                        <h3 className="text-sm font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                          {book.title}
                        </h3>
                        <div className="text-xs text-gray-400 mb-3 space-y-1">
                          <p className="truncate">Author: {book.author}</p>
                          <p>Published: {book.year}</p>
                          <div className="flex justify-between">
                            <span>⭐ {book.ratings.toFixed(1)}</span>
                            <span>Editions: {book.editions}</span>
                          </div>
                        </div>

                        {/* Subject and Level */}
                        <div className="flex justify-between text-xs">
                          <span className="bg-blue-500/80 px-2 py-1 rounded-full">
                            {book.subject}
                          </span>
                          <span className="bg-gray-700/80 px-2 py-1 rounded-full">
                            {book.level.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <FooterSection />
    </div>
  );
};

export default BooksCollectionDisplay;


