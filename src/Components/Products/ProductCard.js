// ProductCard.js
import React from "react";
import axios from "axios";
import {
  FiClock,
  FiUser,
  FiBookOpen,
  FiAward,
  FiStar,
  FiDownload,
} from "react-icons/fi";

const ProductCard = ({ product, isSelected, onSelect }) => {
  const getBadgeColor = () => {
    switch (product.difficulty.toLowerCase()) {
      case "beginner":
        return "bg-green-600 text-white";
      case "intermediate":
        return "bg-amber-500 text-white";
      case "advanced":
        return "bg-red-600 text-white";
      default:
        return "bg-slate-500 text-white";
    }
  };

  const getTypeIcon = () => {
    switch (product.type.toLowerCase()) {
      case "course":
        return <FiBookOpen className="mr-1" />;
      case "book":
        return <FiBookOpen className="mr-1" />;
      case "exam":
        return <FiClock className="mr-1" />;
      case "exercise":
        return <FiUser className="mr-1" />;
      case "guide":
        return <FiAward className="mr-1" />;
      default:
        return null;
    }
  };

  const getRandomColor = () => {
    const colors = [
      "bg-blue-600",
      "bg-purple-600",
      "bg-indigo-600",
      "bg-pink-600",
      "bg-teal-600",
      "bg-amber-600",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleClick = () => {
    onSelect(product.id);
  };

  const handleDownload = async (e) => {
    e.stopPropagation(); // Prevent card selection when downloading

    if (!product.fichierId) {
      alert("No file available for download");
      return;
    }

    try {
      let endpoint;
      switch (product.type.toLowerCase()) {
        case "course":
          endpoint = "cours";
          break;
        case "exam":
          endpoint = "examens";
          break;
        case "exercise":
          endpoint = "exercices";
          break;
        default:
          endpoint = "cours";
      }

      const response = await axios.get(
        `http://localhost:8084/api/${endpoint}/fichier/${product.fichierId}`,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.download = `${product.title || "resource"}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download error:", err);
      alert(
        `Failed to download file: ${
          err.response?.data?.message || "File not available"
        }`
      );
    }
  };

  return (
    <div
      className="relative shadow-md rounded-xl overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      <div
        className={`bg-gray-900 border border-gray-800 rounded-xl transition-all duration-300 ${
          isSelected ? "shadow-xl transform scale-95" : ""
        }`}
      >
        {/* Color background area */}
        <div className={`relative h-48 ${getRandomColor()}`}>
          {/* Category badge */}
          <div className="absolute top-3 left-3 z-20">
            <span className="px-3 py-1 rounded-full text-xs bg-gray-900/80 text-gray-200 border border-gray-700">
              {product.category}
            </span>
          </div>

          {/* Difficulty badge */}
          <div className="absolute top-3 right-3 z-20">
            <span
              className={`px-3 py-1 rounded-full text-xs ${getBadgeColor()}`}
            >
              {product.difficulty}
            </span>
          </div>

          {/* Download button - always visible if file exists */}
          {product.fichierId && (
            <button
              onClick={handleDownload}
              className="absolute bottom-3 right-3 z-20 bg-white/90 hover:bg-white text-gray-900 rounded-full p-2 shadow-lg transition-all hidden md:block"
              title="Download resource"
            >
              <FiDownload className="text-lg" />
            </button>
          )}

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent z-10">
            <h3
              className={`text-xl font-bold text-white ${
                isSelected ? "text-blue-400" : ""
              }`}
            >
              {product.title}
            </h3>
          </div>
        </div>

        <div className="p-6">
          {/* Product Type */}
          <div className="flex items-center mb-2">
            <span className="text-sm flex items-center font-medium text-blue-400">
              {getTypeIcon()} {product.type}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {product.description || "No description available"}
          </p>

          {/* Rating and Duration */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-lg ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400"
                        : "text-gray-700"
                    }`}
                  >
                    <FiStar
                      className={`${
                        i < Math.floor(product.rating) ? "fill-current" : ""
                      }`}
                    />
                  </span>
                ))}
              </div>
              <span className="ml-2 text-gray-500 text-sm">
                ({product.reviews})
              </span>
            </div>
            <span className="text-gray-400 text-sm flex items-center">
              <FiClock className="mr-1" /> {product.duration}
            </span>
          </div>

          {/* Download button for mobile */}
          {product.fichierId && (
            <button
              onClick={handleDownload}
              className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 md:hidden"
            >
              <FiDownload /> Download Resource
            </button>
          )}

          {/* Simple action indicator that appears on click */}
          {isSelected && (
            <div className="mt-4 text-center py-2 bg-blue-500/10 rounded-md">
              <span className="text-blue-400 font-medium">View Details →</span>
            </div>
          )}
        </div>
      </div>

      {/* Simple shadow effect on click */}
      {isSelected && (
        <div className="absolute inset-0 rounded-xl border-2 border-blue-500/30 -z-10"></div>
      )}
    </div>
  );
};

export default ProductCard;
