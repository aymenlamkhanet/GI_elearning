import React from "react";
import Navbar from "../Products/Navbar";
import FooterSection from "../LandingPage/FooterSection";
import microsoft from "./microsoft-logo-svgrepo-com.svg";
import sisco from "./cisco-svgrepo-com.svg";
import orange from "./Orange_S.A.-Logo.wine.png";

const Partenaires = () => {
  const partenaires = [
    {
      name: "Microsoft",
      role: "Partenaire Technologique",
      description:
        "Collaboration stratégique dans le développement de solutions cloud et IA",
      image: microsoft,
      website: "https://microsoft.com",
    },
    {
      name: "Orange ",
      role: "Partenaire Technologique",
      description:
        "Collaboration stratégique dans le développement de solutions cloud et IA",
      image: orange,
      website: "https://www.orange.fr/portail",
    },
    {
      name: "Cisco",
      role: "Partenaire Réseaux",
      description:
        "Partenaire officiel pour les certifications réseau et infrastructure",
      image: sisco,
      website: "https://cisco.com",
    },
    // Add more partners as needed
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 min-h-screen">
      <Navbar />

      <div className="pt-32 pb-32 px-4 min-h-screen">
        <div className="container mx-auto">
          {/* Header Section */}
          <div className="text-center mb-20">
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-400 mb-6">
              Nos Partenaires
            </h1>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto">
              Des collaborations stratégiques qui renforcent notre écosystème
              d'apprentissage
            </p>
          </div>

          {/* Partners Grid */}
          <div className="flex justify-center">
            <div
              className={`grid gap-12 ${
                partenaires.length === 1
                  ? "max-w-2xl"
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {partenaires.map((partenaire, index) => (
                <div key={index} className="group relative">
                  {/* Glow effect container */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

                  {/* Card container */}
                  <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 h-full transform transition-all duration-300 hover:scale-105">
                    {/* Partner logo */}
                    <div className="mb-8 flex justify-center">
                      <div className="p-4 bg-white rounded-2xl w-48 h-48 flex items-center justify-center">
                        <img
                          src={partenaire.image}
                          alt={partenaire.name}
                          className="w-32 h-32 object-contain transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                    </div>

                    {/* Partner details */}
                    <h3 className="text-2xl font-bold text-white text-center mb-2">
                      {partenaire.name}
                    </h3>
                    <p className="text-blue-300 text-center text-lg mb-4">
                      {partenaire.role}
                    </p>
                    <p className="text-gray-400 text-center mb-6">
                      {partenaire.description}
                    </p>

                    {/* Visit website button */}
                    <div className="text-center">
                      <a
                        href={partenaire.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all"
                      >
                        Visiter le site
                        <svg
                          className="w-4 h-4 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Single partner message */}
          {partenaires.length === 1 && (
            <div className="text-center mt-16">
              <p className="text-gray-400 text-xl">
                Nous développons activement de nouveaux partenariats pour
                enrichir votre expérience d'apprentissage.
              </p>
            </div>
          )}
        </div>
      </div>

      <FooterSection />
    </div>
  );
};

export default Partenaires;
