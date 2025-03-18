import React from "react";
import { FaInfoCircle, FaFire, FaUsers, FaClock } from "react-icons/fa";

const RecommendationCards = () => {
  const cards = [
    {
      title: "Nouveautés",
      icon: <FaInfoCircle className="text-blue-400" />,
      description: "Découvrez nos ressources les plus récentes",
      link: "#nouveautes",
    },
    {
      title: "Conseils",
      icon: <FaFire className="text-pink-500" />,
      description: "Astuces et recommandations d'experts",
      link: "#conseils",
    },
    {
      title: "Membres",
      icon: <FaUsers className="text-purple-400" />,
      description: "Rejoignez notre communauté d'apprenants",
      link: "#membres",
    },
    {
      title: "Concours",
      icon: <FaClock className="text-blue-500" />,
      description: "Participez à nos défis et compétitions",
      link: "#concours",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-12">
      {cards.map((card, index) => (
        <a
          key={index}
          href={card.link}
          className="group relative bg-gray-900 rounded-2xl border border-white/10 overflow-hidden transition-all duration-500 hover:border-purple-500/50"
        >
          {/* Background glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Animated corner accent */}
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rotate-45 opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>

          {/* Content */}
          <div className="relative z-10 p-8">
            <div className="flex flex-col items-center text-center">
              {/* Icon with glow effect */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative text-6xl transform transition-transform duration-500 group-hover:scale-110">
                  {card.icon}
                </div>
              </div>

              {/* Title with gradient effect */}
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 mb-3">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-4 opacity-70 group-hover:opacity-100 transition-opacity">
                {card.description}
              </p>

              {/* Arrow indicator */}
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 group-hover:bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="text-white">→</span>
              </div>
            </div>
          </div>

          {/* Animated border glow */}
          <div className="absolute inset-0 border border-white/0 group-hover:border-purple-500/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-95"></div>
        </a>
      ))}
    </div>
  );
};

export default RecommendationCards;
