import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentsComponent from "./StudentsComponent";
import ProfesseurComponent from "./ProfesseurComponent";
import CoursesComponent from "./CoursesComponent";
import ExamenComponent from "./ExamenComponent";
import ExerciseComponent from "./ExerciseComponent";
import OuvragesComponent from "./OuvragesComponent";
import ProfilePage from "./ProfilePage";
import RapportsPage from "./RapportsPage";
import ExerciseDashboard from "./ExerciseDashboard";
import {
  Home,
  GraduationCap,
  ClipboardList,
  BarChart2,
  User,
  Menu,
  X,
  UserCheck,
  Book as BookIcon,
  Layers,
  FileSpreadsheet,
  AlertCircle,
  Loader,
} from "lucide-react";
import OuvrageDashboard from "./OuvrageDashboard";

// API base URL - change this to match your Spring Boot backend
const API_BASE_URL = "http://localhost:8084/api";

// Dashboard Stats component to display statistics with charts
const DashboardStats = ({ loading, stats }) => {
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#82ca9d",
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="w-8 h-8 animate-spin text-blue-400" />
        <span className="ml-2 text-gray-300">
          Chargement des statistiques...
        </span>
      </div>
    );
  }

  if (!stats || Object.keys(stats).length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <AlertCircle className="w-8 h-8 text-red-400" />
        <span className="ml-2 text-gray-300">Aucune donnée disponible</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Étudiants"
          value={stats.totalStudents}
          icon={<GraduationCap className="w-5 h-5" />}
          trend={stats.studentTrend}
        />
        <StatCard
          title="Professeurs"
          value={stats.totalProfessors}
          icon={<UserCheck className="w-5 h-5" />}
          trend={stats.professorTrend}
        />
        <StatCard
          title="Cours Actifs"
          value={stats.totalCours}
          icon={<BookIcon className="w-5 h-5" />}
          trend={stats.courseTrend}
        />
        <StatCard
          title="Examens à Venir"
          value={stats.totalExams}
          icon={<ClipboardList className="w-5 h-5" />}
          trend={stats.examTrend}
        />
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Students */}
        <div className="bg-gray-800/50 p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-medium text-gray-200 mb-4">
            Derniers Étudiants Inscrits
          </h3>
          {stats.latestStudents?.length > 0 ? (
            <div className="space-y-4">
              {stats.latestStudents.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-3 bg-gray-700/20 rounded-lg"
                >
                  <div>
                    <p className="text-gray-200 font-medium">{student.nom}</p>
                    <p className="text-sm text-gray-400">{student.email}</p>
                  </div>
                  <span className="text-sm text-gray-400">
                    {student.niveau}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-4">
              Aucun étudiant récent
            </p>
          )}
        </div>

        {/* Recent Professors */}
        <div className="bg-gray-800/50 p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-medium text-gray-200 mb-4">
            Derniers Professeurs Ajoutés
          </h3>
          {stats.latestProfessors?.length > 0 ? (
            <div className="space-y-4">
              {stats.latestProfessors.map((professor) => (
                <div
                  key={professor.id}
                  className="flex items-center justify-between p-3 bg-gray-700/20 rounded-lg"
                >
                  <div>
                    <p className="text-gray-200 font-medium">{professor.nom}</p>
                    <p className="text-sm text-gray-400">{professor.module}</p>
                  </div>
                  <span className="text-sm text-gray-400">
                    {professor.phone}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-4">
              Aucun professeur récent
            </p>
          )}
        </div>
        <ExerciseDashboard/>
        <OuvrageDashboard/>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, icon, trend }) => {
  const trendColor = trend > 0 ? "text-green-400" : "text-red-400";
  const trendIcon = trend > 0 ? "↑" : "↓";

  return (
    <div className="bg-gray-800/50 p-4 rounded-xl border border-white/10 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="p-2 bg-gray-700/30 rounded-lg">{icon}</div>
        <div>
          <h3 className="text-gray-400 text-sm">{title}</h3>
          <p className="text-2xl font-semibold text-white">{value || 0}</p>
        </div>
      </div>
      {trend !== undefined && (
        <div className={`text-sm ${trendColor}`}>
          {trendIcon} {Math.abs(trend)}%
        </div>
      )}
    </div>
  );
};

// Enhanced Dashboard Component with API integration - Dashboard Controller
const EnhancedDashboardComponent = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        setError(null);

        const [
          studentCount,
          professorCount,
          bookCount,
          reportCount,
          examCount,
          exerciseCount,
          coursCount,
        ] = await Promise.all([
          axios.get(`${API_BASE_URL}/etudiant/count`),
          axios.get(`${API_BASE_URL}/professeur/count`),
          axios.get(`${API_BASE_URL}/ouvrages/count`),
          axios.get(`${API_BASE_URL}/report/count`),
          axios.get(`${API_BASE_URL}/examens/count`),
          axios.get(`${API_BASE_URL}/exercices/count`),
          axios.get(`${API_BASE_URL}/exercices/count`),
          axios.get(`${API_BASE_URL}/cours/count`),
        ]);

        const [latestStudents, latestProfessors] = await Promise.all([
          axios.get(`${API_BASE_URL}/etudiant/recent`),
          axios.get(`${API_BASE_URL}/professeur/recent`),
        ]);

        

        setStats({
          totalStudents: studentCount.data,
          totalProfessors: professorCount.data,
          totalBooks: bookCount.data,
          totalReports: reportCount.data,
          totalCours: coursCount.data,
          totalExams: examCount.data,
          totalExercises: exerciseCount.data,
          latestStudents: latestStudents.data,
          latestProfessors: latestProfessors.data,
        });
      } catch (err) {
        console.error("Failed to fetch dashboard statistics:", err);
        setError("Erreur lors du chargement des données");
        setStats({});
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Tableau de Bord</h1>

      {error && (
        <div className="bg-red-500/20 border border-red-500/30 text-red-300 p-4 rounded-lg flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}

      <DashboardStats loading={loading} stats={stats} />
    </div>
  );
};

// Enhanced Students Component - StudentController
const EnhancedStudentsComponent = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStudentsData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [studentsResponse, statsResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/etudiant`),
          axios.get(`${API_BASE_URL}/etudiant/stats`),
        ]);
        setStudents(studentsResponse.data);
        setStats(statsResponse.data);
      } catch (err) {
        console.error("Failed to fetch students data:", err);
        setError("Impossible de charger les données des étudiants.");
        setStudents([]);
        setStats({});
      } finally {
        setLoading(false);
      }
    };

    fetchStudentsData();
  }, []);

  return (
    <StudentsComponent
      students={students}
      stats={stats}
      loading={loading}
      error={error}
    />
  );
};

// Enhanced Professors Component - ProfessorController
const EnhancedProfesseurComponent = () => {
  const [professors, setProfessors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchProfessorData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [professorsResponse, statsResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/professeur`),
          axios.get(`${API_BASE_URL}/professeur/stats`),
        ]);
        setProfessors(professorsResponse.data);
        setStats(statsResponse.data);
      } catch (err) {
        console.error("Failed to fetch professors data:", err);
        setError("Impossible de charger les données des professeurs.");
        setProfessors([]);
        setStats({});
      } finally {
        setLoading(false);
      }
    };
    fetchProfessorData();
  }, []);

  return (
    <ProfesseurComponent
      professors={professors}
      stats={stats}
      loading={loading}
      error={error}
    />
  );
};

