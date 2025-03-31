import React, { useState } from "react";
import {
  PlusCircle,
  Search,
  BookOpen,
  Library,
  Clock,
  User,
  Hash,
  MoreVertical,
  Edit,
  Trash2,
} from "lucide-react";

const OuvragesComponent = () => {
  // Sample book data
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "L'Intelligence Artificielle pour les Débutants",
      author: "Marie Dupont",
      category: "Technologie",
      isbn: "978-3-16-148410-0",
      publicationDate: "2023-03-15",
      pages: 328,
      status: "Disponible",
      cover: "https://source.unsplash.com/featured/800x600?book,ai",
    },
    {
      id: 2,
      title: "Les Fondements du Deep Learning",
      author: "Jean Leroy",
      category: "Data Science",
      isbn: "978-1-23-456789-7",
      publicationDate: "2024-01-20",
      pages: 452,
      status: "Emprunté",
      cover: "https://source.unsplash.com/featured/800x600?book,neural",
    },
    {
      id: 3,
      title: "Cybersécurité: Protéger vos Données",
      author: "Lucie Martin",
      category: "Sécurité",
      isbn: "978-2-45-678901-2",
      publicationDate: "2022-11-10",
      pages: 275,
      status: "Disponible",
      cover: "https://source.unsplash.com/featured/800x600?book,security",
    },
    {
      id: 4,
      title: "Introduction au Machine Learning",
      author: "Édouard Petit",
      category: "Data Science",
      isbn: "978-4-56-789012-3",
      publicationDate: "2023-07-22",
      pages: 390,
      status: "Emprunté",
      cover:
        "https://source.unsplash.com/featured/800x600?book,machinelearning",
    },
    {
      id: 5,
      title: "Blockchain: L'avenir des Transactions",
      author: "Amélie Rousseau",
      category: "Technologie Financière",
      isbn: "978-5-67-890123-4",
      publicationDate: "2024-02-05",
      pages: 312,
      status: "Disponible",
      cover: "https://source.unsplash.com/featured/800x600?book,blockchain",
    },
    {
      id: 6,
      title: "Le Guide du Big Data",
      author: "Pierre Garnier",
      category: "Data Science",
      isbn: "978-6-78-901234-5",
      publicationDate: "2023-09-18",
      pages: 420,
      status: "En réparation",
      cover: "https://source.unsplash.com/featured/800x600?book,data",
    },
    {
      id: 7,
      title: "Python pour la Science des Données",
      author: "Sophie Lemaire",
      category: "Programmation",
      isbn: "978-7-89-012345-6",
      publicationDate: "2023-05-30",
      pages: 365,
      status: "Disponible",
      cover: "https://source.unsplash.com/featured/800x600?book,python",
    },
    {
      id: 8,
      title: "Les Réseaux Neurones en Pratique",
      author: "Antoine Moreau",
      category: "Intelligence Artificielle",
      isbn: "978-8-90-123456-7",
      publicationDate: "2024-03-01",
      pages: 285,
      status: "Emprunté",
      cover: "https://source.unsplash.com/featured/800x600?book,network",
    },
    {
      id: 9,
      title: "Cloud Computing Moderne",
      author: "Camille Dubois",
      category: "Informatique",
      isbn: "978-9-01-234567-8",
      publicationDate: "2023-12-12",
      pages: 330,
      status: "Disponible",
      cover: "https://source.unsplash.com/featured/800x600?book,cloud",
    },
    {
      id: 10,
      title: "Robotique et IA: La Nouvelle Frontière",
      author: "Thomas Legrand",
      category: "Robotique",
      isbn: "978-0-12-345678-9",
      publicationDate: "2024-04-20",
      pages: 410,
      status: "Emprunté",
      cover: "https://source.unsplash.com/featured/800x600?book,robot",
    },
    {
      id: 11,
      title: "L'Éthique de l'IA",
      author: "Élise Perrin",
      category: "Philosophie Technologique",
      isbn: "978-1-34-567890-1",
      publicationDate: "2023-08-15",
      pages: 290,
      status: "Disponible",
      cover: "https://source.unsplash.com/featured/800x600?book,ethics",
    },
    {
      id: 12,
      title: "Développement Web Avancé",
      author: "Nicolas Bertrand",
      category: "Programmation",
      isbn: "978-2-45-678901-2",
      publicationDate: "2024-05-10",
      pages: 375,
      status: "En commande",
      cover: "https://source.unsplash.com/featured/800x600?book,web",
    },
    {
      id: 13,
      title: "La Transformation Digitale des Entreprises",
      author: "Laura Fontaine",
      category: "Management Technologique",
      isbn: "978-3-56-789012-3",
      publicationDate: "2023-10-25",
      pages: 320,
      status: "Disponible",
      cover: "https://source.unsplash.com/featured/800x600?book,digital",
    },
  ]);

  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tous");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filtering logic
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "Tous" || book.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstItem, indexOfLastItem);

  // Action Menu Component
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
          Gestion des Ouvrages
        </h2>
        <button className="flex items-center px-4 py-2 bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30 transition-all">
          <PlusCircle className="w-5 h-5 mr-2" />
          Ajouter un Ouvrage
        </button>
      </div>

      {/* Search and Filters */}
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
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="Tous">Tous les statuts</option>
          <option value="Disponible">Disponible</option>
          <option value="Emprunté">Emprunté</option>
          <option value="Réservé">Réservé</option>
        </select>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentBooks.map((book) => (
          <div
            key={book.id}
            className="group relative bg-gray-800/30 backdrop-blur-sm rounded-xl border border-white/10 hover:border-purple-400/30 transition-all overflow-hidden"
          >
            {/* Book Cover */}
            <div className="h-48 bg-gray-700/50 relative">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute top-2 right-2">
                <ActionMenu
                  onEdit={() => console.log("Edit", book.id)}
                  onDelete={() =>
                    setBooks((prev) => prev.filter((b) => b.id !== book.id))
                  }
                />
              </div>
            </div>

            {/* Book Details */}
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">{book.title}</h3>
                <p className="text-gray-400 text-sm">{book.author}</p>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Library className="w-4 h-4 text-purple-400" />
                  <span>{book.category}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span>{book.publicationDate}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Hash className="w-4 h-4 text-green-400" />
                  <span>{book.isbn}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-yellow-400" />
                  <span>{book.pages} pages</span>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between">
                <span
                  className={`px-2 py-1 rounded-full ${
                    book.status === "Disponible"
                      ? "bg-green-500/20 text-green-300"
                      : book.status === "Emprunté"
                      ? "bg-red-500/20 text-red-300"
                      : "bg-yellow-500/20 text-yellow-300"
                  }`}
                >
                  {book.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {currentBooks.length === 0 && (
        <div className="text-center py-12 space-y-4">
          <BookOpen className="mx-auto w-12 h-12 text-purple-400 opacity-50" />
          <p className="text-gray-400">Aucun ouvrage trouvé</p>
        </div>
      )}

      {/* Pagination */}
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
    </div>
  );
};

export default OuvragesComponent;
