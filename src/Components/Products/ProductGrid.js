// ProductGrid.js
import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import ProductCard from "./ProductCard";
import { FiFilter, FiSearch, FiChevronDown } from "react-icons/fi";

const ProductGrid = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const filters = ["All", "Course", "Book", "Exam", "Exercise", "Guide"];
  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  // Helper function to map difficulty levels
  const mapDifficulty = (niveau) => {
    const levels = {
      Débutant: "Beginner",
      Intermédiaire: "Intermediate",
      Avancé: "Advanced",
    };
    return levels[niveau] || niveau;
  };

  // Fetch data from API endpoints using Axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch from all endpoints concurrently
        const [exercisesRes, coursesRes, examsRes] = await Promise.all([
          axios.get("http://localhost:8084/api/exercices"),
          axios.get("http://localhost:8084/api/cours"),
          axios.get("http://localhost:8084/api/examens"),
        ]);

        // Map API data to consistent product format
        // In ProductGrid.js - Update the mappedProducts section
        const mappedProducts = [
          ...coursesRes.data.map((course) => ({
            id: course._id,
            title: course.titre,
            description: course.description || "No description available", // Add this line
            type: "Course",
            category: course.module || "Computer Science",
            difficulty: mapDifficulty(course.niveau) || "Intermediate",
            rating: course.ratingAvg?.$numberLong
              ? parseFloat(course.ratingAvg.$numberLong)
              : 4.0,
            duration: course.duration ? `${course.duration} min` : "N/A",
            image:
              course.imageUrl ||
              "https://via.placeholder.com/300x200?text=Course",
            reviews: course.reviewCount || 0,
            fichierId: course.fichierId || null, // Add this line
          })),
          ...exercisesRes.data.map((exercise) => ({
            id: exercise._id,
            title: exercise.titre,
            description: exercise.description || "No description available", // Add this line
            type: "Exercise",
            category: exercise.module || "Programming",
            difficulty: mapDifficulty(exercise.niveau) || "Beginner",
            rating: exercise.ratingAvg?.$numberLong
              ? parseFloat(exercise.ratingAvg.$numberLong)
              : 4.5,
            duration: exercise.problemCount
              ? `${exercise.problemCount} problems`
              : "N/A",
            image:
              exercise.imageUrl ||
              "https://via.placeholder.com/300x200?text=Exercise",
            reviews: exercise.reviewCount || 0,
            fichierId: exercise.fichierId || null, // Add this line
          })),
          ...examsRes.data.map((exam) => ({
            id: exam._id,
            title: exam.titre,
            description: exam.description || "No description available", // Add this line
            type: "Exam",
            category: exam.module || "Testing",
            difficulty: mapDifficulty(exam.niveau) || "Advanced",
            rating: exam.ratingAvg?.$numberLong
              ? parseFloat(exam.ratingAvg.$numberLong)
              : 3.8,
            duration: exam.timeLimit ? `${exam.timeLimit} min` : "N/A",
            image:
              exam.imageUrl || "https://via.placeholder.com/300x200?text=Exam",
            reviews: exam.reviewCount || 0,
            fichierId: exam.fichierId || null, // Add this line
          })),
        ];

        setProducts(mappedProducts);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch data");
        setLoading(false);
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  // Filter products based on search and filters
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      selectedFilter === "All" || product.type === selectedFilter;
    const matchesDifficulty =
      selectedDifficulty === "All" || product.difficulty === selectedDifficulty;

    return matchesSearch && matchesType && matchesDifficulty;
  });

  const handleCardSelect = (productId) => {
    setSelectedProductId(selectedProductId === productId ? null : productId);
  };

  return (
    <div className="bg-gray-950 py-12 px-4 md:px-8">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
            Explore Learning Resources
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover a wide range of courses, books, and resources to enhance
            your skills and knowledge
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-900 rounded-lg p-4 border border-white/10">
            {/* Search input */}
            <div className="relative flex-1 w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FiSearch className="text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Search for resources..."
                className="w-full bg-gray-800 text-white border border-white/10 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter buttons */}
            <div className="flex items-center space-x-2 w-full md:w-auto">
              <div className="relative">
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="flex items-center space-x-2 bg-gray-800 text-gray-300 hover:text-white px-4 py-2 rounded-lg border border-white/10 transition-colors"
                >
                  <FiFilter />
                  <span>Filters</span>
                  <FiChevronDown
                    className={`transition-transform duration-300 ${
                      filterOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {filterOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg z-50 border border-white/10 p-4">
                    <div className="mb-4">
                      <h4 className="text-gray-300 font-medium mb-2">Type</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {filters.map((filter) => (
                          <button
                            key={filter}
                            className={`px-3 py-1 rounded-md text-sm ${
                              selectedFilter === filter
                                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            }`}
                            onClick={() => setSelectedFilter(filter)}
                          >
                            {filter}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-gray-300 font-medium mb-2">
                        Difficulty
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {difficulties.map((difficulty) => (
                          <button
                            key={difficulty}
                            className={`px-3 py-1 rounded-md text-sm ${
                              selectedDifficulty === difficulty
                                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            }`}
                            onClick={() => setSelectedDifficulty(difficulty)}
                          >
                            {difficulty}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="col-span-3 text-center py-12">
            <p className="text-gray-400 text-lg">Loading resources...</p>
          </div>
        )}

        {error && (
          <div className="col-span-3 text-center py-12">
            <p className="text-red-500 text-lg">Error: {error}</p>
            <p className="text-gray-400 mt-2">Please try again later</p>
          </div>
        )}

        {/* Product Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isSelected={selectedProductId === product.id}
                  onSelect={handleCardSelect}
                />
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-400 text-lg">
                  No results found. Try adjusting your search or filters.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
