import React, { useState } from 'react';
import {
  FiHome,
  FiBook,
  FiFileText,
  FiInfo,
  FiCalendar,
  FiBriefcase,
  FiCode,
  FiDatabase,
  FiSettings,
  FiServer,
  FiBarChart2,
  FiTrendingUp,
  FiUsers,
  FiCheckCircle,
  FiAlertTriangle,
  FiCornerUpRight,
  FiAward,
  FiPieChart,
  FiShield,
  FiCloud,
  FiTarget,
} from "react-icons/fi";
import Navbar from "../Products/Navbar";
import FooterSection from "../LandingPage/FooterSection";

const OrientationPage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Specialization data
  const specializations = [
    {
      id: "gi",
      title: "GI - Génie Informatique",
      icon: <FiServer className="text-3xl" />,
      color: "from-blue-500 to-blue-600",
      focus: "Conception et développement de systèmes informatiques complexes",
      skills: [
        { name: "Programmation avancée", icon: <FiCode /> },
        { name: "Architecture des systèmes", icon: <FiServer /> },
        { name: "Cybersécurité", icon: <FiShield /> },
        { name: "Cloud Computing", icon: <FiCloud /> },
      ],
      advice: {
        forWho: "Passionnés de développement logiciel et hardware",
        keyProjects: "Développement d'OS, systèmes embarqués",
        careers: "Ingénieur systèmes, Architecte cloud",
      },
      starModules: [
        "Algorithmique distribuée → Blockchain",
        "Systèmes intelligents → IoT",
      ],
      profile: "Technicien",
      coding: "80%",
      salary: "15-20k MAD",
      companies: "OCP Digital",
    },
    {
      id: "iid",
      title: "IID - Ingénierie Informatique et de Données",
      icon: <FiDatabase className="text-3xl" />,
      color: "from-purple-500 to-purple-600",
      focus: "Gestion et valorisation des données massives",
      skills: [
        { name: "Big Data Analytics", icon: <FiBarChart2 /> },
        { name: "Machine Learning", icon: <FiPieChart /> },
        { name: "Data Engineering", icon: <FiDatabase /> },
        { name: "Visualisation de données", icon: <FiTrendingUp /> },
      ],
      advice: {
        forWho: "Passionnés d'IA et d'analyse décisionnelle",
        keyProjects: "Mise en place de pipelines ETL",
        careers: "Data Scientist, Chief Data Officer",
      },
      tools: ["PySpark", "TensorFlow", "Power BI"],
      profile: "Data Guru",
      coding: "70%",
      salary: "18-25k MAD",
      companies: "Databricks",
    },
    {
      id: "mgsi",
      title: "MGSI - Management et Gouvernance des SI",
      icon: <FiSettings className="text-3xl" />,
      color: "from-teal-500 to-teal-600",
      focus: "Pilotage stratégique des systèmes d'information",
      skills: [
        { name: "Audit SI", icon: <FiCheckCircle /> },
        { name: "IT Governance", icon: <FiSettings /> },
        { name: "Management de projet IT", icon: <FiUsers /> },
        { name: "Transformation digitale", icon: <FiTrendingUp /> },
      ],
      advice: {
        forWho: "Aspirants managers tech",
        keyProjects: "ERP SAP, ITIL Framework",
        careers: "Consultant SI, DSI",
      },
      hybridSkills: "Technique (40%) + Management (60%)",
      profile: "Manager",
      coding: "30%",
      salary: "16-22k MAD",
      companies: "Deloitte",
    },
  ];

  const academicAdvice = [
    {
      title: "Choix de filière",
      items: [
        "GI → Si passion DevOps/Infrastructure",
        "IID → Si obsession Data/IA",
        "MGSI → Si leadership tech > code",
      ],
    },
    {
      title: "Double Compétence",
      items: [
        "GI + Certif AWS = 💼 Cloud Architect",
        "IID + MSc Data Science = 🚀 Lead Data Engineer",
        "MGSI + MBA = 👔 Directeur Digital",
      ],
    },
  ];

  const trends2024 = [
    { specialization: "GI", trend: "Pénurie d'experts Kubernetes (+35% jobs)" },
    { specialization: "IID", trend: "Boom des LLM Engineers (x2 salaires)" },
    { specialization: "MGSI", trend: "Demandes RGPD (+40% audits)" },
  ];

  const inspiringPaths = [
    {
      path: "GI → DevOps @ Microsoft (Casablanca) → Cloud Architect @ AWS (Paris)",
    },
    { path: "IID → Data Analyst @ Criteo → Lead AI @ NVIDIA" },
    { path: "MGSI → Consultant SAP @ IBM → DSI @ Maroc Telecom" },
  ];

  const decisionTools = [
    {
      title: "Quiz d'Orientation",
      description:
        "15 questions techniques/management, Résultat personnalisé avec mapping compétences",
    },
    {
      title: "Mentorat",
      description: "Rencontres mensuelles avec alumni des 3 filières",
    },
    {
      title: "Simulateur Carrière",
      description: "Projection salariale par spécialisation",
    },
  ];

  const pitfalls = [
    "Choisir GI juste pour le codage (besoin de rigueur système)",
    "Opter pour IID sans base mathématique solide",
    "Prendre MGSI en évitant le relationnel",
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navbar (simplified) */}
      <Navbar/>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden">
        <div className="absolute inset-0 bg-blue-500/5 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400">
              Orientation & Conseils
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Découvrez nos filières d'ingénierie et trouvez celle qui
              correspond le mieux à vos ambitions
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-5 py-3 rounded-lg font-medium transition-all ${
                  activeTab === "overview"
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-purple-500/20"
                    : "bg-gray-800/80 text-gray-300 hover:bg-gray-700/80"
                }`}
              >
                Vue d'ensemble
              </button>
              {specializations.map((spec) => (
                <button
                  key={spec.id}
                  onClick={() => setActiveTab(spec.id)}
                  className={`px-5 py-3 rounded-lg font-medium transition-all ${
                    activeTab === spec.id
                      ? `bg-gradient-to-r ${
                          spec.color
                        } text-white shadow-lg shadow-${
                          spec.id === "gi"
                            ? "blue"
                            : spec.id === "iid"
                            ? "purple"
                            : "teal"
                        }-500/20`
                      : "bg-gray-800/80 text-gray-300 hover:bg-gray-700/80"
                  }`}
                >
                  {spec.title.split(" - ")[0]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Overview Section */}
        {activeTab === "overview" && (
          <div className="space-y-16">
            {/* Specializations Comparison */}
            <section>
              <h2 className="text-3xl font-bold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Comparatif des Filières
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {specializations.map((spec) => (
                  <div
                    key={spec.id}
                    className="bg-gray-800 border border-white/10 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 group"
                  >
                    <div className={`h-2 bg-gradient-to-r ${spec.color}`}></div>
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div
                          className={`p-3 rounded-full bg-gradient-to-br ${spec.color} mr-4`}
                        >
                          {spec.icon}
                        </div>
                        <h3 className="text-xl font-bold">{spec.title}</h3>
                      </div>
                      <p className="text-gray-300 mb-6">{spec.focus}</p>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-400 uppercase mb-2">
                            Compétences clés
                          </h4>
                          <ul className="grid grid-cols-2 gap-2">
                            {spec.skills.map((skill, index) => (
                              <li
                                key={index}
                                className="flex items-center text-gray-300"
                              >
                                <span className="text-blue-400 mr-2">
                                  {skill.icon}
                                </span>
                                <span className="text-sm">{skill.name}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-gray-400 uppercase mb-2">
                            Profil
                          </h4>
                          <p className="text-white font-medium">
                            {spec.profile}
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-semibold text-gray-400 uppercase mb-1">
                              Coding
                            </h4>
                            <p className="text-white font-medium">
                              {spec.coding}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-gray-400 uppercase mb-1">
                              Salaire débutant
                            </h4>
                            <p className="text-white font-medium">
                              {spec.salary}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-6 py-4 bg-gray-700/20 flex justify-between items-center">
                      <span className="text-xs text-gray-400">
                        Ex: {spec.companies}
                      </span>
                      <button
                        onClick={() => setActiveTab(spec.id)}
                        className="text-xs font-medium px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg hover:shadow-purple-500/20 transition-all"
                      >
                        En savoir plus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Academic Advice */}
            <section className="bg-gray-800/50 rounded-xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Conseil Académique
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {academicAdvice.map((advice, index) => (
                  <div key={index} className="space-y-4">
                    <h3 className="text-xl font-semibold flex items-center">
                      <span className="p-2 bg-blue-500/20 rounded-full mr-3 text-blue-400">
                        <FiAward />
                      </span>
                      {advice.title}
                    </h3>
                    <ul className="space-y-3">
                      {advice.items.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-blue-400 mr-3 mt-1">
                            <FiCornerUpRight />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* 2024 Trends */}
            <section>
              <h2 className="text-2xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Tendances 2024
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {trends2024.map((trend, index) => (
                  <div
                    key={index}
                    className="bg-gray-800 border border-white/10 rounded-lg p-6 hover:shadow-lg hover:shadow-blue-500/10 transition-all"
                  >
                    <div className="flex items-center mb-4">
                      <span className="p-2 rounded-full bg-blue-500/20 text-blue-400 mr-3">
                        <FiTrendingUp />
                      </span>
                      <h3 className="font-semibold text-lg">
                        {trend.specialization}
                      </h3>
                    </div>
                    <p className="text-gray-300">{trend.trend}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Inspiring Paths */}
            <section className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Parcours Inspirants
              </h2>
              <div className="space-y-6">
                {inspiringPaths.map((path, index) => (
                  <div
                    key={index}
                    className="bg-gray-800/50 rounded-lg p-5 hover:bg-gray-800 transition-all"
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mr-4">
                        {index + 1}
                      </div>
                      <p className="text-gray-200">{path.path}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Decision Tools */}
            <section>
              <h2 className="text-2xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Outils d'Aide à la Décision
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {decisionTools.map((tool, index) => (
                  <div
                    key={index}
                    className="bg-gray-800 border border-white/10 rounded-lg p-6 hover:shadow-lg hover:shadow-blue-500/10 transition-all"
                  >
                    <div className="flex items-center mb-4">
                      <span className="p-2 rounded-full bg-blue-500/20 text-blue-400 mr-3">
                        <FiTarget />
                      </span>
                      <h3 className="font-semibold text-lg">{tool.title}</h3>
                    </div>
                    <p className="text-gray-300">{tool.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Pitfalls to Avoid */}
            <section className="bg-gray-800/50 rounded-xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 flex items-center">
                <FiAlertTriangle className="mr-3 text-yellow-500" />
                Pièges à Éviter
              </h2>
              <div className="space-y-4">
                {pitfalls.map((pitfall, index) => (
                  <div
                    key={index}
                    className="flex items-start bg-gray-800 border border-yellow-500/20 rounded-lg p-5"
                  >
                    <span className="text-yellow-500 mr-3 mt-1">
                      <FiAlertTriangle />
                    </span>
                    <p className="text-gray-200">{pitfall}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Specialization Detail Sections */}
        {specializations.map(
          (spec) =>
            activeTab === spec.id && (
              <div key={spec.id} className="space-y-16">
                {/* Hero Banner */}
                <div
                  className={`bg-gradient-to-r ${spec.color} rounded-xl p-10 relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
                  <div className="flex items-center relative z-10">
                    <div className="bg-white/20 p-6 rounded-full mr-8">
                      {spec.icon}
                    </div>
                    <div>
                      <h2 className="text-4xl font-bold mb-2">{spec.title}</h2>
                      <p className="text-white/90 text-xl">{spec.focus}</p>
                    </div>
                  </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column */}
                  <div className="lg:col-span-2 space-y-8">
                    {/* Skills */}
                    <div className="bg-gray-800 border border-white/10 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-6">
                        Compétences Principales
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {spec.skills.map((skill, index) => (
                          <div
                            key={index}
                            className="flex items-center bg-gray-700/30 p-4 rounded-lg hover:bg-gray-700/50 transition-all"
                          >
                            <div
                              className={`p-3 rounded-full bg-gradient-to-br ${spec.color} mr-4`}
                            >
                              {skill.icon}
                            </div>
                            <span className="font-medium">{skill.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Star Modules or Tools */}
                    <div className="bg-gray-800 border border-white/10 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-6">
                        {spec.starModules ? "Modules Stars" : "Outils Phares"}
                      </h3>

                      {spec.starModules && (
                        <div className="space-y-4">
                          {spec.starModules.map((module, index) => (
                            <div
                              key={index}
                              className="bg-gray-700/30 p-4 rounded-lg border-l-4 border-blue-500"
                            >
                              {module}
                            </div>
                          ))}
                        </div>
                      )}

                      {spec.tools && (
                        <div className="flex flex-wrap gap-4">
                          {spec.tools.map((tool, index) => (
                            <div
                              key={index}
                              className="bg-gray-700/30 px-4 py-2 rounded-full border border-purple-500/30 font-medium"
                            >
                              {tool}
                            </div>
                          ))}
                        </div>
                      )}

                      {spec.hybridSkills && (
                        <div className="bg-gray-700/30 p-4 rounded-lg">
                          <h4 className="text-sm uppercase text-gray-400 mb-2">
                            Compétences Hybrides
                          </h4>
                          <div className="text-lg font-medium">
                            {spec.hybridSkills}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Career Examples */}
                    <div className="bg-gradient-to-r from-gray-800 to-gray-800/50 border border-white/10 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-6">
                        Exemples de Carrières
                      </h3>
                      <div className="flex items-center justify-between bg-gray-700/30 p-5 rounded-lg">
                        <div>
                          <h4 className="text-lg font-medium mb-2">
                            Exemple de Parcours
                          </h4>
                          <p className="text-gray-300">
                            {inspiringPaths.find((path) =>
                              path.path.startsWith(spec.id)
                            )?.path ||
                              `${spec.id} → Junior Developer → Senior Engineer → Tech Lead`}
                          </p>
                        </div>
                        <div className="bg-gray-800 p-3 rounded-full">
                          <FiTarget className="text-2xl text-blue-400" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-8">
                    {/* Advice Card */}
                    <div className="bg-gray-800 border border-white/10 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-6">
                        Conseils Spécifiques
                      </h3>

                      <div className="space-y-5">
                        <div>
                          <h4 className="text-sm uppercase text-gray-400 mb-2">
                            Pour qui
                          </h4>
                          <p className="text-gray-200">{spec.advice.forWho}</p>
                        </div>

                        <div>
                          <h4 className="text-sm uppercase text-gray-400 mb-2">
                            Projets clés
                          </h4>
                          <p className="text-gray-200">
                            {spec.advice.keyProjects}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-sm uppercase text-gray-400 mb-2">
                            Carrières
                          </h4>
                          <p className="text-gray-200">{spec.advice.careers}</p>
                        </div>
                      </div>
                    </div>

                    {/* Profile Stats */}
                    <div className="bg-gray-800 border border-white/10 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-6">
                        Profil et Statistiques
                      </h3>

                      <div className="space-y-6">
                        <div>
                          <h4 className="text-sm uppercase text-gray-400 mb-2">
                            Profil type
                          </h4>
                          <div className="text-xl font-medium">
                            {spec.profile}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm uppercase text-gray-400 mb-2">
                            Niveau de codage
                          </h4>
                          <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r ${spec.color}`}
                              style={{ width: spec.coding }}
                            ></div>
                          </div>
                          <div className="mt-2 text-right text-gray-400">
                            {spec.coding}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm uppercase text-gray-400 mb-2">
                            Salaire débutant
                          </h4>
                          <div className="text-xl font-medium">
                            {spec.salary}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm uppercase text-gray-400 mb-2">
                            Entreprises types
                          </h4>
                          <div className="bg-gray-700/30 px-4 py-2 rounded-lg inline-block">
                            {spec.companies}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Trend Card */}
                    <div className="bg-gray-800 border border-white/10 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-4 flex items-center">
                        <FiTrendingUp className="mr-2 text-blue-400" />
                        Tendance 2024
                      </h3>

                      <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <p className="text-gray-200">
                          {trends2024.find(
                            (trend) =>
                              trend.specialization === spec.id.toUpperCase()
                          )?.trend ||
                            "Forte demande sur le marché du travail (+25% postes)"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-blue-900/30 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Besoin d'aide pour choisir?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Nos conseillers d'orientation sont disponibles pour vous guider vers
            la filière qui correspond le mieux à votre profil et vos ambitions
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-medium text-white hover:shadow-lg hover:shadow-purple-500/20 transition-all flex items-center">
              <FiUsers className="mr-2" />
              Parler à un conseiller
            </button>
            <button className="px-6 py-3 bg-gray-800 border border-white/10 rounded-lg font-medium text-gray-300 hover:bg-gray-700/80 transition-all flex items-center">
              <FiCalendar className="mr-2" />
              Prendre rendez-vous
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <FooterSection/>
    </div>
  );
};

export default OrientationPage;