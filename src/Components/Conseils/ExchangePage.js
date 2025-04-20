import React, { useState, useEffect } from "react";
import { 
  FiGlobe, 
  FiCalendar, 
  FiMapPin, 
  FiStar, 
  FiSearch, 
  FiFilter, 
  FiClock, 
  FiBook, 
  FiUsers, 
  FiX,
  FiArrowRight, 
  FiChevronRight,
  FiCheck,
  FiInfo
} from "react-icons/fi";
import Navbar from "../Products/Navbar";
import FooterSection from "../LandingPage/FooterSection";

const exchangePrograms = [
  {
    id: 1,
    university: "INSA Centre Val De Loire",
    country: "France",
    city: "Blois",
    image: "/api/placeholder/800/500",
    flag: "🇫🇷",
    programs: ["Double Diplomation", "Échange", "PFE"],
    duration: "1-2 semesters",
    languages: ["French (B2)", "English (B1)"],
    accommodationAvailable: true,
    deadline: "November 15th",
    scholarshipAvailable: true,
    rating: 4.7,
    reviews: 92,
    description:
      "INSA Centre Val De Loire offers comprehensive exchange opportunities including double degree programs, semester exchanges, and final year projects (PFE). The institute is known for its engineering excellence and strong industry connections.",
    featured: true,
  },
  {
    id: 2,
    university: "POLYTECH Angers",
    country: "France",
    city: "Angers",
    image: "/api/placeholder/800/500",
    flag: "🇫🇷",
    programs: ["PFE", "Semester Study"],
    duration: "1-2 semesters",
    languages: ["French (B2)", "English (B1)"],
    accommodationAvailable: true,
    deadline: "December 1st",
    scholarshipAvailable: true,
    rating: 4.6,
    reviews: 84,
    description:
      "POLYTECH Angers provides opportunities for final year projects (PFE) and semester-based academic studies. Located in the beautiful Loire Valley, the school offers programs with a focus on practical engineering applications.",
    featured: true,
  },
  {
    id: 3,
    university: "INSA DE Toulouse",
    country: "France",
    city: "Toulouse",
    image: "/api/placeholder/800/500",
    flag: "🇫🇷",
    programs: ["Exchange Program"],
    duration: "1 semester",
    languages: ["French (B2)", "English (B1)"],
    accommodationAvailable: true,
    deadline: "November 30th",
    scholarshipAvailable: true,
    rating: 4.8,
    reviews: 116,
    description:
      "INSA DE Toulouse offers exchange programs in one of France's most vibrant technology hubs. Known for aerospace engineering and advanced technologies, the school provides a stimulating academic environment with strong research facilities.",
    featured: true,
  },
  {
    id: 4,
    university: "EIL Côte d'Opale",
    country: "France",
    city: "Calais",
    image: "/api/placeholder/800/500",
    flag: "🇫🇷",
    programs: ["Double Diplomation", "Exchange", "Semester Study"],
    duration: "1-2 semesters",
    languages: ["French (B1)", "English (B1)"],
    accommodationAvailable: true,
    deadline: "December 15th",
    scholarshipAvailable: false,
    rating: 4.5,
    reviews: 78,
    description:
      "EIL Côte d'Opale offers multiple pathways including double degree programs, exchange opportunities, and semester-based studies. Located near the coast in northern France, the school specializes in engineering and computer science disciplines.",
  },
  {
    id: 5,
    university: "Université du Québec à Chicoutimi",
    country: "Canada",
    city: "Chicoutimi",
    image: "/api/placeholder/800/500",
    flag: "🇨🇦",
    programs: ["Exchange Program"],
    duration: "1-2 semesters",
    languages: ["French (B2)", "English (B1)"],
    accommodationAvailable: true,
    deadline: "January 15th",
    scholarshipAvailable: true,
    rating: 4.7,
    reviews: 103,
    description:
      "The Université du Québec à Chicoutimi offers exchange opportunities in a bilingual Canadian setting. The university is known for its strong programs in engineering, computer science, and environmental studies, with a focus on sustainable development.",
  },
];

const ExchangePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedDuration, setSelectedDuration] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const countries = ["All", "France", "Spain", "Canada"];
  const durations = ["All", "1 semester", "1-2 semesters"];

  const featuredPrograms = exchangePrograms.filter(
    (program) => program.featured
  );

  const filteredPrograms = exchangePrograms.filter((program) => {
    return (
      (selectedCountry === "All" || program.country === selectedCountry) &&
      (selectedDuration === "All" || program.duration === selectedDuration) &&
      (program.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.programs.some((p) =>
          p.toLowerCase().includes(searchTerm.toLowerCase())
        ))
    );
  });

  const testimonials = [
    {
      id: 1,
      name: "Thomas Laurent",
      image: "/api/placeholder/100/100",
      university: "INSA Centre Val De Loire",
      country: "France",
      text: "My double diplomation at INSA was a transformative experience. The curriculum was challenging but incredibly rewarding, and I gained invaluable international experience for my engineering career.",
      year: "2024",
    },
    {
      id: 2,
      name: "Sophie Martin",
      image: "/api/placeholder/100/100",
      university: "POLYTECH Angers",
      country: "France",
      text: "Completing my PFE at POLYTECH Angers opened doors to industry connections I never imagined. The faculty support was outstanding, and I developed practical skills that immediately translated to my job.",
      year: "2023",
    },
    {
      id: 3,
      name: "Marc Tremblay",
      image: "/api/placeholder/100/100",
      university: "Université du Québec à Chicoutimi",
      country: "Canada",
      text: "The exchange program at UQAC provided the perfect blend of academic excellence and cultural immersion. Living and studying in Quebec improved my French while gaining world-class engineering education.",
      year: "2024",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />

      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900 to-purple-900 z-0"></div>
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent"></div>

        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Étudier à l'International
              </span>
              <br />
              <span>Double Diplômes et Échanges</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Élargissez vos horizons avec nos programmes d'échange
              internationaux. Étudiez dans des établissements prestigieux et
              immergez-vous dans de nouvelles cultures.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/20">
                Parcourir les Programmes
              </button>
              <button className="px-8 py-4 border border-white/20 rounded-lg font-medium hover:bg-white/10 transition-all">
                Guide de Candidature
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900 to-transparent"></div>
      </header>

      {/* Search Bar */}
      <section className="py-8 -mt-16 relative z-20">
        <div className="container mx-auto px-4">
          <div className="bg-gray-800/70 backdrop-blur-md rounded-xl border border-white/10 p-4 shadow-lg shadow-purple-500/5 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher des programmes, universités ou villes..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-700/70 border border-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                className="px-4 py-3 bg-gray-700/70 border border-white/5 rounded-lg flex items-center justify-center hover:bg-gray-600/70 transition-colors"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FiFilter className="mr-2" />
                <span>Filtres</span>
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all">
                Rechercher
              </button>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/5">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Pays
                  </label>
                  <select
                    className="w-full px-4 py-2 rounded-lg bg-gray-700/70 border border-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                  >
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Durée
                  </label>
                  <select
                    className="w-full px-4 py-2 rounded-lg bg-gray-700/70 border border-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(e.target.value)}
                  >
                    {durations.map((duration) => (
                      <option key={duration} value={duration}>
                        {duration}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Type de Programme
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox rounded bg-gray-700 text-blue-500 mr-2"
                      />
                      <span>Double Diplôme</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox rounded bg-gray-700 text-blue-500 mr-2"
                      />
                      <span>PFE</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Programmes d'Échange Recommandés
                </span>
              </h2>
              <p className="text-gray-400">
                Découvrez nos opportunités internationales les plus populaires
              </p>
            </div>
            <a
              href="#all-programs"
              className="flex items-center text-blue-400 hover:text-blue-300 transition-colors mt-4 md:mt-0"
            >
              <span>Voir tous les programmes</span>
              <FiChevronRight className="ml-1" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPrograms.map((program) => (
              <div
                key={program.id}
                className="bg-gray-800/30 rounded-xl overflow-hidden border border-white/10 hover:border-blue-500/30 transition-all group"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.university}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-sm flex items-center">
                    <span className="mr-2">{program.flag}</span>
                    <span>{program.country}</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-sm flex items-center">
                    <FiStar className="text-yellow-400 mr-1" />
                    <span>{program.rating}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">
                    {program.university}
                  </h3>
                  <div className="flex items-center text-gray-400 text-sm mb-3">
                    <FiMapPin className="mr-1" />
                    <span>{program.city}</span>
                    <span className="mx-2">•</span>
                    <FiClock className="mr-1" />
                    <span>{program.duration}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {program.programs.map((prog, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full"
                      >
                        {prog}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3 mb-4">
                    {program.scholarshipAvailable && (
                      <span className="flex items-center text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">
                        <FiCheck className="mr-1" />
                        Bourse
                      </span>
                    )}
                    {program.accommodationAvailable && (
                      <span className="flex items-center text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full">
                        <FiCheck className="mr-1" />
                        Logement
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedProgram(program)}
                    className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all flex items-center justify-center"
                  >
                    <span>Voir les Détails</span>
                    <FiArrowRight className="ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-b from-gray-800/30 to-gray-900 border-y border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Pourquoi Choisir un Programme d'Échange?
            </h2>
            <p className="text-gray-300">
              Étudier à l'étranger offre des avantages uniques qui vont au-delà
              de l'éducation traditionnelle, vous préparant au succès dans un
              monde globalisé.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-blue-500/30 transition-all">
              <div className="w-16 h-16 mb-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                <FiGlobe className="text-blue-400 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Perspective Globale
              </h3>
              <p className="text-gray-300">
                Immergez-vous dans de nouvelles cultures, langues et
                perspectives. Développez une vision mondiale qui sera
                inestimable dans notre monde interconnecté.
              </p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-blue-500/30 transition-all">
              <div className="w-16 h-16 mb-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                <FiBook className="text-purple-400 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Excellence Académique
              </h3>
              <p className="text-gray-300">
                Accédez à des méthodes d'enseignement diverses, des cours
                spécialisés et des opportunités de recherche uniques qui ne sont
                peut-être pas disponibles dans votre établissement d'origine.
              </p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-blue-500/30 transition-all">
              <div className="w-16 h-16 mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                <FiUsers className="text-green-400 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Réseau Professionnel
              </h3>
              <p className="text-gray-300">
                Construisez un réseau international de contacts incluant
                d'autres étudiants, des professeurs et des professionnels de
                l'industrie qui peuvent ouvrir des portes tout au long de votre
                carrière.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Expériences d'Étudiants
            </span>
          </h2>

          <div className="max-w-4xl mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl blur-md"></div>
            <div className="relative">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-white/10 transition-opacity duration-500 ${
                    activeTestimonial === index
                      ? "opacity-100"
                      : "opacity-0 absolute top-0 left-0 right-0"
                  }`}
                >
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-sm opacity-70"></div>
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-24 h-24 rounded-full object-cover border-4 border-gray-900 relative z-10"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="text-lg mb-4 text-gray-300 italic">
                        "{testimonial.text}"
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">
                          {testimonial.name}
                        </h4>
                        <p className="text-gray-400">
                          Étudiant(e) d'échange à {testimonial.university},{" "}
                          {testimonial.country} ({testimonial.year})
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full mx-1 transition-colors ${
                    activeTestimonial === index ? "bg-blue-500" : "bg-gray-700"
                  }`}
                  onClick={() => setActiveTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Programs */}
      <section id="all-programs" className="py-16 bg-gray-800/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">
            Explorer Tous les Programmes d'Échange
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((program) => (
              <div
                key={program.id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-purple-500/30 transition-all cursor-pointer"
                onClick={() => setSelectedProgram(program)}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-2xl">{program.flag}</div>
                  <div>
                    <h3 className="font-semibold">{program.university}</h3>
                    <p className="text-sm text-gray-400">
                      {program.city}, {program.country}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {program.programs.slice(0, 2).map((prog, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full"
                    >
                      {prog}
                    </span>
                  ))}
                  {program.programs.length > 2 && (
                    <span className="text-xs bg-gray-700 px-2 py-1 rounded-full">
                      +{program.programs.length - 2} plus
                    </span>
                  )}
                </div>

                <div className="flex items-center text-sm text-gray-400 mb-4">
                  <FiClock className="mr-2" />
                  <span>{program.duration}</span>
                  <span className="mx-2">•</span>
                  <FiCalendar className="mr-2" />
                  <span>Date limite: {program.deadline}</span>
                </div>

                <div className="flex flex-wrap gap-3 mb-4">
                  {program.scholarshipAvailable && (
                    <span className="flex items-center text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">
                      <FiCheck className="mr-1" />
                      Bourse
                    </span>
                  )}
                  {program.accommodationAvailable && (
                    <span className="flex items-center text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full">
                      <FiCheck className="mr-1" />
                      Logement
                    </span>
                  )}
                </div>

                <button className="text-sm text-blue-400 flex items-center mt-2 hover:text-blue-300">
                  <span>Voir les Détails</span>
                  <FiArrowRight className="ml-1" />
                </button>
              </div>
            ))}
          </div>

          {filteredPrograms.length === 0 && (
            <div className="text-center py-12 bg-gray-800/30 rounded-lg border border-white/10">
              <FiInfo className="text-4xl text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Aucun Programme Trouvé
              </h3>
              <p className="text-gray-400">
                Essayez d'ajuster vos critères de recherche ou vos filtres.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Program Details Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-white/10 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative h-64">
              <img
                src={selectedProgram.image}
                alt={selectedProgram.university}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedProgram(null)}
                className="absolute top-4 right-4 bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
              >
                <FiX className="h-6 w-6" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                <div className="flex items-center">
                  <span className="text-3xl mr-3">{selectedProgram.flag}</span>
                  <div>
                    <h2 className="text-2xl font-bold">
                      {selectedProgram.university}
                    </h2>
                    <p className="text-gray-300">
                      {selectedProgram.city}, {selectedProgram.country}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <FiStar className="text-yellow-400 mr-1" />
                  <span className="font-semibold">
                    {selectedProgram.rating}
                  </span>
                  <span className="text-gray-400 ml-2">
                    ({selectedProgram.reviews} reviews)
                  </span>
                </div>
                <div className="flex items-center text-gray-400">
                  <FiClock className="mr-2" />
                  <span className="mr-4">{selectedProgram.duration}</span>
                  <FiCalendar className="mr-2" />
                  <span>Apply by {selectedProgram.deadline}</span>
                </div>
              </div>

              <p className="text-gray-300 mb-8">
                {selectedProgram.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-semibold mb-4 flex items-center">
                    <FiBook className="mr-2" />
                    Programs Offered
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProgram.programs.map((program, idx) => (
                      <span
                        key={idx}
                        className="text-sm bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full"
                      >
                        {program}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4 flex items-center">
                    <FiGlobe className="mr-2" />
                    Language Requirements
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProgram.languages.map((lang, idx) => (
                      <span
                        key={idx}
                        className="text-sm bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center p-4 bg-gray-800/30 rounded-lg">
                  <FiUsers className="text-2xl mr-4 text-green-400" />
                  <div>
                    <p className="text-sm text-gray-400">Accommodation</p>
                    <p className="font-semibold">
                      {selectedProgram.accommodationAvailable
                        ? "Available"
                        : "Not Provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-gray-800/30 rounded-lg">
                  <FiStar className="text-2xl mr-4 text-yellow-400" />
                  <div>
                    <p className="text-sm text-gray-400">Scholarship</p>
                    <p className="font-semibold">
                      {selectedProgram.scholarshipAvailable
                        ? "Available"
                        : "Not Available"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all">
                  Apply Now
                </button>
                <button className="py-3 px-6 border border-white/20 rounded-lg font-medium hover:bg-white/10 transition-colors">
                  Save to Favorites
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <FooterSection />
    </div>
  );
};

export default ExchangePage;