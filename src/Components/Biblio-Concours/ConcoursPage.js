import React, { useState, useEffect } from "react";
import { FiSearch, FiBookOpen, FiArrowRight, FiFilter, FiX, FiCalendar, FiAward, FiUsers, FiClock, FiDownload } from "react-icons/fi";
import Navbar from "../Products/Navbar";
import FooterSection from "../LandingPage/FooterSection";

const ConcoursPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFiliere, setActiveFiliere] = useState("all");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedConcours, setSelectedConcours] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);

  const concoursData = [
    {
      filiere: "Génie Informatique (GI)",
      concours: [
        {
          name: "Hackathon IA & Mining Data",
          matieres: [
            "Machine Learning Opérationnel",
            "Big Data Analytics",
            "Cloud Computing",
            "Cybersécurité Industrielle",
          ],
          special: "Cas réel OCP : Optimisation de production",
          date: "15-16 Mai 2025",
          participants: "Équipes de 3-4 étudiants",
          duration: "48 heures",
          prizes:
            "1er Prix: 20,000 DH + Stage, 2ème Prix: 10,000 DH, 3ème Prix: 5,000 DH",
          description:
            "Un défi intense où les participants exploitent des données réelles de l'OCP pour optimiser les processus d'extraction minière. Les équipes travailleront avec des ensembles de données complexes pour développer des solutions d'IA pratiques et évolutives.",
          requirements: [
            "Connaissances en Python/R",
            "Expérience en ML/DL",
            "Bases en ingénierie de données",
            "Compétences en visualisation",
          ],
          resources: [
            "Dataset anonymisé OCP",
            "Documentation API",
            "Environnement cloud pré-configuré",
          ],
          testimonial: {
            name: "Équipe DataMiners, lauréats 2024",
            quote:
              "Ce hackathon nous a permis de confronter nos compétences théoriques à des problèmes industriels réels. L'expérience a complètement changé notre vision de la data science appliquée!",
          },
        },
        {
          name: "Concours National de Cybersécurité",
          matieres: [
            "Pentesting Industriel",
            "Cryptographie Avancée",
            "SOC Opérations",
            "Forensique Digitale",
          ],
          date: "22-23 Juin 2025",
          participants: "Individuel ou binôme",
          duration: "36 heures",
          prizes:
            "1er Prix: 15,000 DH + Certification, 2ème Prix: 8,000 DH, 3ème Prix: 4,000 DH",
          description:
            "Une compétition intense qui simule des environnements industriels réels pour tester les compétences en cybersécurité. Les participants devront détecter des vulnérabilités, répondre à des incidents et protéger des infrastructures critiques.",
          requirements: [
            "Bases en réseau",
            "Connaissance Linux/Windows",
            "Notions de scripts",
            "Familiarité avec les outils de sécurité",
          ],
          resources: [
            "VM préconfigurées",
            "Documentation technique",
            "Mentorat par des experts",
          ],
          testimonial: {
            name: "Yassine B., lauréat 2024",
            quote:
              "La pression était réelle, mais ça m'a permis de découvrir mes véritables capacités. J'ai maintenant une méthodologie solide pour aborder les problèmes de sécurité!",
          },
        },
      ],
    },
    {
      filiere: "Management des Systèmes d'Information (MSI)",
      concours: [
        {
          name: "Challenge ERP & Digital Transformation",
          matieres: [
            "SAP S/4HANA",
            "Process Mining",
            "Change Management",
            "IT Governance",
          ],
          special: "Simulation de transformation digitale OCP",
          date: "5-7 Mai 2025",
          participants: "Équipes de 4-5 étudiants",
          duration: "72 heures",
          prizes:
            "1er Prix: 25,000 DH + Visite Silicon Valley, 2ème Prix: 12,000 DH, 3ème Prix: 6,000 DH",
          description:
            "Un challenge qui place les participants au cœur d'une transformation digitale d'entreprise. Les équipes doivent concevoir, planifier et simuler l'implémentation d'une solution ERP dans un contexte industriel complexe.",
          requirements: [
            "Connaissance SAP",
            "Modélisation de processus",
            "Gestion de projet",
            "Analyse financière basique",
          ],
          resources: [
            "Environnement SAP de test",
            "Documentation métier",
            "Mentorat par consultants",
          ],
          testimonial: {
            name: "Équipe NextGen Solutions, finalistes 2024",
            quote:
              "Ce concours nous a confrontés aux réalités de l'entreprise. La dimension humaine de la transformation digitale a été notre plus grande leçon.",
          },
        },
        {
          name: "Concours Smart Logistics IT",
          matieres: [
            "Blockchain Logistique",
            "IoT Tracking",
            "Supply Chain 4.0",
            "BI Avancée",
          ],
          date: "12-13 Juin 2025",
          participants: "Équipes de 3 étudiants",
          duration: "48 heures",
          prizes:
            "1er Prix: 18,000 DH + Stage international, 2ème Prix: 9,000 DH, 3ème Prix: 4,500 DH",
          description:
            "Un concours orienté sur l'innovation logistique où les participants développent des solutions technologiques pour optimiser les chaînes d'approvisionnement. Focus particulier sur l'intégration IoT et blockchain dans les flux logistiques.",
          requirements: [
            "Bases en supply chain",
            "Programmation",
            "Modélisation de données",
            "Notions IoT/Blockchain",
          ],
          resources: [
            "Plateforme de simulation",
            "API IoT",
            "Données logistiques anonymisées",
          ],
          testimonial: {
            name: "Fatima L., lauréate 2024",
            quote:
              "J'ai découvert comment la technologie peut transformer la logistique traditionnelle. Notre solution blockchain pour la traçabilité a même intéressé une entreprise locale!",
          },
        },
      ],
    },
    {
      filiere: "Génie Logiciel et SI (GLSI)",
      concours: [
        {
          name: "Dev Challenge USMS",
          matieres: [
            "Architecture Microservices",
            "DevSecOps",
            "Testing Automatisé",
            "Cloud Native Apps",
          ],
          special: "24h coding marathon",
          date: "8-9 Mai 2025",
          participants: "Équipes de 2-4 développeurs",
          duration: "24 heures",
          prizes:
            "1er Prix: 20,000 DH + Équipements tech, 2ème Prix: 10,000 DH, 3ème Prix: 5,000 DH",
          description:
            "Un marathon de codage intensif où les équipes développent une application complète en 24h. L'accent est mis sur la qualité du code, l'architecture et les pratiques DevOps modernes.",
          requirements: [
            "Maîtrise d'au moins un langage de programmation",
            "Bases en DevOps",
            "Expérience en développement web/mobile",
            "Notions d'architecture logicielle",
          ],
          resources: [
            "Environnements cloud",
            "Repositories Git",
            "APIs tierces",
            "Frameworks modernes",
          ],
          testimonial: {
            name: "Équipe CodeCrafters, champions 2024",
            quote:
              "La pression des 24h nous a forcés à être extrêmement efficaces. Notre application de gestion de ressources hydriques fonctionne toujours et est même utilisée par une ONG locale!",
          },
        },
        {
          name: "Concours Mobile Innovation",
          matieres: [
            "Flutter/Dart",
            "AI On-Edge",
            "UX Mining Apps",
            "Paiement Mobile Sécurisé",
          ],
          date: "20-21 Juin 2025",
          participants: "Individuel ou binôme",
          duration: "48 heures",
          prizes:
            "1er Prix: 15,000 DH + Mentorat startup, 2ème Prix: 7,500 DH, 3ème Prix: 3,000 DH",
          description:
            "Un concours centré sur l'innovation mobile avec un focus sur les applications industrielles et minières. Les participants développent des prototypes fonctionnels d'applications mobiles intégrant des fonctionnalités avancées.",
          requirements: [
            "Développement mobile (Flutter/React Native)",
            "Design UX/UI",
            "Intégration API",
            "Basics en IA mobile",
          ],
          resources: [
            "Kits de développement",
            "APIs spécifiques",
            "Données test",
            "Mentorat technique",
          ],
          testimonial: {
            name: "Omar et Salma, lauréats 2024",
            quote:
              "Notre application de maintenance prédictive par reconnaissance d'image nous a ouvert des portes. Nous travaillons maintenant sur une version commerciale avec un incubateur!",
          },
        },
      ],
    },
    {
      filiere: "Data Science & AI",
      concours: [
        {
          name: "Datathon Phosph'AI",
          matieres: [
            "Computer Vision",
            "Time Series Analysis",
            "MLOps",
            "NLP Arabe",
          ],
          special: "Dataset réel de capteurs miniers",
          date: "3-5 Mai 2025",
          participants: "Équipes de 3-4 data scientists",
          duration: "72 heures",
          prizes:
            "1er Prix: 30,000 DH + Publication, 2ème Prix: 15,000 DH, 3ème Prix: 7,500 DH",
          description:
            "Un challenge data science intense utilisant des données réelles du secteur phosphatier. Les participants doivent développer des modèles prédictifs pour optimiser les opérations, la qualité et la maintenance.",
          requirements: [
            "Maîtrise Python/R",
            "ML/DL avancé",
            "Feature engineering",
            "Déploiement de modèles",
          ],
          resources: [
            "Datasets industriels",
            "GPU cloud",
            "Frameworks ML",
            "Documentation technique",
          ],
          testimonial: {
            name: "Dr. Nadia M., jury 2024",
            quote:
              "La qualité des solutions présentées était impressionnante. Plusieurs modèles développés pendant le datathon sont actuellement en phase de test dans nos installations.",
          },
        },
        {
          name: "Compétition Predictive Maintenance",
          matieres: [
            "Analyse Vibratoire",
            "Deep Learning",
            "Anomaly Detection",
            "Digital Twins",
          ],
          date: "25-26 Juin 2025",
          participants: "Équipes de 2-3 personnes",
          duration: "48 heures",
          prizes:
            "1er Prix: 20,000 DH + Internship, 2ème Prix: 10,000 DH, 3ème Prix: 5,000 DH",
          description:
            "Une compétition axée sur la maintenance prédictive industrielle. Les participants travaillent avec des données de capteurs pour développer des algorithmes de détection d'anomalies et de prédiction de défaillances.",
          requirements: [
            "Signal processing",
            "Modélisation statistique",
            "Deep learning",
            "Analyse de séries temporelles",
          ],
          resources: [
            "Datasets de vibrations",
            "Documentation équipements",
            "Plateforme de simulation",
            "Expertise domaine",
          ],
          testimonial: {
            name: "Équipe PredictiveMinds, gagnants 2024",
            quote:
              "Notre algorithme a détecté des défaillances que les systèmes traditionnels manquaient systématiquement. Le jury a été impressionné par notre approche hybride combinant physique et deep learning.",
          },
        },
      ],
    },
  ];

  // Add filiere property to the last item if missing
  const normalizedData = concoursData.map((section) => {
    if (!section.filiere) {
      return { ...section, filiere: "Autre" };
    }
    return section;
  });

  // Filter data based on search term and active filiere
  useEffect(() => {
    let results = [...normalizedData];

    // Filter by filiere if not "all"
    if (activeFiliere !== "all") {
      results = results.filter((section) => section.filiere === activeFiliere);
    }

    // Filter by search term
    if (searchTerm) {
      results = results
        .map((section) => {
          const filteredConcours = section.concours.filter(
            (concours) =>
              concours.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              concours.matieres.some((matiere) =>
                matiere.toLowerCase().includes(searchTerm.toLowerCase())
              )
          );

          if (filteredConcours.length > 0) {
            return {
              ...section,
              concours: filteredConcours,
            };
          }
          return null;
        })
        .filter(Boolean);
    }

    setFilteredData(results);
  }, [searchTerm, activeFiliere]);

  // Get unique filieres for filter buttons
  const filieres = [
    "all",
    ...new Set(normalizedData.map((item) => item.filiere)),
  ];

  // Handle view details click
  const handleViewDetails = (filiere, concours) => {
    setSelectedConcours({ ...concours, filiere });

    // Start animation sequence
    setAnimationPhase(1);
    setTimeout(() => {
      setModalOpen(true);
      setTimeout(() => {
        setAnimationPhase(2);
        setTimeout(() => {
          setAnimationPhase(3);
        }, 300);
      }, 100);
    }, 300);
  };

  // Close modal with animation
  const closeModal = () => {
    setAnimationPhase(4);
    setTimeout(() => {
      setModalOpen(false);
      setAnimationPhase(0);
      setSelectedConcours(null);
    }, 500);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-950 text-gray-200 p-6">
        {/* Hero Section */}
        <div className="mb-16 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Bibliothèque de Concours
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            Explorez notre collection complète de concours pour toutes les
            filières préparatoires
          </p>

          {/* Search and Filter Container */}
          <div className="relative bg-gray-900/60 backdrop-blur-md rounded-2xl border border-white/10 p-6 shadow-lg shadow-purple-500/5">
            {/* Animated Gradient Border Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-sm -z-10"></div>

            {/* Search Bar */}
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <FiSearch className="w-5 h-5 text-blue-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher par nom de concours ou matière..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-gray-800/50 rounded-xl border border-white/10 focus:outline-none
          focus:ring-2 focus:ring-blue-500/50 transition-all placeholder-gray-500"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center justify-center flex-wrap gap-2">
              <div className="flex items-center mr-2 text-gray-400">
                <FiFilter className="mr-2" /> Filtrer:
              </div>
              {filieres.map((filiere, index) => (
                <button
                  key={index}
                  onClick={() => setActiveFiliere(filiere)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all
            ${
              activeFiliere === filiere
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md shadow-purple-500/20"
                : "bg-gray-800/60 text-gray-400 hover:bg-gray-800 hover:text-gray-200"
            }`}
                >
                  {filiere === "all"
                    ? "Toutes les filières"
                    : `Filière ${filiere}`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-medium">
              <span className="text-blue-400">
                {filteredData.reduce(
                  (acc, section) => acc + section.concours.length,
                  0
                )}
              </span>{" "}
              concours trouvés
            </h2>
          </div>
        </div>

        {/* Concours Grid */}
        <div className="max-w-7xl mx-auto space-y-12">
          {filteredData.length > 0 ? (
            filteredData.map((section, index) => (
              <div key={index} className="relative">
                {/* Filière Title */}
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mr-4 shadow-lg shadow-purple-500/20">
                    <FiBookOpen className="text-white w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    Filière {section.filiere}
                  </h2>
                </div>

                {/* Concours Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.concours.map((concour, idx) => (
                    <div
                      key={idx}
                      className={`group relative bg-gray-900/30 rounded-xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 ${
                        animationPhase === 1 &&
                        selectedConcours?.name === concour.name
                          ? "scale-105 border-blue-500"
                          : ""
                      }`}
                    >
                      {/* Hover effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                      {/* Purple accent line */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>

                      <div className="p-6 relative z-10">
                        <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all">
                          {concour.name}
                        </h3>

                        <div className="grid grid-cols-2 gap-3 mb-6">
                          {concour.matieres.map((matiere, i) => (
                            <div
                              key={i}
                              className="flex items-center space-x-2 text-gray-400 group-hover:text-gray-300 transition-colors"
                            >
                              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                              <span className="text-sm">{matiere}</span>
                            </div>
                          ))}
                        </div>

                        <button
                          onClick={() =>
                            handleViewDetails(section.filiere, concour)
                          }
                          className="mt-2 flex items-center text-sm font-medium text-blue-400 opacity-0 group-hover:opacity-100 transition-all hover:text-blue-300"
                        >
                          Voir les détails
                          <FiArrowRight className="ml-2 h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4 opacity-30">🔍</div>
              <h3 className="text-2xl font-medium text-gray-400 mb-2">
                Aucun résultat trouvé
              </h3>
              <p className="text-gray-500">
                Essayez avec d'autres termes de recherche ou filtres
              </p>
            </div>
          )}
        </div>

        {/* Interactive Details Modal */}
        {modalOpen && selectedConcours && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Backdrop with blur */}
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={closeModal}
            ></div>

            {/* Modal */}
            <div
              className={`relative bg-gray-900 border border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto m-4 shadow-xl 
                ${
                  animationPhase === 2 || animationPhase === 3
                    ? "scale-100 opacity-100"
                    : animationPhase === 4
                    ? "scale-95 opacity-0"
                    : "scale-95 opacity-0"
                }
                transition-all duration-500 ease-out`}
            >
              {/* Modal gradient border */}
              <div className="absolute inset-0 rounded-2xl border border-gradient-to-r from-blue-500/30 to-purple-500/30 -z-10"></div>

              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 text-gray-400 hover:text-white p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/70 transition-all z-20"
              >
                <FiX className="w-5 h-5" />
              </button>

              {/* Content */}
              <div className="p-8">
                {/* Header with interactive background */}
                <div className="relative mb-8 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-purple-900/40"></div>

                  {/* Interactive particles background (style mimicked with gradient) */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.1)_0%,transparent_50%)]"></div>

                  <div className="relative py-12 px-8">
                    {/* Filière tag */}
                    <div className="inline-block px-3 py-1 bg-blue-500/20 rounded-full text-blue-300 text-xs font-medium mb-4">
                      {selectedConcours.filiere}
                    </div>

                    {/* Title with gradient */}
                    <h2
                      className={`text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4
                        ${
                          animationPhase === 3
                            ? "translate-y-0 opacity-100"
                            : "translate-y-4 opacity-0"
                        }
                        transition-all duration-700 delay-100`}
                    >
                      {selectedConcours.name}
                    </h2>

                    {/* Special feature tag if available */}
                    {selectedConcours.special && (
                      <div
                        className={`inline-flex items-center px-4 py-2 bg-purple-500/20 rounded-lg text-purple-300 text-sm font-medium
                          ${
                            animationPhase === 3
                              ? "translate-y-0 opacity-100"
                              : "translate-y-4 opacity-0"
                          }
                          transition-all duration-700 delay-200`}
                      >
                        <FiAward className="mr-2" /> {selectedConcours.special}
                      </div>
                    )}
                  </div>
                </div>

                {/* Main content in columns */}
                <div className="grid md:grid-cols-3 gap-8">
                  {/* Left column - Details */}
                  <div
                    className={`md:col-span-2 space-y-8
                      ${
                        animationPhase === 3
                          ? "translate-y-0 opacity-100"
                          : "translate-y-8 opacity-0"
                      }
                      transition-all duration-700 delay-300`}
                  >
                    {/* Description */}
                    <div>
                      <h3 className="text-xl font-medium text-white mb-4">
                        Description
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {selectedConcours.description}
                      </p>
                    </div>

                    {/* Materials */}
                    <div>
                      <h3 className="text-xl font-medium text-white mb-4">
                        Matières
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {selectedConcours.matieres.map((matiere, idx) => (
                          <div
                            key={idx}
                            className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg border border-white/5"
                          >
                            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                            <span>{matiere}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Requirements */}
                    {selectedConcours.requirements && (
                      <div>
                        <h3 className="text-xl font-medium text-white mb-4">
                          Prérequis
                        </h3>
                        <ul className="list-disc pl-5 space-y-2 text-gray-300">
                          {selectedConcours.requirements.map((req, idx) => (
                            <li key={idx}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Resources */}
                    {selectedConcours.resources && (
                      <div>
                        <h3 className="text-xl font-medium text-white mb-4">
                          Ressources fournies
                        </h3>
                        <ul className="list-disc pl-5 space-y-2 text-gray-300">
                          {selectedConcours.resources.map((res, idx) => (
                            <li key={idx}>{res}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Testimonial if available */}
                    {selectedConcours.testimonial && (
                      <div className="relative p-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-xl border border-white/10">
                        <div className="absolute top-0 right-0 text-6xl opacity-10 text-blue-300">
                          ❝
                        </div>
                        <p className="italic text-gray-300 mb-4">
                          "{selectedConcours.testimonial.quote}"
                        </p>
                        <p className="text-sm text-blue-400">
                          — {selectedConcours.testimonial.name}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right column - Info cards */}
                  <div
                    className={`space-y-6 
                      ${
                        animationPhase === 3
                          ? "translate-x-0 opacity-100"
                          : "translate-x-8 opacity-0"
                      }
                      transition-all duration-700 delay-400`}
                  >
                    {/* Info Cards */}
                    <div className="p-5 bg-gray-800/30 rounded-xl border border-white/5">
                      <div className="flex items-center mb-4">
                        <FiCalendar className="text-blue-400 mr-3" />
                        <h4 className="font-medium">Date</h4>
                      </div>
                      <p className="text-gray-300">{selectedConcours.date}</p>
                    </div>

                    <div className="p-5 bg-gray-800/30 rounded-xl border border-white/5">
                      <div className="flex items-center mb-4">
                        <FiUsers className="text-blue-400 mr-3" />
                        <h4 className="font-medium">Participants</h4>
                      </div>
                      <p className="text-gray-300">
                        {selectedConcours.participants}
                      </p>
                    </div>

                    <div className="p-5 bg-gray-800/30 rounded-xl border border-white/5">
                      <div className="flex items-center mb-4">
                        <FiClock className="text-blue-400 mr-3" />
                        <h4 className="font-medium">Durée</h4>
                      </div>
                      <p className="text-gray-300">
                        {selectedConcours.duration}
                      </p>
                    </div>

                    <div className="p-5 bg-gray-800/30 rounded-xl border border-white/5">
                      <div className="flex items-center mb-4">
                        <FiAward className="text-blue-400 mr-3" />
                        <h4 className="font-medium">Prix</h4>
                      </div>
                      <p className="text-gray-300">{selectedConcours.prizes}</p>
                    </div>

                    {/* Registration Button */}
                    <button className="w-full py-4 mt-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-medium text-white hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg shadow-purple-500/20 flex items-center justify-center">
                      <FiDownload className="mr-2" /> Télécharger brochure
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <FooterSection />
    </>
  );
};

export default ConcoursPage;