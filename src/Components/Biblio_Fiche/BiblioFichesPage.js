import React, { useState } from "react";
import {
  FiCode,
  FiDatabase,
  FiSmartphone,
  FiServer,
  FiActivity,
  FiSearch,
  FiChevronRight,
  FiBookOpen,
  FiCpu,
  FiBox,
  FiHexagon,
  FiHardDrive,
  FiCloud,
  FiGlobe,
  FiGitBranch,
} from "react-icons/fi";

import Navbar from "../Products/Navbar";
import FooterSection from "../LandingPage/FooterSection";

const BiblioFichesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCard, setExpandedCard] = useState(null);

  // Catégories de fiches
  const categories = [
    { id: "all", name: "Tous", icon: <FiBookOpen /> },
    { id: "langages", name: "Langages", icon: <FiCode /> },
    { id: "math", name: "Mathématiques", icon: <FiActivity /> },
    { id: "data", name: "Data & ML", icon: <FiDatabase /> },
    { id: "web", name: "Dév. Web", icon: <FiGlobe /> },
    { id: "mobile", name: "Dév. Mobile", icon: <FiSmartphone /> },
    { id: "reseau", name: "Réseaux", icon: <FiServer /> },
  ];

  // Fiches de modules simplifiées
  const fiches = [
    {
      id: 1,
      title: "Langage C",
      category: "langages",
      icon: <FiCpu />,
      color: "from-blue-500 to-cyan-500",
      chapters: [
        "Syntaxe de base",
        "Pointeurs",
        "Allocation de mémoire",
        "Structures et unions",
        "Manipulation de fichiers",
      ],
      difficulty: "Intermédiaire",
      professor: "Dr. Alaoui",
    },
    {
      id: 2,
      title: "C++ Object-Oriented",
      category: "langages",
      icon: <FiBox />,
      color: "from-blue-600 to-indigo-500",
      chapters: [
        "Classes et objets",
        "Héritage et polymorphisme",
        "Surcharge d'opérateurs",
        "Templates",
        "STL",
      ],
      difficulty: "Avancé",
      professor: "Prof. Bennani",
    },
    {
      id: 3,
      title: "Python",
      category: "langages",
      icon: <FiCode />,
      color: "from-green-500 to-emerald-500",
      chapters: [
        "Syntaxe et bases",
        "Structures de données",
        "Fonctions",
        "Modules et packages",
        "OOP en Python",
      ],
      difficulty: "Débutant",
      professor: "Dr. Mansouri",
    },
    {
      id: 4,
      title: "Java",
      category: "langages",
      icon: <FiHexagon />,
      color: "from-red-500 to-orange-500",
      chapters: [
        "Syntaxe et bases",
        "OOP avancé",
        "Collections",
        "Interfaces graphiques",
        "Multithreading",
      ],
      difficulty: "Intermédiaire",
      professor: "Prof. Chakir",
    },
    {
      id: 5,
      title: "JavaScript",
      category: "langages",
      icon: <FiGitBranch />,
      color: "from-yellow-500 to-amber-500",
      chapters: ["Syntaxe et bases", "DOM", "Asynchrone", "ES6+", "Frameworks"],
      difficulty: "Intermédiaire",
      professor: "Mme. Toumi",
    },
    {
      id: 6,
      title: "Algèbre Linéaire",
      category: "math",
      icon: <FiActivity />,
      color: "from-purple-500 to-violet-500",
      chapters: [
        "Espaces vectoriels",
        "Matrices",
        "Déterminants",
        "Systèmes linéaires",
        "Valeurs propres",
      ],
      difficulty: "Avancé",
      professor: "Dr. Hassani",
    },
    {
      id: 7,
      title: "Analyse Mathématique",
      category: "math",
      icon: <FiActivity />,
      color: "from-indigo-500 to-blue-500",
      chapters: [
        "Limites et continuité",
        "Dérivées",
        "Intégrales",
        "Séries",
        "Équations différentielles",
      ],
      difficulty: "Avancé",
      professor: "Prof. Rachidi",
    },
    {
      id: 8,
      title: "Probabilités et Statistiques",
      category: "math",
      icon: <FiActivity />,
      color: "from-teal-500 to-green-500",
      chapters: [
        "Probabilités",
        "Variables aléatoires",
        "Distributions",
        "Estimation",
        "Tests d'hypothèses",
      ],
      difficulty: "Intermédiaire",
      professor: "Dr. Ouafik",
    },
    {
      id: 9,
      title: "Machine Learning",
      category: "data",
      icon: <FiDatabase />,
      color: "from-blue-500 to-indigo-500",
      chapters: [
        "Régression",
        "Classification",
        "Clustering",
        "Réduction de dimensions",
        "Validation croisée",
      ],
      difficulty: "Avancé",
      professor: "Prof. Zerouali",
    },
    {
      id: 10,
      title: "Analyse de Données",
      category: "data",
      icon: <FiDatabase />,
      color: "from-green-500 to-teal-500",
      chapters: [
        "Préparation",
        "Visualisation",
        "Pandas",
        "Analyse exploratoire",
        "Interprétation",
      ],
      difficulty: "Intermédiaire",
      professor: "Mme. Kabbaj",
    },
    {
      id: 11,
      title: "Développement Web",
      category: "web",
      icon: <FiGlobe />,
      color: "from-orange-500 to-red-500",
      chapters: ["HTML/CSS", "JavaScript", "Node.js", "React", "API REST"],
      difficulty: "Intermédiaire",
      professor: "Dr. Soussi",
    },
    {
      id: 12,
      title: "JEE",
      category: "web",
      icon: <FiGlobe />,
      color: "from-red-500 to-pink-500",
      chapters: ["Servlets", "JSP", "EJB", "JPA", "Spring"],
      difficulty: "Avancé",
      professor: "Prof. Nabil",
    },
    {
      id: 13,
      title: "Développement Mobile",
      category: "mobile",
      icon: <FiSmartphone />,
      color: "from-emerald-500 to-green-500",
      chapters: ["Android", "iOS", "React Native", "Flutter", "UI/UX mobile"],
      difficulty: "Intermédiaire",
      professor: "Dr. Fadili",
    },
    {
      id: 14,
      title: "Réseaux Informatiques",
      category: "reseau",
      icon: <FiServer />,
      color: "from-blue-500 to-purple-500",
      chapters: [
        "Modèle OSI",
        "TCP/IP",
        "Routage",
        "Sécurité réseau",
        "Configuration",
      ],
      difficulty: "Avancé",
      professor: "Prof. Zerktouni",
    },
    {
      id: 15,
      title: "Cloud Computing",
      category: "reseau",
      icon: <FiCloud />,
      color: "from-blue-400 to-cyan-500",
      chapters: ["IaaS", "PaaS", "SaaS", "Virtualisation", "Déploiement"],
      difficulty: "Intermédiaire",
      professor: "Dr. Amrani",
    },
  ];

  // Filtrage des fiches en fonction de la catégorie et du terme de recherche
  const filteredFiches = fiches.filter((fiche) => {
    const matchesCategory =
      selectedCategory === "all" || fiche.category === selectedCategory;
    const matchesSearch = fiche.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200">
      {/* Votre Navbar serait importée et utilisée ici */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Biblio-Fiches
            </h1>
            <p className="text-xl text-gray-300">
              Consultez notre collection de fiches de révision pour tous les
              modules fondamentaux de votre formation.
            </p>
          </div>
        </div>
      </section>

      {/* Recherche et Filtres */}
      <section className="py-8 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Barre de recherche */}
              <div className="w-full md:w-1/3">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher une fiche..."
                    className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-gray-200"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Filtres par catégorie */}
              <div className="w-full md:w-2/3">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      className={`flex items-center px-4 py-2 rounded-lg border transition-all ${
                        selectedCategory === category.id
                          ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500 text-blue-400"
                          : "bg-gray-800/30 border-white/10 text-gray-400 hover:bg-gray-800/50 hover:text-gray-200"
                      }`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <span className="mr-2">{category.icon}</span>
                      <span>{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fiches Section */}
      <section className="py-16 relative">
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            {filteredFiches.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-gray-800/50 border border-white/10 flex items-center justify-center">
                  <FiSearch className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-300 mb-2">
                  Aucune fiche trouvée
                </h3>
                <p className="text-gray-400">
                  Essayez d'autres termes de recherche ou catégories.
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFiches.map((fiche) => (
                  <div
                    key={fiche.id}
                    className={`bg-gray-800/30 backdrop-blur-sm rounded-lg border border-white/10 hover:border-blue-500/50 transition-all overflow-hidden group cursor-pointer ${
                      expandedCard === fiche.id
                        ? "sm:col-span-2 lg:col-span-3"
                        : ""
                    }`}
                    onClick={() =>
                      setExpandedCard(
                        expandedCard === fiche.id ? null : fiche.id
                      )
                    }
                  >
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div
                          className={`w-12 h-12 rounded-lg bg-gradient-to-br ${fiche.color} flex items-center justify-center mr-4`}
                        >
                          {fiche.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-1">
                            {fiche.title}
                          </h3>
                          <div className="flex items-center text-sm text-gray-400">
                            <span>{fiche.professor}</span>
                            <span className="mx-2">•</span>
                            <span>{fiche.difficulty}</span>
                          </div>
                        </div>
                      </div>

                      {/* Contenu de la carte */}
                      <div
                        className={
                          expandedCard === fiche.id ? "block" : "hidden"
                        }
                      >
                        <div className="mt-4 pt-4 border-t border-white/10">
                          <h4 className="text-lg font-medium text-blue-400 mb-2">
                            Chapitres
                          </h4>
                          <ul className="space-y-2">
                            {fiche.chapters.map((chapter, index) => (
                              <li
                                key={index}
                                className="flex items-center text-gray-300"
                              >
                                <FiChevronRight className="text-blue-400 mr-2" />
                                {chapter}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="mt-6 pt-4 border-t border-white/10 flex justify-center">
                          <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all">
                            Télécharger la fiche
                          </button>
                        </div>
                      </div>

                      {/* Pied de carte */}
                      <div
                        className={`mt-6 flex items-center justify-center ${
                          expandedCard === fiche.id ? "hidden" : ""
                        }`}
                      >
                        <span className="text-sm text-gray-400">
                          Cliquez pour afficher plus de détails
                        </span>
                      </div>
                    </div>

                    {/* Effet de survol */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Section Bonus - Effet 3D */}
      <section className="py-16 bg-gray-900/50 border-t border-white/10 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
                Ressources Complémentaires
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Découvrez nos ressources extraordinaires pour approfondir vos
                connaissances en informatique.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Carte 3D Interactive */}
              <div className="perspective-1000 group">
                <div className="relative transform-style-3d transition-transform duration-500 group-hover:rotate-y-10">
                  <div className="h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl border border-white/10 p-6 flex flex-col justify-between transform-style-3d">
                    <div>
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-4">
                        <FiHardDrive className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        Projets Pratiques
                      </h3>
                      <p className="text-gray-300">
                        Appliquez vos connaissances sur des projets réels et
                        construisez votre portfolio.
                      </p>
                    </div>
                    <div className="flex justify-end">
                      <button className="px-4 py-2 bg-gradient-to-r from-blue-500/50 to-purple-500/50 text-white rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all">
                        Explorer
                      </button>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl transform translate-z-n20 blur-sm"></div>
                </div>
              </div>

              {/* Carte Flottante */}
              <div className="group">
                <div className="relative h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl border border-white/10 p-6 flex flex-col justify-between hover:shadow-lg hover:shadow-blue-500/20 transition-all hover:translate-y-n2">
                  <div>
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-4">
                      <FiGlobe className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Webinaires
                    </h3>
                    <p className="text-gray-300">
                      Participez à nos sessions en direct avec des experts de
                      l'industrie.
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <button className="px-4 py-2 bg-gradient-to-r from-blue-500/50 to-purple-500/50 text-white rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all">
                      Calendrier
                    </button>
                  </div>
                </div>
              </div>

              {/* Carte Glowing */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl blur-md opacity-0 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl border border-white/10 p-6 flex flex-col justify-between z-10">
                  <div>
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-4">
                      <FiCpu className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Challenges
                    </h3>
                    <p className="text-gray-300">
                      Testez vos compétences avec nos défis hebdomadaires et
                      remportez des récompenses.
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <button className="px-4 py-2 bg-gradient-to-r from-blue-500/50 to-purple-500/50 text-white rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all">
                      Participer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterSection/>
    </div>
  );
};

export default BiblioFichesPage;
