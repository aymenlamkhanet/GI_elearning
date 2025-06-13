import React, { useState, useEffect } from "react";
import { getBadgeInfo } from "./badgeUtils";
import {
  FiHome,
  FiBook,
  FiFileText,
  FiInfo,
  FiBriefcase,
  FiMenu,
  FiX,
  FiChevronDown,
  FiLogIn,
  FiMessageSquare, // Nouvelle icône ajoutée pour le forum
} from "react-icons/fi";
import * as FiIcons from "react-icons/fi";
import logo from "./imgs/alien-svgrepo-com.svg";
import defaultAvatar from "./imgs/pexels-photo-771742.jpeg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [hoveredMenuItem, setHoveredMenuItem] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const userData = JSON.parse(userStr);
        setUser({
          id: userData.id,
          username: userData.nom || userData.email.split("@")[0],
          email: userData.email,
          role: userData.role,
          profileImage: null,
          fireScore: userData.fireScore ?? 0,
          contentInteractions: userData.contentInteractions ?? 0,
          forumContributions: userData.forumContributions ?? 0,
        });

        // Right before setUser()
        console.log("Processed user data:", {
          ...userData,
          fireScore: userData.fireScore ?? 0,
          contentInteractions: userData.contentInteractions ?? 0,
          forumContributions: userData.forumContributions ?? 0,
        });


      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Authentication check failed:", error);
      localStorage.removeItem("user");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  const handleProfileAction = () => {
    if (user) {
      // Check user role and redirect accordingly
      if (user.role === "ROLE_CHEF_DEPART") {
        window.location.href = "/admindashboard";
      } else if (user.role === "ROLE_PROFESSEUR") {
        window.location.href = "/profdashboard";
      } else if (user.role === "ROLE_ETUDIANT") {
        window.location.href = "/StudentProfile";
      } else {
        // Default fallback for unknown roles
        window.location.href = "/";
      }
    } else {
      // No user logged in - go to register page
      window.location.href = "/register";
    }
  };

  // Ajout du nouvel item "Forum" dans le menu
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
    // NOUVEL ITEM FORUM AJOUTÉ ICI
    {
      title: "Forum",
      icon: <FiMessageSquare />, // Utilisation de la nouvelle icône
      link: "/forum", // Lien vers la page du forum
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

  const BadgeDisplay = ({
    fireScore = 0,
    contentInteractions = 0,
    forumContributions = 0,
  }) => {
    if (fireScore === undefined || fireScore === null) return null;
  
    const { mainBadge, additionalBadges } = getBadgeInfo(
      fireScore,
      contentInteractions,
      forumContributions
    );
  
    const isSpecialBadge = ["gold", "purple"].includes(mainBadge.color);
  
    // Helper to render an icon by name
    const renderIcon = (iconName) => {
      const IconComponent = FiIcons[iconName];
      return IconComponent ? <IconComponent size={14} /> : null;
    };
  
    return (
      <div className="flex items-center gap-2">
        {/* Main Badge */}
        <div
          className={`flex items-center px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-300 transform hover:scale-105 ${
            mainBadge.color === "gold"
              ? "bg-yellow-900/60 text-yellow-200 border-yellow-700 shadow-md shadow-yellow-800/20"
              : mainBadge.color === "purple"
              ? "bg-purple-900/60 text-purple-200 border-purple-700 shadow-md shadow-purple-800/20"
              : mainBadge.color === "blue"
              ? "bg-blue-900/60 text-blue-200 border-blue-700"
              : mainBadge.color === "orange"
              ? "bg-orange-900/60 text-orange-200 border-orange-700"
              : mainBadge.color === "green"
              ? "bg-green-900/60 text-green-200 border-green-700"
              : "bg-gray-800 text-gray-300 border-gray-700"
          }`}
        >
          <span className="mr-1.5">{renderIcon(mainBadge.icon)}</span>
          <span>{mainBadge.tier}</span>
        </div>
  
        {/* Additional Badges */}
        {additionalBadges.map((badge, index) => (
          <div
            key={index}
            className="flex items-center justify-center h-6 w-6 rounded-full text-xs bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700 hover:text-white transition-colors duration-200 cursor-default"
            title={badge.title}
          >
            {renderIcon(badge.icon)}
          </div>
        ))}
  
        {/* Points for Special Badges */}
        {isSpecialBadge && (
          <div className="text-xs text-gray-400 font-normal select-none ml-1">
            {mainBadge.score} pts
          </div>
        )}
      </div>
    );
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
                  <div className="flex items-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-sm opacity-60"></div>
                      <img
                        src={user.profileImage || defaultAvatar}
                        alt="User"
                        className="h-8 w-8 rounded-full object-cover relative z-10 border border-gray-700"
                      />
                    </div>
                    <div className="ml-2 flex flex-col">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm whitespace-nowrap">
                          {user.username}
                        </span>
                        <BadgeDisplay
                          fireScore={user.fireScore}
                          contentInteractions={user.contentInteractions}
                          forumContributions={user.forumContributions}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
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
            {user ? (
              <div className="px-4 py-3 border-b border-white/10 mb-2">
                <div className="flex items-center">
                  <img
                    src={user.profileImage || defaultAvatar}
                    alt="User"
                    className="h-10 w-10 rounded-full object-cover border border-gray-700 mr-3"
                  />
                  <div className="bg-gray-800 p-4 rounded-xl shadow-md w-full max-w-xs">
                    <div className="text-center mb-3">
                      <div className="text-white text-lg font-semibold">
                        {user.username || user.nom || user.email.split("@")[0]}
                      </div>
                    </div>
                    {user && (
                      <div className="flex justify-center">
                        <BadgeDisplay
                          fireScore={user.fireScore}
                          contentInteractions={user.contentInteractions}
                          forumContributions={user.forumContributions}
                        />
                      </div>
                    )}
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