// Enhanced Courses Component - CourseController
const EnhancedCoursesComponent = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchCoursesData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [coursesResponse, statsResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/cours`),
          axios.get(`${API_BASE_URL}/cours/stats`),
        ]);
        setCourses(coursesResponse.data);
        setStats(statsResponse.data);
      } catch (err) {
        console.error("Failed to fetch courses data:", err);
        setError("Impossible de charger les données des cours.");
        setCourses([]);
        setStats({});
      } finally {
        setLoading(false);
      }
    };

    fetchCoursesData();
  }, []);

  return (
    <CoursesComponent
      courses={courses}
      stats={stats}
      loading={loading}
      error={error}
    />
  );
};

// Enhanced Exams Component - ExamenController
const EnhancedExamenComponent = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchExamsData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [examsResponse, statsResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/examens`),
          axios.get(`${API_BASE_URL}/examens/stats`),
        ]);
        setExams(examsResponse.data);
        setStats(statsResponse.data);
      } catch (err) {
        console.error("Failed to fetch exams data:", err);
        setError("Impossible de charger les données des examens.");
        setExams([]);
        setStats({});
      } finally {
        setLoading(false);
      }
    };

    fetchExamsData();
  }, []);

  return (
    <ExamenComponent
      exams={exams}
      stats={stats}
      loading={loading}
      error={error}
    />
  );
};

