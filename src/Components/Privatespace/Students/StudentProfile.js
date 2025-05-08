import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiBook,
  FiBarChart,
  FiEdit,
  FiSave,
  FiX,
  FiGrid,
  FiAward,
  FiActivity,
  FiTrendingUp,
  FiClock,
  FiBookmark,
  FiShield,
  FiLogOut,
} from "react-icons/fi";
import defaultAvatar from "../../Products/imgs/pexels-photo-771742.jpeg";

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [activeTab, setActiveTab] = useState("profile");
  const [stats, setStats] = useState(null);
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    fetchStudentData();
    fetchStudentStats();
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("user");
    // Optional: You might want to clear other user-related state here
    window.location.href = "/register"; // Redirect to register page as requested
  };

  const fetchStudentData = async () => {
    try {
      const userStr = localStorage.getItem("user");
      if (!userStr) {
        window.location.href = "/register";
        return;
      }

      const userData = JSON.parse(userStr);

      const response = await axios.get(
        `http://localhost:8084/api/etudiant/${userData.id}`
      );
      setStudent(response.data);
      setFormData(response.data);

      // Fetch recent activities
      const recentResponse = await axios.get(
        "http://localhost:8084/api/etudiant/recent"
      );
      setRecentActivities(recentResponse.data);

      setLoading(false);
    } catch (err) {
      console.error("Error fetching student data:", err);
      setError("Failed to load student data. Please try again later.");
      setLoading(false);
    }
  };

  const fetchStudentStats = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8084/api/etudiant/stats"
      );
      setStats(response.data);
    } catch (err) {
      console.error("Error fetching student stats:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8084/api/etudiant/${student.id}`,
        formData
      );
      setStudent(response.data);
      setEditing(false);

      // Update local storage with new user data
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const userData = JSON.parse(userStr);
        const updatedUserData = {
          ...userData,
          nom: response.data.nom,
          prenom: response.data.prenom,
          email: response.data.email,
        };
        localStorage.setItem("user", JSON.stringify(updatedUserData));
      }

      // Show success notification (you can implement this)
    } catch (err) {
      console.error("Error updating student data:", err);
      // Show error notification
    }
  };

  const cancelEdit = () => {
    setFormData(student);
    setEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-sm opacity-60 animate-pulse"></div>
          <div className="absolute inset-2 bg-gray-900 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-blue-500 border-r-transparent border-b-purple-500 border-l-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg border border-red-500/20 shadow-lg max-w-md">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Error</h2>
          <p className="text-gray-300">{error}</p>
          <button
            className="mt-6 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
            onClick={fetchStudentData}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-8 pb-16">
      <div className="container mx-auto px-4">
        {/* Profile Header */}
        <div className="relative overflow-hidden bg-gray-800 rounded-xl border border-white/10 backdrop-blur-lg mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-10 -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl opacity-10 -ml-32 -mb-32"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start p-6 md:p-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-sm opacity-80"></div>
              <img
                src={student.profileImage || defaultAvatar}
                alt={student.nom}
                className="h-32 w-32 rounded-full object-cover border-4 border-gray-800 relative z-10"
              />
              <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-70 flex items-center justify-center transition-opacity cursor-pointer">
                <FiEdit className="text-white text-2xl" />
              </div>
            </div>

            <div className="md:ml-8 text-center md:text-left mt-4 md:mt-0 flex-grow">
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                {student.nom} {student.prenom}
              </h1>
              <p className="text-gray-400 mt-1">
                {student.filiere || "Génie Informatique"}
              </p>
              <div className="flex flex-wrap gap-3 mt-3 justify-center md:justify-start">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm flex items-center">
                  <FiBookmark className="mr-1" /> {student.niveau || "GI-2"}
                </span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm flex items-center">
                  <FiShield className="mr-1" /> Étudiant
                </span>
                <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm flex items-center">
                  <FiAward className="mr-1" />
                  ENSA Khouribga
                </span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
              {!editing ? (
                <>
                  <button
                    onClick={() => setEditing(true)}
                    className="mt-4 md:mt-0 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center"
                  >
                    <FiEdit className="mr-2" /> Modifier Profil
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all flex items-center"
                  >
                    <FiLogOut className="mr-2" /> Déconnexion
                  </button>
                </>
              ) : (
                <div className="flex gap-2 mt-4 md:mt-0">
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all flex items-center"
                  >
                    <FiSave className="mr-2" /> Enregistrer
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all flex items-center"
                  >
                    <FiX className="mr-2" /> Annuler
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="px-6 pb-2 pt-4 border-t border-white/10 flex overflow-x-auto hide-scrollbar">
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-4 py-2 mr-4 rounded-lg flex items-center transition-all ${
                activeTab === "profile"
                  ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <FiUser className="mr-2" /> Profil
            </button>
            <button
              onClick={() => setActiveTab("stats")}
              className={`px-4 py-2 mr-4 rounded-lg flex items-center transition-all ${
                activeTab === "stats"
                  ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <FiBarChart className="mr-2" /> Statistiques
            </button>
            <button
              onClick={() => setActiveTab("activities")}
              className={`px-4 py-2 mr-4 rounded-lg flex items-center transition-all ${
                activeTab === "activities"
                  ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <FiActivity className="mr-2" /> Activités
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-gray-800 rounded-xl border border-white/10 backdrop-blur-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="p-6 relative z-10">
              {editing ? (
                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
                      Informations Personnelles
                    </h2>

                    <div>
                      <label className="block text-gray-400 mb-2 text-sm">
                        Nom
                      </label>
                      <input
                        type="text"
                        name="nom"
                        value={formData.nom || ""}
                        onChange={handleChange}
                        className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-2 text-sm">
                        Prénom
                      </label>
                      <input
                        type="text"
                        name="prenom"
                        value={formData.prenom || ""}
                        onChange={handleChange}
                        className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-2 text-sm">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email || ""}
                        onChange={handleChange}
                        className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-2 text-sm">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        name="telephone"
                        value={formData.phone || ""}
                        onChange={handleChange}
                        className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
                      Informations Académiques
                    </h2>

                    <div>
                      <label className="block text-gray-400 mb-2 text-sm">
                        Filière
                      </label>
                      <select
                        name="filiere"
                        value={formData.filiere || ""}
                        onChange={handleChange}
                        className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="Génie Informatique">
                          Génie Informatique
                        </option>
                        <option value="Génie Réseaux et Télécommunications">
                          Génie Réseaux et Télécommunications
                        </option>
                        <option value="Génie Industriel">
                          Génie Industriel
                        </option>
                        <option value="Génie Électrique">
                          Génie Électrique
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-2 text-sm">
                        Niveau
                      </label>
                      <select
                        name="niveau"
                        value={formData.niveau || ""}
                        onChange={handleChange}
                        className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="GI-1">GI-1</option>
                        <option value="GI-2">GI-2</option>
                        <option value="GI-3">GI-3</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-2 text-sm">
                        Spécialité
                      </label>
                      <select
                        name="specialite"
                        value={formData.specialite || ""}
                        onChange={handleChange}
                        className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="">Sélectionner une spécialité</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Développement Web">
                          Développement Web
                        </option>
                        <option value="Développement Mobile">
                          Développement Mobile
                        </option>
                        <option value="Cybersécurité">Cybersécurité</option>
                        <option value="IA et Machine Learning">
                          IA et Machine Learning
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-2 text-sm">
                        Bio
                      </label>
                      <textarea
                        name="bio"
                        value={formData.bio || ""}
                        onChange={handleChange}
                        className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-32"
                        placeholder="Dites quelque chose à propos de vous..."
                      ></textarea>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
                      Informations Personnelles
                    </h2>

                    <div className="space-y-4">
                      <div className="flex items-start">
                        <FiUser className="text-blue-400 mt-1 mr-3" />
                        <div>
                          <div className="text-gray-400 text-sm">
                            Nom Complet
                          </div>
                          <div className="text-white">
                            {student.nom} {student.prenom}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <FiMail className="text-blue-400 mt-1 mr-3" />
                        <div>
                          <div className="text-gray-400 text-sm">Email</div>
                          <div className="text-white">{student.email}</div>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <FiPhone className="text-blue-400 mt-1 mr-3" />
                        <div>
                          <div className="text-gray-400 text-sm">Téléphone</div>
                          <div className="text-white">
                            {student.phone || "Non renseigné"}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-white mb-2">
                        À Propos
                      </h3>
                      <p className="text-gray-300">
                        {student.bio ||
                          `Étudiant en ${
                            student.filiere || "Génie Informatique"
                          } à l'ENSA Khouribga, passionné${
                            student.genre === "F" ? "e" : ""
                          } par les technologies innovantes et le développement de solutions numériques. Actuellement en ${
                            student.niveau
                          }, je me spécialise dans les domaines de l'informatique tout en participant activement à la vie étudiante.`}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
                      Informations Académiques
                    </h2>

                    <div className="space-y-4">
                      <div className="flex items-start">
                        <FiGrid className="text-purple-400 mt-1 mr-3" />
                        <div>
                          <div className="text-gray-400 text-sm">Filière</div>
                          <div className="text-white">
                            {student.filiere || "Génie Informatique"}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <FiBookmark className="text-purple-400 mt-1 mr-3" />
                        <div>
                          <div className="text-gray-400 text-sm">Niveau</div>
                          <div className="text-white">
                            {student.niveau || "GI-2"}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <FiAward className="text-purple-400 mt-1 mr-3" />
                        <div>
                          <div className="text-gray-400 text-sm">
                            Departement
                          </div>
                          <div className="text-white">Maths & Informatique</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                      <h3 className="text-lg font-semibold text-blue-400 mb-3 flex items-center">
                        <FiTrendingUp className="mr-2" /> Parcours académique
                      </h3>

                      <div className="space-y-4">
                        {/* GI-1 - Always shown */}
                        <div
                          className={`relative pl-6 border-l-2 ${
                            student.niveau === "GI-1"
                              ? "border-blue-500/50"
                              : "border-gray-500/30"
                          }`}
                        >
                          <div
                            className={`absolute left-0 top-0 w-3 h-3 rounded-full -translate-x-1/2 ${
                              student.niveau === "GI-1"
                                ? "bg-blue-500"
                                : "bg-gray-500"
                            }`}
                          ></div>
                          <div
                            className={`font-medium ${
                              student.niveau === "GI-1"
                                ? "text-white"
                                : "text-gray-400"
                            }`}
                          >
                            GI-1
                          </div>
                          <div className="text-gray-400 text-sm">
                            {student.niveau === "GI-1"
                              ? "2024 - 2025"
                              : student.niveau === "GI-2"
                              ? "2023 - 2024"
                              : "2022 - 2023"}
                          </div>
                        </div>

                        {/* GI-2 - Show for GI2 or GI3 students */}
                        {(student.niveau === "GI-2" ||
                          student.niveau === "GI-3") && (
                          <div
                            className={`relative pl-6 border-l-2 ${
                              student.niveau === "GI-2"
                                ? "border-purple-500/50"
                                : "border-gray-500/30"
                            }`}
                          >
                            <div
                              className={`absolute left-0 top-0 w-3 h-3 rounded-full -translate-x-1/2 ${
                                student.niveau === "GI-2"
                                  ? "bg-purple-500"
                                  : "bg-gray-500"
                              }`}
                            ></div>
                            <div
                              className={`font-medium ${
                                student.niveau === "GI-2"
                                  ? "text-white"
                                  : "text-gray-400"
                              }`}
                            >
                              GI-2
                            </div>
                            <div className="text-gray-400 text-sm">
                              {student.niveau === "GI-2"
                                ? "2024 - 2025"
                                : "2023 - 2024"}
                            </div>
                          </div>
                        )}

                        {/* GI-3 - Show only for GI3 students */}
                        {student.niveau === "GI-3" && (
                          <div className="relative pl-6 border-l-2 border-green-500/50">
                            <div className="absolute left-0 top-0 w-3 h-3 bg-green-500 rounded-full -translate-x-1/2"></div>
                            <div className="text-white font-medium">GI-3</div>
                            <div className="text-gray-400 text-sm">
                              2024 - 2025
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Stats Tab */}
          {activeTab === "stats" && (
            <div className="p-6 relative z-10">
              <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-6">
                Mes Statistiques d'Apprentissage
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-gray-300">Cours Suivis</h3>
                    <FiBook className="text-blue-400" />
                  </div>
                  <div className="text-3xl font-bold text-white">
                    {stats?.coursesCompleted || 14}
                  </div>
                  <div className="text-sm text-gray-400">
                    sur {stats?.totalCourses || 24} cours disponibles
                  </div>
                  <div className="mt-3 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                      style={{
                        width: `${
                          stats?.coursesCompleted
                            ? (stats.coursesCompleted / stats.totalCourses) *
                              100
                            : 58
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-gray-300">Exercices Résolus</h3>
                    <FiActivity className="text-purple-400" />
                  </div>
                  <div className="text-3xl font-bold text-white">
                    {stats?.exercisesCompleted || 67}
                  </div>
                  <div className="text-sm text-gray-400">
                    sur {stats?.totalExercises || 120} exercices disponibles
                  </div>
                  <div className="mt-3 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                      style={{
                        width: `${
                          stats?.exercisesCompleted
                            ? (stats.exercisesCompleted /
                                stats.totalExercises) *
                              100
                            : 55
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-gray-300">Temps d'Étude</h3>
                    <FiClock className="text-green-400" />
                  </div>
                  <div className="text-3xl font-bold text-white">
                    {stats?.studyHours || 42}h
                  </div>
                  <div className="text-sm text-gray-400">
                    durant les 30 derniers jours
                  </div>
                  <div className="mt-3 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-teal-500"
                      style={{
                        width: `${
                          stats?.studyHours
                            ? Math.min((stats.studyHours / 60) * 100, 100)
                            : 70
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
                    Performance par Module
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-300">
                          Algorithmes et Structures de Données
                        </span>
                        <span className="text-blue-400">92%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-400"
                          style={{ width: "92%" }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-300">Développement Web</span>
                        <span className="text-purple-400">85%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-purple-400"
                          style={{ width: "85%" }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-300">Base de Données</span>
                        <span className="text-teal-400">78%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-teal-500 to-teal-400"
                          style={{ width: "78%" }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-300">
                          Réseaux et Sécurité
                        </span>
                        <span className="text-green-400">65%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-green-400"
                          style={{ width: "65%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
                    Répartition des Cours
                  </h3>
                  <div className="flex items-center justify-center h-64">
                    <div className="relative w-48 h-48">
                      {/* Pie chart placeholder */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20"></div>
                      <div className="absolute inset-2 bg-gray-900 rounded-full"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white">
                            24
                          </div>
                          <div className="text-sm text-gray-400">
                            Cours au total
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Activities Tab */}
          {activeTab === "activities" && (
            <div className="p-6 relative z-10">
              <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-6">
                Activités Récentes
              </h2>

              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4"
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            activity.type === "course"
                              ? "bg-blue-500/20"
                              : "bg-purple-500/20"
                          }`}
                        >
                          {activity.type === "course" ? (
                            <FiBook className="text-blue-400" />
                          ) : (
                            <FiActivity className="text-purple-400" />
                          )}
                        </div>
                      </div>
                      <div className="ml-4 flex-grow">
                        <div className="text-white">{activity.description}</div>
                        <div className="text-sm text-gray-400 mt-1">
                          <FiClock className="inline mr-1" />
                          {new Date(activity.timestamp).toLocaleDateString(
                            "fr-FR",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;