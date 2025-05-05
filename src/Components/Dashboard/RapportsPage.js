import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FileText,
  Download,
  Filter,
  Calendar as CalendarIcon,
  BarChart2,
  PieChart,
  LineChart,
  Table,
  Printer,
  Search,
  ChevronDown,
  ChevronUp,
  Plus,
  RefreshCw,
  Settings,
  BookOpen,
  UserCheck,
  Award,
  Clock,
  X,
  Trash2,
  Edit,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

// API base URL
const API_BASE_URL = "http://localhost:8084/api/report";

const RapportsPage = () => {
  // Report types
  const reportTypes = [
    { id: 1, name: "Rapports d'étudiants", icon: UserCheck },
    { id: 2, name: "Rapports de cours", icon: BookOpen },
    { id: 3, name: "Rapports d'examens", icon: Award },
    { id: 4, name: "Rapports de fréquentation", icon: Clock },
  ];

  // Reports state
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters state
  const [filters, setFilters] = useState({
    type: "all",
    dateRange: "lastMonth",
    sortBy: "dateDesc",
  });

  // View mode (grid or list)
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFilters, setExpandedFilters] = useState(false);

  // Modal states
  const [showNewReportModal, setShowNewReportModal] = useState(false);
  const [showEditReportModal, setShowEditReportModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);

  // Form data state
  const [newReportData, setNewReportData] = useState({
    title: "",
    description: "",
    status: "DRAFT",
    authorId: "user123", // You might want to get this from authentication context
  });

  // Fetch all reports on component mount
  useEffect(() => {
    fetchReports();
  }, []);

  // Fetch reports from API
  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/AllReports`);
      // Format the reports for display
      const formattedReports = response.data.map((report) => ({
        id: report.id,
        title: report.title,
        type: getReportTypeFromTitle(report.title), // Extract type from title or use a default
        date: formatDate(report.createdAt),
        createdAt: report.createdAt,
        status: report.status,
        description: report.description,
        authorId: report.authorId,
        size: getRandomSize(), // You might want to add a size field to your backend model
        downloads: Math.floor(Math.random() * 100), // Placeholder
        favorite: Math.random() > 0.5, // Placeholder
      }));
      setReports(formattedReports);
      setError(null);
    } catch (err) {
      console.error("Error fetching reports:", err);
      setError(
        "Impossible de charger les rapports. Veuillez réessayer plus tard."
      );
    } finally {
      setLoading(false);
    }
  };

  // Helper function to extract report type from title
  const getReportTypeFromTitle = (title) => {
    if (title.toLowerCase().includes("étudiant")) return "Étudiants";
    if (title.toLowerCase().includes("cours")) return "Cours";
    if (title.toLowerCase().includes("examen")) return "Examens";
    if (title.toLowerCase().includes("fréquentation")) return "Fréquentation";
    return "Autre";
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };

  // Helper function to generate random file size (placeholder)
  const getRandomSize = () => {
    return `${(Math.random() * 5).toFixed(1)} MB`;
  };

  // Handle creating a new report
  const createReport = async () => {
    try {
      // Ensure we have at least a title
      if (!newReportData.title.trim()) {
        alert("Le titre du rapport est obligatoire");
        return;
      }

      const response = await axios.post(
        `${API_BASE_URL}/addReport`,
        newReportData
      );

      // Add the new report to the state
      const newReport = response.data;
      setReports([
        ...reports,
        {
          id: newReport.id,
          title: newReport.title,
          type: getReportTypeFromTitle(newReport.title),
          date: formatDate(newReport.createdAt),
          createdAt: newReport.createdAt,
          status: newReport.status,
          description: newReport.description,
          authorId: newReport.authorId,
          size: getRandomSize(),
          downloads: 0,
          favorite: false,
        },
      ]);

      // Close modal and reset form
      setShowNewReportModal(false);
      setSelectedReportType(null);
      setNewReportData({
        title: "",
        description: "",
        status: "DRAFT",
        authorId: "user123", // Default author ID
      });
    } catch (err) {
      console.error("Error creating report:", err);
      alert("Une erreur est survenue lors de la création du rapport.");
    }
  };

  // Handle updating a report
  const updateReport = async () => {
    try {
      if (!selectedReport) return;

      const response = await axios.put(`${API_BASE_URL}/${selectedReport.id}`, {
        title: selectedReport.title,
        description: selectedReport.description,
        status: selectedReport.status,
        authorId: selectedReport.authorId,
      });

      // Update the report in state
      const updatedReport = response.data;
      setReports(
        reports.map((report) =>
          report.id === updatedReport.id
            ? {
                ...report,
                title: updatedReport.title,
                type: getReportTypeFromTitle(updatedReport.title),
                description: updatedReport.description,
                status: updatedReport.status,
              }
            : report
        )
      );

      // Close modal
      setShowEditReportModal(false);
      setSelectedReport(null);
    } catch (err) {
      console.error("Error updating report:", err);
      alert("Une erreur est survenue lors de la mise à jour du rapport.");
    }
  };

  // Handle updating a report's status
  const updateReportStatus = async (id, newStatus) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/${id}/status`,
        newStatus
      );

      // Update the report in state
      setReports(
        reports.map((report) =>
          report.id === id ? { ...report, status: newStatus } : report
        )
      );
    } catch (err) {
      console.error("Error updating report status:", err);
      alert(
        "Une erreur est survenue lors de la mise à jour du statut du rapport."
      );
    }
  };

  // Handle deleting a report
  const deleteReport = async () => {
    try {
      if (!selectedReport) return;

      await axios.delete(`${API_BASE_URL}/${selectedReport.id}`);

      // Remove the report from state
      setReports(reports.filter((report) => report.id !== selectedReport.id));

      // Close modal
      setShowDeleteConfirmModal(false);
      setSelectedReport(null);
    } catch (err) {
      console.error("Error deleting report:", err);
      alert("Une erreur est survenue lors de la suppression du rapport.");
    }
  };

  // Handle search
  const searchReports = async () => {
    if (!searchQuery.trim()) {
      fetchReports();
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/search?title=${searchQuery}`
      );
      const formattedReports = response.data.map((report) => ({
        id: report.id,
        title: report.title,
        type: getReportTypeFromTitle(report.title),
        date: formatDate(report.createdAt),
        createdAt: report.createdAt,
        status: report.status,
        description: report.description,
        authorId: report.authorId,
        size: getRandomSize(),
        downloads: Math.floor(Math.random() * 100),
        favorite: Math.random() > 0.5,
      }));
      setReports(formattedReports);
    } catch (err) {
      console.error("Error searching reports:", err);
      setError("Erreur lors de la recherche. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  // Handle filter by date range
  const filterByDateRange = async (range) => {
    const now = new Date();
    let startDate;

    switch (range) {
      case "lastWeek":
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case "lastMonth":
        startDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case "lastQuarter":
        startDate = new Date(now.setMonth(now.getMonth() - 3));
        break;
      case "lastYear":
        startDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      default:
        // All time - no filtering
        fetchReports();
        return;
    }

    const formattedStartDate = startDate.toISOString();
    const formattedEndDate = new Date().toISOString();

    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/date-range?startDate=${formattedStartDate}&endDate=${formattedEndDate}`
      );

      const formattedReports = response.data.map((report) => ({
        id: report.id,
        title: report.title,
        type: getReportTypeFromTitle(report.title),
        date: formatDate(report.createdAt),
        createdAt: report.createdAt,
        status: report.status,
        description: report.description,
        authorId: report.authorId,
        size: getRandomSize(),
        downloads: Math.floor(Math.random() * 100),
        favorite: Math.random() > 0.5,
      }));

      setReports(formattedReports);
    } catch (err) {
      console.error("Error filtering reports by date:", err);
      setError("Erreur lors du filtrage par date. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  // Handle filter by status
  const filterByStatus = async (status) => {
    if (status === "all") {
      fetchReports();
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/status/${status}`);

      const formattedReports = response.data.map((report) => ({
        id: report.id,
        title: report.title,
        type: getReportTypeFromTitle(report.title),
        date: formatDate(report.createdAt),
        createdAt: report.createdAt,
        status: report.status,
        description: report.description,
        authorId: report.authorId,
        size: getRandomSize(),
        downloads: Math.floor(Math.random() * 100),
        favorite: Math.random() > 0.5,
      }));

      setReports(formattedReports);
    } catch (err) {
      console.error("Error filtering reports by status:", err);
      setError("Erreur lors du filtrage par statut. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  // Apply filters
  const applyFilters = () => {
    // Apply date range filter
    if (filters.dateRange !== "all") {
      filterByDateRange(filters.dateRange);
    }

    // Apply type filter (we'll do this client-side for now)
    // In a real app, you might want to add a type field to your backend model

    // Apply sorting
    const sortedReports = [...reports].sort((a, b) => {
      if (filters.sortBy === "dateDesc")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (filters.sortBy === "dateAsc")
        return new Date(a.createdAt) - new Date(b.createdAt);
      if (filters.sortBy === "downloadsDesc") return b.downloads - a.downloads;
      return 0;
    });

    setReports(sortedReports);
  };

  // Handle new report modal
  const handleNewReportClick = () => {
    setShowNewReportModal(true);
    setSelectedReportType(null);
    setNewReportData({
      title: "",
      description: "",
      status: "DRAFT",
      authorId: "user123", // Default author ID
    });
  };

  // Handle edit report
  const handleEditReport = (report) => {
    setSelectedReport({ ...report });
    setShowEditReportModal(true);
  };

  // Handle delete report confirmation
  const handleDeleteConfirm = (report) => {
    setSelectedReport(report);
    setShowDeleteConfirmModal(true);
  };

  // Handle report type selection
  const selectReportType = (type) => {
    setSelectedReportType(type);

    // Set a default title based on the report type
    let defaultTitle = "";
    switch (type.id) {
      case 1:
        defaultTitle = "Rapport d'étudiant - ";
        break;
      case 2:
        defaultTitle = "Rapport de cours - ";
        break;
      case 3:
        defaultTitle = "Rapport d'examen - ";
        break;
      case 4:
        defaultTitle = "Rapport de fréquentation - ";
        break;
      default:
        defaultTitle = "Nouveau rapport - ";
    }

    setNewReportData({
      ...newReportData,
      title: defaultTitle + new Date().toLocaleDateString(),
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setNewReportData({
      ...newReportData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle edit form input changes
  const handleEditInputChange = (e) => {
    setSelectedReport({
      ...selectedReport,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmitReport = (e) => {
    e.preventDefault();
    createReport();
  };

  // Toggle favorite status (client-side only for now)
  const toggleFavorite = (id) => {
    setReports(
      reports.map((report) =>
        report.id === id ? { ...report, favorite: !report.favorite } : report
      )
    );
  };

  // Filter reports based on filters and search
  const filteredReports = reports.filter((report) => {
    const matchesType =
      filters.type === "all" ||
      report.type.toLowerCase().includes(filters.type.toLowerCase());
    const matchesSearch = report.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  // Get status badge color
  const getStatusBadge = (status) => {
    switch (status) {
      case "DRAFT":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
            <div className="w-2 h-2 bg-gray-400 rounded-full mr-1.5"></div>
            Brouillon
          </span>
        );
      case "SUBMITTED":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900/30 text-blue-300">
            <div className="w-2 h-2 bg-blue-400 rounded-full mr-1.5"></div>
            Soumis
          </span>
        );
      case "APPROVED":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/30 text-green-300">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></div>
            Approuvé
          </span>
        );
      case "REJECTED":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-900/30 text-red-300">
            <div className="w-2 h-2 bg-red-400 rounded-full mr-1.5"></div>
            Rejeté
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
            {status}
          </span>
        );
    }
  };

  const renderFormFields = () => {
    if (!selectedReportType) return null;

    switch (selectedReportType.id) {
      case 1: // Student reports
        return (
          <>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Titre du rapport
                </label>
                <input
                  type="text"
                  name="title"
                  value={newReportData.title}
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={newReportData.description}
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg"
                  rows="3"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Étudiant
                </label>
                <select
                  name="student"
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg"
                  onChange={handleInputChange}
                >
                  <option value="">Sélectionner un étudiant</option>
                  <option value="1">Étudiant 1</option>
                  <option value="2">Étudiant 2</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Période
                </label>
                <input
                  type="month"
                  name="period"
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </>
        );

      case 2: // Course reports
        return (
          <>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Titre du rapport
                </label>
                <input
                  type="text"
                  name="title"
                  value={newReportData.title}
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={newReportData.description}
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg"
                  rows="3"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Cours
                </label>
                <select
                  name="course"
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg"
                  onChange={handleInputChange}
                >
                  <option value="">Sélectionner un cours</option>
                  <option value="math">Mathématiques</option>
                  <option value="physics">Physique</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Type de rapport
                </label>
                <select
                  name="reportType"
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg"
                  onChange={handleInputChange}
                >
                  <option value="">Choisir un type</option>
                  <option value="success">Taux de réussite</option>
                  <option value="participation">Participation</option>
                </select>
              </div>
            </div>
          </>
        );

      case 3: // Exam reports
        return (
          <>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Titre du rapport
                </label>
                <input
                  type="text"
                  name="title"
                  value={newReportData.title}
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={newReportData.description}
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg"
                  rows="3"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Examen
                </label>
                <select
                  name="exam"
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg"
                  onChange={handleInputChange}
                >
                  <option value="">Sélectionner un examen</option>
                  <option value="midterm">Examen de mi-session</option>
                  <option value="final">Examen final</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Session
                </label>
                <select
                  name="session"
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg"
                  onChange={handleInputChange}
                >
                  <option value="">Sélectionner une session</option>
                  <option value="winter">Hiver 2025</option>
                  <option value="summer">Été 2025</option>
                </select>
              </div>
            </div>
          </>
        );

      case 4: // Attendance reports
        return (
          <>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Titre du rapport
                </label>
                <input
                  type="text"
                  name="title"
                  value={newReportData.title}
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={newReportData.description}
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg"
                  rows="3"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Lieu</label>
                <select
                  name="location"
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg"
                  onChange={handleInputChange}
                >
                  <option value="">Sélectionner un lieu</option>
                  <option value="library">Bibliothèque</option>
                  <option value="cafeteria">Cafétéria</option>
                  <option value="studyroom">Salles d'étude</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Période
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    name="startDate"
                    className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg"
                    onChange={handleInputChange}
                  />
                  <input
                    type="date"
                    name="endDate"
                    className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-900/40 to-purple-900/40 p-8 backdrop-blur-sm border border-white/10">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white/20 rounded-full"
                style={{
                  width: `${Math.random() * 8 + 4}px`,
                  height: `${Math.random() * 8 + 4}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.5 + 0.3,
                }}
              />
            ))}
          </div>

          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-white flex items-center">
              <FileText className="w-8 h-8 mr-3 text-blue-400" />
              Rapports
            </h1>
            <p className="text-lg text-blue-300 mt-2">
              Générez et consultez les rapports de l'établissement
            </p>
          </div>
        </div>

        {/* New Report Modal */}
        {showNewReportModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gray-800/90 backdrop-blur-lg rounded-xl w-full max-w-2xl border border-white/10">
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <h3 className="text-xl font-semibold">
                  {selectedReportType
                    ? selectedReportType.name
                    : "Sélectionner un type de rapport"}
                </h3>
                <button
                  onClick={() => setShowNewReportModal(false)}
                  className="p-2 hover:bg-gray-700/50 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                {!selectedReportType ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {reportTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <button
                          key={type.id}
                          onClick={() => selectReportType(type)}
                          className="p-4 rounded-lg bg-gray-700/20 border border-gray-700 hover:border-blue-500/30 transition-all text-left"
                        >
                          <div className="flex items-center">
                            <div className="p-3 rounded-lg bg-blue-900/30 text-blue-400">
                              <Icon className="w-6 h-6" />
                            </div>
                            <div className="ml-3">
                              <div className="font-medium">{type.name}</div>
                              <div className="text-sm text-gray-400">
                                Créer un nouveau rapport
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <form onSubmit={handleSubmitReport} className="space-y-6">
                    {renderFormFields()}
                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setSelectedReportType(null)}
                        className="px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-700/50"
                      >
                        Retour
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white"
                      >
                        Créer le rapport
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Edit Report Modal */}
        {showEditReportModal && selectedReport && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gray-800/90 backdrop-blur-lg rounded-xl w-full max-w-2xl border border-white/10">
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <h3 className="text-xl font-semibold">Modifier le rapport</h3>
                <button
                  onClick={() => setShowEditReportModal(false)}
                  className="p-2 hover:bg-gray-700/50 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      Titre du rapport
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={selectedReport.title}
                      className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg"
                      onChange={handleEditInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={selectedReport.description}
                      className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg"
                      rows="3"
                      onChange={handleEditInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      Statut
                    </label>
                    <select
                      name="status"
                      value={selectedReport.status}
                      className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg"
                      onChange={handleEditInputChange}
                    >
                      <option value="DRAFT">Brouillon</option>
                      <option value="SUBMITTED">Soumis</option>
                      <option value="APPROVED">Approuvé</option>
                      <option value="REJECTED">Rejeté</option>
                    </select>
                  </div>
                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowEditReportModal(false)}
                      className="px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-700/50"
                    >
                      Annuler
                    </button>
                    <button
                      type="button"
                      onClick={updateReport}
                      className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white"
                    >
                      Enregistrer
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirmModal && selectedReport && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gray-800/90 backdrop-blur-lg rounded-xl w-full max-w-md border border-white/10">
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <h3 className="text-xl font-semibold text-red-400">
                  Confirmation
                </h3>
                <button
                  onClick={() => setShowDeleteConfirmModal(false)}
                  className="p-2 hover:bg-gray-700/50 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-center mb-4">
                  <AlertCircle className="w-6 h-6 text-red-400 mr-3" />
                  <p>
                    Êtes-vous sûr de vouloir supprimer ce rapport ?
                    <span className="block text-sm text-gray-400 mt-1">
                      Cette action est irréversible.
                    </span>
                  </p>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowDeleteConfirmModal(false)}
                    className="px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-700/50"
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    onClick={deleteReport}
                    className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Toolbar */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-white/10 p-4">
          <div className="flex flex-wrap justify-between items-center gap-4">
            {/* Search Bar */}
            <div className="flex-grow md:flex-grow-0 md:min-w-[320px]">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && searchReports()}
                  className="bg-gray-700/50 border border-gray-600 focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-2 rounded-lg"
                  placeholder="Rechercher un rapport..."
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 ml-auto">
              <button
                onClick={handleNewReportClick}
                className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white"
              >
                <Plus className="h-5 w-5 mr-2" />
                <span>Nouveau rapport</span>
              </button>
              <button
                onClick={() => fetchReports()}
                className="p-2 bg-gray-700/50 hover:bg-gray-700 rounded-lg"
                aria-label="Refresh"
              >
                <RefreshCw className="h-5 w-5" />
              </button>
              <button
                onClick={() => setExpandedFilters(!expandedFilters)}
                className="p-2 bg-gray-700/50 hover:bg-gray-700 rounded-lg"
                aria-label="Filter"
              >
                <Filter className="h-5 w-5" />
              </button>
              <div className="flex border border-gray-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${
                    viewMode === "grid"
                      ? "bg-gray-700 text-white"
                      : "bg-gray-800/50 hover:bg-gray-700/70"
                  }`}
                  aria-label="Grid view"
                >
                  <BarChart2 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${
                    viewMode === "list"
                      ? "bg-gray-700 text-white"
                      : "bg-gray-800/50 hover:bg-gray-700/70"
                  }`}
                  aria-label="List view"
                >
                  <Table className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Expanded Filters */}
          {expandedFilters && (
            <div className="mt-4 pt-4 border-t border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Type de rapport
                </label>
                <select
                  value={filters.type}
                  onChange={(e) =>
                    setFilters({ ...filters, type: e.target.value })
                  }
                  className="bg-gray-700/50 border border-gray-600 text-white rounded-lg block w-full p-2"
                >
                  <option value="all">Tous les types</option>
                  <option value="étudiants">Rapports d'étudiants</option>
                  <option value="cours">Rapports de cours</option>
                  <option value="examens">Rapports d'examens</option>
                  <option value="fréquentation">
                    Rapports de fréquentation
                  </option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Période
                </label>
                <select
                  value={filters.dateRange}
                  onChange={(e) =>
                    setFilters({ ...filters, dateRange: e.target.value })
                  }
                  className="bg-gray-700/50 border border-gray-600 text-white rounded-lg block w-full p-2"
                >
                  <option value="lastWeek">Dernière semaine</option>
                  <option value="lastMonth">Dernier mois</option>
                  <option value="lastQuarter">Dernier trimestre</option>
                  <option value="lastYear">Dernière année</option>
                  <option value="all">Tout</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Trier par
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) =>
                    setFilters({ ...filters, sortBy: e.target.value })
                  }
                  className="bg-gray-700/50 border border-gray-600 text-white rounded-lg block w-full p-2"
                >
                  <option value="dateDesc">Date (récent d'abord)</option>
                  <option value="dateAsc">Date (ancien d'abord)</option>
                  <option value="downloadsDesc">Téléchargements</option>
                </select>
              </div>
              <div className="md:col-span-3 flex justify-end">
                <button
                  onClick={applyFilters}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white"
                >
                  Appliquer les filtres
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Reports Display */}
        <div>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              <p className="mt-4 text-gray-400">Chargement des rapports...</p>
            </div>
          ) : error ? (
            <div className="bg-red-900/20 border border-red-900/50 rounded-xl p-6 text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-red-400">Erreur</h3>
              <p className="text-gray-300 mt-2">{error}</p>
              <button
                onClick={fetchReports}
                className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-white"
              >
                Réessayer
              </button>
            </div>
          ) : filteredReports.length === 0 ? (
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-10 text-center">
              <FileText className="h-16 w-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-300">
                Aucun rapport trouvé
              </h3>
              <p className="text-gray-400 mt-2">
                Essayez de modifier vos filtres ou créez un nouveau rapport.
              </p>
              <button
                onClick={handleNewReportClick}
                className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white inline-flex items-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Créer un rapport
              </button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredReports.map((report) => (
                <div
                  key={report.id}
                  className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden hover:border-blue-500/30 transition-all group"
                >
                  <div className="p-4 border-b border-gray-700">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-lg">
                        <span className="line-clamp-1">{report.title}</span>
                      </h3>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => handleEditReport(report)}
                          className="p-1.5 rounded-lg hover:bg-gray-700/70"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteConfirm(report)}
                          className="p-1.5 rounded-lg hover:bg-gray-700/70"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center text-sm text-gray-400">
                      <CalendarIcon className="h-4 w-4 mr-1.5" />
                      {report.date}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <div>{getStatusBadge(report.status)}</div>
                      <div className="text-sm text-gray-400">{report.size}</div>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <div className="text-sm text-gray-400">
                        {report.downloads} téléchargements
                      </div>
                      <button className="p-2 rounded-lg bg-blue-900/30 text-blue-400 hover:bg-blue-800/50">
                        <Download className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800/80">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                    >
                      Titre
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                    >
                      Statut
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                    >
                      Taille
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredReports.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-700/30">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <FileText className="flex-shrink-0 h-5 w-5 text-gray-400 mr-3" />
                          <div className="truncate max-w-xs">
                            {report.title}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {report.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(report.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {report.size}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleEditReport(report)}
                            className="p-1.5 rounded-lg hover:bg-gray-700/70"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteConfirm(report)}
                            className="p-1.5 rounded-lg hover:bg-gray-700/70"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <button className="p-1.5 rounded-lg bg-blue-900/30 text-blue-400 hover:bg-blue-800/50">
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RapportsPage;