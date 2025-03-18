
// ProductGrid.js
import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { FiFilter, FiSearch, FiChevronDown } from "react-icons/fi";
import img from "./imgs/download.jpeg";

const ProductGrid = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedProductId, setSelectedProductId] = useState(null);

  const products = [
    {
      id: 1,
      title: "Advanced Algorithms",
      type: "Course",
      category: "Computer Science",
      difficulty: "Advanced",
      rating: 4.5,
      duration: "6h 30m",
      image: img,
      reviews: 42,
    },
    {
      id: 2,
      title: "Web Development Basics",
      type: "Course",
      category: "Frontend",
      difficulty: "Beginner",
      rating: 4.8,
      duration: "8h 15m",
      image: "/images/course2.jpg",
      reviews: 38,
    },
    {
      id: 3,
      title: "Database Systems",
      type: "Book",
      category: "Backend",
      difficulty: "Intermediate",
      rating: 4.2,
      duration: "320 pages",
      image: "/images/book1.jpg",
      reviews: 25,
    },
    {
      id: 4,
      title: "Machine Learning Exam",
      type: "Exam",
      category: "AI",
      difficulty: "Advanced",
      rating: 4.0,
      duration: "2h 00m",
      image: "/images/exam1.jpg",
      reviews: 18,
    },
    {
      id: 5,
      title: "Python Exercises",
      type: "Exercise",
      category: "Programming",
      difficulty: "Beginner",
      rating: 4.6,
      duration: "50 problems",
      image: "/images/exercise1.jpg",
      reviews: 56,
    },
    {
      id: 6,
      title: "System Design Guide",
      type: "Guide",
      category: "Architecture",
      difficulty: "Intermediate",
      rating: 4.7,
      duration: "4h 45m",
      image: "/images/guide1.jpg",
      reviews: 33,
    },
  ];

  const filters = ["All", "Course", "Book", "Exam", "Exercise", "Guide"];
  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

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
    // If the same card is clicked again, unselect it
    if (selectedProductId === productId) {
      setSelectedProductId(null);
    } else {
      // Otherwise select the new card (and unselect the previous one)
      setSelectedProductId(productId);
    }
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

        {/* Product Grid */}
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
      </div>
    </div>
  );
};

export default ProductGrid;