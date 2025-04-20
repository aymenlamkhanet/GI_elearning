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
FiLayout,
FiLayers,
FiAward,
FiShield,
FiFileText,
FiSettings,
FiUsers,
FiTerminal,
FiPackage,
FiMonitor,
FiTool,
FiStar,
FiCodesandbox,
FiBriefcase,
} from "react-icons/fi";

import Navbar from "../Products/Navbar";
import FooterSection from "../LandingPage/FooterSection";

const BiblioFichesPage = () => {
const [selectedCategory, setSelectedCategory] = useState("all");
const [searchTerm, setSearchTerm] = useState("");
const [expandedCard, setExpandedCard] = useState(null);

// Catégories de fiches
const categories = [
{ id: "all", name: "Tous", icon:
<FiBookOpen /> },
{ id: "dev", name: "Développement", icon:
<FiCode /> },
{ id: "data", name: "Data & AI", icon:
<FiDatabase /> },
{ id: "web", name: "Web", icon:
<FiGlobe /> },
{ id: "mobile", name: "Mobile", icon:
<FiSmartphone /> },
{ id: "devops", name: "DevOps", icon:
<FiServer /> },
{ id: "design", name: "Design", icon:
<FiLayout /> },
{ id: "career", name: "Carrière", icon:
<FiBriefcase /> },
];

// Fiches de modules mises à jour pour correspondre aux images
const fiches = [
{
id: 1,
title: "Frontend",
category: "web",
icon:
<FiMonitor />,
color: "from-blue-500 to-cyan-500",
chapters: [
"HTML & CSS",
"JavaScript",
"Frameworks Frontend",
"UI/UX Basiques",
"Outils de Build",
],
difficulty: "Débutant",
professor: "Dr. Martinez",
},
{
id: 2,
title: "Backend",
category: "dev",
icon:
<FiServer />,
color: "from-blue-600 to-indigo-500",
chapters: [
"Architecture Serveur",
"Bases de données",
"API Design",
"Authentification",
"Sécurité Backend",
],
difficulty: "Intermédiaire",
professor: "Prof. Bennani",
},
{
id: 3,
title: "DevOps",
category: "devops",
icon:
<FiSettings />,
color: "from-purple-500 to-indigo-500",
chapters: [
"CI/CD",
"Docker",
"Kubernetes",
"Monitoring",
"Infrastructure as Code",
],
difficulty: "Avancé",
professor: "Dr. Jenkins",
},
{
id: 4,
title: "Full Stack",
category: "dev",
icon:
<FiLayers />,
color: "from-green-500 to-teal-500",
chapters: [
"Frontend & Backend",
"Architecture MVC",
"Bases de données",
"Déploiement",
"Tests",
],
difficulty: "Intermédiaire",
professor: "Prof. Rodriguez",
},
{
id: 5,
title: "AI Engineer",
category: "data",
icon:
<FiCpu />,
color: "from-red-500 to-orange-500",
chapters: [
"ML Fondamentaux",
"Deep Learning",
"NLP",
"Computer Vision",
"MLOps",
],
difficulty: "Avancé",
professor: "Dr. Nguyen",
isNew: true,
},
{
id: 6,
title: "Data Analyst",
category: "data",
icon:
<FiActivity />,
color: "from-yellow-500 to-amber-500",
chapters: [
"SQL & Analyse de données",
"Visualisation",
"Statistiques",
"Outils d'Analytics",
"Reporting",
],
difficulty: "Intermédiaire",
professor: "Mme. Garcia",
},
{
id: 7,
title: "AI and Data Scientist",
category: "data",
icon:
<FiDatabase />,
color: "from-purple-500 to-violet-500",
chapters: [
"Machine Learning",
"Big Data",
"Modélisation Statistique",
"Visualisation avancée",
"Deep Learning",
],
difficulty: "Avancé",
professor: "Prof. Chen",
},
{
id: 8,
title: "Android",
category: "mobile",
icon:
<FiSmartphone />,
color: "from-green-500 to-emerald-500",
chapters: [
"Java/Kotlin",
"Android SDK",
"Material Design",
"Architecture Android",
"Stockage et APIs",
],
difficulty: "Intermédiaire",
professor: "Dr. Kumar",
},
{
id: 9,
title: "iOS",
category: "mobile",
icon:
<FiSmartphone />,
color: "from-blue-500 to-indigo-500",
chapters: [
"Swift",
"UIKit/SwiftUI",
"iOS Architecture",
"CoreData",
"App Distribution",
],
difficulty: "Intermédiaire",
professor: "Prof. Miller",
},
{
id: 10,
title: "PostgreSQL",
category: "dev",
icon:
<FiDatabase />,
color: "from-blue-400 to-cyan-500",
chapters: [
"Architecture",
"SQL Avancé",
"Optimisation",
"Administration",
"Backup & Recovery",
],
difficulty: "Avancé",
professor: "Mme. Patel",
},
{
id: 11,
title: "Blockchain",
category: "dev",
icon:
<FiBox />,
color: "from-orange-500 to-amber-500",
chapters: [
"Fondamentaux",
"Smart Contracts",
"Web3",
"Consensus",
"DApps",
],
difficulty: "Avancé",
professor: "Dr. Svensson",
},
{
id: 12,
title: "QA",
category: "dev",
icon:
<FiAward />,
color: "from-green-500 to-teal-500",
chapters: [
"Test Manual",
"Test Automation",
"Assurance Qualité",
"Outils de QA",
"CI/CD pour QA",
],
difficulty: "Intermédiaire",
professor: "Prof. Dubois",
},
{
id: 13,
title: "Software Architect",
category: "dev",
icon:
<FiCodesandbox />,
color: "from-purple-500 to-indigo-500",
chapters: [
"Patterns de conception",
"Architecture d'entreprise",
"Microservices",
"Cloud Native",
"Design Technique",
],
difficulty: "Avancé",
professor: "Dr. O'Neil",
},
{
id: 14,
title: "Cyber Security",
category: "devops",
icon:
<FiShield />,
color: "from-red-500 to-pink-500",
chapters: [
"Sécurité réseau",
"Cryptographie",
"Pentest",
"Sécurité applicative",
"Compliance",
],
difficulty: "Avancé",
professor: "Prof. Thompson",
},
{
id: 15,
title: "UX Design",
category: "design",
icon:
<FiLayout />,
color: "from-blue-500 to-purple-500",
chapters: [
"UI Fondamentaux",
"Recherche Utilisateur",
"Wireframing",
"Prototypage",
"Usability Testing",
],
difficulty: "Intermédiaire",
professor: "Mme. Williams",
},
{
id: 16,
title: "Game Developer",
category: "dev",
icon:
<FiStar />,
color: "from-indigo-500 to-purple-500",
chapters: [
"Game Engines",
"Graphics",
"Game Physics",
"Game AI",
"Multiplayer",
],
difficulty: "Intermédiaire",
professor: "Dr. Tanaka",
},
{
id: 17,
title: "Technical Writer",
category: "career",
icon:
<FiFileText />,
color: "from-blue-400 to-teal-500",
chapters: [
"Documentation",
"API Docs",
"Style Guides",
"Technical Content",
"Tools & Formats",
],
difficulty: "Intermédiaire",
professor: "Prof. Clark",
},
{
id: 18,
title: "MLOps",
category: "data",
icon:
<FiSettings />,
color: "from-red-500 to-orange-500",
chapters: [
"ML Pipeline",
"Model Deployment",
"Model Monitoring",
"ML Infrastructure",
"CI/CD pour ML",
],
difficulty: "Avancé",
professor: "Dr. Soares",
},
{
id: 19,
title: "Product Manager",
category: "career",
icon:
<FiBriefcase />,
color: "from-green-500 to-emerald-500",
chapters: [
"Product Strategy",
"UX",
"Roadmapping",
"Agile & Scrum",
"Analytics",
],
difficulty: "Intermédiaire",
professor: "Prof. Kovalenko",
},
{
id: 20,
title: "Engineering Manager",
category: "career",
icon:
<FiUsers />,
color: "from-blue-500 to-indigo-500",
chapters: [
"Leadership Technique",
"1:1 Coaching",
"Recrutement",
"Project Management",
"Développement d'équipe",
],
difficulty: "Avancé",
professor: "Dr. Lopez",
isNew: true,
},
{
id: 21,
title: "Developer Relations",
category: "career",
icon:
<FiUsers />,
color: "from-purple-500 to-pink-500",
chapters: [
"Documentation",
"Community Building",
"Présentations Tech",
"Open Source",
"Stratégie DevRel",
],
difficulty: "Intermédiaire",
professor: "Mme. Jordan",
},
{
id: 22,
title: "SQL",
category: "data",
icon:
<FiDatabase />,
color: "from-blue-500 to-cyan-500",
chapters: [
"Requêtes basiques",
"Joins et relations",
"Indexation",
"Performances",
"Procédures stockées",
],
difficulty: "Débutant",
professor: "Dr. Fischer",
},
{
id: 23,
title: "Computer Science",
category: "dev",
icon:
<FiCpu />,
color: "from-purple-500 to-indigo-500",
chapters: [
"Algorithmes",
"Structures de données",
"OS Concepts",
"Architecture Informatique",
"Théorie de la computation",
],
difficulty: "Intermédiaire",
professor: "Prof. Yang",
},
{
id: 24,
title: "React",
category: "web",
icon:
<FiCode />,
color: "from-blue-400 to-cyan-500",
chapters: [
"JSX",
"Hooks",
"State Management",
"React Router",
"Performance",
],
difficulty: "Intermédiaire",
professor: "Dr. Evans",
},
{
id: 25,
title: "Vue",
category: "web",
icon:
<FiCode />,
color: "from-green-500 to-teal-500",
chapters: [
"Directives",
"Composition API",
"Vue Router",
"Vuex",
"Nuxt.js",
],
difficulty: "Intermédiaire",
professor: "Prof. Zhang",
},
{
id: 26,
title: "Angular",
category: "web",
icon:
<FiCode />,
color: "from-red-500 to-pink-500",
chapters: [
"Components",
"Services",
"RxJS",
"Angular Forms",
"NgRx",
],
difficulty: "Avancé",
professor: "Mme. Ferreira",
},
{
id: 27,
title: "JavaScript",
category: "web",
icon:
<FiCode />,
color: "from-yellow-500 to-amber-500",
chapters: [
"ES6+",
"DOM Manipulation",
"Asynchronous JS",
"Testing",
"Design Patterns",
],
difficulty: "Débutant",
professor: "Dr. Rossi",
},
{
id: 28,
title: "Node.js",
category: "web",
icon:
<FiServer />,
color: "from-green-500 to-emerald-500",
chapters: [
"Core Modules",
"NPM",
"Express.js",
"API Development",
"Authentication",
],
difficulty: "Intermédiaire",
professor: "Prof. Shukla",
},
{
id: 29,
title: "TypeScript",
category: "web",
icon:
<FiCode />,
color: "from-blue-500 to-indigo-500",
chapters: [
"Types",
"Interfaces",
"Generics",
"Decorators",
"Advanced Types",
],
difficulty: "Intermédiaire",
professor: "Dr. Schmidt",
},
{
id: 30,
title: "Python",
category: "dev",
icon:
<FiCode />,
color: "from-blue-400 to-indigo-500",
chapters: [
"Syntaxe",
"Structures de données",
"OOP",
"Libraries",
"Async/Await",
],
difficulty: "Débutant",
professor: "Prof. Ivanova",
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

// Fonction pour générer l'URL de redirection
const generateRoadmapUrl = (title) => {
// Conversion du titre en format approprié pour l'URL
// Gérer des cas spéciaux
let formattedTitle = title.toLowerCase().replace(/\s+/g, '-');

// Quelques transformations spécifiques pour correspondre aux URLs de roadmap.sh
if (formattedTitle === "ai-engineer") return "ai";
if (formattedTitle === "ai-and-data-scientist") return "ai-data-scientist";
if (formattedTitle === "developer-relations") return "devrel";

return `https://roadmap.sh/${formattedTitle}`;
};

// Fonction pour gérer le clic sur le bouton
const handleButtonClick = (event, title) => {
event.stopPropagation(); // Empêche l'expansion/contraction de la carte
window.open(generateRoadmapUrl(title), '_blank');
};

return (
<div className="min-h-screen bg-gray-950 text-gray-200">
  {/* Navbar */}
  <Navbar />

  {/* Hero Section */}
  <section className="relative py-16 overflow-hidden border-b border-white/10">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
    <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-3xl mx-auto text-center">
        <h1
          className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          Feuilles de Route
        </h1>
        <p className="text-xl text-gray-300">
          Explorez les parcours d'apprentissage pour tous les domaines de la tech
          et planifiez votre développement professionnel.
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
              <input type="text" placeholder="Rechercher une feuille de route..."
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-gray-200"
                value={searchTerm} onChange={(e)=> setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Filtres par catégorie */}
          <div className="w-full md:w-2/3">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
              <button key={category.id} className={`flex items-center px-4 py-2 rounded-lg border transition-all ${
                selectedCategory===category.id
                ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500 text-blue-400"
                : "bg-gray-800/30 border-white/10 text-gray-400 hover:bg-gray-800/50 hover:text-gray-200" }`}
                onClick={()=> setSelectedCategory(category.id)}
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
          <div
            className="mx-auto w-16 h-16 mb-4 rounded-full bg-gray-800/50 border border-white/10 flex items-center justify-center">
            <FiSearch className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-300 mb-2">
            Aucune feuille de route trouvée
          </h3>
          <p className="text-gray-400">
            Essayez d'autres termes de recherche ou catégories.
          </p>
        </div>
        ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFiches.map((fiche) => (
          <div key={fiche.id} className={`bg-gray-800/30 backdrop-blur-sm rounded-lg border border-white/10
            hover:border-blue-500/50 transition-all overflow-hidden group cursor-pointer ${ expandedCard===fiche.id
            ? "sm:col-span-2 lg:col-span-3" : "" }`} onClick={()=>
            setExpandedCard(
            expandedCard === fiche.id ? null : fiche.id
            )
            }
            >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${fiche.color} flex items-center justify-center
                  mr-4`}>
                  {fiche.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {fiche.title}
                    </h3>
                    {fiche.isNew && (
                    <span className="ml-2 px-2 py-0.5 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                      Nouveau
                    </span>
                    )}
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <span>{fiche.professor}</span>
                    <span className="mx-2">•</span>
                    <span>{fiche.difficulty}</span>
                  </div>
                </div>
              </div>

              {/* Contenu de la carte */}
              <div className={ expandedCard===fiche.id ? "block" : "hidden" }>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <h4 className="text-lg font-medium text-blue-400 mb-2">
                    Sujets couverts
                  </h4>
                  <ul className="space-y-2">
                    {fiche.chapters.map((chapter, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <FiChevronRight className="text-blue-400 mr-2" />
                      {chapter}
                    </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 flex justify-center">
                  <button
                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all"
                    onClick={(e)=> handleButtonClick(e, fiche.title)}
                    >
                    Voir fiche
                  </button>
                </div>
              </div>

              {/* Pied de carte */}
              <div className={`mt-6 flex items-center justify-center ${ expandedCard===fiche.id ? "hidden" : "" }`}>
                <span className="text-sm text-gray-400">
                  Cliquez pour afficher plus de détails
                </span>
              </div>
            </div>

            {/* Effet de survol */}
            <div
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left">
            </div>
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
          <h2
            className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
            Ressources Complémentaires
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Découvrez nos ressources supplémentaires pour optimiser votre apprentissage et votre carrière en tech.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Carte 3D Interactive */}
          <div className="perspective-1000 group">
            <div className="relative transform-style-3d transition-transform duration-500 group-hover:rotate-y-10">
              <div
                className="h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl border border-white/10 p-6 flex flex-col justify-between transform-style-3d">
                <div>
                  <div
                    className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-4">
                    <FiHardDrive className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Best Practices
                  </h3>
                  <p className="text-gray-300">
                    Guides des meilleures pratiques pour le développement, le devops et le design.
                  </p>
                </div>
                <div className="flex justify-end">
                  <button
                    className="px-4 py-2 bg-gradient-to-r from-blue-500/50 to-purple-500/50 text-white rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all">
                    Explorer
                  </button>
                </div>
              </div>
              <div
                className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl transform translate-z-n20 blur-sm">
              </div>
            </div>
          </div>

          {/* Carte Flottante */}
          <div className="group">
            <div
              className="relative h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl border border-white/10 p-6 flex flex-col justify-between hover:shadow-lg hover:shadow-blue-500/20 transition-all hover:translate-y-n2">
              <div>
                <div
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-4">
                  <FiGlobe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Guides Vidéo
                </h3>
                <p className="text-gray-300">
                  Tutorials vidéo pour compléter les feuilles de route et approfondir vos connaissances.
                </p>
              </div>
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 bg-gradient-to-r from-blue-500/50 to-purple-500/50 text-white rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all">
                  Regarder
                </button>
              </div>
            </div>
          </div>

          {/* Carte Glowing */}
          <div className="group relative">
            <div
              className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl blur-md opacity-0 group-hover:opacity-30 transition-opacity">
            </div>
            <div
              className="relative h-64 bg-gradient-to-br from-blue-500/20to-purple-500/20 rounded-xl border border-white/10 p-6 flex flex-col justify-between">
              <div>
                <div
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-4">
                  <FiGitBranch className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Communauté
                </h3>
                <p className="text-gray-300">
                  Rejoignez notre communauté pour partager vos expériences et apprendre des autres développeurs.
                </p>
              </div>
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 bg-gradient-to-r from-blue-500/50 to-purple-500/50 text-white rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all">
                  Rejoindre
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* Footer */}
  <FooterSection />
</div>
);
};

export default BiblioFichesPage;