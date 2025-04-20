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
  FiX,
  FiYoutube,
  FiLink,
  FiBook,
  FiFileText,
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
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Sample algorithm data with added documentation and resources
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
      documentation: [
        {
          title: "Fonctionnement du Quick Sort",
          content:
            "Le Quick Sort fonctionne en sélectionnant un élément 'pivot' dans le tableau, puis en partitionnant les autres éléments en deux sous-tableaux selon qu'ils sont inférieurs ou supérieurs au pivot. L'algorithme est ensuite appliqué récursivement à ces sous-tableaux. Cet algorithme est très efficace en pratique et est souvent utilisé comme algorithme de tri par défaut dans de nombreuses bibliothèques.",
        },
        {
          title: "Cas particuliers et optimisations",
          content:
            "Le pire cas de Quick Sort se produit lorsque le pivot est toujours l'élément minimum ou maximum du tableau, ce qui donne une complexité O(n²). Pour éviter cela, plusieurs stratégies de sélection du pivot peuvent être utilisées, comme le choix du pivot médian de trois, ou une sélection aléatoire. Une autre optimisation courante consiste à utiliser l'insertion sort pour les petits sous-tableaux.",
        },
      ],
      videoResources: [
        {
          title: "Quick Sort expliqué en 5 minutes",
          url: "https://www.youtube.com/watch?v=example1",
          thumbnail: "/api/placeholder/320/180",
        },
        {
          title: "Visualisation du Quick Sort",
          url: "https://www.youtube.com/watch?v=example2",
          thumbnail: "/api/placeholder/320/180",
        },
      ],
      externalResources: [
        {
          title: "Documentation officielle",
          url: "https://example.com/quicksort-docs",
          type: "Documentation",
        },
        {
          title: "Implémentations dans différents langages",
          url: "https://example.com/quicksort-implementations",
          type: "Code",
        },
        {
          title: "Benchmark comparatif des algorithmes de tri",
          url: "https://example.com/sorting-benchmarks",
          type: "Benchmark",
        },
      ],
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
      documentation: [
        {
          title: "Principe de la recherche binaire",
          content:
            "La recherche binaire est un algorithme fondamental de l'informatique qui permet de trouver la position d'une valeur cible dans un tableau trié. À chaque étape, l'algorithme compare la valeur cible à l'élément au milieu du tableau, puis élimine la moitié dans laquelle la cible ne peut pas se trouver.",
        },
        {
          title: "Conditions et limites d'utilisation",
          content:
            "La recherche binaire ne fonctionne que sur des collections déjà triées. Pour des collections non triées, il faut d'abord les trier, ce qui peut avoir un coût en temps supérieur au gain apporté par la recherche binaire, surtout si on ne fait qu'une seule recherche.",
        },
      ],
      videoResources: [
        {
          title: "Comprendre la recherche binaire",
          url: "https://www.youtube.com/watch?v=example3",
          thumbnail: "/api/placeholder/320/180",
        },
      ],
      externalResources: [
        {
          title: "Implémentation optimisée en C++",
          url: "https://example.com/binary-search-cpp",
          type: "Code",
        },
        {
          title: "Applications pratiques de la recherche binaire",
          url: "https://example.com/binary-search-applications",
          type: "Article",
        },
      ],
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
      documentation: [
        {
          title: "Fondements de l'algorithme de Dijkstra",
          content:
            "L'algorithme de Dijkstra résout le problème du plus court chemin dans un graphe orienté ou non orienté avec des poids positifs sur les arêtes. Il utilise une approche gloutonne en sélectionnant toujours le nœud non visité ayant la distance minimale depuis la source.",
        },
        {
          title: "Variantes et améliorations",
          content:
            "L'implémentation naïve a une complexité O(V²), mais avec une file de priorité comme un tas binaire, elle peut être réduite à O((V+E)log V). Notez que l'algorithme ne fonctionne pas correctement avec des poids négatifs, pour lesquels l'algorithme de Bellman-Ford est plus approprié.",
        },
      ],
      videoResources: [
        {
          title: "Algorithme de Dijkstra expliqué pas à pas",
          url: "https://www.youtube.com/watch?v=example4",
          thumbnail: "/api/placeholder/320/180",
        },
        {
          title: "Application de Dijkstra dans les GPS",
          url: "https://www.youtube.com/watch?v=example5",
          thumbnail: "/api/placeholder/320/180",
        },
      ],
      externalResources: [
        {
          title: "Visualiseur interactif de Dijkstra",
          url: "https://example.com/dijkstra-visualizer",
          type: "Outil",
        },
        {
          title: "Implémentation avec file à priorité",
          url: "https://example.com/dijkstra-priority-queue",
          type: "Code",
        },
      ],
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
      documentation: [
        {
          title: "Le tri fusion expliqué",
          content:
            "Le tri fusion est basé sur le principe de diviser pour régner. Il divise récursivement le tableau en deux moitiés, trie chaque moitié, puis fusionne les deux moitiés triées. Ce qui rend le tri fusion particulièrement utile est sa stabilité (les éléments égaux conservent leur ordre relatif) et sa complexité en temps garantie de O(n log n).",
        },
        {
          title: "Avantages et inconvénients",
          content:
            "Le principal avantage du tri fusion est sa complexité temporelle garantie de O(n log n), même dans le pire des cas. Son inconvénient majeur est qu'il nécessite O(n) d'espace supplémentaire pour la fusion, contrairement au tri rapide qui trie en place.",
        },
      ],
      videoResources: [
        {
          title: "Visualisation du tri fusion",
          url: "https://www.youtube.com/watch?v=example6",
          thumbnail: "/api/placeholder/320/180",
        },
      ],
      externalResources: [
        {
          title: "Implémentation optimisée du tri fusion",
          url: "https://example.com/mergesort-optimized",
          type: "Code",
        },
        {
          title: "Tri fusion vs Tri rapide",
          url: "https://example.com/mergesort-vs-quicksort",
          type: "Comparaison",
        },
      ],
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
      documentation: [
        {
          title: "Principe du parcours en profondeur",
          content:
            "Le DFS explore un chemin aussi loin que possible avant de revenir en arrière (backtracking) pour explorer d'autres chemins. L'algorithme peut être implémenté de manière récursive ou avec une pile explicite.",
        },
        {
          title: "Applications pratiques",
          content:
            "Le DFS est utilisé pour détecter les cycles dans un graphe, résoudre des puzzles comme les labyrinthes, et dans de nombreux problèmes d'intelligence artificielle tels que les jeux et la planification de chemin.",
        },
      ],
      videoResources: [
        {
          title: "DFS expliqué simplement",
          url: "https://www.youtube.com/watch?v=example7",
          thumbnail: "/api/placeholder/320/180",
        },
      ],
      externalResources: [
        {
          title: "Implémentation itérative vs récursive",
          url: "https://example.com/dfs-implementations",
          type: "Code",
        },
        {
          title: "Applications du DFS en IA",
          url: "https://example.com/dfs-ai-applications",
          type: "Article",
        },
      ],
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
      documentation: [
        {
          title: "Concepts de la programmation dynamique",
          content:
            "La programmation dynamique résout des problèmes en les décomposant en sous-problèmes plus simples et en stockant les résultats des sous-problèmes pour éviter de les recalculer. Elle s'applique aux problèmes ayant une structure de sous-problèmes qui se chevauchent et une propriété de sous-structure optimale.",
        },
        {
          title: "Approches top-down et bottom-up",
          content:
            "L'approche top-down (mémoïsation) résout le problème récursivement en stockant les résultats dans un cache. L'approche bottom-up (tabulation) commence par résoudre les plus petits sous-problèmes et construit progressivement la solution du problème initial.",
        },
      ],
      videoResources: [
        {
          title: "Introduction à la programmation dynamique",
          url: "https://www.youtube.com/watch?v=example8",
          thumbnail: "/api/placeholder/320/180",
        },
        {
          title: "Résolution du problème de Fibonacci",
          url: "https://www.youtube.com/watch?v=example9",
          thumbnail: "/api/placeholder/320/180",
        },
      ],
      externalResources: [
        {
          title: "Catalogue de problèmes de programmation dynamique",
          url: "https://example.com/dp-problems",
          type: "Ressource",
        },
        {
          title: "Optimisation de l'espace en programmation dynamique",
          url: "https://example.com/dp-space-optimization",
          type: "Technique",
        },
      ],
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
      documentation: [
        {
          title: "Principe du parcours en largeur",
          content:
            "Le BFS explore tous les voisins d'un nœud avant de passer à la génération suivante de nœuds. Il utilise une file (FIFO) pour garder trace des nœuds à explorer, contrairement au DFS qui utilise une pile (LIFO).",
        },
        {
          title: "Applications du BFS",
          content:
            "Le BFS est particulièrement utile pour trouver le plus court chemin dans un graphe non pondéré, pour l'analyse de réseaux sociaux (comme trouver les connexions à n degrés de séparation), et dans les algorithmes de recherche dans les arbres de jeux.",
        },
      ],
      videoResources: [
        {
          title: "BFS vs DFS - Quelle différence?",
          url: "https://www.youtube.com/watch?v=example10",
          thumbnail: "/api/placeholder/320/180",
        },
      ],
      externalResources: [
        {
          title: "Visualiseur interactif de BFS",
          url: "https://example.com/bfs-visualizer",
          type: "Outil",
        },
        {
          title: "BFS dans l'exploration de graphes massifs",
          url: "https://example.com/bfs-large-graphs",
          type: "Recherche",
        },
      ],
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
      documentation: [
        {
          title: "Principes de l'algorithme A*",
          content:
            "A* combine les avantages de l'algorithme de Dijkstra (qui garantit le plus court chemin) et des algorithmes gloutons (qui utilisent une heuristique pour accélérer la recherche). Il utilise une fonction d'évaluation f(n) = g(n) + h(n), où g(n) est le coût du chemin de départ à n, et h(n) est une heuristique qui estime le coût de n à la destination.",
        },
        {
          title: "Choix de l'heuristique",
          content:
            "Le choix de l'heuristique est crucial pour l'efficacité de A*. Une heuristique admissible (qui ne surestime jamais le coût réel) garantit que A* trouvera le chemin optimal. Des heuristiques courantes incluent la distance de Manhattan pour les grilles et la distance euclidienne pour les espaces continus.",
        },
      ],
      videoResources: [
        {
          title: "A* expliqué simplement",
          url: "https://www.youtube.com/watch?v=example11",
          thumbnail: "/api/placeholder/320/180",
        },
        {
          title: "Implémentation de A* dans les jeux vidéo",
          url: "https://www.youtube.com/watch?v=example12",
          thumbnail: "/api/placeholder/320/180",
        },
      ],
      externalResources: [
        {
          title: "Simulateur interactif d'A*",
          url: "https://example.com/astar-simulator",
          type: "Outil",
        },
        {
          title: "Optimisations avancées d'A*",
          url: "https://example.com/astar-optimizations",
          type: "Technique",
        },
        {
          title: "Implémentation d'A* pour la robotique",
          url: "https://example.com/astar-robotics",
          type: "Implémentation",
        },
      ],
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

  // Function to open the details modal
  const openAlgorithmDetails = (algorithm) => {
    setSelectedAlgorithm(algorithm);
    setShowDetailsModal(true);
    document.body.classList.add("overflow-hidden");
  };

  // Function to close the details modal
  const closeAlgorithmDetails = () => {
    setShowDetailsModal(false);
    document.body.classList.remove("overflow-hidden");
  };

  // Function to get a random featured algorithm
  useEffect(() => {
    const featured = algorithmsData.filter((algo) => algo.isFeatured);
    const randomFeatured =
      featured[Math.floor(Math.random() * featured.length)];
    setFeaturedAlgorithm(randomFeatured);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter algorithms based on search term, category, and difficulty
  useEffect(() => {
    let results = [...algorithmsData];

    if (selectedCategory !== "all") {
      results = results.filter((algo) => algo.category === selectedCategory);
    }

    if (selectedDifficulty !== "all") {
      results = results.filter(
        (algo) => algo.difficulty === selectedDifficulty
      );
    }

    if (searchTerm) {
      results = results.filter(
        (algo) =>
          algo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          algo.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredAlgorithms(results);
  }, [searchTerm, selectedCategory, selectedDifficulty]);

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

  const getCategoryIcon = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.icon : <FiCode />;
  };

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
                    <button
                      className="inline-flex items-center py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-xl transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                      onClick={() => openAlgorithmDetails(featuredAlgorithm)}
                    >
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
                  onClick={() => openAlgorithmDetails(algorithm)}
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

      {/* Algorithm Details Modal */}
      {showDetailsModal && selectedAlgorithm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
              onClick={closeAlgorithmDetails}
            >
              <div className="absolute inset-0 bg-black opacity-70"></div>
            </div>

            {/* Modal container */}
            <div className="inline-block align-bottom bg-gray-900 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full relative border border-white/10">
              <button
                onClick={closeAlgorithmDetails}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <FiX className="w-5 h-5 text-gray-400" />
              </button>

              <div className="px-6 py-6 sm:px-8 sm:py-8">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
                      {selectedAlgorithm.name}
                    </h2>
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-800 text-gray-300">
                        {getCategoryIcon(selectedAlgorithm.category)}
                        <span className="ml-2">
                          {
                            categories.find(
                              (cat) => cat.id === selectedAlgorithm.category
                            )?.name
                          }
                        </span>
                      </span>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${getDifficultyColor(
                          selectedAlgorithm.difficulty
                        )} text-white`}
                      >
                        {getDifficultyText(selectedAlgorithm.difficulty)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mt-6">
                  {/* Left column */}
                  <div>
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold mb-3 text-blue-400 flex items-center">
                        <FiFileText className="mr-2" /> Description
                      </h3>
                      <p className="text-gray-300">
                        {selectedAlgorithm.description}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-xl font-semibold mb-3 text-blue-400 flex items-center">
                        <FiBook className="mr-2" /> Documentation
                      </h3>
                      <div className="space-y-4">
                        {selectedAlgorithm.documentation.map((doc, index) => (
                          <div
                            key={index}
                            className="bg-gray-800/50 p-4 rounded-lg"
                          >
                            <h4 className="font-medium text-gray-200 mb-2">
                              {doc.title}
                            </h4>
                            <p className="text-gray-400 text-sm">
                              {doc.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right column */}
                  <div>
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold mb-3 text-blue-400 flex items-center">
                        <FiCode className="mr-2" /> Pseudo-code
                      </h3>
                      <div className="font-mono text-sm text-gray-300 bg-gray-800/50 p-4 rounded-lg overflow-x-auto">
                        {selectedAlgorithm.pseudoCode.map((line, index) => (
                          <div key={index} className="mb-1">
                            {line}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-xl font-semibold mb-3 text-blue-400 flex items-center">
                        <FiYoutube className="mr-2" /> Ressources vidéo
                      </h3>
                      <div className="grid gap-3">
                        {selectedAlgorithm.videoResources.map(
                          (video, index) => (
                            <a
                              key={index}
                              href={video.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
                            >
                              <div className="bg-gray-700 w-16 h-10 rounded flex items-center justify-center mr-3">
                                <FiYoutube className="text-red-500" />
                              </div>
                              <span className="text-gray-300">
                                {video.title}
                              </span>
                            </a>
                          )
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-blue-400 flex items-center">
                        <FiLink className="mr-2" /> Ressources externes
                      </h3>
                      <div className="grid gap-2">
                        {selectedAlgorithm.externalResources.map(
                          (resource, index) => (
                            <a
                              key={index}
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors text-sm"
                            >
                              <div className="mr-3 text-blue-400">
                                {resource.type === "Code" ? (
                                  <FiCode />
                                ) : resource.type === "Article" ? (
                                  <FiFileText />
                                ) : (
                                  <FiLink />
                                )}
                              </div>
                              <div>
                                <div className="text-gray-300">
                                  {resource.title}
                                </div>
                                <div className="text-gray-500 text-xs">
                                  {resource.type}
                                </div>
                              </div>
                            </a>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="flex items-center text-sm text-gray-400 mb-1">
                      <FiClock className="mr-2" /> Complexité temporelle
                    </div>
                    <div className="text-blue-400 font-mono font-medium">
                      {selectedAlgorithm.timeComplexity}
                    </div>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="flex items-center text-sm text-gray-400 mb-1">
                      <FiLayers className="mr-2" /> Complexité spatiale
                    </div>
                    <div className="text-purple-400 font-mono font-medium">
                      {selectedAlgorithm.spaceComplexity}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <FooterSection />
    </div>
  );
};

export default AlgorithmsPage;
