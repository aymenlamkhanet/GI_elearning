import React, { useState, useEffect } from "react";
import {
  PlusCircle,
  Search,
  ChevronDown,
  MoreVertical,
  Edit,
  Trash2,
  Download,
} from "lucide-react";
import AddExercise from "./AddExercise";
import UpdateExercise from "./UpdateExercise";

const ExerciseComponent = () => {
  // State management
  const [exercises, setExercises] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedExerciseId, setSelectedExerciseId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Table controls
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tous");
  const [sortConfig, setSortConfig] = useState({
    key: "titre",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Fetch exercises from your controller
  useEffect(() => {
    const fetchExercises = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:8084/api/exercices");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setExercises(data);
      } catch (err) {
        console.error("Error fetching exercises:", err);
        setError(err.message);
        setExercises([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchExercises();
  }, []);

  // Sorting function
  const sortedExercises = [...exercises].sort((a, b) => {
    const aValue = a[sortConfig.key] || "";
    const bValue = b[sortConfig.key] || "";

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  // Filtering function
  const filteredExercises = sortedExercises.filter((exercise) => {
    const searchFields = [
      exercise.titre?.toLowerCase() || "",
      exercise.module?.toLowerCase() || "",
      exercise.niveau?.toLowerCase() || "",
    ];

    const matchesSearch = searchFields.some((field) =>
      field.includes(searchTerm.toLowerCase())
    );

    const matchesStatus =
      statusFilter === "Tous" || exercise.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentExercises = filteredExercises.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Column configuration - removed status column
  const columns = [
    { key: "titre", label: "Titre de l'Exercice" },
    { key: "description", label: "Description" },
    { key: "module", label: "Module" },
    { key: "niveau", label: "Niveau" },
    { key: "ratingAvg", label: "Rating" },
    { key: "date", label: "Date" },
  ];

  // Action handlers
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8084/api/exercices/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete exercise");
      }

      setExercises(exercises.filter((ex) => ex.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      setError("Failed to delete exercise");
    }
  };

  const handleDownload = async (exercise) => {
    try {
      if (!exercise.fichierId) {
        throw new Error("No file associated with this exercise");
      }

      const response = await fetch(
        `http://localhost:8084/api/exercices/fichier/${exercise.fichierId}`
      );
      if (!response.ok) {
        throw new Error("Failed to download file");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${exercise.titre || "exercise"}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
      setError("Failed to download file");
    }
  };

  const refreshExercises = async () => {
    try {
      const response = await fetch("http://localhost:8084/api/exercices");
      const data = await response.json();
      setExercises(data);
      setError(null);
    } catch (error) {
      console.error("Refresh error:", error);
      setError("Failed to refresh exercises");
    }
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
          onClick={refreshExercises}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Gestion des Exercices
        </h2>
        <button
          className="flex items-center px-4 py-2 bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30 transition-all"
          onClick={() => setIsAddModalOpen(true)}
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Ajouter un Exercice
        </button>
      </div>

      {/* Controls Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher exercices..."
            className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
        </div>
        <div className="flex gap-4">
          <div className="relative group">
            <button className="flex items-center px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg hover:border-purple-400 transition-colors">
              {statusFilter}
              <ChevronDown className="ml-2 w-4 h-4" />
            </button>
            <div className="absolute hidden group-hover:block mt-1 w-full bg-gray-800 rounded-lg shadow-lg z-10">
              {["Tous", "Actif", "Inactif"].map((option) => (
                <div
                  key={option}
                  onClick={() => setStatusFilter(option)}
                  className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-white/10 overflow-x-auto">
        {exercises.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            Aucun exercice trouvé
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
              {currentExercises.map((exercise) => (
                <tr
                  key={exercise.id}
                  className="hover:bg-gray-700/10 transition-colors"
                >
                  <td className="px-6 py-4">{exercise.titre || "-"}</td>
                  <td className="px-6 py-4">{exercise.description || "-"}</td>
                  <td className="px-6 py-4">{exercise.module || "-"}</td>
                  <td className="px-6 py-4">{exercise.niveau || "-"}</td>
                  <td className="px-6 py-4">{exercise.ratingAvg || "-"}</td>
                  <td className="px-6 py-4">
                    {exercise.date
                      ? new Date(exercise.date).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedExerciseId(
                            selectedExerciseId === exercise.id
                              ? null
                              : exercise.id
                          );
                        }}
                        className="p-1 hover:bg-gray-700 rounded"
                      >
                        <MoreVertical className="w-5 h-5 text-gray-400" />
                      </button>
                      {selectedExerciseId === exercise.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 z-20">
                          <button
                            onClick={() => {
                              setSelectedExerciseId(exercise.id);
                              setIsEditModalOpen(true);
                            }}
                            className="flex items-center w-full px-4 py-2 hover:bg-gray-700"
                          >
                            <Edit className="w-4 h-4 mr-2" /> Modifier
                          </button>
                          {exercise.fichierId && (
                            <button
                              onClick={() => handleDownload(exercise)}
                              className="flex items-center w-full px-4 py-2 hover:bg-gray-700"
                            >
                              <Download className="w-4 h-4 mr-2" /> Télécharger
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(exercise.id)}
                            className="flex items-center w-full px-4 py-2 text-red-400 hover:bg-gray-700"
                          >
                            <Trash2 className="w-4 h-4 mr-2" /> Supprimer
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {exercises.length > 0 && (
        <div className="flex justify-between items-center">
          <span className="text-gray-400">
            Affichage {indexOfFirstItem + 1}-
            {Math.min(indexOfLastItem, filteredExercises.length)} sur{" "}
            {filteredExercises.length}
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
              disabled={indexOfLastItem >= filteredExercises.length}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Suivant
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      <AddExercise
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onExerciseAdded={refreshExercises}
      />

      <UpdateExercise
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedExerciseId(null);
        }}
        exerciseId={selectedExerciseId}
        onExerciseUpdated={refreshExercises}
      />
    </div>
  );
};

export default ExerciseComponent;
