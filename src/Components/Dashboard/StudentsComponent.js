import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
  PlusCircle,
  Search,
  ChevronDown,
  MoreVertical,
  Edit,
  Trash2,
  Download,
} from "lucide-react";
import AjoutEtudiant from "./AjoutEtudiant";
import UpdateEtudiant from "./UpdateEtudiant";

const StudentsComponent = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("Tous");
  const [sortConfig, setSortConfig] = useState({
    key: "nom",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const itemsPerPage = 8;

  useEffect(() => {
    console.log("Fetching students...");
    refreshStudents();
  }, []);

  // And in refreshStudents
  const refreshStudents = async () => {
    try {
      console.log("Starting Axios request");
      const response = await axios.get(
        "http://localhost:8084/api/etudiant/AllEtudiants"
      );
      console.log("Axios response received:", response);
      console.log("Response data:", response.data);
      setStudents(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Axios error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers,
      });
      setError(error.response?.data?.message || "Failed to fetch students");
      setLoading(false);
    }
  };

  // Sorting logic
  const sortedStudents = [...students].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Filtering logic
  const filteredStudents = sortedStudents.filter((student) => {
    const fullName = `${student.prenom} ${student.nom}`.toLowerCase();
    const matchesSearch =
      fullName.includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.phone.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLevel =
      levelFilter === "Tous" || student.niveau === levelFilter;

    return matchesSearch && matchesLevel;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Extract unique levels for filter options
  const levelOptions = [
    "Tous",
    ...new Set(students.map((student) => student.niveau)),
  ];

  // Column headers
  const columns = [
    { key: "nom", label: "Nom" },
    { key: "prenom", label: "Prénom" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Téléphone" },
    { key: "niveau", label: "Niveau" },
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
  const ActionMenu = ({ onEdit, onDelete, studentId }) => {
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
          <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 z-20">
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

  if (loading)
    return <div className="text-center py-8">Chargement en cours...</div>;
  if (error)
    return <div className="text-center py-8 text-red-400">Erreur: {error}</div>;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Gestion des Étudiants
        </h2>
        <button
          className="flex items-center px-4 py-2 bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30 transition-all"
          onClick={() => setIsAddModalOpen(true)}
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Ajouter un Étudiant
        </button>
      </div>

      {/* Controls Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher étudiants..."
            className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
        </div>
        <div className="flex gap-4">
          <FilterSelect
            options={levelOptions}
            selected={levelFilter}
            onSelect={setLevelFilter}
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-white/10 overflow-x-auto">
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
            {currentStudents.length > 0 ? (
              currentStudents.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-gray-700/10 transition-colors"
                >
                  <td className="px-6 py-4">{student.nom}</td>
                  <td className="px-6 py-4">{student.prenom}</td>
                  <td className="px-6 py-4 text-gray-400">{student.email}</td>
                  <td className="px-6 py-4">{student.phone}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full">
                      {student.niveau}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <ActionMenu
                      onEdit={() => {
                        setSelectedStudentId(student.id);
                        setIsEditModalOpen(true);
                      }}
                      onDelete={async () => {
                        try {
                          await axios.delete(
                            `http://localhost:8084/api/etudiant/${student.id}`
                          );
                          // Only update state if API call succeeds
                          setStudents((prev) =>
                            prev.filter((s) => s.id !== student.id)
                          );
                        } catch (error) {
                          console.error("Delete Error:", {
                            status: error.response?.status,
                            message:
                              error.response?.data?.message || error.message,
                            data: error.response?.data,
                          });

                          // Show user-friendly error message
                          alert(
                            `Failed to delete student: ${
                              error.response?.data?.message ||
                              "Please try again"
                            }`
                          );

                          // Optional: Re-fetch student list to ensure sync with server
                          // fetchStudents();
                        }
                      }}
                      studentId={student.id}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-6 py-4 text-center text-gray-400"
                >
                  Aucun étudiant trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredStudents.length > 0 && (
        <div className="flex justify-between items-center">
          <span className="text-gray-400">
            Affichage {indexOfFirstItem + 1}-
            {Math.min(indexOfLastItem, filteredStudents.length)} sur{" "}
            {filteredStudents.length}
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
              disabled={indexOfLastItem >= filteredStudents.length}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Suivant
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      <AjoutEtudiant
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onStudentAdded={refreshStudents}
      />

      <UpdateEtudiant
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        studentId={selectedStudentId}
        onStudentUpdated={refreshStudents}
      />
    </div>
  );
};

export default StudentsComponent;
