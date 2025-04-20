import React, { useState } from "react";
import {
  FiHome,
  FiBook,
  FiFileText,
  FiInfo,
  FiBriefcase,
  FiMenu,
  FiX,
  FiChevronDown,
  FiCode,
  FiDatabase,
  FiCpu,
  FiServer,
  FiGrid,
  FiTerminal,
  FiPieChart,
  FiLock,
  FiSettings,
  FiSmartphone,
  FiCloud,
  FiArchive,
  FiUsers,
} from "react-icons/fi";
import Navbar from "../Products/Navbar";
import FooterSection from "../LandingPage/FooterSection";

const GI3CourseDashboard = () => {
  const [activeSemester, setActiveSemester] = useState("S1");

  // Data from the second and third images - organized by semester for GI3
  const modules = {
    S1: [
      {
        id: 1,
        name: "securite",
        icon: <FiLock />,
        color: "from-red-500 to-red-600",
      },
      {
        id: 2,
        name: "mobile",
        icon: <FiSmartphone />,
        color: "from-green-500 to-green-600",
      },
      {
        id: 3,
        name: "info théorique",
        icon: <FiInfo />,
        color: "from-yellow-500 to-yellow-600",
      },
      {
        id: 4,
        name: "GP",
        icon: <FiSettings />,
        color: "from-purple-500 to-purple-600",
      },
      {
        id: 5,
        name: "genie logiciel",
        icon: <FiCode />,
        color: "from-indigo-500 to-indigo-600",
      },
      {
        id: 6,
        name: "DevOps",
        icon: <FiCloud />,
        color: "from-teal-500 to-teal-600",
      },
      {
        id: 7,
        name: "big data",
        icon: <FiDatabase />,
        color: "from-pink-500 to-pink-600",
      },
      {
        id: 8,
        name: "BD",
        icon: <FiArchive />,
        color: "from-amber-500 to-amber-600",
      },
      {
        id: 9,
        name: "Data warehouse",
        icon: <FiDatabase />,
        color: "from-blue-500 to-blue-600",
      },
      {
        id: 10,
        name: "Processus métiers & ERP",
        icon: <FiSettings />,
        color: "from-violet-500 to-violet-600",
      },
      {
        id: 11,
        name: "Ingénierie Logicielle Avancée",
        icon: <FiCode />,
        color: "from-green-500 to-green-600",
      },
      {
        id: 12,
        name: "SOA et Microservices",
        icon: <FiCloud />,
        color: "from-yellow-500 to-yellow-600",
      },
      {
        id: 13,
        name: "Mentorat et Pratiques Professionnelles",
        icon: <FiUsers />,
        color: "from-cyan-500 to-cyan-600",
      },
      {
        id: 14,
        name: "Projet de communication 5",
        icon: <FiFileText />,
        color: "from-lime-500 to-lime-600",
      },
    ],
    S2: [
      {
        id: 1,
        name: "Stage d'Ingénieur",
        icon: <FiBriefcase />,
        color: "from-blue-500 to-blue-600",
        isInternship: true,
      },
    ],
  };

  const toggleSemester = (semester) => {
    setActiveSemester(semester);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        {/* Page header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Modules GI3
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explorez tous les modules disponibles pour la troisième année du
            cycle ingénieur en Génie Informatique
          </p>
        </div>

        {/* Semester selector */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => toggleSemester("S1")}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeSemester === "S1"
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Semestre 1
            </button>
            <button
              onClick={() => toggleSemester("S2")}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeSemester === "S2"
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Semestre 2
            </button>
          </div>
        </div>

        {/* Module cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules[activeSemester].map((module) => (
            <div
              key={module.id}
              className={`bg-gray-800 border border-white/10 rounded-lg overflow-hidden group hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 transform hover:scale-105 ${
                module.isInternship ? "md:col-span-2 lg:col-span-3" : ""
              }`}
            >
              <div className={`h-2 bg-gradient-to-r ${module.color}`}></div>
              <div className="p-6">
                <div className="flex items-start">
                  <div className="p-3 rounded-lg bg-gray-700/50 mr-4">
                    <span className="text-xl text-blue-400">{module.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-1">{module.name}</h3>
                    <p className="text-sm text-gray-400">
                      GI3 - {activeSemester}
                    </p>
                  </div>
                </div>
                {module.isInternship ? (
                  <div className="mt-6 pt-6 border-t border-gray-700">
                    <p className="text-gray-400 mb-4">
                      Stage obligatoire d'une durée de 6 mois en entreprise pour
                      mettre en pratique les connaissances acquises et
                      développer des compétences professionnelles.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <span className="px-3 py-1 bg-gray-700 rounded-full text-xs font-medium">
                        Durée: 6 mois
                      </span>
                      <span className="px-3 py-1 bg-gray-700 rounded-full text-xs font-medium">
                        Rapport de stage
                      </span>
                      <span className="px-3 py-1 bg-gray-700 rounded-full text-xs font-medium">
                        Soutenance finale
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="mt-6 pt-6 border-t border-gray-700">
                    <a
                      href="#"
                      className="flex items-center text-sm text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      <FiFileText className="mr-2" />
                      <span>Documents du cours</span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center text-sm text-gray-400 hover:text-blue-400 transition-colors mt-2"
                    >
                      <FiBook className="mr-2" />
                      <span>Travaux pratiques</span>
                    </a>
                  </div>
                )}
              </div>
              <div className="px-6 py-4 bg-gray-700/30 flex justify-between items-center">
                <span className="text-xs font-medium text-gray-400">
                  Année universitaire 2024-2025
                </span>
                <button className="text-xs font-medium px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg hover:shadow-purple-500/20 transition-all">
                  {module.isInternship ? "Détails" : "Accéder"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <FooterSection />
    </div>
  );
};

export default GI3CourseDashboard;
