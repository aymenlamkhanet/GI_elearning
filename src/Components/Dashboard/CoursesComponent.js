import React, { useState, useEffect } from "react";
import UpdateCours from "./UpdateCours";
import AjoutCours from "./AjoutCours";
import {
  PlusCircle,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Download,
} from "lucide-react";

const CoursesComponent = () => {
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
  const [isEditCourseModalOpen, setIsEditCourseModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "titre",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

   const refreshCourses = async () => {
     try {
       const response = await fetch("http://localhost:8084/api/cours");
       const data = await response.json();
       setCourses(data);
     } catch (error) {
       console.error("Error refreshing courses:", error);
     }
   };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:8084/api/cours");
        const data = await response.json();
        console.log("API Response:", data);
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  // Sorting logic
  const sortedCourses = [...courses].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key])
      return sortConfig.direction === "asc" ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key])
      return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  // Filtering logic
  const filteredCourses = sortedCourses.filter(
    (course) =>
      (course.titre &&
        course.titre.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (course.description &&
        course.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (course.module &&
        course.module.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (course.niveau &&
        course.niveau.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Column headers
  const columns = [
    { key: "titre", label: "Titre du Cours" },
    { key: "description", label: "Description" },
    { key: "module", label: "Module" },
    { key: "niveau", label: "Niveau" },
    { key: "duree", label: "Durée (minutes)" },
    { key: "liens", label: "Liens" },
    { key: "Rating", label: "Rating" },
  ];

  // ActionMenu Component
  const ActionMenu = ({ onEdit, onDelete, onView, onDownload, courseId }) => {
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
                onDownload();
                setIsOpen(false);
              }}
              className="flex items-center w-full px-4 py-2 hover:bg-gray-700"
            >
              <Download className="w-4 h-4 mr-2" /> Télécharger
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

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Gestion des Cours
        </h2>
        <button
          className="flex items-center px-4 py-2 bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30 transition-all"
          onClick={() => setIsAddCourseModalOpen(true)} // Ajoutez cet onClick handler
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Ajouter un Cours
          <AjoutCours
            isOpen={isAddCourseModalOpen}
            onClose={() => setIsAddCourseModalOpen(false)}
          />
        </button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          placeholder="Rechercher cours..."
          className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
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
            {currentCourses.map((course) => (
              <tr
                key={course.id}
                className="hover:bg-gray-700/10 transition-colors"
              >
                <td className="px-6 py-4">{course.titre}</td>
                <td className="px-6 py-4 text-gray-400">
                  {course.description}
                </td>
                <td className="px-6 py-4">{course.module}</td>
                <td className="px-6 py-4">{course.niveau}</td>
                <td className="px-6 py-4">{course.duree}</td>
                <td className="px-6 py-4">
                  {course.liens ? (
                    <a
                      href={course.liens}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:underline"
                    >
                      Lien
                    </a>
                  ) : (
                    "Aucun lien"
                  )}
                </td>
                <td className="px-6 py-4">{course.ratingAvg}</td>
                <td className="px-6 py-4 text-right">
                  <ActionMenu
                    onEdit={() => {
                      setSelectedCourseId(course.id);
                      setIsEditCourseModalOpen(true);
                    }}
                    onDelete={() => {
                      fetch(`http://localhost:8084/api/cours/${course.id}`, {
                        method: "DELETE",
                        credentials: "include",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        mode: "cors",
                      })
                        .then((response) => {
                          if (response.ok) {
                            setCourses((prev) =>
                              prev.filter((c) => c.id !== course.id)
                            );
                          } else {
                            // Get more detailed error information when possible
                            return response.text().then((text) => {
                              throw new Error(
                                `Failed to delete: ${response.status} ${text}`
                              );
                            });
                          }
                        })
                        .catch((error) => {
                          console.error("Error deleting course:", error);
                          // Consider showing an error message to the user instead of silently removing
                          // setCourses(prev => prev.filter(c => c.id !== course.id));
                        });
                    }}
                    onDownload={() => {
                      // For download button, navigate to the same URL but trigger download
                      const pdfUrl = `http://localhost:8084/api/cours/fichier/${course.fichierId}`;
                      const a = document.createElement("a");
                      a.href = pdfUrl;
                      a.download = `${course.titre || "cours"}.pdf`;
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                    }}
                    courseId={course.fichierId}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <span className="text-gray-400">
          Affichage {indexOfFirstItem + 1}-
          {Math.min(indexOfLastItem, filteredCourses.length)} sur{" "}
          {filteredCourses.length}
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
            disabled={indexOfLastItem >= filteredCourses.length}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Suivant
          </button>
        </div>
      </div>
      {/* Ajoutez ce composant AjoutCours à la fin du composant */}
      <AjoutCours
        isOpen={isAddCourseModalOpen}
        onClose={() => setIsAddCourseModalOpen(false)}
        onCourseAdded={refreshCourses}
      />
      <UpdateCours
        isOpen={isEditCourseModalOpen}
        onClose={() => setIsEditCourseModalOpen(false)}
        coursId={selectedCourseId}
        onCourseUpdated={refreshCourses}
      />
    </div>
  );
};

export default CoursesComponent;
