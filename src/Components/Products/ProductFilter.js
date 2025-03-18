import React, { useState } from "react";
import { FiFilter, FiX } from "react-icons/fi";

const ProductFilter = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = [
    { id: "all", label: "All Resources" },
    { id: "courses", label: "Courses" },
    { id: "exercises", label: "Exercises" },
    { id: "exams", label: "Exams" },
    { id: "books", label: "Books" },
    { id: "guides", label: "Guides" },
  ];

  return (
    <div className="mb-8">
      {/* Filter button for mobile */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center justify-between w-full px-4 py-3 bg-gray-800 rounded-xl border border-white/10 text-gray-200"
        >
          <div className="flex items-center">
            <FiFilter className="mr-2 text-blue-400" />
            <span>Filter by Category</span>
          </div>
          <span className="text-blue-400 bg-gray-700 px-2 py-1 rounded-lg text-sm">
            {selectedCategory === "all"
              ? "All"
              : categories.find((c) => c.id === selectedCategory)?.label}
          </span>
        </button>

        {isFilterOpen && (
          <div className="mt-2 bg-gray-800 rounded-xl border border-white/10 p-2 shadow-lg shadow-purple-500/10">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setIsFilterOpen(false);
                }}
                className={`w-full text-left px-4 py-3 mb-1 rounded-lg transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "bg-gray-700/50 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop filter */}
      <div className="hidden md:flex items-center space-x-3 overflow-x-auto pb-4">
        <div className="flex px-2 py-1 bg-gray-800/50 rounded-full border border-white/10 backdrop-blur-sm">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full capitalize transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-500/20"
                  : "bg-transparent text-gray-300 hover:bg-gray-700/50 hover:text-white"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active filters indicator */}
      {selectedCategory !== "all" && (
        <div className="flex items-center mt-4">
          <span className="text-gray-400 mr-2">Active filters:</span>
          <div className="flex items-center bg-gray-800 rounded-full px-3 py-1 text-sm text-blue-400 border border-white/10">
            {categories.find((c) => c.id === selectedCategory)?.label}
            <button
              onClick={() => setSelectedCategory("all")}
              className="ml-2 text-gray-400 hover:text-white"
            >
              <FiX size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFilter;
