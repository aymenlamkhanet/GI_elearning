import React from "react";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="group relative bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-white/10 transition-all duration-300 hover:-translate-y-2 overflow-hidden backdrop-blur-md bg-opacity-80">
      {/* Background decoration */}
      <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full group-hover:scale-150 transition-all duration-500 opacity-50"></div>
      <div className="absolute right-12 bottom-12 w-8 h-8 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full group-hover:scale-150 transition-all duration-700 delay-100 opacity-50"></div>

      {/* Content */}
      <div className="relative z-10">
        <div className="text-blue-400 mb-4 bg-gray-700/50 inline-flex p-3 rounded-xl group-hover:bg-gray-700 transition-all duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 text-gray-200 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
          {title}
        </h3>
        <p className="text-gray-400">{description}</p>

        {/* Hover show more indicator */}
        <div className="mt-4 flex items-center text-blue-400 font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <span>Learn more</span>
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
