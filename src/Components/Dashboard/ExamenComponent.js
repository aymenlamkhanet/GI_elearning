import React, { useState } from "react";
import {
  PlusCircle,
  Search,
  ChevronDown,
  MoreVertical,
  Edit,
  Trash2,
} from "lucide-react";

const ExamenComponent = () => {
  // Mock data with 12 examens
  const [examens, setExamens] = useState([
    {
      id: 1,
      title: "Examen Final IA",
      subject: "Intelligence Artificielle",
      date: "2024-06-15",
      duration: "2h",
      participants: 150,
      status: "Actif",
      type: "Final",
    },
    {
      id: 2,
      title: "Examen Partiel Math",
      subject: "Mathématiques",
      date: "2024-05-20",
      duration: "1h30",
      participants: 200,
      status: "Inactif",
      type: "Partiel",
    },
    // Add 10 more examens...
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
  const sortedExamens = [...examens].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key])
      return sortConfig.direction === "asc" ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key])
      return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  // Filtering logic
  const filteredExamens = sortedExamens.filter((examen) => {
    const matchesSearch =
      examen.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      examen.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "Tous" || examen.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentExamens = filteredExamens.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Column headers
  const columns = [
    { key: "title", label: "Titre de l'Examen" },
    { key: "subject", label: "Matière" },
    { key: "date", label: "Date" },
    { key: "duration", label: "Durée" },
    { key: "participants", label: "Participants" },
    { key: "type", label: "Type" },
    { key: "status", label: "Statut" },
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
          Gestion des Examens
        </h2>
        <button className="flex items-center px-4 py-2 bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30 transition-all">
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
            {currentExamens.map((examen) => (
              <tr
                key={examen.id}
                className="hover:bg-gray-700/10 transition-colors"
              >
                <td className="px-6 py-4">{examen.title}</td>
                <td className="px-6 py-4">{examen.subject}</td>
                <td className="px-6 py-4">{examen.date}</td>
                <td className="px-6 py-4">{examen.duration}</td>
                <td className="px-6 py-4">{examen.participants}</td>
                <td className="px-6 py-4">{examen.type}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full ${
                      examen.status === "Actif"
                        ? "bg-green-500/20 text-green-300"
                        : "bg-red-500/20 text-red-300"
                    }`}
                  >
                    {examen.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <ActionMenu
                    onEdit={() => console.log("Edit", examen.id)}
                    onDelete={() =>
                      setExamens((prev) =>
                        prev.filter((e) => e.id !== examen.id)
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
    </div>
  );
};

export default ExamenComponent;