// Enhanced Exercise Component - ExerciseController
const EnhancedExerciseComponent = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchExercisesData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [exercisesResponse, statsResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/exercices`),
          axios.get(`${API_BASE_URL}/exercices/stats`),
        ]);
        setExercises(exercisesResponse.data);
        setStats(statsResponse.data);
      } catch (err) {
        console.error("Failed to fetch exercises data:", err);
        setError("Impossible de charger les données des exercices.");
        setExercises([]);
        setStats({});
      } finally {
        setLoading(false);
      }
    };

    fetchExercisesData();
  }, []);

  return (
    <ExerciseComponent
      exercises={exercises}
      stats={stats}
      loading={loading}
      error={error}
    />
  );
};

// Enhanced Ouvrages Component - BookController
const EnhancedOuvragesComponent = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchBooksData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [booksResponse, statsResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/ouvrages`),
          axios.get(`${API_BASE_URL}/ouvrages/stats`),
        ]);
        setBooks(booksResponse.data);
        setStats(statsResponse.data);
      } catch (err) {
        console.error("Failed to fetch books data:", err);
        setError("Impossible de charger les données des ouvrages.");
        setBooks([]);
        setStats({});
      } finally {
        setLoading(false);
      }
    };

    fetchBooksData();
  }, []);

  return (
    <OuvragesComponent
      books={books}
      stats={stats}
      loading={loading}
      error={error}
    />
  );
};

// Enhanced Reports Component - ReportController
const EnhancedRapportsPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchReportsData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all reports and stats in parallel
        const [reportsResponse, statsResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/report`), // Changed from /report/AllReports
          axios.get(`${API_BASE_URL}/report/stats`),
        ]);

        setReports(reportsResponse.data);
        setStats(statsResponse.data);
      } catch (err) {
        console.error("Failed to fetch reports data:", err);
        setError("Impossible de charger les données des rapports.");
        setReports([]);
        setStats({});
      } finally {
        setLoading(false);
      }
    };

    fetchReportsData();
  }, []);

  return (
    <RapportsPage
      reports={reports}
      stats={stats}
      loading={loading}
      error={error}
    />
  );
};

// Enhanced Profile Component - AdminController
const EnhancedProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        setError(null);

        const profileResponse = await axios.get(`${API_BASE_URL}/chef/profile`);
        setProfile(profileResponse.data);
      } catch (err) {
        console.error("Failed to fetch profile data:", err);
        setError("Impossible de charger les données du profil.");
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  return <ProfilePage profile={profile} loading={loading} error={error} />;
};

// Main Admin Dashboard Component
const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <EnhancedDashboardComponent />;
      case "students":
        return <EnhancedStudentsComponent />;
      case "professors":
        return <EnhancedProfesseurComponent />;
      case "courses":
        return <EnhancedCoursesComponent />;
      case "exams":
        return <EnhancedExamenComponent />;
      case "exercises":
        return <EnhancedExerciseComponent />;
      case "ouvrages":
        return <EnhancedOuvragesComponent />;
      case "reports":
        return <EnhancedRapportsPage />;
      case "profile":
        return <EnhancedProfilePage />;
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
                { section: "dashboard", icon: Home, label: "Accueil" },
                {
                  section: "students",
                  icon: GraduationCap,
                  label: "Étudiants",
                },
                {
                  section: "professors",
                  icon: UserCheck,
                  label: "Professeurs",
                },
                { section: "courses", icon: BookIcon, label: "Cours" },
                { section: "exams", icon: ClipboardList, label: "Examens" },
                {
                  section: "exercises",
                  icon: FileSpreadsheet,
                  label: "Exercices",
                },
                { section: "ouvrages", icon: Layers, label: "Ouvrages" },
                { section: "reports", icon: BarChart2, label: "Rapports" },
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
