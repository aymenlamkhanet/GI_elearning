import React, { useState, useEffect } from "react";
import axios from 'axios';
import AjoutOuvrage from "./AjoutOuvrage";
import UpdateOuvrage from "./UpdateOuvrage";
import {
  PlusCircle,
  Search,
  BookOpen,
  Library,
  Clock,
  Hash,
  MoreVertical,
  Edit,
  Trash2,
  Code,
  Globe,
  Server,
  LineChart,
  Coffee,
  Star,
  Users,
} from "lucide-react";

const OuvragesComponent = () => {
  const [books, setBooks] = useState([]);
  const [modules, setModules] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  const fetchData = async () => {
    try {
      const [ouvragesRes, modulesRes] = await Promise.all([
        axios.get("http://localhost:8084/api/ouvrages"),
        axios.get("http://localhost:8084/api/ouvrages/modules/distinct"),
      ]);

      setBooks(ouvragesRes.data);
      setModules(modulesRes.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    try {
      const [ouvragesRes, modulesRes] = await Promise.all([
        axios.get("http://localhost:8084/api/ouvrages"),
        axios.get("http://localhost:8084/api/ouvrages/modules/distinct"),
      ]);

      setBooks(ouvragesRes.data);
      setModules(modulesRes.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Refresh failed");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet ouvrage ?")) {
      try {
        await axios.delete(`http://localhost:8084/api/ouvrages/${id}`);
        setBooks((prev) => prev.filter((b) => b.id !== id));
        console.log("Ouvrage supprimé avec succès");
      } catch (error) {
        console.error("Delete error:", error);
        alert(
          `Erreur lors de la suppression: ${
            error.response?.data?.message || error.message
          }`
        );
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // State management
  const [isAddOuvrageModalOpen, setIsAddOuvrageModalOpen] = useState(false);
  const [isEditOuvrageModalOpen, setIsEditOuvrageModalOpen] = useState(false);
  const [selectedOuvrageId, setSelectedOuvrageId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [niveauFilter, setNiveauFilter] = useState("Tous");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filtering logic
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.module.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesNiveau =
      niveauFilter === "Tous" || book.niveau === niveauFilter;
    return matchesSearch && matchesNiveau;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstItem, indexOfLastItem);

  // Module to color mapping
  const getModuleColors = (module) => {
    const colors = {
      Python: "from-blue-900 to-indigo-900",
      "Web Development": "from-purple-900 to-fuchsia-900",
      DevOps: "from-green-900 to-emerald-900",
      "Data Science": "from-amber-900 to-orange-900",
      Java: "from-red-900 to-pink-900",
      default: "from-gray-900 to-slate-900",
    };
    return colors[module] || colors.default;
  };

  // Module to icon mapping
  const getModuleIcon = (module) => {
    const icons = {
      Python: <Code className="w-16 h-16 text-blue-300" />,
      "Web Development": <Globe className="w-16 h-16 text-purple-300" />,
      DevOps: <Server className="w-16 h-16 text-green-300" />,
      "Data Science": <LineChart className="w-16 h-16 text-amber-300" />,
      Java: <Coffee className="w-16 h-16 text-red-300" />,
      default: <BookOpen className="w-16 h-16 text-gray-300" />,
    };
    return icons[module] || icons.default;
  };

  const ActionMenu = ({ onEdit, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 hover:bg-gray-700/30 rounded-lg"
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

  // Book Card Component
  const BookCard = ({ book }) => (
    <div className="group relative bg-gray-800/30 backdrop-blur-sm rounded-xl border border-white/10 hover:border-purple-400/30 transition-all overflow-hidden">
      <div
        className={`h-48 relative bg-gradient-to-br ${getModuleColors(
          book.module
        )}`}
      >
        <div className="absolute inset-0 opacity-20 flex items-center justify-center">
          {getModuleIcon(book.module)}
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-4xl font-bold tracking-widest text-white/80">
            {book.titre
              .split(" ")
              .map((w) => w[0])
              .slice(0, 3)
              .join("")}
          </div>
        </div>

        <div className="absolute bottom-2 right-2 bg-black/40 px-2 py-1 rounded text-xs text-white">
          v{book.version}
        </div>

        <div className="absolute top-2 right-2">
          <ActionMenu
            onEdit={() => {
              setSelectedOuvrageId(book.id);
              setIsEditOuvrageModalOpen(true);
            }}
            onDelete={() => handleDelete(book.id)}
          />
        </div>

        {book.ratingAvg > 400 && (
          <div className="absolute top-2 left-2 bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full text-xs flex items-center">
            <Star className="w-3 h-3 mr-1" /> Popular
          </div>
        )}
      </div>

      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">{book.titre}</h3>
          <p className="text-gray-400 text-sm line-clamp-2">
            {book.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Library className="w-4 h-4 text-purple-400" />
            <span>{book.module}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-blue-400" />
            <span>{book.datePublication}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Hash className="w-4 h-4 text-green-400" />
            <span>{book.ratingAvg} ratings</span>
          </div>
          <div className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-yellow-400" />
            <span>{book.nbrPages} pages</span>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-amber-400" />
            <span>{book.reviews} reviews</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-cyan-400" />
            <span>{book.niveau}</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="px-2 py-1 bg-gray-700/50 rounded-full text-xs">
            {book.module}
          </span>
        </div>
      </div>
    </div>
  );

  if (loading)
    return <div className="text-center py-8">Chargement en cours...</div>;
  if (error)
    return <div className="text-center py-8 text-red-400">Erreur: {error}</div>;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Gestion des Ouvrages
        </h2>
        <button
          onClick={() => setIsAddOuvrageModalOpen(true)}
          className="flex items-center px-4 py-2 bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30 transition-all"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Ajouter un Ouvrage
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher des ouvrages..."
            className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
        </div>
        <select
          className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
          value={niveauFilter}
          onChange={(e) => setNiveauFilter(e.target.value)}
        >
          <option value="Tous">Tous les niveaux</option>
          <option value="Gi1">Gi1</option>
          <option value="Gi2">Gi2</option>
          <option value="Gi3">Gi3</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onEdit={() => {
              setSelectedOuvrageId(book.id);
              setIsEditOuvrageModalOpen(true);
            }}
            onDelete={() => handleDelete(book.id)}
          />
        ))}
      </div>

      {currentBooks.length === 0 && (
        <div className="text-center py-12 space-y-4">
          <BookOpen className="mx-auto w-12 h-12 text-purple-400 opacity-50" />
          <p className="text-gray-400">Aucun ouvrage trouvé</p>
        </div>
      )}

      <div className="flex justify-between items-center">
        <span className="text-gray-400">
          Affichage {indexOfFirstItem + 1}-
          {Math.min(indexOfLastItem, filteredBooks.length)} sur{" "}
          {filteredBooks.length}
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
            disabled={indexOfLastItem >= filteredBooks.length}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Suivant
          </button>
        </div>
      </div>
      <AjoutOuvrage
        isOpen={isAddOuvrageModalOpen}
        onClose={() => setIsAddOuvrageModalOpen(false)}
        modules={modules}
        onOuvrageAdded={refreshData}
      />

      <UpdateOuvrage
        isOpen={isEditOuvrageModalOpen}
        onClose={() => setIsEditOuvrageModalOpen(false)}
        ouvrageId={selectedOuvrageId}
        modules={modules}
        onOuvrageUpdated={refreshData}
      />
    </div>
  );
};

export default OuvragesComponent;
