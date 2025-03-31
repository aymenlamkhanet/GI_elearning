import React, { useState } from "react";
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
} from "lucide-react";

const RapportsPage = () => {
  // Report types
  const reportTypes = [
    { id: 1, name: "Rapports d'étudiants", icon: UserCheck },
    { id: 2, name: "Rapports de cours", icon: BookOpen },
    { id: 3, name: "Rapports d'examens", icon: Award },
    { id: 4, name: "Rapports de fréquentation", icon: Clock },
  ];

  // Sample reports data
  const [reports, setReports] = useState([
    {
      id: 1,
      title: "Performance des étudiants Q1 2025",
      type: "Étudiants",
      date: "15/03/2025",
      size: "2.4 MB",
      downloads: 42,
      favorite: true,
    },
    {
      id: 2,
      title: "Taux de réussite par cours",
      type: "Cours",
      date: "10/03/2025",
      size: "1.8 MB",
      downloads: 28,
      favorite: false,
    },
    {
      id: 3,
      title: "Résultats finaux - Session Hiver 2025",
      type: "Examens",
      date: "05/03/2025",
      size: "3.2 MB",
      downloads: 56,
      favorite: true,
    },
    {
      id: 4,
      title: "Fréquentation des bibliothèques",
      type: "Fréquentation",
      date: "28/02/2025",
      size: "1.5 MB",
      downloads: 19,
      favorite: false,
    },
    {
      id: 5,
      title: "Analyse des abandons",
      type: "Étudiants",
      date: "20/02/2025",
      size: "2.1 MB",
      downloads: 34,
      favorite: false,
    },
  ]);

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

  // Toggle favorite status
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

  // Sort reports
  const sortedReports = [...filteredReports].sort((a, b) => {
    if (filters.sortBy === "dateDesc")
      return new Date(b.date) - new Date(a.date);
    if (filters.sortBy === "dateAsc")
      return new Date(a.date) - new Date(b.date);
    if (filters.sortBy === "downloadsDesc") return b.downloads - a.downloads;
    return 0;
  });

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
                  animation: `float ${
                    Math.random() * 10 + 10
                  }s linear infinite`,
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

        {/* Main content */}
        <div className="space-y-6">
          {/* Quick actions and filters */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center space-x-3">
                <button className="flex items-center px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-all backdrop-blur-sm border border-blue-500/30">
                  <Plus className="w-5 h-5 mr-2" />
                  Nouveau rapport
                </button>

                <button
                  onClick={() => setExpandedFilters(!expandedFilters)}
                  className="flex items-center px-4 py-2 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-700 transition-all"
                >
                  <Filter className="w-5 h-5 mr-2" />
                  Filtres
                  {expandedFilters ? (
                    <ChevronUp className="w-5 h-5 ml-2" />
                  ) : (
                    <ChevronDown className="w-5 h-5 ml-2" />
                  )}
                </button>
              </div>

              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher des rapports..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Expanded filters */}
            {expandedFilters && (
              <div className="mt-6 pt-6 border-t border-gray-700/50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Type de rapport
                    </label>
                    <select
                      className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                      value={filters.type}
                      onChange={(e) =>
                        setFilters({ ...filters, type: e.target.value })
                      }
                    >
                      <option value="all">Tous les types</option>
                      <option value="étudiants">Étudiants</option>
                      <option value="cours">Cours</option>
                      <option value="examens">Examens</option>
                      <option value="fréquentation">Fréquentation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Période
                    </label>
                    <select
                      className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                      value={filters.dateRange}
                      onChange={(e) =>
                        setFilters({ ...filters, dateRange: e.target.value })
                      }
                    >
                      <option value="lastWeek">La semaine dernière</option>
                      <option value="lastMonth">Le mois dernier</option>
                      <option value="lastQuarter">Le trimestre dernier</option>
                      <option value="lastYear">L'année dernière</option>
                      <option value="all">Toutes les périodes</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Trier par
                    </label>
                    <select
                      className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                      value={filters.sortBy}
                      onChange={(e) =>
                        setFilters({ ...filters, sortBy: e.target.value })
                      }
                    >
                      <option value="dateDesc">Date (récent)</option>
                      <option value="dateAsc">Date (ancien)</option>
                      <option value="downloadsDesc">Téléchargements (↓)</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <button
                    onClick={() =>
                      setFilters({
                        type: "all",
                        dateRange: "lastMonth",
                        sortBy: "dateDesc",
                      })
                    }
                    className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                  >
                    <RefreshCw className="w-5 h-5 mr-2 inline" />
                    Réinitialiser
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Report types quick access */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-6">
              Types de rapports
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {reportTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <div
                    key={type.id}
                    className="p-4 rounded-lg bg-gray-700/20 border border-gray-700 hover:border-blue-500/30 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center">
                      <div className="p-3 rounded-lg bg-blue-900/30 text-blue-400 mr-3 group-hover:bg-blue-900/40 transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-medium">{type.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* View mode toggle */}
          <div className="flex justify-end">
            <div className="inline-flex bg-gray-700/50 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-1 rounded-md ${
                  viewMode === "grid"
                    ? "bg-blue-900/30 text-blue-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Table className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-1 rounded-md ${
                  viewMode === "list"
                    ? "bg-blue-900/30 text-blue-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <FileText className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Reports list */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedReports.map((report) => (
                <div
                  key={report.id}
                  className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-blue-500/30 transition-all group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-lg bg-blue-900/30 text-blue-400">
                      <FileText className="w-6 h-6" />
                    </div>
                    <button
                      onClick={() => toggleFavorite(report.id)}
                      className="text-gray-400 hover:text-yellow-400 transition-colors"
                    >
                      {report.favorite ? (
                        <Award className="w-5 h-5 fill-yellow-400/20 text-yellow-400" />
                      ) : (
                        <Award className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {report.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">{report.type}</p>

                  <div className="flex justify-between items-center text-sm text-gray-400">
                    <span>{report.date}</span>
                    <span>{report.size}</span>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-700/50 flex justify-between items-center">
                    <span className="text-sm text-gray-400 flex items-center">
                      <Download className="w-4 h-4 mr-1" />
                      {report.downloads}
                    </span>
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-900/20 rounded-lg transition-colors">
                        <Download className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-purple-400 hover:bg-purple-900/20 rounded-lg transition-colors">
                        <Printer className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-green-400 hover:bg-green-900/20 rounded-lg transition-colors">
                        <BarChart2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-700/20 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                      Titre
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                      Type
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                      Taille
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                      Téléchargements
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {sortedReports.map((report) => (
                    <tr
                      key={report.id}
                      className="hover:bg-gray-700/10 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <button
                            onClick={() => toggleFavorite(report.id)}
                            className="mr-3 text-gray-400 hover:text-yellow-400 transition-colors"
                          >
                            {report.favorite ? (
                              <Award className="w-5 h-5 fill-yellow-400/20 text-yellow-400" />
                            ) : (
                              <Award className="w-5 h-5" />
                            )}
                          </button>
                          <span className="font-medium">{report.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {report.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {report.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {report.size}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        <div className="flex items-center">
                          <Download className="w-4 h-4 mr-1" />
                          {report.downloads}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-900/20 rounded-lg transition-colors">
                            <Download className="w-5 h-5" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-purple-400 hover:bg-purple-900/20 rounded-lg transition-colors">
                            <Printer className="w-5 h-5" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-green-400 hover:bg-green-900/20 rounded-lg transition-colors">
                            <BarChart2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Empty state */}
          {sortedReports.length === 0 && (
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-12 border border-white/10 text-center">
              <FileText className="w-12 h-12 mx-auto text-gray-500" />
              <h3 className="mt-4 text-lg font-medium text-gray-300">
                Aucun rapport trouvé
              </h3>
              <p className="mt-2 text-gray-500">
                Aucun rapport ne correspond à vos critères de recherche.
              </p>
              <button className="mt-6 px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-all backdrop-blur-sm border border-blue-500/30">
                Créer un nouveau rapport
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RapportsPage;
