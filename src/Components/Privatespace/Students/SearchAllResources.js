import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Search,
  ChevronDown,
  BookOpen,
  FileText,
  FileQuestion,
  Star,
  Clock,
  Download,
  PlusCircle,
  X,
} from "lucide-react";

const SearchAllResources = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [typeFilter, setTypeFilter] = useState("Tous");
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "desc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);

  const itemsPerPage = 8;

  // Filter options - now only Cours since that's what we have
  const typeOptions = ["Tous", "Cours"];

  // Tabs - simplified to match available resources
  const tabs = [
    { id: "all", label: "Tout" },
    { id: "courses", label: "Cours" },
  ];

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    try {
      // Convert ISO string to Date object
      const date = new Date(dateString);
      return date.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch (e) {
      return dateString;
    }
  };

  // Get resource icon based on type
  const getResourceIcon = (type) => {
    switch (type) {
      case "Cours":
        return <BookOpen className="w-5 h-5 text-blue-400" />;
      default:
        return <BookOpen className="w-5 h-5 text-gray-400" />;
    }
  };

  // Search function with backend filtering
  const performSearch = async () => {
    if (!searchTerm) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Search courses with query parameters
      const response = await axios.get(
        `http://localhost:8084/api/cours/search?query=${searchTerm}`
      );

      // Map results to common format
      const courses = response.data.map((c) => ({ ...c, type: "Cours" }));

      setResults(courses);
    } catch (err) {
      console.error("Search error:", err);
      setError(
        "Une erreur est survenue lors de la recherche. Veuillez réessayer."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Sorting logic
  const sortedResults = [...results].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key])
      return sortConfig.direction === "asc" ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key])
      return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  // Filtering logic
  const filteredResults = sortedResults.filter((item) => {
    // Apply type filter
    if (typeFilter !== "Tous" && item.type !== typeFilter) return false;

    // Apply tab filter
    if (activeTab !== "all") {
      if (activeTab === "courses" && item.type !== "Cours") return false;
    }

    return true;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentResults = filteredResults.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    performSearch();
  };

  // Handle download
  const handleDownload = async (item) => {
    try {
      const endpoint = `http://localhost:8084/api/cours/fichier/${item.fichierId}`;

      const response = await axios.get(endpoint, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = `${item.titre || item.type.toLowerCase()}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download Error:", error);
      alert(
        `Échec du téléchargement: ${
          error.response?.data?.message || "Fichier non disponible"
        }`
      );
    }
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm("");
    setResults([]);
  };

  // Effect to trigger search on filter change
  useEffect(() => {
    if (results.length > 0) {
      setCurrentPage(1);
    }
  }, [activeTab, typeFilter]);

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto p-4">
      {/* Header with enhanced gradient */}
      <div className="text-center py-6">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Recherche de Ressources
        </h1>
        <p className="mt-2 text-gray-400">
          Trouvez des cours en un seul endroit
        </p>
      </div>

      {/* Search Form with improved styling */}
      <form onSubmit={handleSearch} className="relative">
        <div className="flex items-center bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-xl px-4 py-3 shadow-lg">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher cours..."
            className="w-full bg-transparent border-none focus:ring-0 ml-3 text-white placeholder-gray-500 text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              type="button"
              onClick={clearSearch}
              className="p-1 hover:bg-gray-700/50 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          )}
          <button
            type="submit"
            className="ml-4 px-4 py-2 bg-purple-600/40 hover:bg-purple-600/60 text-purple-300 rounded-xl transition-all flex items-center shadow-lg shadow-purple-500/10"
          >
            <Search className="w-5 h-5 mr-2" />
            Rechercher
          </button>
        </div>
      </form>

      {/* Filters and Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* Tabs */}
        <div className="flex border-b border-gray-700 w-full md:w-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-4 py-2 font-medium relative transition-colors ${
                activeTab === tab.id
                  ? "text-purple-400"
                  : "text-gray-400 hover:text-gray-300"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-400 rounded-full"></div>
              )}
            </button>
          ))}
        </div>

        {/* Type Filter */}
        <div className="relative group w-full md:w-48">
          <button className="flex items-center justify-between w-full px-4 py-2 bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-xl hover:border-purple-400 transition-all">
            <span>{typeFilter}</span>
            <ChevronDown className="ml-2 w-4 h-4" />
          </button>
          <div className="absolute hidden group-hover:block mt-1 w-full bg-gray-800/90 backdrop-blur-lg rounded-xl shadow-xl z-10 border border-gray-700">
            {typeOptions.map((option) => (
              <div
                key={option}
                onClick={() => setTypeFilter(option)}
                className={`px-4 py-3 hover:bg-gray-700/50 cursor-pointer transition-colors rounded-lg ${
                  typeFilter === option ? "text-purple-400" : "text-gray-300"
                }`}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-white/10 shadow-xl overflow-hidden">
        {isLoading && (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
            <p className="mt-4 text-gray-400">Recherche en cours...</p>
          </div>
        )}

        {error && (
          <div className="p-8 text-center text-red-400">
            <p>{error}</p>
            <button
              onClick={performSearch}
              className="mt-4 px-4 py-2 bg-purple-600/40 hover:bg-purple-600/60 text-white rounded-xl transition-colors"
            >
              Réessayer
            </button>
          </div>
        )}

        {!isLoading && !error && results.length === 0 && searchTerm && (
          <div className="p-12 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-medium text-gray-300">
              Aucun résultat trouvé
            </h3>
            <p className="mt-2 text-gray-500">
              Aucun cours ne correspond à votre recherche "{searchTerm}"
            </p>
          </div>
        )}

        {!isLoading && !error && results.length > 0 && (
          <>
            <div className="p-4 text-sm text-gray-400 border-b border-gray-700 bg-gray-800/20">
              {filteredResults.length} résultat(s) trouvé(s)
            </div>

            {/* Results List */}
            <div className="divide-y divide-gray-700/50">
              {currentResults.map((item) => (
                <div
                  key={`${item.type}-${item.id}`}
                  className="p-4 hover:bg-gray-700/10 transition-colors"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      {getResourceIcon(item.type)}
                    </div>

                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-white">
                          {item.titre}
                        </h3>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-900/30 text-blue-300">
                          {item.type}
                        </span>
                      </div>

                      <p className="mt-2 text-gray-400 line-clamp-2">
                        {item.description || "Aucune description disponible"}
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        {item.module && (
                          <div className="flex items-center bg-gray-800/50 px-3 py-1 rounded-lg">
                            <span className="text-gray-400">Module:</span>
                            <span className="ml-1 text-gray-300">
                              {item.module}
                            </span>
                          </div>
                        )}

                        {item.niveau && (
                          <div className="flex items-center bg-gray-800/50 px-3 py-1 rounded-lg">
                            <span className="text-gray-400">Niveau:</span>
                            <span className="ml-1 text-gray-300">
                              {item.niveau}
                            </span>
                          </div>
                        )}

                        {item.ratingAvg !== undefined &&
                          item.ratingAvg !== null && (
                            <div className="flex items-center bg-gray-800/50 px-3 py-1 rounded-lg">
                              <Star className="w-4 h-4 text-yellow-400 mr-1" />
                              <span className="text-gray-300">
                                {item.ratingAvg.toFixed(1)}
                              </span>
                            </div>
                          )}

                        {item.duree && (
                          <div className="flex items-center bg-gray-800/50 px-3 py-1 rounded-lg">
                            <Clock className="w-4 h-4 text-gray-500 mr-1" />
                            <span className="text-gray-300">
                              {item.duree} min
                            </span>
                          </div>
                        )}

                        {item.date && (
                          <div className="flex items-center bg-gray-800/50 px-3 py-1 rounded-lg">
                            <span className="text-gray-400">Date:</span>
                            <span className="ml-1 text-gray-300">
                              {formatDate(item.date)}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="mt-4 flex items-center">
                        {item.fichierId && (
                          <button
                            onClick={() => handleDownload(item)}
                            className="flex items-center text-sm px-4 py-2 bg-purple-600/30 hover:bg-purple-600/40 text-purple-300 rounded-xl transition-colors"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Télécharger
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {filteredResults.length > itemsPerPage && (
              <div className="flex justify-between items-center p-4 border-t border-gray-700 bg-gray-800/20">
                <span className="text-gray-400">
                  Affichage {indexOfFirstItem + 1}-
                  {Math.min(indexOfLastItem, filteredResults.length)} sur{" "}
                  {filteredResults.length}
                </span>
                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 bg-gray-800/50 hover:bg-gray-700/40 rounded-xl disabled:opacity-40 transition-colors"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                  >
                    Précédent
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-800/50 hover:bg-gray-700/40 rounded-xl disabled:opacity-40 transition-colors"
                    disabled={indexOfLastItem >= filteredResults.length}
                    onClick={() => setCurrentPage((p) => p + 1)}
                  >
                    Suivant
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Empty State */}
      {!searchTerm && !isLoading && !error && (
        <div className="text-center py-16">
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full flex items-center justify-center mb-6">
            <Search className="w-12 h-12 text-purple-500" />
          </div>
          <h3 className="text-xl font-medium text-gray-300">
            Recherchez des ressources
          </h3>
          <p className="mt-2 text-gray-500 max-w-md mx-auto">
            Entrez un terme de recherche pour trouver des cours. Vous pouvez
            filtrer par type et trier les résultats.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchAllResources;
