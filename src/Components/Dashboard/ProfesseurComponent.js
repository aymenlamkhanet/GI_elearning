import React, { useState, useEffect } from "react";
import AjoutProfesseur from "./AjoutProfesseur";
import UpdateProfesseur from "./UpdateProfesseur";
import {
  PlusCircle,
  Search,
  ChevronDown,
  MoreVertical,
  Edit,
  Trash2,
} from "lucide-react";

const ProfesseurComponent = () => {
  const [professeurs, setProfesseurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProfesseurId, setSelectedProfesseurId] = useState(null);

  const fetchProfesseurs = async () => {
    try {
      const response = await fetch(
        "http://localhost:8084/api/professeur/AllProfesseurs"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProfesseurs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfesseurs();
  }, []);

  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tous");
  const [sortConfig, setSortConfig] = useState({
    key: "nom",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Sorting logic
  const sortedProfesseurs = [...professeurs].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Filtering logic
  const filteredProfesseurs = sortedProfesseurs.filter((prof) => {
    const fullName = `${prof.prenom} ${prof.nom}`.toLowerCase();
    const matchesSearch =
      fullName.includes(searchTerm.toLowerCase()) ||
      prof.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prof.phone.toLowerCase().includes(searchTerm.toLowerCase());

    // Assuming you might want to add status later
    const matchesStatus =
      statusFilter === "Tous" ||
      (prof.status ? prof.status === statusFilter : true);

    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProfesseurs = filteredProfesseurs.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Column headers
  const columns = [
    { key: "nom", label: "Nom" },
    { key: "prenom", label: "Prénom" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Téléphone" },
    { key: "Module", label: "Module" },
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

  if (loading)
    return <div className="text-center py-8">Chargement en cours...</div>;
  if (error)
    return <div className="text-center py-8 text-red-400">Erreur: {error}</div>;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Gestion des Professeurs
        </h2>
        <button
          className="flex items-center px-4 py-2 bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30 transition-all"
          onClick={() => setIsAddModalOpen(true)}
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Ajouter un Professeur
        </button>
      </div>

      {/* Controls Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher professeurs..."
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
            {currentProfesseurs.length > 0 ? (
              currentProfesseurs.map((prof) => (
                <tr
                  key={prof.id}
                  className="hover:bg-gray-700/10 transition-colors"
                >
                  <td className="px-6 py-4">{prof.nom}</td>
                  <td className="px-6 py-4">{prof.prenom}</td>
                  <td className="px-6 py-4 text-gray-400">{prof.email}</td>
                  <td className="px-6 py-4">{prof.phone}</td>
                  <td className="px-6 py-4">{prof.module ? prof.module : "Not Specified yet"}</td>
                  <td className="px-6 py-4 text-right">
                    <ActionMenu
                      onEdit={() => {
                        setSelectedProfesseurId(prof.id);
                        setIsEditModalOpen(true);
                      }}
                      onDelete={async () => {
                        try {
                          await fetch(
                            `http://localhost:8084/api/professeur/${prof.id}`,
                            {
                              method: "DELETE",
                            }
                          );
                          setProfesseurs((prev) =>
                            prev.filter((p) => p.id !== prof.id)
                          );
                        } catch (error) {
                          console.error("Delete error:", error);
                        }
                      }}
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
                  Aucun professeur trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredProfesseurs.length > 0 && (
        <div className="flex justify-between items-center">
          <span className="text-gray-400">
            Affichage {indexOfFirstItem + 1}-
            {Math.min(indexOfLastItem, filteredProfesseurs.length)} sur{" "}
            {filteredProfesseurs.length}
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
              disabled={indexOfLastItem >= filteredProfesseurs.length}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Suivant
            </button>
          </div>
        </div>
      )}
      <AjoutProfesseur
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onProfesseurAdded={() => {
          // Implémenter la logique de rafraîchissement
          fetchProfesseurs();
        }}
      />
      <UpdateProfesseur
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        professeurId={selectedProfesseurId}
        onProfesseurUpdated={() => {
          fetchProfesseurs();
        }}
      />
    </div>
  );
};

export default ProfesseurComponent;
 