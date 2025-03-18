import React from "react";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-indigo-50 transition-all duration-300 hover:-translate-y-2 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-indigo-50 rounded-full group-hover:scale-150 transition-all duration-500 opacity-50"></div>
      <div className="absolute right-12 bottom-12 w-8 h-8 bg-indigo-100 rounded-full group-hover:scale-150 transition-all duration-700 delay-100 opacity-50"></div>

      {/* Content */}
      <div className="relative z-10">
        <div className="text-indigo-600 mb-4 bg-indigo-50 inline-flex p-3 rounded-xl group-hover:bg-indigo-100 transition-all duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 group-hover:text-indigo-600 transition-all duration-300">
          {title}
        </h3>
        <p className="text-gray-600">{description}</p>

        {/* Hover show more indicator */}
        <div className="mt-4 flex items-center text-indigo-500 font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
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
