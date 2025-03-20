import React, { useState, useEffect } from "react";
import { FiSearch, FiBookOpen, FiArrowRight, FiFilter } from "react-icons/fi";
import Navbar from "../Products/Navbar";
import FooterSection from "../LandingPage/FooterSection";

const ConcoursPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFiliere, setActiveFiliere] = useState("all");
  const [filteredData, setFilteredData] = useState([]);

  const concoursData = [
    {
      filiere: "MP",
      concours: [
        {
          name: "Concours X-relytechnique",
          matieres: [
            "Mathématiques",
            "Physique",
            "Sciences de l'ingénieur",
            "Informations",
          ],
        },
      ],
    },
    {
      filiere: "PSI",
      concours: [
        {
          name: "Concours Centrale-Supelec",
          matieres: [
            "Mathématiques",
            "Physique",
            "Sciences de l'ingénieur",
            "Informations",
          ],
        },
      ],
    },
    {
      filiere: "TSI",
      concours: [
        {
          name: "Concours Mines-Ponts",
          matieres: [
            "Mathématiques",
            "Physique",
            "Sciences de l'ingénieur",
            "Informations",
          ],
        },
      ],
    },
    {
      filiere: "Autre",
      concours: [
        {
          name: "Concours CNC",
          matieres: [
            "Mathématiques",
            "Physique",
            "Sciences de l'ingénieur",
            "Informations",
          ],
        },
        {
          name: "Concours CC-INP",
          matieres: [
            "Mathématiques",
            "Physique",
            "Sciences de l'ingénieur",
            "Informations",
          ],
        },
        {
          name: "Concours S3A",
          matieres: [
            "Mathématiques",
            "Physique",
            "Sciences de l'ingénieur",
            "Informations",
          ],
        },
      ],
    },
  ];

  // Add filiere property to the last item if missing
  const normalizedData = concoursData.map((section) => {
    if (!section.filiere) {
      return { ...section, filiere: "Autre" };
    }
    return section;
  });

  // Filter data based on search term and active filiere
  useEffect(() => {
    let results = [...normalizedData];

    // Filter by filiere if not "all"
    if (activeFiliere !== "all") {
      results = results.filter((section) => section.filiere === activeFiliere);
    }

    // Filter by search term
    if (searchTerm) {
      results = results
        .map((section) => {
          const filteredConcours = section.concours.filter(
            (concours) =>
              concours.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              concours.matieres.some((matiere) =>
                matiere.toLowerCase().includes(searchTerm.toLowerCase())
              )
          );

          if (filteredConcours.length > 0) {
            return {
              ...section,
              concours: filteredConcours,
            };
          }
          return null;
        })
        .filter(Boolean);
    }

    setFilteredData(results);
  }, [searchTerm, activeFiliere]);

  // Get unique filieres for filter buttons
  const filieres = [
    "all",
    ...new Set(normalizedData.map((item) => item.filiere)),
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-950 text-gray-200 p-6">
        {/* Hero Section */}
        <div className="mb-16 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Bibliothèque de Concours
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            Explorez notre collection complète de concours pour toutes les
            filières préparatoires
          </p>

          {/* Search and Filter Container */}
          <div className="relative bg-gray-900/60 backdrop-blur-md rounded-2xl border border-white/10 p-6 shadow-lg shadow-purple-500/5">
            {/* Animated Gradient Border Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-sm -z-10"></div>

            {/* Search Bar */}
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <FiSearch className="w-5 h-5 text-blue-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher par nom de concours ou matière..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-gray-800/50 rounded-xl border border-white/10 focus:outline-none
          focus:ring-2 focus:ring-blue-500/50 transition-all placeholder-gray-500"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center justify-center flex-wrap gap-2">
              <div className="flex items-center mr-2 text-gray-400">
                <FiFilter className="mr-2" /> Filtrer:
              </div>
              {filieres.map((filiere, index) => (
                <button
                  key={index}
                  onClick={() => setActiveFiliere(filiere)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all
            ${
              activeFiliere === filiere
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md shadow-purple-500/20"
                : "bg-gray-800/60 text-gray-400 hover:bg-gray-800 hover:text-gray-200"
            }`}
                >
                  {filiere === "all"
                    ? "Toutes les filières"
                    : `Filière ${filiere}`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-medium">
              <span className="text-blue-400">
                {filteredData.reduce(
                  (acc, section) => acc + section.concours.length,
                  0
                )}
              </span>{" "}
              concours trouvés
            </h2>
          </div>
        </div>

        {/* Concours Grid */}
        <div className="max-w-7xl mx-auto space-y-12">
          {filteredData.length > 0 ? (
            filteredData.map((section, index) => (
              <div key={index} className="relative">
                {/* Filière Title */}
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mr-4 shadow-lg shadow-purple-500/20">
                    <FiBookOpen className="text-white w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    Filière {section.filiere}
                  </h2>
                </div>

                {/* Concours Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.concours.map((concour, idx) => (
                    <div
                      key={idx}
                      className="group relative bg-gray-900/30 rounded-xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10"
                    >
                      {/* Hover effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                      {/* Purple accent line */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>

                      <div className="p-6 relative z-10">
                        <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all">
                          {concour.name}
                        </h3>

                        <div className="grid grid-cols-2 gap-3 mb-6">
                          {concour.matieres.map((matiere, i) => (
                            <div
                              key={i}
                              className="flex items-center space-x-2 text-gray-400 group-hover:text-gray-300 transition-colors"
                            >
                              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                              <span className="text-sm">{matiere}</span>
                            </div>
                          ))}
                        </div>

                        <button className="mt-2 flex items-center text-sm font-medium text-blue-400 opacity-0 group-hover:opacity-100 transition-all">
                          Voir les détails
                          <FiArrowRight className="ml-2 h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4 opacity-30">🔍</div>
              <h3 className="text-2xl font-medium text-gray-400 mb-2">
                Aucun résultat trouvé
              </h3>
              <p className="text-gray-500">
                Essayez avec d'autres termes de recherche ou filtres
              </p>
            </div>
          )}
        </div>
      </div>
      <FooterSection />
    </>
  );
};

export default ConcoursPage;
