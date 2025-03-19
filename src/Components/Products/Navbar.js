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
} from "react-icons/fi";

import logo from "./imgs/alien-svgrepo-com.svg"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

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
        { title: "Biblio-Concours", icon: <FiBook />, link: "#" },
        { title: "Biblio-Classiques", icon: <FiBook />, link: "#" },
        {
          title: "Biblio-Ouvrages",
          icon: <FiBook />,
          link: "/biblio_ouvrages",
        },
        { title: "Biblio-Fiches", icon: <FiBook />, link: "#" },
      ],
    },
    {
      title: "Cours & Exos",
      icon: <FiFileText />,
      submenu: [
        { title: "Cours & Exos (SUP)", icon: <FiFileText />, link: "#" },
        { title: "Cours & Exos (SPE)", icon: <FiFileText />, link: "#" },
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

  return (
    <nav className="bg-gray-900 border-b border-white/10 backdrop-blur-md bg-opacity-80 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-sm opacity-60"></div>
              <img
                src={logo}
                alt="Logo"
                className="h-12 w-12 relative z-10"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                GI E-Learning
              </span>
              <span className="text-xs text-gray-400">ENSA Khouribga</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item, index) => (
              <div key={index} className="group relative">
                <a
                  href={item.link}
                  className="flex items-center px-4 py-2 text-gray-300 hover:text-white transition-colors group-hover:bg-gray-800/50 rounded-lg"
                  onClick={
                    item.submenu
                      ? (e) => {
                          e.preventDefault();
                          toggleSubmenu(index);
                        }
                      : undefined
                  }
                >
                  <span className="mr-2 text-blue-400">{item.icon}</span>
                  <span>{item.title}</span>
                  {item.submenu && (
                    <FiChevronDown className="ml-1 text-gray-400 group-hover:text-blue-400 transition-colors" />
                  )}
                </a>

                {item.submenu && (
                  <div className="absolute hidden group-hover:block bg-gray-800 border border-white/10 rounded-lg mt-1 py-2 w-56 shadow-lg shadow-purple-500/10 backdrop-blur-lg">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-lg"></div>
                    {item.submenu.map((subItem, subIndex) => (
                      <a
                        key={subIndex}
                        href={subItem.link}
                        className="flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 relative"
                      >
                        {subItem.icon && (
                          <span className="mr-2 text-blue-400">
                            {subItem.icon}
                          </span>
                        )}
                        <span>{subItem.title}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800/50"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 border-t border-white/10">
          <div className="container mx-auto px-4 py-2">
            {menuItems.map((item, index) => (
              <div key={index}>
                <a
                  href={item.link}
                  className="flex items-center justify-between px-4 py-3 text-gray-300 hover:text-white"
                  onClick={
                    item.submenu
                      ? (e) => {
                          e.preventDefault();
                          toggleSubmenu(index);
                        }
                      : undefined
                  }
                >
                  <div className="flex items-center">
                    <span className="mr-3 text-blue-400">{item.icon}</span>
                    <span>{item.title}</span>
                  </div>
                  {item.submenu && (
                    <FiChevronDown
                      className={`transition-transform duration-300 ${
                        activeSubmenu === index ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </a>

                {item.submenu && activeSubmenu === index && (
                  <div className="bg-gray-800/50 rounded-lg my-1 py-1">
                    {item.submenu.map((subItem, subIndex) => (
                      <a
                        key={subIndex}
                        href={subItem.link}
                        className="flex items-center px-12 py-2 text-gray-400 hover:text-white"
                      >
                        {subItem.icon && (
                          <span className="mr-2 text-blue-400">
                            {subItem.icon}
                          </span>
                        )}
                        <span>{subItem.title}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
