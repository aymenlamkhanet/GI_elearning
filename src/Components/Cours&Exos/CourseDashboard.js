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
} from "react-icons/fi";
import Navbar from "../Products/Navbar";
import FooterSection from "../LandingPage/FooterSection";


const CourseDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [activeSemester, setActiveSemester] = useState("S1");

  // Data from the images - organized by semester
  const modules = {
    S1: [
      {
        id: 1,
        name: "SI",
        icon: <FiServer />,
        color: "from-blue-500 to-blue-600",
      },
      {
        id: 2,
        name: "python",
        icon: <FiCode />,
        color: "from-green-500 to-green-600",
      },
      {
        id: 3,
        name: "Probalité & Statistique",
        icon: <FiPieChart />,
        color: "from-yellow-500 to-yellow-600",
      },
      {
        id: 4,
        name: "microprocesseur",
        icon: <FiCpu />,
        color: "from-red-500 to-red-600",
      },
      {
        id: 5,
        name: "C++",
        icon: <FiCode />,
        color: "from-purple-500 to-purple-600",
      },
      {
        id: 6,
        name: "algoAvance",
        icon: <FiGrid />,
        color: "from-indigo-500 to-indigo-600",
      },
    ],
    S2: [
      {
        id: 1,
        name: "XML",
        icon: <FiFileText />,
        color: "from-pink-500 to-pink-600",
      },
      {
        id: 2,
        name: "WEB",
        icon: <FiCode />,
        color: "from-cyan-500 to-cyan-600",
      },
      {
        id: 3,
        name: "TPAnalyseDonnees",
        icon: <FiDatabase />,
        color: "from-amber-500 to-amber-600",
      },
      {
        id: 4,
        name: "TpAnalyse",
        icon: <FiPieChart />,
        color: "from-lime-500 to-lime-600",
      },
      {
        id: 5,
        name: "TP_AnalyseDonnees",
        icon: <FiDatabase />,
        color: "from-emerald-500 to-emerald-600",
      },
      {
        id: 6,
        name: "systeme d'exploitation",
        icon: <FiServer />,
        color: "from-violet-500 to-violet-600",
      },
      {
        id: 7,
        name: "Reseau",
        icon: <FiServer />,
        color: "from-sky-500 to-sky-600",
      },
      {
        id: 8,
        name: "Math",
        icon: <FiGrid />,
        color: "from-rose-500 to-rose-600",
      },
      {
        id: 9,
        name: "Linux",
        icon: <FiTerminal />,
        color: "from-orange-500 to-orange-600",
      },
      {
        id: 10,
        name: "JAVA",
        icon: <FiCode />,
        color: "from-teal-500 to-teal-600",
      },
      {
        id: 11,
        name: "analyse données",
        icon: <FiPieChart />,
        color: "from-blue-500 to-blue-600",
      },
    ],
  };

  const menuItems = [
    {
      title: "Accueil",
      icon: <FiHome />,
      link: "/",
    },
    {
      title: "Bibliothèques",
      icon: <FiBook />,
      submenu: [
        {
          title: "Biblio-Concours",
          icon: <FiBook />,
          link: "/Biblio-Concours",
        },
        { title: "Algorithmes", icon: <FiBook />, link: "/algos" },
        {
          title: "Biblio-Ouvrages",
          icon: <FiBook />,
          link: "/biblio_ouvrages",
        },
        { title: "Biblio-Fiches", icon: <FiBook />, link: "/BiblioFiches" },
      ],
    },
    {
      title: "Cours & Exos",
      icon: <FiFileText />,
      submenu: [
        { title: "Cours & Exos (GI-1)", icon: <FiFileText />, link: "#" },
        { title: "Cours & Exos (GI-2)", icon: <FiFileText />, link: "#" },
        { title: "Cours & Exos (GI-3)", icon: <FiFileText />, link: "#" },
      ],
    },
    {
      title: "Infos Prépa",
      icon: <FiInfo />,
      submenu: [
        { title: "Tipe & Conseils", link: "#" },
        { title: "Visa & Campus France", link: "#" },
        { title: "Notices & Résultats CNC", link: "#" },
        { title: "Orientation CNC & CF", link: "#" },
      ],
    },
    {
      title: "Divers",
      icon: <FiBriefcase />,
      submenu: [
        { title: "Équipe", link: "/team" },
        { title: "Partenaires", link: "/Partenaires" },
      ],
    },
  ];

  const toggleSubmenu = (index) => {
    if (activeSubmenu === index) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(index);
    }
  };

  const toggleSemester = (semester) => {
    setActiveSemester(semester);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navbar */}
      <Navbar/>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        {/* Page header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Modules GI1
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explorez tous les modules disponibles pour la première année du
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
              className="bg-gray-800 border border-white/10 rounded-lg overflow-hidden group hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 transform hover:scale-105"
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
                      GI1 - {activeSemester}
                    </p>
                  </div>
                </div>
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
              </div>
              <div className="px-6 py-4 bg-gray-700/30 flex justify-between items-center">
                <span className="text-xs font-medium text-gray-400">
                  Année universitaire 2024-2025
                </span>
                <button className="text-xs font-medium px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg hover:shadow-purple-500/20 transition-all">
                  Accéder
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <FooterSection/>
    </div>
  );
};

export default CourseDashboard;
