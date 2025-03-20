import React, { useState, useEffect } from "react";
import {
  FiSearch,
  FiCode,
  FiCpu,
  FiFilter,
  FiArrowRight,
  FiChevronRight,
  FiActivity,
  FiBarChart2,
  FiClock,
  FiLayers,
  FiHexagon,
  FiStar,
} from "react-icons/fi";
import Navbar from "../Products/Navbar";
import FooterSection from "../LandingPage/FooterSection";

const AlgorithmsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [filteredAlgorithms, setFilteredAlgorithms] = useState([]);
  const [featuredAlgorithm, setFeaturedAlgorithm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Sample algorithm data
  const algorithmsData = [
    {
      id: "quick-sort",
      name: "Quick Sort",
      category: "sorting",
      difficulty: "medium",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(log n)",
      description:
        "Quick Sort est un algorithme de tri par division. Il choisit un élément pivot et partitionne le tableau autour de ce pivot.",
      useCase: "Efficace pour trier de grandes quantités de données.",
      pseudoCode: [
        "fonction quickSort(tableau, début, fin)",
        "  si début < fin",
        "    pivot = partition(tableau, début, fin)",
        "    quickSort(tableau, début, pivot - 1)",
        "    quickSort(tableau, pivot + 1, fin)",
        "fin fonction",
      ],
      visual: "sorting",
      isFeatured: true,
    },
    {
      id: "binary-search",
      name: "Recherche Binaire",
      category: "searching",
      difficulty: "easy",
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)",
      description:
        "La recherche binaire est un algorithme de recherche efficace qui fonctionne sur des tableaux triés en divisant l'espace de recherche par deux à chaque étape.",
      useCase:
        "Utilisé pour rechercher rapidement des éléments dans une collection triée.",
      pseudoCode: [
        "fonction rechercherBinaire(tableau, cible, début, fin)",
        "  tant que début <= fin",
        "    milieu = (début + fin) / 2",
        "    si tableau[milieu] == cible",
        "      retourner milieu",
        "    sinon si tableau[milieu] < cible",
        "      début = milieu + 1",
        "    sinon",
        "      fin = milieu - 1",
        "  retourner -1 // Non trouvé",
        "fin fonction",
      ],
      visual: "searching",
      isFeatured: false,
    },
    {
      id: "dijkstra",
      name: "Algorithme de Dijkstra",
      category: "graph",
      difficulty: "hard",
      timeComplexity: "O(V² + E)",
      spaceComplexity: "O(V + E)",
      description:
        "L'algorithme de Dijkstra calcule le chemin le plus court depuis un nœud source vers tous les autres nœuds dans un graphe pondéré.",
      useCase: "Utilisé dans les applications de routage et de navigation GPS.",
      pseudoCode: [
        "fonction dijkstra(graphe, source)",
        "  initialiser distances[] = infini",
        "  distances[source] = 0",
        "  créer file de priorité Q",
        "  insérer source dans Q",
        "  tant que Q n'est pas vide",
        "    u = extraire minimum de Q",
        "    pour chaque voisin v de u",
        "      si distances[v] > distances[u] + poids(u, v)",
        "        distances[v] = distances[u] + poids(u, v)",
        "        insérer v dans Q",
        "  retourner distances",
        "fin fonction",
      ],
      visual: "graph",
      isFeatured: true,
    },
    {
      id: "merge-sort",
      name: "Tri Fusion",
      category: "sorting",
      difficulty: "medium",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n)",
      description:
        "Le tri fusion est un algorithme de tri par division qui divise le tableau en deux moitiés, trie chacune séparément, puis fusionne les deux moitiés triées.",
      useCase: "Stable et efficace pour les grands jeux de données.",
      pseudoCode: [
        "fonction triFusion(tableau)",
        "  si longueur(tableau) <= 1",
        "    retourner tableau",
        "  milieu = longueur(tableau) / 2",
        "  gauche = triFusion(tableau[0...milieu-1])",
        "  droite = triFusion(tableau[milieu...fin])",
        "  retourner fusionner(gauche, droite)",
        "fin fonction",
      ],
      visual: "sorting",
      isFeatured: false,
    },
    {
      id: "dfs",
      name: "Parcours en Profondeur (DFS)",
      category: "graph",
      difficulty: "medium",
      timeComplexity: "O(V + E)",
      spaceComplexity: "O(V)",
      description:
        "Le parcours en profondeur est un algorithme de parcours de graphe qui explore aussi loin que possible le long de chaque branche avant de revenir en arrière.",
      useCase:
        "Détection de cycle, résolution de labyrinthe, parcours de structures hiérarchiques.",
      pseudoCode: [
        "fonction DFS(graphe, noeud)",
        "  marquer noeud comme visité",
        "  pour chaque voisin de noeud",
        "    si voisin n'est pas visité",
        "      DFS(graphe, voisin)",
        "fin fonction",
      ],
      visual: "graph",
      isFeatured: false,
    },
    {
      id: "dynamic-programming",
      name: "Fibonacci (Programmation Dynamique)",
      category: "dynamic",
      difficulty: "hard",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      description:
        "La programmation dynamique est une méthode pour résoudre des problèmes complexes en les décomposant en sous-problèmes plus simples.",
      useCase:
        "Problèmes d'optimisation comme le sac à dos, plus court chemin, etc.",
      pseudoCode: [
        "fonction fibonacci(n)",
        "  créer tableau dp[0...n]",
        "  dp[0] = 0, dp[1] = 1",
        "  pour i de 2 à n",
        "    dp[i] = dp[i-1] + dp[i-2]",
        "  retourner dp[n]",
        "fin fonction",
      ],
      visual: "dynamic",
      isFeatured: true,
    },
    {
      id: "bfs",
      name: "Parcours en Largeur (BFS)",
      category: "graph",
      difficulty: "medium",
      timeComplexity: "O(V + E)",
      spaceComplexity: "O(V)",
      description:
        "Le parcours en largeur est un algorithme qui explore un graphe niveau par niveau, visitant tous les voisins d'un nœud avant de passer au niveau suivant.",
      useCase:
        "Trouver le plus court chemin dans un graphe non pondéré, analyse de réseaux sociaux.",
      pseudoCode: [
        "fonction BFS(graphe, source)",
        "  créer file Q",
        "  marquer source comme visité",
        "  enfiler source dans Q",
        "  tant que Q n'est pas vide",
        "    v = défiler Q",
        "    pour chaque voisin w de v",
        "      si w n'est pas visité",
        "        marquer w comme visité",
        "        enfiler w dans Q",
        "fin fonction",
      ],
      visual: "graph",
      isFeatured: false,
    },
    {
      id: "a-star",
      name: "Algorithme A*",
      category: "graph",
      difficulty: "hard",
      timeComplexity: "O(E)",
      spaceComplexity: "O(V)",
      description:
        "A* est un algorithme de recherche de chemin qui utilise une heuristique pour trouver le chemin le plus court entre deux points.",
      useCase:
        "Jeux vidéo, navigation, planification de chemin pour la robotique.",
      pseudoCode: [
        "fonction aStar(graphe, début, fin)",
        "  créer ensembles ouverts et fermés",
        "  ajouter début à l'ensemble ouvert",
        "  tant que l'ensemble ouvert n'est pas vide",
        "    noeud = noeud avec le coût f le plus faible de l'ensemble ouvert",
        "    si noeud == fin",
        "      retourner reconstituer_chemin(noeud)",
        "    déplacer noeud de l'ensemble ouvert à l'ensemble fermé",
        "    pour chaque voisin de noeud",
        "      si voisin est dans l'ensemble fermé",
        "        continuer",
        "      si voisin n'est pas dans l'ensemble ouvert",
        "        ajouter voisin à l'ensemble ouvert",
        "      g_score = coût du début à voisin via noeud",
        "      si g_score est pire que le précédent",
        "        continuer",
        "      mettre à jour parent de voisin à noeud",
        "      mettre à jour g et f scores de voisin",
        "fin fonction",
      ],
      visual: "graph",
      isFeatured: false,
    },
  ];

  const categories = [
    { id: "all", name: "Tous", icon: <FiHexagon /> },
    { id: "sorting", name: "Tri", icon: <FiBarChart2 /> },
    { id: "searching", name: "Recherche", icon: <FiSearch /> },
    { id: "graph", name: "Graphes", icon: <FiActivity /> },
    { id: "dynamic", name: "Prog. Dynamique", icon: <FiLayers /> },
  ];

  const difficulties = [
    { id: "all", name: "Tous les niveaux" },
    { id: "easy", name: "Facile" },
    { id: "medium", name: "Moyen" },
    { id: "hard", name: "Difficile" },
  ];

  // Function to get a random featured algorithm
  useEffect(() => {
    const featured = algorithmsData.filter((algo) => algo.isFeatured);
    const randomFeatured =
      featured[Math.floor(Math.random() * featured.length)];
    setFeaturedAlgorithm(randomFeatured);

    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter algorithms based on search term, category, and difficulty
  useEffect(() => {
    let results = [...algorithmsData];

    // Filter by category
    if (selectedCategory !== "all") {
      results = results.filter((algo) => algo.category === selectedCategory);
    }

    // Filter by difficulty
    if (selectedDifficulty !== "all") {
      results = results.filter(
        (algo) => algo.difficulty === selectedDifficulty
      );
    }

    // Filter by search term
    if (searchTerm) {
      results = results.filter(
        (algo) =>
          algo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          algo.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredAlgorithms(results);
  }, [searchTerm, selectedCategory, selectedDifficulty]);

  // Function to get difficulty color
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "from-green-400 to-green-600";
      case "medium":
        return "from-yellow-400 to-orange-500";
      case "hard":
        return "from-red-400 to-red-600";
      default:
        return "from-blue-400 to-purple-500";
    }
  };

  // Function to get difficulty text
  const getDifficultyText = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "Facile";
      case "medium":
        return "Moyen";
      case "hard":
        return "Difficile";
      default:
        return "Inconnu";
    }
  };

  // Function to get category icon
  const getCategoryIcon = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.icon : <FiCode />;
  };

  // Loading animation
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block relative w-24 h-24">
            <div className="absolute inset-0 border-4 border-t-blue-500 border-r-purple-500 border-b-blue-500 border-l-purple-500 rounded-full animate-spin"></div>
            <div className="absolute inset-3 border-4 border-t-transparent border-r-blue-400 border-b-transparent border-l-purple-400 rounded-full animate-spin animate-pulse"></div>
            <FiCpu className="absolute inset-0 m-auto w-8 h-8 text-blue-400" />
          </div>
          <p className="mt-4 text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Chargement des algorithmes...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200">
      <Navbar />
      {/* Hero Section with Featured Algorithm */}
      <div className="relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gray-900">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute left-0 w-full h-full bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
            <div className="absolute top-0 left-0 w-full h-full">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse"
                  style={{
                    width: `${Math.random() * 300 + 50}px`,
                    height: `${Math.random() * 300 + 50}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDuration: `${Math.random() * 10 + 10}s`,
                    animationDelay: `${Math.random() * 5}s`,
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 pt-16 pb-20 px-6 sm:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Bibliothèque d'Algorithmes
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Explorez notre collection d'algorithmes classiques et avancés
                avec des explications détaillées et des visualisations
                interactives
              </p>
            </div>

            {featuredAlgorithm && (
              <div className="relative overflow-hidden rounded-3xl shadow-xl shadow-purple-500/10 bg-gray-900/70 backdrop-blur-md border border-white/10 mb-16">
                <div className="absolute top-0 right-0 bg-gradient-to-l from-blue-500 to-purple-500 text-white py-2 px-4 rounded-bl-xl font-medium">
                  <div className="flex items-center">
                    <FiStar className="mr-2" /> Algorithme en vedette
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6 p-8">
                  <div>
                    <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                      {featuredAlgorithm.name}
                    </h2>
                    <div className="flex items-center mb-4 space-x-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-800 text-gray-300">
                        {getCategoryIcon(featuredAlgorithm.category)}
                        <span className="ml-2">
                          {
                            categories.find(
                              (cat) => cat.id === featuredAlgorithm.category
                            )?.name
                          }
                        </span>
                      </span>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${getDifficultyColor(
                          featuredAlgorithm.difficulty
                        )} text-white`}
                      >
                        {getDifficultyText(featuredAlgorithm.difficulty)}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-6">
                      {featuredAlgorithm.description}
                    </p>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-800/50 p-3 rounded-lg">
                        <div className="flex items-center text-sm text-gray-400 mb-1">
                          <FiClock className="mr-2" /> Complexité temporelle
                        </div>
                        <div className="text-blue-400 font-mono font-medium">
                          {featuredAlgorithm.timeComplexity}
                        </div>
                      </div>
                      <div className="bg-gray-800/50 p-3 rounded-lg">
                        <div className="flex items-center text-sm text-gray-400 mb-1">
                          <FiLayers className="mr-2" /> Complexité spatiale
                        </div>
                        <div className="text-purple-400 font-mono font-medium">
                          {featuredAlgorithm.spaceComplexity}
                        </div>
                      </div>
                    </div>
                    <button className="inline-flex items-center py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-xl transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900">
                      Voir les détails
                      <FiArrowRight className="ml-2" />
                    </button>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center mb-3 text-blue-400 font-medium">
                      <FiCode className="mr-2" /> Pseudo-code
                    </div>
                    <div className="font-mono text-sm text-gray-300 bg-gray-900/70 p-4 rounded-lg h-64 overflow-y-auto">
                      {featuredAlgorithm.pseudoCode.map((line, index) => (
                        <div key={index} className="mb-1">
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Search and Filter Section */}
            <div className="bg-gray-900/60 backdrop-blur-md rounded-2xl border border-white/10 p-6 shadow-lg shadow-purple-500/5 mb-10">
              {/* Search Bar */}
              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <FiSearch className="w-5 h-5 text-blue-400" />
                </div>
                <input
                  type="text"
                  placeholder="Rechercher un algorithme..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-gray-800/50 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder-gray-500"
                />
              </div>

              {/* Filter Sections */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Categories */}
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center">
                    <FiFilter className="mr-2" /> Catégories
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all 
                          ${
                            selectedCategory === category.id
                              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md shadow-purple-500/20"
                              : "bg-gray-800/60 text-gray-400 hover:bg-gray-800 hover:text-gray-200"
                          }`}
                      >
                        <span className="mr-2">{category.icon}</span>
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Difficulty */}
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center">
                    <FiFilter className="mr-2" /> Difficulté
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {difficulties.map((difficulty) => (
                      <button
                        key={difficulty.id}
                        onClick={() => setSelectedDifficulty(difficulty.id)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all 
                          ${
                            selectedDifficulty === difficulty.id
                              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md shadow-purple-500/20"
                              : "bg-gray-800/60 text-gray-400 hover:bg-gray-800 hover:text-gray-200"
                          }`}
                      >
                        {difficulty.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="px-6 sm:px-8 lg:px-12 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Results Count */}
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-xl font-medium">
              <span className="text-blue-400">{filteredAlgorithms.length}</span>{" "}
              algorithmes trouvés
            </h2>
          </div>

          {/* Algorithm Cards */}
          {filteredAlgorithms.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAlgorithms.map((algorithm) => (
                <div
                  key={algorithm.id}
                  className="group relative bg-gray-900/30 rounded-xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10"
                >
                  {/* Animated border gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  {/* Category indicator */}
                  <div className="absolute top-0 right-0 p-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-800/80 text-blue-400">
                      {getCategoryIcon(algorithm.category)}
                    </div>
                  </div>

                  {/* Difficulty line */}
                  <div
                    className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${getDifficultyColor(
                      algorithm.difficulty
                    )}`}
                  ></div>

                  <div className="p-6 relative z-10">
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all">
                      {algorithm.name}
                    </h3>

                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {algorithm.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="bg-gray-800/50 p-2 rounded-lg">
                        <div className="text-xs text-gray-400 mb-1">
                          Complexité temporelle
                        </div>
                        <div className="text-blue-400 font-mono text-sm font-medium">
                          {algorithm.timeComplexity}
                        </div>
                      </div>
                      <div className="bg-gray-800/50 p-2 rounded-lg">
                        <div className="text-xs text-gray-400 mb-1">
                          Complexité spatiale
                        </div>
                        <div className="text-purple-400 font-mono text-sm font-medium">
                          {algorithm.spaceComplexity}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getDifficultyColor(
                          algorithm.difficulty
                        )} text-white`}
                      >
                        {getDifficultyText(algorithm.difficulty)}
                      </span>
                      <button className="flex items-center text-sm font-medium text-blue-400 opacity-0 group-hover:opacity-100 transition-all">
                        Voir les détails
                        <FiChevronRight className="ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-900/30 rounded-xl border border-white/10">
              <div className="text-6xl mb-4 opacity-30">🧮</div>
              <h3 className="text-2xl font-medium text-gray-400 mb-2">
                Aucun algorithme trouvé
              </h3>
              <p className="text-gray-500">
                Essayez avec d'autres termes de recherche ou filtres
              </p>
            </div>
          )}
        </div>
      </div>
      <FooterSection />
    </div>
  );
};

export default AlgorithmsPage;
