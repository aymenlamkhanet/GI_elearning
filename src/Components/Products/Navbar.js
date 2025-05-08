import React, { useState, useEffect } from "react";
import {
  FiHome,
  FiBook,
  FiFileText,
  FiInfo,
  FiBriefcase,
  FiMenu,
  FiX,
  FiChevronDown,
  FiUser,
  FiLogOut,
  FiLogIn,
} from "react-icons/fi";

import logo from "./imgs/alien-svgrepo-com.svg";
import defaultAvatar from "./imgs/pexels-photo-771742.jpeg"; // Default avatar image

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [hoveredMenuItem, setHoveredMenuItem] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for authentication on component mount
  useEffect(() => {
    checkAuthentication();
  }, []);

  // Function to check if user is authenticated
  const checkAuthentication = async () => {
    try {
      // Check if user data exists in localStorage
      const userStr = localStorage.getItem("user");

      if (userStr) {
        // Parse the user data from localStorage
        const userData = JSON.parse(userStr);

        // Set the user state with data from localStorage
        setUser({
          id: userData.id,
          username: userData.nom || userData.email.split("@")[0], // Use nom or fallback to email username part
          email: userData.email,
          role: userData.role,
          // Since profile image is not in localStorage, you might need to fetch it or use default
          profileImage: null, // We'll use the default avatar defined earlier
        });
      } else {
        // No user in localStorage, user is not authenticated
        setUser(null);
      }
    } catch (error) {
      console.error("Authentication check failed:", error);
      localStorage.removeItem("user"); // Clear invalid user data
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    // Optional: Redirect to home or login page
    window.location.href = "/";
  };

  // Function to handle navigation to profile or login
  const handleProfileAction = () => {
    if (user) {
      // If user is logged in, navigate to profile
      window.location.href = "/StudentProfile";
    } else {
      // If not logged in, navigate to login page
      window.location.href = "/register";
    }
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
        {
          title: "Cours & Exos (GI-1)",
          icon: <FiFileText />,
          link: "/CourseDashboard",
        },
        {
          title: "Cours & Exos (GI-2)",
          icon: <FiFileText />,
          link: "/GI2CourseDashboard",
        },
        {
          title: "Cours & Exos (GI-3)",
          icon: <FiFileText />,
          link: "/GI3CourseDashboard",
        },
      ],
    },
    {
      title: "Infos MI",
      icon: <FiInfo />,
      submenu: [
        { title: "Fileres & Conseils", link: "/OrientationPage" },
        { title: "Echange & Double Diplômes", link: "/ExchangePage" },
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
              <img src={logo} alt="Logo" className="h-12 w-12 relative z-10" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                GI elearning
              </span>
              <span className="text-xs text-gray-400">ENSA Khouribga</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="relative z-10"
                onMouseEnter={() => setHoveredMenuItem(index)}
                onMouseLeave={() => setHoveredMenuItem(null)}
              >
                <a
                  href={item.link}
                  className="flex items-center px-4 py-2 text-gray-300 hover:text-white transition-colors hover:bg-gray-800/50 rounded-lg"
                  onClick={item.submenu ? (e) => e.preventDefault() : undefined}
                >
                  <span className="mr-2 text-blue-400">{item.icon}</span>
                  <span>{item.title}</span>
                  {item.submenu && (
                    <FiChevronDown className="ml-1 text-gray-400 transition-colors" />
                  )}
                </a>

                {item.submenu && hoveredMenuItem === index && (
                  <div className="absolute top-full left-0 bg-gray-800 border border-white/10 rounded-lg mt-1 py-2 w-56 shadow-lg shadow-purple-500/10 backdrop-blur-lg">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-lg" />
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

            {/* User Profile Section / Connection Button */}
            <div
              className="relative ml-4 cursor-pointer"
              onClick={handleProfileAction}
              onMouseEnter={() => setHoveredMenuItem("profile")}
              onMouseLeave={() => setHoveredMenuItem(null)}
            >
              <div className="flex items-center px-4 py-2 text-gray-300 hover:text-white transition-colors hover:bg-gray-800/50 rounded-lg">
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-gray-700 rounded-full animate-pulse mr-2"></div>
                    <span>Loading...</span>
                  </div>
                ) : user ? (
                  // User is authenticated - show profile image
                  <div className="flex items-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-sm opacity-60"></div>
                      <img
                        src={user.profileImage || defaultAvatar}
                        alt="User"
                        className="h-8 w-8 rounded-full object-cover relative z-10 border border-gray-700"
                      />
                    </div>
                    <span className="ml-2">{user.username}</span>
                  </div>
                ) : (
                  // User is not authenticated - show connection button
                  <div className="flex items-center">
                    <div className="relative flex items-center justify-center h-8 w-8 bg-gray-800 rounded-full border border-gray-700 mr-2">
                      <FiLogIn className="text-blue-400" />
                    </div>
                    <span>Connexion</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            {/* Mobile User Profile Icon */}
            <div className="mr-4 cursor-pointer" onClick={handleProfileAction}>
              {isLoading ? (
                <div className="h-8 w-8 bg-gray-700 rounded-full animate-pulse"></div>
              ) : user ? (
                <img
                  src={user.profileImage || defaultAvatar}
                  alt="User"
                  className="h-8 w-8 rounded-full object-cover border border-gray-700"
                />
              ) : (
                <div className="flex items-center justify-center h-8 w-8 bg-gray-800 rounded-full border border-gray-700">
                  <FiLogIn className="text-blue-400" />
                </div>
              )}
            </div>

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
            {/* User profile section for mobile */}
            {user ? (
              <div className="px-4 py-3 border-b border-white/10 mb-2">
                <div className="flex items-center">
                  <img
                    src={user.profileImage || defaultAvatar}
                    alt="User"
                    className="h-10 w-10 rounded-full object-cover border border-gray-700 mr-3"
                  />
                  <div>
                    <div className="text-white font-medium">
                      {user.username || user.nom || user.email.split("@")[0]}
                    </div>
                    <div className="text-xs text-gray-400">{user.email}</div>
                  </div>
                </div>
                <div className="flex mt-3 space-x-2">
                  <a
                    href="/profile"
                    className="flex-1 text-center bg-gray-800 hover:bg-gray-700 text-gray-300 py-2 rounded-lg text-sm"
                  >
                    Profil
                  </a>
                  <button
                    onClick={handleLogout}
                    className="flex-1 text-center bg-gray-800 hover:bg-gray-700 text-gray-300 py-2 rounded-lg text-sm"
                  >
                    Déconnexion
                  </button>
                </div>
              </div>
            ) : (
              <div className="px-4 py-3 border-b border-white/10 mb-2">
                <div className="flex space-x-2">
                  <a
                    href="/register"
                    className="flex-1 text-center bg-gray-800 hover:bg-gray-700 text-gray-300 py-2 rounded-lg text-sm flex items-center justify-center"
                  >
                    <FiLogIn className="mr-2 text-blue-400" />
                    <span>Connexion</span>
                  </a>
                </div>
              </div>
            )}

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
