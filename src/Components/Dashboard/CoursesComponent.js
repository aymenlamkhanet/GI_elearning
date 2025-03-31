import React, { useState } from "react";
import {
  PlusCircle,
  Search,
  ChevronDown,
  MoreVertical,
  Edit,
  Trash2,
} from "lucide-react";

const CoursesComponent = () => {
  // Mock data with courses
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Quantum AI Foundations",
      category: "Tech",
      duration: "6h 30m",
      students: 245,
      difficulty: "Advanced",
      instructor: "Dr. Elena Nakamura",
      status: "Actif",
      addedDate: "2024-01-15",
    },
    {
      id: 2,
      title: "Generative AI Masterclass",
      category: "Tech",
      duration: "5h 15m",
      students: 312,
      difficulty: "Intermediate",
      instructor: "Kai Zhang",
      status: "Inactif",
      addedDate: "2024-02-20",
    },
    {
      id: 3,
      title: "AI Ethics & Governance",
      category: "Business",
      duration: "4h 45m",
      students: 189,
      difficulty: "All Levels",
      instructor: "Dr. Amara Okonkwo",
      status: "Actif",
      addedDate: "2024-03-10",
    },
    {
      id: 4,
      title: "Machine Learning Fundamentals",
      category: "Tech",
      duration: "7h 00m",
      students: 420,
      difficulty: "Beginner",
      instructor: "Alex Rodriguez",
      status: "Actif",
      addedDate: "2024-04-05",
    },
    {
      id: 5,
      title: "Deep Learning Specialization",
      category: "Tech",
      duration: "8h 30m",
      students: 276,
      difficulty: "Advanced",
      instructor: "Maria Silva",
      status: "Inactif",
      addedDate: "2024-05-12",
    },
    {
      id: 6,
      title: "AI Product Management",
      category: "Business",
      duration: "5h 00m",
      students: 198,
      difficulty: "Intermediate",
      instructor: "John Smith",
      status: "Actif",
      addedDate: "2024-06-18",
    },
  ]);

  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tous");
  const [sortConfig, setSortConfig] = useState({
    key: "title",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Sorting logic
  const sortedCourses = [...courses].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key])
      return sortConfig.direction === "asc" ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key])
      return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  // Filtering logic
  const filteredCourses = sortedCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "Tous" || course.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Column headers
  const columns = [
    { key: "title", label: "Titre du Cours" },
    { key: "category", label: "Catégorie" },
    { key: "duration", label: "Durée" },
    { key: "students", label: "Étudiants" },
    { key: "difficulty", label: "Niveau" },
    { key: "instructor", label: "Instructeur" },
    { key: "status", label: "Statut" },
    { key: "addedDate", label: "Date d'ajout" },
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
              onClick={onEdit}
              className="flex items-center w-full px-4 py-2 hover:bg-gray-700"
            >
              <Edit className="w-4 h-4 mr-2" /> Modifier
            </button>
            <button
              onClick={onDelete}
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
        <button className="flex items-center px-4 py-2 bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30 transition-all">
          <PlusCircle className="w-5 h-5 mr-2" />
          Ajouter un Cours
        </button>
      </div>

      {/* Controls Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <div className="flex gap-4">
          <FilterSelect
            options={["Tous", "Actif", "Inactif"]}
            selected={statusFilter}
            onSelect={setStatusFilter}
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
            {currentCourses.map((course) => (
              <tr
                key={course.id}
                className="hover:bg-gray-700/10 transition-colors"
              >
                <td className="px-6 py-4">{course.title}</td>
                <td className="px-6 py-4">{course.category}</td>
                <td className="px-6 py-4">{course.duration}</td>
                <td className="px-6 py-4">{course.students}</td>
                <td className="px-6 py-4">{course.difficulty}</td>
                <td className="px-6 py-4 text-gray-400">{course.instructor}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full ${
                      course.status === "Actif"
                        ? "bg-green-500/20 text-green-300"
                        : "bg-red-500/20 text-red-300"
                    }`}
                  >
                    {course.status}
                  </span>
                </td>
                <td className="px-6 py-4">{course.addedDate}</td>
                <td className="px-6 py-4 text-right">
                  <ActionMenu
                    onEdit={() => console.log("Edit", course.id)}
                    onDelete={() =>
                      setCourses((prev) =>
                        prev.filter((c) => c.id !== course.id)
                      )
                    }
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
    </div>
  );
};

export default CoursesComponent;
