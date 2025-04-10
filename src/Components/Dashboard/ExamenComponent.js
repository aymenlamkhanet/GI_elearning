import React, { useState, useEffect } from "react";
import {
  PlusCircle,
  Search,
  ChevronDown,
  MoreVertical,
  Edit,
  Trash2,
} from "lucide-react";
import AddExamen from "./AddExamen";
import UpdateExamen from "./UpdateExamen";

const ExamenComponent = () => {
  const [examens, setExamens] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedExamenId, setSelectedExamenId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tous");
  const [sortConfig, setSortConfig] = useState({
    key: "titre",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchExamens = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:8084/api/examens");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setExamens(data);
      } catch (err) {
        console.error("Error fetching examens:", err);
        setError(err.message);
        setExamens([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchExamens();
  }, []);

  const refreshExamens = async () => {
    try {
      const response = await fetch("http://localhost:8084/api/examens");
      const data = await response.json();
      setExamens(data);
      setError(null);
    } catch (error) {
      console.error("Refresh error:", error);
      setError("Failed to refresh examens");
    }
  };

  // Sorting logic
  const sortedExamens = [...examens].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key])
      return sortConfig.direction === "asc" ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key])
      return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  // Filtering logic - Updated to match backend model properties
  const filteredExamens = sortedExamens.filter((examen) => {
    // Check if properties exist before calling toLowerCase()
    const matchesSearch =
      (examen.titre &&
        examen.titre.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (examen.description &&
        examen.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (examen.module &&
        examen.module.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesSearch;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentExamens = filteredExamens.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Column headers - Updated to match backend model properties
  const columns = [
    { key: "titre", label: "Titre" },
    { key: "description", label: "Description" },
    { key: "niveau", label: "Niveau" },
    { key: "module", label: "Module" },
    { key: "ratingAvg", label: "Rating" },
    { key: "date", label: "Date" },
  ];

  // FilterSelect Component
  const FilterSelect = ({ options, selected, onSelect }) => (
    <div className="relative group">
      <button className="flex items-center px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg hover:border-purple-400 transition-colors">
        {selected}
        <ChevronDown className="ml-2 w-4 h-4" />
      </button>
      <div className="absolute hidden group-hover:block mt-1 w-full bg-gray-800 rounded-lg shadow-lg z-10">
        {options.map((option) => (
          <div
            key={option}
            onClick={() => onSelect(option)}
            className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );

  // ActionMenu Component
  const ActionMenu = ({ onEdit, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 hover:bg-gray-700 rounded"
        >
          <MoreVertical className="w-5 h-5 text-gray-400" />
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
            <button
              onClick={() => {
                onEdit();
                setIsOpen(false);
              }}
              className="flex items-center w-full px-4 py-2 hover:bg-gray-700"
            >
              <Edit className="w-4 h-4 mr-2" /> Modifier
            </button>
            <button
              onClick={() => {
                onDelete();
                setIsOpen(false);
              }}
              className="flex items-center w-full px-4 py-2 text-red-400 hover:bg-gray-700"
            >
              <Trash2 className="w-4 h-4 mr-2" /> Supprimer
            </button>
          </div>
        )}
      </div>
    );
  };

  // Loading and error states
  if (isLoading) {
    return (
      <div className="flex justify-center p-8">Chargement en cours...</div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center p-8 text-red-500">
        <p>Erreur: {error}</p>
        <button
          onClick={refreshExamens}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded"
        >
          Réessayer
        </button>
      </div>
    );
  }

  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("fr-FR");
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Gestion des Examens
        </h2>
        <button
          className="flex items-center px-4 py-2 bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30 transition-all"
          onClick={() => setIsAddModalOpen(true)}
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Ajouter un Examen
        </button>
      </div>

      {/* Controls Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher examens..."
            className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
        </div>
        <div className="flex gap-4">
          <FilterSelect
            options={["Tous", "Gi1", "Gi2", "Gi3"]}
            selected={statusFilter}
            onSelect={setStatusFilter}
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-white/10 overflow-x-auto">
        {examens.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            Aucun examen trouvé
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-800/50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="px-6 py-4 text-left cursor-pointer hover:bg-gray-700/20 transition-colors"
                    onClick={() =>
                      setSortConfig({
                        key: column.key,
                        direction:
                          sortConfig.key === column.key &&
                          sortConfig.direction === "asc"
                            ? "desc"
                            : "asc",
                      })
                    }
                  >
                    <div className="flex items-center">
                      {column.label}
                      {sortConfig.key === column.key && (
                        <span className="ml-2">
                          {sortConfig.direction === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {currentExamens.map((examen) => (
                <tr
                  key={examen.id}
                  className="hover:bg-gray-700/10 transition-colors"
                >
                  <td className="px-6 py-4">{examen.titre || "-"}</td>
                  <td className="px-6 py-4">{examen.description || "-"}</td>
                  <td className="px-6 py-4">{examen.niveau || "-"}</td>
                  <td className="px-6 py-4">{examen.module || "-"}</td>
                  <td className="px-6 py-4">{examen.ratingAvg || "-"}</td>
                  <td className="px-6 py-4">{formatDate(examen.date)}</td>
                  <td className="px-6 py-4 text-right">
                    <ActionMenu
                      onEdit={() => {
                        setSelectedExamenId(examen.id);
                        setIsEditModalOpen(true);
                      }}
                      onDelete={async () => {
                        try {
                          const response = await fetch(
                            `http://localhost:8084/api/examens/${examen.id}`,
                            { method: "DELETE" }
                          );
                          if (!response.ok) {
                            throw new Error(
                              `HTTP error! status: ${response.status}`
                            );
                          }
                          refreshExamens();
                        } catch (err) {
                          console.error("Error deleting examen:", err);
                          setError(`Failed to delete examen: ${err.message}`);
                        }
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <span className="text-gray-400">
          Affichage {indexOfFirstItem + 1}-
          {Math.min(indexOfLastItem, filteredExamens.length)} sur{" "}
          {filteredExamens.length}
        </span>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 bg-gray-800/50 rounded-lg hover:bg-gray-700/30 disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Précédent
          </button>
          <button
            className="px-3 py-1 bg-gray-800/50 rounded-lg hover:bg-gray-700/30 disabled:opacity-50"
            disabled={indexOfLastItem >= filteredExamens.length}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Suivant
          </button>
        </div>
      </div>
      <AddExamen
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onExamenAdded={refreshExamens}
      />

      <UpdateExamen
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedExamenId(null);
        }}
        examenId={selectedExamenId}
        onExamenUpdated={refreshExamens}
      />
    </div>
  );
};

export default ExamenComponent;
