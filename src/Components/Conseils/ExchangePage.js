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
    university: "Université Paris-Saclay",
    country: "France",
    city: "Paris",
    image: "/api/placeholder/800/500",
    flag: "🇫🇷",
    programs: ["Computer Science", "Data Science", "Networks"],
    duration: "1 semester",
    languages: ["French (B2)", "English (B2)"],
    accommodationAvailable: true,
    deadline: "November 15th",
    scholarshipAvailable: true,
    rating: 4.8,
    reviews: 124,
    description: "Experience a semester in one of France's most prestigious technical universities. The program focuses on advanced computer science and engineering disciplines with state-of-the-art facilities.",
    featured: true,
  },
  {
    id: 2, 
    university: "Polytechnic University of Catalonia",
    country: "Spain",
    city: "Barcelona",
    image: "/api/placeholder/800/500",
    flag: "🇪🇸",
    programs: ["Computer Engineering", "Cybersecurity", "AI"],
    duration: "1-2 semesters",
    languages: ["Spanish (B1)", "English (B2)"],
    accommodationAvailable: true,
    deadline: "December 1st",
    scholarshipAvailable: true,
    rating: 4.7,
    reviews: 98,
    description: "Study in vibrant Barcelona at one of Spain's top technical universities. The program offers a wide range of engineering courses with a focus on innovation and practical applications.",
    featured: true,
  },
  {
    id: 3,
    university: "University of Toronto",
    country: "Canada",
    city: "Toronto",
    image: "/api/placeholder/800/500",
    flag: "🇨🇦",
    programs: ["Software Engineering", "Machine Learning", "HCI"],
    duration: "1-2 semesters",
    languages: ["English (IELTS 6.5+)"],
    accommodationAvailable: true,
    deadline: "January 15th",
    scholarshipAvailable: true,
    rating: 4.9,
    reviews: 156,
    description: "Join one of Canada's leading universities in the heart of multicultural Toronto. The program offers cutting-edge research opportunities and a diverse academic environment.",
    featured: true,
  },
  {
    id: 4,
    university: "INSA Lyon",
    country: "France",
    city: "Lyon",
    image: "/api/placeholder/800/500",
    flag: "🇫🇷",
    programs: ["Computer Science", "Information Systems", "Telecommunications"],
    duration: "1 semester",
    languages: ["French (B1)", "English (B2)"],
    accommodationAvailable: true,
    deadline: "October 30th",
    scholarshipAvailable: false,
    rating: 4.5,
    reviews: 87,
    description: "Study in Lyon's premier engineering school with a strong focus on practical applications and industry connections. The program includes opportunities for internships with partner companies.",
  },
  {
    id: 5,
    university: "Technical University of Madrid",
    country: "Spain",
    city: "Madrid",
    image: "/api/placeholder/800/500",
    flag: "🇪🇸",
    programs: ["Software Engineering", "Computer Networks", "Digital Systems"],
    duration: "1 semester",
    languages: ["Spanish (B1)", "English (B1)"],
    accommodationAvailable: true,
    deadline: "November 30th",
    scholarshipAvailable: true,
    rating: 4.6,
    reviews: 92,
    description: "Experience Madrid's vibrant culture while studying at Spain's oldest and most prestigious technical university. The program emphasizes both theoretical foundation and practical engineering skills.",
  },
  {
    id: 6,
    university: "University of Montreal",
    country: "Canada",
    city: "Montreal",
    image: "/api/placeholder/800/500",
    flag: "🇨🇦",
    programs: ["Computer Science", "AI & Machine Learning", "Software Design"],
    duration: "1-2 semesters",
    languages: ["English (B2)", "French (B1)"],
    accommodationAvailable: true,
    deadline: "December 15th",
    scholarshipAvailable: true,
    rating: 4.7,
    reviews: 113,
    description: "Study in bilingual Montreal at one of Canada's leading research universities. The program offers innovative courses and research opportunities in computer science and AI.",
  },
  {
    id: 7,
    university: "IMT Atlantique",
    country: "France",
    city: "Brest",
    image: "/api/placeholder/800/500",
    flag: "🇫🇷",
    programs: ["Computer Networks", "IoT", "Cybersecurity"],
    duration: "1 semester",
    languages: ["French (B1)", "English (B2)"],
    accommodationAvailable: true,
    deadline: "November 1st",
    scholarshipAvailable: true,
    rating: 4.4,
    reviews: 76,
    description: "Join one of France's elite engineering schools with a strong focus on digital technology and communications. The program includes hands-on projects and industry collaborations.",
  },
  {
    id: 8,
    university: "University of Valencia",
    country: "Spain",
    city: "Valencia",
    image: "/api/placeholder/800/500",
    flag: "🇪🇸",
    programs: ["Computer Engineering", "Mobile Applications", "Web Technologies"],
    duration: "1 semester",
    languages: ["Spanish (B1)", "English (B1)"],
    accommodationAvailable: true,
    deadline: "December 10th",
    scholarshipAvailable: false,
    rating: 4.3,
    reviews: 68,
    description: "Study in the beautiful coastal city of Valencia and enjoy its rich culture while learning at one of Spain's historic universities. The program offers a blend of traditional and modern computing curricula.",
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
      name: "Sofia Garcia",
      image: "/api/placeholder/100/100",
      university: "Polytechnic University of Catalonia",
      country: "Spain",
      text: "My exchange semester in Barcelona was transformative. The courses were challenging but incredibly rewarding, and the cultural experience was beyond anything I expected.",
      year: "2024",
    },
    {
      id: 2,
      name: "Ahmed Benali",
      image: "/api/placeholder/100/100",
      university: "Université Paris-Saclay",
      country: "France",
      text: "Studying in Paris opened doors I never knew existed. The academic environment was stimulating, and I've made connections that will last a lifetime.",
      year: "2023",
    },
    {
      id: 3,
      name: "Priya Shah",
      image: "/api/placeholder/100/100",
      university: "University of Toronto",
      country: "Canada",
      text: "Toronto provided the perfect blend of academic excellence and cultural diversity. The research opportunities were exceptional, and the city itself was a classroom.",
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
                Discover the World
              </span>
              <br />
              <span>While You Study</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Expand your horizons with our international exchange programs.
              Study at prestigious universities while immersing yourself in new
              cultures.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/20">
                Browse Programs
              </button>
              <button className="px-8 py-4 border border-white/20 rounded-lg font-medium hover:bg-white/10 transition-all">
                Application Guide
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
                  placeholder="Search programs, universities, or cities..."
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
                <span>Filters</span>
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all">
                Search
              </button>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/5">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Country
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
                    Duration
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
                    Scholarship
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox rounded bg-gray-700 text-blue-500 mr-2"
                      />
                      <span>Available</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox rounded bg-gray-700 text-blue-500 mr-2"
                      />
                      <span>Not Required</span>
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
                  Featured Exchange Programs
                </span>
              </h2>
              <p className="text-gray-400">
                Discover our most popular international opportunities
              </p>
            </div>
            <a
              href="#all-programs"
              className="flex items-center text-blue-400 hover:text-blue-300 transition-colors mt-4 md:mt-0"
            >
              <span>View all programs</span>
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
                        Scholarship
                      </span>
                    )}
                    {program.accommodationAvailable && (
                      <span className="flex items-center text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full">
                        <FiCheck className="mr-1" />
                        Accommodation
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedProgram(program)}
                    className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all flex items-center justify-center"
                  >
                    <span>View Details</span>
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
              Why Choose an Exchange Program?
            </h2>
            <p className="text-gray-300">
              Studying abroad offers unique benefits that go beyond traditional
              education, preparing you for success in a globalized world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-blue-500/30 transition-all">
              <div className="w-16 h-16 mb-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                <FiGlobe className="text-blue-400 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Global Perspective</h3>
              <p className="text-gray-300">
                Immerse yourself in new cultures, languages, and perspectives.
                Develop a global mindset that will be invaluable in today's
                interconnected world.
              </p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-blue-500/30 transition-all">
              <div className="w-16 h-16 mb-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                <FiBook className="text-purple-400 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Academic Excellence
              </h3>
              <p className="text-gray-300">
                Access diverse teaching methods, specialized courses, and unique
                research opportunities that might not be available at your home
                institution.
              </p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-blue-500/30 transition-all">
              <div className="w-16 h-16 mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                <FiUsers className="text-green-400 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Professional Network
              </h3>
              <p className="text-gray-300">
                Build an international network of contacts including fellow
                students, professors, and industry professionals that can open
                doors throughout your career.
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
              Student Experiences
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
                          Exchange Student at {testimonial.university},{" "}
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
            Explore All Exchange Programs
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
                      +{program.programs.length - 2} more
                    </span>
                  )}
                </div>

                <div className="flex items-center text-sm text-gray-400 mb-4">
                  <FiClock className="mr-2" />
                  <span>{program.duration}</span>
                  <span className="mx-2">•</span>
                  <FiCalendar className="mr-2" />
                  <span>Deadline: {program.deadline}</span>
                </div>

                <div className="flex flex-wrap gap-3 mb-4">
                  {program.scholarshipAvailable && (
                    <span className="flex items-center text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">
                      <FiCheck className="mr-1" />
                      Scholarship
                    </span>
                  )}
                  {program.accommodationAvailable && (
                    <span className="flex items-center text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full">
                      <FiCheck className="mr-1" />
                      Accommodation
                    </span>
                  )}
                </div>

                <button className="text-sm text-blue-400 flex items-center mt-2 hover:text-blue-300">
                  <span>View Details</span>
                  <FiArrowRight className="ml-1" />
                </button>
              </div>
            ))}
          </div>

          {filteredPrograms.length === 0 && (
            <div className="text-center py-12 bg-gray-800/30 rounded-lg border border-white/10">
              <FiInfo className="text-4xl text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Programs Found</h3>
              <p className="text-gray-400">
                Try adjusting your search criteria or filters.
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
      <FooterSection/>
    </div>
  );
};

export default ExchangePage;