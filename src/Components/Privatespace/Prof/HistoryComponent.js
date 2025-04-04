import React, { useState, useEffect } from "react";
import { 
  Clock, 
  Filter, 
  BookOpen, 
  FileText, 
  ClipboardList, 
  Search,
  Star,
  BarChart2,
  ChevronRight,
  Users,
  Eye,
  Play,
  Calendar,
  Clock as ClockIcon
} from "lucide-react";

const HistoryComponent = () => {
  // Sample history data
  const [historyItems, setHistoryItems] = useState([
    {
      id: 1,
      title: "Biologie Cellulaire - Les organites",
      type: "cours",
      date: "01/04/2025",
      time: "10:25",
      category: "Biologie",
      thumbnail: "cell-biology.jpg",
      progress: 100,
      rating: 4.8,
      students: 28,
      duration: "45 min",
      views: 126
    },
    {
      id: 2,
      title: "Évaluation trimestrielle - Sciences de la Vie",
      type: "examen",
      date: "28/03/2025",
      time: "14:15",
      category: "Sciences",
      thumbnail: "exam.jpg",
      questions: 25,
      submissions: 31,
      avgScore: 15.4,
      maxScore: 20,
      duration: "2h"
    },
    {
      id: 3,
      title: "Exercices - La photosynthèse",
      type: "exercice",
      date: "25/03/2025",
      time: "09:40",
      category: "Botanique",
      thumbnail: "photosynthesis.jpg",
      questions: 12,
      difficulty: "Moyen",
      completions: 26,
      avgTime: "18 min"
    },
    {
      id: 4,
      title: "Introduction à l'Écologie Marine",
      type: "cours",
      date: "22/03/2025",
      time: "11:05",
      category: "Écologie",
      thumbnail: "marine-ecology.jpg",
      progress: 85,
      rating: 4.5,
      students: 24,
      duration: "60 min",
      views: 98
    },
    {
      id: 5,
      title: "Contrôle surprise - Génétique",
      type: "examen",
      date: "20/03/2025",
      time: "08:50",
      category: "Génétique",
      thumbnail: "genetics.jpg",
      questions: 15,
      submissions: 28,
      avgScore: 13.8,
      maxScore: 20,
      duration: "45 min"
    },
    {
      id: 6,
      title: "TP - Observation microscopique",
      type: "exercice",
      date: "18/03/2025",
      time: "15:30",
      category: "Pratique",
      thumbnail: "microscope.jpg",
      questions: 8,
      difficulty: "Facile",
      completions: 32,
      avgTime: "30 min"
    },
    {
      id: 7,
      title: "Les écosystèmes - Partie 1",
      type: "cours",
      date: "15/03/2025",
      time: "13:20",
      category: "Écologie",
      thumbnail: "ecosystem.jpg",
      progress: 100,
      rating: 4.6,
      students: 29,
      duration: "55 min", 
      views: 112
    }
  ]);

  // Active filter
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Animation state
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Set loaded after a small delay to trigger animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filtered items
  const filteredItems = historyItems.filter(item => {
    const matchesFilter = activeFilter === "all" || item.type === activeFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });
  
  // Get icon for type
  const getIcon = (type) => {
    switch(type) {
      case "cours": return BookOpen;
      case "examen": return ClipboardList;
      case "exercice": return FileText;
      default: return BookOpen;
    }
  };
  
  // Get color for type
  const getColor = (type) => {
    switch(type) {
      case "cours": return "text-blue-400 bg-blue-500/20 border-blue-500/30";
      case "examen": return "text-purple-400 bg-purple-500/20 border-purple-500/30";
      case "exercice": return "text-green-400 bg-green-500/20 border-green-500/30";
      default: return "text-teal-400 bg-teal-500/20 border-teal-500/30";
    }
  };
  
  // Render card based on type
  const renderCard = (item) => {
    const Icon = getIcon(item.type);
    const colorClass = getColor(item.type);
    
    return (
      <div 
        key={item.id} 
        className={`relative bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:border-teal-500/30 transition-all transform hover:scale-[1.02] hover:-translate-y-1 cursor-pointer ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        style={{ transitionDelay: `${item.id * 50}ms` }}
      >
        {/* Top thumbnail/banner area */}
        <div className="h-32 bg-gray-700 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800/60 via-transparent to-transparent"></div>
          <div className={`absolute top-3 left-3 ${colorClass} rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider`}>
            {item.type === "cours" ? "Cours" : item.type === "examen" ? "Examen" : "Exercice"}
          </div>
          <div className="absolute bottom-3 left-3 text-white text-xs font-medium flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            {item.date}
          </div>
          <div className="absolute bottom-3 right-3 text-white text-xs font-medium flex items-center">
            <ClockIcon className="w-3 h-3 mr-1" />
            {item.time}
          </div>
        </div>
        
        {/* Content area */}
        <div className="p-4">
          <div className="flex items-start">
            <div className={`p-2 rounded-lg ${colorClass.split(' ')[0]} ${colorClass.split(' ')[1]} border ${colorClass.split(' ')[2]}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="ml-3 flex-1">
              <h3 className="font-medium text-white leading-snug line-clamp-2">{item.title}</h3>
              <p className="text-gray-400 text-sm mt-1">{item.category}</p>
            </div>
          </div>
          
          {/* Stats based on type */}
          <div className="mt-4 pt-4 border-t border-gray-700">
            {item.type === "cours" && (
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-xs text-gray-400">Progression</div>
                  <div className="font-medium mt-1 text-green-400">{item.progress}%</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Durée</div>
                  <div className="font-medium mt-1">{item.duration}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Vues</div>
                  <div className="font-medium mt-1 flex items-center justify-center">
                    <Eye className="w-3 h-3 mr-1" /> {item.views}
                  </div>
                </div>
              </div>
            )}
            
            {item.type === "examen" && (
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-xs text-gray-400">Questions</div>
                  <div className="font-medium mt-1">{item.questions}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Moyenne</div>
                  <div className="font-medium mt-1 text-purple-400">{item.avgScore}/{item.maxScore}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Remises</div>
                  <div className="font-medium mt-1">{item.submissions}</div>
                </div>
              </div>
            )}
            
            {item.type === "exercice" && (
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-xs text-gray-400">Questions</div>
                  <div className="font-medium mt-1">{item.questions}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Difficulté</div>
                  <div className="font-medium mt-1 text-yellow-400">{item.difficulty}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Temps moy.</div>
                  <div className="font-medium mt-1">{item.avgTime}</div>
                </div>
              </div>
            )}
          </div>
          
          {/* Action button */}
          <div className="mt-4">
            <button className={`w-full py-2 rounded-lg ${colorClass} flex items-center justify-center`}>
              {item.type === "cours" ? (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Continuer
                </>
              ) : item.type === "examen" ? (
                <>
                  <BarChart2 className="w-4 h-4 mr-2" />
                  Voir résultats
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 mr-2" />
                  Voir détails
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Historique d'activités</h1>
          <p className="text-gray-400">Consultez vos cours, examens et exercices récents</p>
        </div>
        
        {/* Filters and search */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div className="flex space-x-2">
            <button 
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeFilter === "all" 
                  ? "bg-teal-600/20 text-teal-400 border border-teal-500/30" 
                  : "bg-gray-800/50 text-gray-400 border border-gray-700 hover:bg-gray-800"
              }`}
            >
              <Clock className="w-4 h-4 inline mr-2" />
              Tout
            </button>
            <button 
              onClick={() => setActiveFilter("cours")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeFilter === "cours" 
                  ? "bg-blue-600/20 text-blue-400 border border-blue-500/30" 
                  : "bg-gray-800/50 text-gray-400 border border-gray-700 hover:bg-gray-800"
              }`}
            >
              <BookOpen className="w-4 h-4 inline mr-2" />
              Cours
            </button>
            <button 
              onClick={() => setActiveFilter("examen")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeFilter === "examen" 
                  ? "bg-purple-600/20 text-purple-400 border border-purple-500/30" 
                  : "bg-gray-800/50 text-gray-400 border border-gray-700 hover:bg-gray-800"
              }`}
            >
              <ClipboardList className="w-4 h-4 inline mr-2" />
              Examens
            </button>
            <button 
              onClick={() => setActiveFilter("exercice")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeFilter === "exercice" 
                  ? "bg-green-600/20 text-green-400 border border-green-500/30" 
                  : "bg-gray-800/50 text-gray-400 border border-gray-700 hover:bg-gray-800"
              }`}
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Exercices
            </button>
          </div>
          
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>
        
        {/* Results count */}
        <div className="mb-6 text-gray-400">
          <span>{filteredItems.length} éléments trouvés</span>
        </div>
        
        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => renderCard(item))}
        </div>
        
        {/* Empty state */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-300">Aucun résultat trouvé</h3>
            <p className="text-gray-500 mt-2">Essayez de modifier vos filtres ou votre recherche</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryComponent;