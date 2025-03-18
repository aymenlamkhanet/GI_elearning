// ProductCard.js
import React from "react";
import { FiClock, FiUser, FiBookOpen, FiAward, FiStar } from "react-icons/fi";

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

  const handleClick = () => {
    onSelect(product.id);
  };

  return (
    <div 
      className="relative shadow-md rounded-xl overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      <div className={`bg-gray-900 border border-gray-800 rounded-xl transition-all duration-300 ${isSelected ? "shadow-xl transform scale-95" : ""}`}>
        {/* Image area */}
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60 z-10"></div>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-cover"
          />

          {/* Simple shadow effect on click */}
          {isSelected && (
            <div className="absolute inset-0 bg-blue-500/20 z-20 animate-pulse"></div>
          )}

          {/* Category badge */}
          <div className="absolute top-3 left-3 z-20">
            <span className="px-3 py-1 rounded-full text-xs bg-gray-900 text-gray-200 border border-gray-700">
              {product.category}
            </span>
          </div>

          {/* Difficulty badge */}
          <div className="absolute top-3 right-3 z-20">
            <span className={`px-3 py-1 rounded-full text-xs ${getBadgeColor()}`}>
              {product.difficulty}
            </span>
          </div>
        </div>

        <div className="p-6">
          {/* Product Type */}
          <div className="flex items-center mb-2">
            <span className="text-sm flex items-center font-medium text-blue-400">
              {getTypeIcon()} {product.type}
            </span>
          </div>

          {/* Title */}
          <h3 className={`text-xl font-bold text-white mb-3 ${isSelected ? "text-blue-400" : ""}`}>
            {product.title}
          </h3>

          {/* Rating and Duration */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-lg ${
                      i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-700"
                    }`}
                  >
                    <FiStar className={`${i < Math.floor(product.rating) ? "fill-current" : ""}`} />
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

          {/* Simple action indicator that appears on click */}
          {isSelected && (
            <div className="mt-4 text-center py-2 bg-blue-500/10 rounded-md">
              <span className="text-blue-400 font-medium">
                View Details →
              </span>
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