import React, { useState, useEffect } from "react";
import axios from "axios";
import { User, MessageSquare } from "lucide-react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiEdit,
  FiSave,
  FiX,
  FiGrid,
  FiAward,
  FiActivity,
  FiBookmark,
  FiShield,
  FiLogOut,
  FiMessageSquare,
  FiHelpCircle,
  FiThumbsUp,
} from "react-icons/fi";
import defaultAvatar from "../../Products/imgs/pexels-photo-771742.jpeg";
import { FiBarChart2 } from "react-icons/fi";


const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [activeTab, setActiveTab] = useState("profile");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [forumStats, setForumStats] = useState({
    totalQuestions: 0,
    totalAnswers: 0,
    engagementRate: 0,
    mostActiveCategory: "Aucune",
    likesReceived: 0,
  });
  const [statistics, setStatistics] = useState({
    accountCreationDate: "",
    contentInteractions: 0,
    fireScore: 0,
    forumContributions: 0,
    lastActiveDate: "",
  });

  
  useEffect(() => {
    fetchStudentData();
  }, []);

  


  useEffect(() => {
    console.log("Active tab changed to:", activeTab);
  }, [activeTab]);


  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/register";
  };

  const fetchStudentData = async () => {
    try {
      const userStr = localStorage.getItem("user");
      if (!userStr) {
        window.location.href = "/register";
        return;
      }

      const userData = JSON.parse(userStr);

      // Fetch student profile
      const response = await axios.get(
        `http://localhost:8084/api/etudiant/${userData.id}`
      );
      console.log("user all infos", response.data);
      console.log("Setting statistics with:", {
        accountCreationDate: response.data.accountCreationDate,
        contentInteractions: response.data.contentInteractions,
        fireScore: response.data.fireScore,
        forumContributions: response.data.forumContributions,
        lastActiveDate: response.data.lastActiveDate,
      });
      setStudent(response.data);
      setFormData(response.data);
      setStatistics({
        accountCreationDate: response.data.accountCreationDate,
        contentInteractions: response.data.contentInteractions,
        fireScore: response.data.fireScore,
        forumContributions: response.data.forumContributions,
        lastActiveDate: response.data.lastActiveDate,
      });
      // Fetch forum data
      await fetchForumData(userData.id);

      setLoading(false);
    } catch (err) {
      console.error("Error fetching student data:", err);
      setError("Failed to load student data. Please try again later.");
      setLoading(false);
    }
  };

  const fetchForumData = async (userId) => {
    try {
      const [questionsRes, answersRes] = await Promise.all([
        axios.get(`http://localhost:8084/api/questions/user/${userId}`),
        axios.get(`http://localhost:8084/api/res/users/${userId}/reponses`),
      ]);

      setQuestions(questionsRes.data);
      setAnswers(answersRes.data);

      // Calculate forum statistics
      const totalQuestions = questionsRes.data.length;
      const totalAnswers = answersRes.data.length;
      const engagementRate =
        totalQuestions > 0
          ? Math.round((totalAnswers / totalQuestions) * 100)
          : 0;

      const mostActiveCategory = calculateMostActiveCategory(
        questionsRes.data,
        answersRes.data
      );

      const likesReceived = answersRes.data.reduce(
        (total, answer) => total + (answer.likes || 0),
        0
      );

      setForumStats({
        totalQuestions,
        totalAnswers,
        engagementRate,
        mostActiveCategory,
        likesReceived,
      });
    } catch (err) {
      console.error("Error fetching forum data:", err);
    }
  };

  const calculateMostActiveCategory = (questions, answers) => {
    const categoryCount = {};

    questions.forEach((q) => {
      const category = q.categorie || "Général";
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    });

    answers.forEach((a) => {
      const category = a.question?.categorie || "Général";
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    });

    return (
      Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0]?.[0] ||
      "Aucune"
    );
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

      const userStr = localStorage.getItem("user");
      if (userStr) {
        const userData = JSON.parse(userStr);
        const updatedUserData = {
          ...userData,
          nom: response.data.nom,
          prenom: response.data.prenom,
          email: response.data.email,
          phone: response.data.phone,
        };
        localStorage.setItem("user", JSON.stringify(updatedUserData));
      }
    } catch (err) {
      console.error("Error updating student data:", err);
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
          <div className="px-6 pb-2 pt-4 border-t border-white/10 flex overflow-x-auto relative z-20">
            <button
              onClick={() => {
                console.log("Profile tab clicked");
                setActiveTab("profile");
              }}
              className={`px-4 py-2 mr-4 rounded-lg flex items-center transition-all whitespace-nowrap cursor-pointer relative z-30 ${
                activeTab === "profile"
                  ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-700/30"
              }`}
              style={{ pointerEvents: "auto" }} // Force pointer events
            >
              <User className="mr-2 w-4 h-4 pointer-events-none" />
              Profil
            </button>

            <button
              onClick={() => {
                console.log("Forum tab clicked");
                setActiveTab("forum");
              }}
              className={`px-4 py-2 mr-4 rounded-lg flex items-center transition-all whitespace-nowrap cursor-pointer relative z-30 ${
                activeTab === "forum"
                  ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-700/30"
              }`}
              style={{ pointerEvents: "auto" }} // Force pointer events
            >
              <MessageSquare className="mr-2 w-4 h-4 pointer-events-none" />
              Forum
            </button>
            <button
              onClick={() => setActiveTab("stats")}
              className={`px-4 py-2 mr-4 rounded-lg flex items-center transition-all whitespace-nowrap cursor-pointer relative z-30 ${
                activeTab === "stats"
                  ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-700/30"
              }`}
            >
              <FiBarChart2 className="mr-2 w-4 h-4" />
              Statistiques
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-gray-800 rounded-xl border border-white/10 backdrop-blur-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="p-6 relative z-10">
              {console.log("Rendering profile tab")}
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
                        type="text"
                        name="phone"
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
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Forum Tab */}
          {activeTab === "forum" && (
            <div className="p-6 relative z-10">
              {console.log("Rendering forum tab")}
              <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-6">
                Mes Statistiques du Forum
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-gray-300">Questions Posées</h3>
                    <FiHelpCircle className="text-yellow-400" />
                  </div>
                  <div className="text-3xl font-bold text-white">
                    {forumStats.totalQuestions}
                  </div>
                  <div className="text-sm text-gray-400">dans le forum</div>
                  <div className="mt-3 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-500 to-orange-500"
                      style={{
                        width: `${Math.min(
                          forumStats.totalQuestions * 10,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-gray-300">Réponses Données</h3>
                    <FiMessageSquare className="text-green-400" />
                  </div>
                  <div className="text-3xl font-bold text-white">
                    {forumStats.totalAnswers}
                  </div>
                  <div className="text-sm text-gray-400">dans le forum</div>
                  <div className="mt-3 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-teal-500"
                      style={{
                        width: `${Math.min(
                          forumStats.totalAnswers * 10,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-gray-300">Taux d'Engagement</h3>
                    <FiActivity className="text-blue-400" />
                  </div>
                  <div className="text-3xl font-bold text-white">
                    {forumStats.engagementRate}%
                  </div>
                  <div className="text-sm text-gray-400">
                    (Réponses/Questions)
                  </div>
                  <div className="mt-3 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                      style={{
                        width: `${forumStats.engagementRate}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-gray-300">Appréciations</h3>
                    <FiThumbsUp className="text-pink-400" />
                  </div>
                  <div className="text-3xl font-bold text-white">
                    {forumStats.likesReceived}
                  </div>
                  <div className="text-sm text-gray-400">pour vos réponses</div>
                  <div className="mt-3 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-pink-500 to-rose-500"
                      style={{
                        width: `${Math.min(
                          forumStats.likesReceived * 5,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
                    Vos Questions Récentes
                  </h3>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {questions.length > 0 ? (
                      questions.map((question, index) => (
                        <div
                          key={index}
                          className="p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors"
                        >
                          <div className="font-medium text-white">
                            {question.titre}
                          </div>
                          <div className="text-sm text-gray-400 mt-1">
                            {question.contenu.length > 100
                              ? `${question.contenu.substring(0, 100)}...`
                              : question.contenu}
                          </div>
                          <div className="flex justify-between mt-2">
                            <span className="text-xs text-gray-500">
                              {new Date(
                                question.dateCreation
                              ).toLocaleDateString()}
                            </span>
                            <span className="text-xs text-blue-400">
                              {question.reponses?.length || 0} réponses
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-400">
                        Vous n'avez pas encore posé de questions
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
                    Vos Réponses Récentes
                  </h3>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {answers.length > 0 ? (
                      answers.map((answer, index) => (
                        <div
                          key={index}
                          className="p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors"
                        >
                          <div className="text-sm text-gray-400 mb-1">
                            Réponse à:{" "}
                            <span className="text-white">
                              {answer.question?.titre || "Question sans titre"}
                            </span>
                          </div>
                          <div className="text-white">
                            {answer.contenu.length > 100
                              ? `${answer.contenu.substring(0, 100)}...`
                              : answer.contenu}
                          </div>
                          <div className="flex justify-between mt-2">
                            <span className="text-xs text-gray-500">
                              {new Date(
                                answer.dateReponse
                              ).toLocaleDateString()}
                            </span>
                            <div className="flex items-center text-xs text-pink-400">
                              <FiThumbsUp className="mr-1" />{" "}
                              {answer.likes || 0}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-400">
                        Vous n'avez pas encore répondu à des questions
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-gray-900/50 border border-gray-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
                  Catégorie la Plus Active
                </h3>
                <div className="text-center py-8">
                  <div className="text-4xl font-bold text-white mb-2">
                    {forumStats.mostActiveCategory}
                  </div>
                  <p className="text-gray-400">
                    C'est la catégorie où vous êtes le plus actif dans le forum
                  </p>
                </div>
              </div>
            </div>
          )}
          {activeTab === "stats" && (
            <div className="p-6 relative z-10">
              <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-6">
                Mes Statistiques Générales
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-gray-300">Date de Création</h3>
                    <FiUser className="text-blue-400" />
                  </div>
                  <div className="text-xl font-bold text-white">
                    {new Date(
                      statistics.accountCreationDate
                    ).toLocaleDateString("fr-FR")}
                  </div>
                  <div className="text-sm text-gray-400">Compte créé</div>
                </div>

                <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-gray-300">Dernière Activité</h3>
                    <FiActivity className="text-green-400" />
                  </div>
                  <div className="text-xl font-bold text-white">
                    {new Date(statistics.lastActiveDate).toLocaleDateString(
                      "fr-FR"
                    )}
                  </div>
                  <div className="text-sm text-gray-400">
                    Dernière connexion
                  </div>
                </div>

                <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-gray-300">Score d'Engagement</h3>
                    <FiAward className="text-yellow-400" />
                  </div>
                  <div className="text-3xl font-bold text-white">
                    {statistics.fireScore}
                  </div>
                  <div className="text-sm text-gray-400">Fire Score</div>
                  <div className="mt-3 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-500 to-orange-500"
                      style={{
                        width: `${Math.min(statistics.fireScore / 5, 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              

              <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Résumé d'Activité
                </h3>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">
                      Jours depuis création:
                    </span>
                    <span className="text-white font-medium">
                      {Math.floor(
                        (new Date() -
                          new Date(statistics.accountCreationDate)) /
                          (1000 * 60 * 60 * 24)
                      )}{" "}
                      jours
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Interactions/jour:</span>
                    <span className="text-white font-medium">
                      {(
                        statistics.contentInteractions /
                        Math.floor(
                          (new Date() -
                            new Date(statistics.accountCreationDate)) /
                            (1000 * 60 * 60 * 24)
                        )
                      ).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Score/jour:</span>
                    <span className="text-white font-medium">
                      {(
                        statistics.fireScore /
                        Math.floor(
                          (new Date() -
                            new Date(statistics.accountCreationDate)) /
                            (1000 * 60 * 60 * 24)
                        )
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
