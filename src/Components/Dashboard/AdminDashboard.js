import React, { useState } from "react";
import { 
  BookOpen, 
  Users, 
  BarChart2, 
  PlusCircle, 
  Edit, 
  Trash2, 
  Grid, 
  Search,
  ChevronDown,
  ChevronUp,
  Home,
  FileText,
  Book,
  GraduationCap,
  ClipboardList,
  Settings,
  User,
  Menu,
  X,
  LogOut
} from "lucide-react";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("courses");
  const [expandedCourses, setExpandedCourses] = useState([]);

  const toggleCourseExpand = (id) => {
    if (expandedCourses.includes(id)) {
      setExpandedCourses(expandedCourses.filter((courseId) => courseId !== id));
    } else {
      setExpandedCourses([...expandedCourses, id]);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Sample data
  const courses = [
    {
      id: 1,
      title: "Introduction à l'IA",
      author: "Marie Dupont",
      category: "Technologie",
      students: 245,
      rating: 4.8,
    },
    {
      id: 2,
      title: "JavaScript Avancé",
      author: "Jean Michel",
      category: "Programmation",
      students: 189,
      rating: 4.5,
    },
    {
      id: 3,
      title: "Data Science Fondamentaux",
      author: "Sophie Martin",
      category: "Analytique",
      students: 312,
      rating: 4.7,
    },
    {
      id: 4,
      title: "Design UX/UI",
      author: "Paul Bernard",
      category: "Design",
      students: 156,
      rating: 4.4,
    },
    {
      id: 5,
      title: "Marketing Digital",
      author: "Claire Dubois",
      category: "Business",
      students: 203,
      rating: 4.6,
    },
  ];

  const users = [
    {
      id: 1,
      name: "Thomas Laurent",
      email: "thomas@example.com",
      subscription: "Premium",
      lastActive: "2025-03-18",
    },
    {
      id: 2,
      name: "Caroline Petit",
      email: "caroline@example.com",
      subscription: "Basic",
      lastActive: "2025-03-20",
    },
    {
      id: 3,
      name: "Antoine Garcia",
      email: "antoine@example.com",
      subscription: "Premium",
      lastActive: "2025-03-15",
    },
    {
      id: 4,
      name: "Julie Moreau",
      email: "julie@example.com",
      subscription: "Basic",
      lastActive: "2025-03-19",
    },
    {
      id: 5,
      name: "Maxime Roux",
      email: "maxime@example.com",
      subscription: "Premium",
      lastActive: "2025-03-17",
    },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Tableau de Bord
            </h2>

            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 relative group">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400">Cours totaux</p>
                    <h3 className="text-2xl font-bold text-white">125</h3>
                  </div>
                  <div className="p-3 bg-blue-500/20 rounded-lg">
                    <BookOpen className="text-blue-400" />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-green-400 text-sm">+12% ce mois</p>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 relative group">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400">Étudiants</p>
                    <h3 className="text-2xl font-bold text-white">3,842</h3>
                  </div>
                  <div className="p-3 bg-purple-500/20 rounded-lg">
                    <Users className="text-purple-400" />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-green-400 text-sm">+8% ce mois</p>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 relative group">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400">Examens passés</p>
                    <h3 className="text-2xl font-bold text-white">1,254</h3>
                  </div>
                  <div className="p-3 bg-green-500/20 rounded-lg">
                    <ClipboardList className="text-green-400" />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-green-400 text-sm">+15% ce mois</p>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 relative group">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400">Note moyenne</p>
                    <h3 className="text-2xl font-bold text-white">4.7/5</h3>
                  </div>
                  <div className="p-3 bg-yellow-500/20 rounded-lg">
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-green-400 text-sm">+0.2 ce mois</p>
                </div>
              </div>
            </div>

            {/* Recent activities */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">
                Activités récentes
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <PlusCircle className="text-blue-400 w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-white">
                      Nouveau cours ajouté:{" "}
                      <span className="text-blue-400">
                        Python pour Débutants
                      </span>
                    </p>
                    <p className="text-gray-400 text-sm">Il y a 2 heures</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Users className="text-purple-400 w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-white">15 nouveaux étudiants inscrits</p>
                    <p className="text-gray-400 text-sm">Aujourd'hui</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <Edit className="text-green-400 w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-white">
                      Mise à jour du cours:{" "}
                      <span className="text-blue-400">JavaScript Avancé</span>
                    </p>
                    <p className="text-gray-400 text-sm">Hier</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-yellow-500/20 rounded-lg">
                    <svg
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-white">
                      Nouvelle évaluation 5 étoiles pour{" "}
                      <span className="text-blue-400">
                        Data Science Fondamentaux
                      </span>
                    </p>
                    <p className="text-gray-400 text-sm">Hier</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "catalog":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                Gestion du Catalogue
              </h2>
              <div className="flex space-x-2">
                <button
                  className={`px-4 py-2 rounded-lg transition-all ${
                    activeTab === "courses"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
                  onClick={() => setActiveTab("courses")}
                >
                  Cours
                </button>
                <button
                  className={`px-4 py-2 rounded-lg transition-all ${
                    activeTab === "authors"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
                  onClick={() => setActiveTab("authors")}
                >
                  Auteurs
                </button>
                <button
                  className={`px-4 py-2 rounded-lg transition-all ${
                    activeTab === "categories"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
                  onClick={() => setActiveTab("categories")}
                >
                  Catégories
                </button>
              </div>
            </div>

            {/* Search and add */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-gray-500 pl-10"
                />
                <Search className="absolute left-3 top-3 text-gray-500 w-4 h-4" />
              </div>
              <button className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-3 px-4 rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transform transition-all duration-300 hover:-translate-y-1 flex items-center justify-center">
                <PlusCircle className="mr-2 w-4 h-4" />
                <span>Ajouter un cours</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            {activeTab === "courses" && (
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-800/50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                        >
                          Titre
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                        >
                          Auteur
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                        >
                          Catégorie
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                        >
                          Étudiants
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                        >
                          Note
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {courses.map((course) => (
                        <React.Fragment key={course.id}>
                          <tr
                            className="hover:bg-gray-700/30 cursor-pointer transition-colors"
                            onClick={() => toggleCourseExpand(course.id)}
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                              {course.title}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              {course.author}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              {course.category}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              {course.students}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              <div className="flex items-center">
                                <span className="text-yellow-400 mr-1">★</span>
                                {course.rating}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                              <button className="text-blue-400 hover:text-blue-300 p-1">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="text-red-400 hover:text-red-300 p-1">
                                <Trash2 className="w-4 h-4" />
                              </button>
                              {expandedCourses.includes(course.id) ? (
                                <ChevronUp className="w-4 h-4 inline-block text-gray-400" />
                              ) : (
                                <ChevronDown className="w-4 h-4 inline-block text-gray-400" />
                              )}
                            </td>
                          </tr>
                          {expandedCourses.includes(course.id) && (
                            <tr className="bg-gray-800/50">
                              <td colSpan={6} className="px-6 py-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <h3 className="text-lg font-medium text-white mb-2">
                                      Détails du cours
                                    </h3>
                                    <p className="text-sm text-gray-300 mb-1">
                                      <span className="text-gray-400">ID:</span>{" "}
                                      {course.id}
                                    </p>
                                    <p className="text-sm text-gray-300 mb-1">
                                      <span className="text-gray-400">
                                        Date de création:
                                      </span>{" "}
                                      15 Mars 2025
                                    </p>
                                    <p className="text-sm text-gray-300 mb-1">
                                      <span className="text-gray-400">
                                        Dernière mise à jour:
                                      </span>{" "}
                                      18 Mars 2025
                                    </p>
                                    <p className="text-sm text-gray-300 mb-1">
                                      <span className="text-gray-400">
                                        Durée:
                                      </span>{" "}
                                      12 heures
                                    </p>
                                    <p className="text-sm text-gray-300 mb-1">
                                      <span className="text-gray-400">
                                        Niveau:
                                      </span>{" "}
                                      Intermédiaire
                                    </p>
                                  </div>
                                  <div>
                                    <h3 className="text-lg font-medium text-white mb-2">
                                      Statistiques
                                    </h3>
                                    <p className="text-sm text-gray-300 mb-1">
                                      <span className="text-gray-400">
                                        Taux de complétion:
                                      </span>{" "}
                                      68%
                                    </p>
                                    <p className="text-sm text-gray-300 mb-1">
                                      <span className="text-gray-400">
                                        Temps moyen:
                                      </span>{" "}
                                      9.5 heures
                                    </p>
                                    <p className="text-sm text-gray-300 mb-1">
                                      <span className="text-gray-400">
                                        Évaluations:
                                      </span>{" "}
                                      142
                                    </p>
                                    <div className="mt-4">
                                      <button className="text-sm bg-blue-600 hover:bg-blue-500 text-white py-1 px-3 rounded-md transition-colors">
                                        Voir les détails complets
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        );

      case "students":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Gestion des Étudiants
            </h2>

            {/* Search and filters */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Rechercher un étudiant..."
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-gray-500 pl-10"
                />
                <Search className="absolute left-3 top-3 text-gray-500 w-4 h-4" />
              </div>
              <select className="px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white">
                <option>Tous les étudiants</option>
                <option>Premium</option>
                <option>Basic</option>
                <option>Inactifs</option>
              </select>
            </div>

            {/* Users list */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-800/50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                      >
                        Nom
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                      >
                        Abonnement
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                      >
                        Dernière activité
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {users.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-gray-700/30 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                          {user.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              user.subscription === "Premium"
                                ? "bg-purple-500/20 text-purple-300"
                                : "bg-blue-500/20 text-blue-300"
                            }`}
                          >
                            {user.subscription}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {user.lastActive}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                          <button className="text-blue-400 hover:text-blue-300 p-1">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-gray-400 hover:text-gray-300 p-1">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-6 py-3 bg-gray-800/50 flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  Affichage de 1 à 5 sur 126 étudiants
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-colors">
                    Précédent
                  </button>
                  <button className="px-3 py-1 bg-blue-600 text-white rounded-md">
                    1
                  </button>
                  <button className="px-3 py-1 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-colors">
                    2
                  </button>
                  <button className="px-3 py-1 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-colors">
                    3
                  </button>
                  <button className="px-3 py-1 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-colors">
                    Suivant
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case "exams":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Gestion des Examens
            </h2>
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <p className="text-white">Contenu de la gestion des examens...</p>
            </div>
          </div>
        );

      case "notes":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Fiches de cours
            </h2>
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <p className="text-white">Contenu des fiches de cours...</p>
            </div>
          </div>
        );

      // Add this new case statement
      case "stats":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Statistiques et Rapports
            </h2>

            {/* Main stats grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Popular Content Card */}
              <div className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                <h3 className="text-lg font-medium mb-4">Contenu Populaire</h3>
                <div className="space-y-4">
                  {courses.slice(0, 3).map((course) => (
                    <div
                      key={course.id}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm">{course.title}</span>
                      <span className="text-blue-400 text-sm">
                        {course.students} étudiants
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* User Activity Card */}
              <div className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                <h3 className="text-lg font-medium mb-4">
                  Activité des Utilisateurs
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Utilisateurs Actifs</span>
                    <span className="text-purple-400 text-sm">1,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">
                      Nouvelles Inscriptions (30j)
                    </span>
                    <span className="text-green-400 text-sm">+89</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Temps Moyen de Session</span>
                    <span className="text-yellow-400 text-sm">24m</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Reports Section */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Rapports Détaillés</h3>
                <select className="bg-gray-900/30 px-3 py-2 rounded-lg text-sm">
                  <option>30 Derniers Jours</option>
                  <option>7 Derniers Jours</option>
                  <option>24 Heures</option>
                </select>
              </div>
              <div className="h-64 bg-gray-900/20 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">
                  Visualisation des données...
                </span>
              </div>
            </div>
          </div>
        );

      case "profile":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Profil Admin
            </h2>

            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-28 h-28 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-4xl font-bold">
                    AD
                  </div>
                </div>

                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-white text-center md:text-left">
                    Alexandre Dupont
                  </h3>
                  <p className="text-gray-400 text-center md:text-left">
                    Administrateur Principal
                  </p>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-gray-400 text-sm mb-2">
                        Informations personnelles
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">
                            Email
                          </label>
                          <p className="text-white">admin@example.com</p>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">
                            Téléphone
                          </label>
                          <p className="text-white">+33 6 12 34 56 78</p>
                        </div>{" "}
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">
                            Rôle
                          </label>
                          <p className="text-white">Administrateur Principal</p>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">
                            Date d'inscription
                          </label>
                          <p className="text-white">15 Mars 2024</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-gray-400 text-sm mb-2">
                        Paramètres de sécurité
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center bg-gray-900/30 p-4 rounded-lg">
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">
                              Mot de passe
                            </label>
                            <p className="text-white">••••••••</p>
                          </div>
                          <button className="text-blue-400 hover:text-blue-300 text-sm">
                            Modifier
                          </button>
                        </div>

                        <div className="bg-gray-900/30 p-4 rounded-lg">
                          <label className="block text-xs text-gray-500 mb-2">
                            Authentification à deux facteurs
                          </label>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-red-400">
                              Désactivée
                            </span>
                            <button className="text-blue-400 hover:text-blue-300 text-sm">
                              Activer
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-white/10 pt-6">
                <button className="w-full bg-red-600/20 hover:bg-red-600/30 text-red-400 py-2 px-4 rounded-lg transition-colors flex items-center justify-center">
                  <LogOut className="w-4 h-4 mr-2" />
                  Déconnexion
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-screen bg-gray-900 text-gray-100 overflow-hidden">
      <div className="flex h-full">
        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? "w-64" : "w-20"
          } bg-gray-800/50 backdrop-blur-sm border-r border-white/10 transition-all duration-300 relative h-full flex flex-col`}
        >
          <button
            onClick={toggleSidebar}
            className="absolute -right-3 top-4 bg-gray-800 p-2 rounded-full border border-white/10 hover:bg-gray-700/30 transition-colors"
          >
            {sidebarOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>

          <div className="p-4">
            <nav className="space-y-2">
              {[
                { section: "dashboard", icon: Home, label: "Tableau de bord" },
                { section: "catalog", icon: BookOpen, label: "Catalogue" },
                {
                  section: "students",
                  icon: GraduationCap,
                  label: "Étudiants",
                },
                { section: "stats", icon: BarChart2, label: "Statistiques" },
                { section: "exams", icon: ClipboardList, label: "Examens" },
                { section: "notes", icon: FileText, label: "Fiches de cours" },
                { section: "profile", icon: User, label: "Profil" },
              ].map(({ section, icon: Icon, label }) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeSection === section
                      ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                      : "text-gray-400 hover:bg-gray-700/30"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {sidebarOpen && <span className="text-sm">{label}</span>}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-8 overflow-auto">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;