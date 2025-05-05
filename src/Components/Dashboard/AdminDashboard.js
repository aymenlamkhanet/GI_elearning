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
import {
  LineChart,
  BarChart,
  PieChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  Bar,
  Pie,
  Cell,
} from "recharts";
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
        <span className="ml-2 text-gray-300">
          Impossible de charger les statistiques
        </span>
      </div>
    );
  }

  // Chart data for distribution
  const distributionData = [
    { name: "Étudiants", value: stats.totalStudents },
    { name: "Professeurs", value: stats.totalProfessors },
    { name: "Cours", value: stats.totalCourses },
    { name: "Examens", value: stats.totalExams },
    { name: "Exercices", value: stats.totalExercises },
    { name: "Ouvrages", value: stats.totalBooks },
  ];

  // Activity data
  const activityData = stats.activityData || [
    { month: "Jan", students: 20, exams: 5 },
    { month: "Fév", students: 25, exams: 8 },
    { month: "Mar", students: 30, exams: 12 },
    { month: "Avr", students: 40, exams: 15 },
    { month: "Mai", students: 45, exams: 20 },
  ];

  // Performance data
  const performanceData = stats.performanceData || [
    { name: "Excellent", value: stats.excellentPerformance || 30 },
    { name: "Bon", value: stats.goodPerformance || 45 },
    { name: "Moyen", value: stats.averagePerformance || 15 },
    { name: "Faible", value: stats.poorPerformance || 10 },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Étudiants"
          value={stats.totalStudents}
          icon={<GraduationCap className="w-6 h-6" />}
          color="bg-blue-500"
        />
        <StatCard
          title="Professeurs"
          value={stats.totalProfessors}
          icon={<UserCheck className="w-6 h-6" />}
          color="bg-green-500"
        />
        <StatCard
          title="Cours"
          value={stats.totalCourses}
          icon={<BookIcon className="w-6 h-6" />}
          color="bg-purple-500"
        />
        <StatCard
          title="Examens"
          value={stats.totalExams}
          icon={<ClipboardList className="w-6 h-6" />}
          color="bg-red-500"
        />
        <StatCard
          title="Exercices"
          value={stats.totalExercises}
          icon={<FileSpreadsheet className="w-6 h-6" />}
          color="bg-yellow-500"
        />
        <StatCard
          title="Ouvrages"
          value={stats.totalBooks}
          icon={<Layers className="w-6 h-6" />}
          color="bg-indigo-500"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribution Pie Chart */}
        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-medium text-gray-200 mb-4">
            Distribution des ressources
          </h3>
          <div className="flex justify-center">
            <PieChart width={300} height={300}>
              <Pie
                data={distributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {distributionData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>

        {/* Activity Bar Chart */}
        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-medium text-gray-200 mb-4">
            Activité mensuelle
          </h3>
          <BarChart width={500} height={300} data={activityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="month" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "1px solid #374151",
                borderRadius: "0.375rem",
              }}
              labelStyle={{ color: "#e5e7eb" }}
              itemStyle={{ color: "#e5e7eb" }}
            />
            <Legend />
            <Bar dataKey="students" name="Étudiants" fill="#0088FE" />
            <Bar dataKey="exams" name="Examens" fill="#00C49F" />
          </BarChart>
        </div>

        {/* Performance Pie Chart */}
        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-medium text-gray-200 mb-4">
            Performance des étudiants
          </h3>
          <div className="flex justify-center">
            <PieChart width={300} height={300}>
              <Pie
                data={performanceData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {performanceData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>

        {/* Recent Activity Line Chart */}
        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-medium text-gray-200 mb-4">
            Tendances récentes
          </h3>
          <LineChart width={500} height={300} data={activityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="month" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "1px solid #374151",
                borderRadius: "0.375rem",
              }}
              labelStyle={{ color: "#e5e7eb" }}
              itemStyle={{ color: "#e5e7eb" }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="students"
              name="Étudiants"
              stroke="#0088FE"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="exams"
              name="Examens"
              stroke="#00C49F"
            />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-white/10 flex items-center">
      <div className={`${color} p-3 rounded-lg`}>{icon}</div>
      <div className="ml-4">
        <h3 className="text-gray-400 text-sm">{title}</h3>
        <p className="text-2xl font-semibold text-white">{value || 0}</p>
      </div>
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
        // Call to DashboardController
        const response = await axios.get(`${API_BASE_URL}/dashboard/stats`);
        setStats(response.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch dashboard statistics:", err);
        setError(
          "Impossible de charger les statistiques. Veuillez réessayer plus tard."
        );
        // Fallback to demo data if API fails
        setStats({
          totalStudents: 245,
          totalProfessors: 32,
          totalCourses: 58,
          totalExams: 124,
          totalExercises: 367,
          totalBooks: 89,
          activityData: [
            { month: "Jan", students: 20, exams: 5 },
            { month: "Fév", students: 25, exams: 8 },
            { month: "Mar", students: 30, exams: 12 },
            { month: "Avr", students: 40, exams: 15 },
            { month: "Mai", students: 45, exams: 20 },
          ],
          performanceData: [
            { name: "Excellent", value: 30 },
            { name: "Bon", value: 45 },
            { name: "Moyen", value: 15 },
            { name: "Faible", value: 10 },
          ],
        });
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
        // Call to StudentController
        const studentsResponse = await axios.get(`${API_BASE_URL}/students`);
        setStudents(studentsResponse.data);

        // Call to StudentController for stats
        const statsResponse = await axios.get(`${API_BASE_URL}/students/stats`);
        setStats(statsResponse.data);

        setError(null);
      } catch (err) {
        console.error("Failed to fetch students data:", err);
        setError("Impossible de charger les données des étudiants.");
        // Fallback data
        setStats({
          totalStudents: 245,
          maleCount: 135,
          femaleCount: 110,
          averageAge: 21.5,
          yearDistribution: [
            { year: "1ère année", count: 80 },
            { year: "2ème année", count: 75 },
            { year: "3ème année", count: 65 },
            { year: "4ème année", count: 25 },
          ],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStudentsData();
  }, []);

  // Pass the fetched data to your component
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
        // Call to ProfessorController
        const professorsResponse = await axios.get(
          `${API_BASE_URL}/professors`
        );
        setProfessors(professorsResponse.data);

        // Call to ProfessorController for stats
        const statsResponse = await axios.get(
          `${API_BASE_URL}/professors/stats`
        );
        setStats(statsResponse.data);

        setError(null);
      } catch (err) {
        console.error("Failed to fetch professors data:", err);
        setError("Impossible de charger les données des professeurs.");
        // Fallback data
        setStats({
          totalProfessors: 32,
          departmentDistribution: [
            { department: "Informatique", count: 8 },
            { department: "Mathématiques", count: 7 },
            { department: "Physique", count: 5 },
            { department: "Langues", count: 6 },
            { department: "Économie", count: 6 },
          ],
          averageExperience: 12.5,
        });
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
        // Call to CourseController
        const coursesResponse = await axios.get(`${API_BASE_URL}/courses`);
        setCourses(coursesResponse.data);

        // Call to CourseController for stats
        const statsResponse = await axios.get(`${API_BASE_URL}/courses/stats`);
        setStats(statsResponse.data);

        setError(null);
      } catch (err) {
        console.error("Failed to fetch courses data:", err);
        setError("Impossible de charger les données des cours.");
        // Fallback data
        setStats({
          totalCourses: 58,
          departmentDistribution: [
            { department: "Informatique", count: 15 },
            { department: "Mathématiques", count: 12 },
            { department: "Physique", count: 10 },
            { department: "Langues", count: 8 },
            { department: "Économie", count: 13 },
          ],
          averageStudentsPerCourse: 35,
        });
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
        // Call to ExamenController
        const examsResponse = await axios.get(`${API_BASE_URL}/exams`);
        setExams(examsResponse.data);

        // Call to ExamenController for stats
        const statsResponse = await axios.get(`${API_BASE_URL}/exams/stats`);
        setStats(statsResponse.data);

        setError(null);
      } catch (err) {
        console.error("Failed to fetch exams data:", err);
        setError("Impossible de charger les données des examens.");
        // Fallback data
        setStats({
          totalExams: 124,
          upcomingExams: 18,
          completedExams: 106,
          averageScore: 14.5,
          scoreDistribution: [
            { range: "0-5", count: 8 },
            { range: "6-10", count: 25 },
            { range: "11-15", count: 55 },
            { range: "16-20", count: 36 },
          ],
        });
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
        // Call to ExerciseController
        const exercisesResponse = await axios.get(`${API_BASE_URL}/exercises`);
        setExercises(exercisesResponse.data);

        // Call to ExerciseController for stats
        const statsResponse = await axios.get(
          `${API_BASE_URL}/exercises/stats`
        );
        setStats(statsResponse.data);

        setError(null);
      } catch (err) {
        console.error("Failed to fetch exercises data:", err);
        setError("Impossible de charger les données des exercices.");
        // Fallback data
        setStats({
          totalExercises: 367,
          difficultiesDistribution: [
            { difficulty: "Facile", count: 120 },
            { difficulty: "Moyen", count: 157 },
            { difficulty: "Difficile", count: 90 },
          ],
          completionRate: 68.5,
        });
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
        // Call to BookController
        const booksResponse = await axios.get(`${API_BASE_URL}/books`);
        setBooks(booksResponse.data);

        // Call to BookController for stats
        const statsResponse = await axios.get(`${API_BASE_URL}/books/stats`);
        setStats(statsResponse.data);

        setError(null);
      } catch (err) {
        console.error("Failed to fetch books data:", err);
        setError("Impossible de charger les données des ouvrages.");
        // Fallback data
        setStats({
          totalBooks: 89,
          categoryDistribution: [
            { category: "Informatique", count: 28 },
            { category: "Mathématiques", count: 22 },
            { category: "Physique", count: 15 },
            { category: "Langues", count: 12 },
            { category: "Économie", count: 12 },
          ],
          availableBooks: 65,
          borrowedBooks: 24,
        });
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
        // Call to ReportController
        const reportsResponse = await axios.get(`${API_BASE_URL}/reports`);
        setReports(reportsResponse.data);

        // Call to ReportController for stats
        const statsResponse = await axios.get(`${API_BASE_URL}/reports/stats`);
        setStats(statsResponse.data);

        setError(null);
      } catch (err) {
        console.error("Failed to fetch reports data:", err);
        setError("Impossible de charger les données des rapports.");
        // Fallback data
        setStats({
          totalReports: 75,
          categoryDistribution: [
            { category: "Académique", count: 35 },
            { category: "Financier", count: 15 },
            { category: "Administratif", count: 25 },
          ],
          recentReports: 12,
        });
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
        // Call to AdminController
        const profileResponse = await axios.get(
          `${API_BASE_URL}/admin/profile`
        );
        setProfile(profileResponse.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch profile data:", err);
        setError("Impossible de charger les données du profil.");
        // Fallback data
        setProfile({
          id: 1,
          name: "Admin User",
          email: "admin@example.com",
          role: "Administrateur",
          lastLogin: "2025-05-04T15:30:00Z",
        });
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
