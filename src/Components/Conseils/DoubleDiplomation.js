import React, { useState } from "react";
import {
  FiGlobe,
  FiSearch,
  FiAward,
  FiCheck,
  FiArrowRight,
  FiX,
  FiClock,
  FiCalendar,
} from "react-icons/fi";
import Navbar from "../Products/Navbar";
import FooterSection from "../LandingPage/FooterSection";

const universitiesData = [
  {
    id: 1,
    name: "École Polytechnique Paris",
    country: "France",
    image: "/api/placeholder/800/400",
    flag: "🇫🇷",
    programs: [
      "Computer Science",
      "Artificial Intelligence",
      "Networks & Telecommunications",
    ],
    duration: "2 years",
    requirements: [
      "GPA: 14/20 minimum",
      "French: B2 Level",
      "Engineering Background",
    ],
    deadline: "February 15th",
    featured: true,
  },
  {
    id: 2,
    name: "University of Waterloo",
    country: "Canada",
    image: "/api/placeholder/800/400",
    flag: "🇨🇦",
    programs: ["Software Engineering", "Data Science", "Computer Engineering"],
    duration: "2 years",
    requirements: [
      "GPA: 3.5/4.0 minimum",
      "English: IELTS 6.5+",
      "Technical Interview",
    ],
    deadline: "January 30th",
    featured: true,
  },
  {
    id: 3,
    name: "Polytechnic University of Catalonia",
    country: "Spain",
    image: "/api/placeholder/800/400",
    flag: "🇪🇸",
    programs: ["Computer Engineering", "Cybersecurity", "Mobile Applications"],
    duration: "2 years",
    requirements: [
      "GPA: 7.5/10 minimum",
      "Spanish: B1 Level",
      "Technical Background",
    ],
    deadline: "March 15th",
    featured: true,
  },
  {
    id: 4,
    name: "CentraleSupélec",
    country: "France",
    image: "/api/placeholder/800/400",
    flag: "🇫🇷",
    programs: [
      "Software Engineering",
      "AI & Machine Learning",
      "IoT & Embedded Systems",
    ],
    duration: "2 years",
    requirements: [
      "GPA: 14/20 minimum",
      "French: B2 Level",
      "Technical Interview",
    ],
    deadline: "January 15th",
  },
  {
    id: 5,
    name: "McGill University",
    country: "Canada",
    image: "/api/placeholder/800/400",
    flag: "🇨🇦",
    programs: ["Computer Science", "Data Science", "Information Systems"],
    duration: "2 years",
    requirements: [
      "GPA: 3.2/4.0 minimum",
      "English: TOEFL 90+",
      "Programming Test",
    ],
    deadline: "December 15th",
  },
  {
    id: 6,
    name: "Universitat Politècnica de València",
    country: "Spain",
    image: "/api/placeholder/800/400",
    flag: "🇪🇸",
    programs: [
      "Computer Engineering",
      "Web Development",
      "Digital Transformation",
    ],
    duration: "2 years",
    requirements: [
      "GPA: 7/10 minimum",
      "Spanish: B1 Level",
      "Letter of Motivation",
    ],
    deadline: "April 1st",
  },
];

const DoubleDiplomation = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCountry, setFilterCountry] = useState("All");
  const [selectedUniversity, setSelectedUniversity] = useState(null);

  const countries = ["All", "France", "Canada", "Spain"];

  const filteredUniversities = universitiesData.filter(
    (uni) =>
      (filterCountry === "All" || uni.country === filterCountry) &&
      uni.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const featuredUniversities = universitiesData.filter((uni) => uni.featured);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />

      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-purple-900 z-0"></div>
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent"></div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Double Diplomation Programs
              </h1>
              <p className="text-lg text-gray-300 mb-6">
                Earn two degrees simultaneously through our partnerships with
                prestigious international universities. Enhance your academic
                profile and expand your career opportunities worldwide.
              </p>
              <div className="flex space-x-4">
                <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/20">
                  Apply Now
                </button>
                <button className="px-6 py-3 border border-white/20 rounded-lg font-medium hover:bg-white/10 transition-all">
                  Learn More
                </button>
              </div>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-xl blur-md"></div>
                <img
                  src="/api/placeholder/600/400"
                  alt="Double Diplomation"
                  className="rounded-xl relative z-10 w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-12 bg-gray-800/50 backdrop-blur-sm border-y border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                15+
              </p>
              <p className="text-gray-400 mt-2">Partner Universities</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                8
              </p>
              <p className="text-gray-400 mt-2">Countries</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                95%
              </p>
              <p className="text-gray-400 mt-2">Job Placement</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                2
              </p>
              <p className="text-gray-400 mt-2">Years Average</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Universities */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Featured Partner Universities
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredUniversities.map((university) => (
              <div
                key={university.id}
                className="bg-gray-800/50 rounded-xl overflow-hidden border border-white/10 transition-all hover:shadow-lg hover:shadow-purple-500/20 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={university.image}
                    alt={university.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-gray-900/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm flex items-center">
                    <span className="mr-2">{university.flag}</span>
                    <span>{university.country}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {university.name}
                  </h3>
                  <div className="flex items-center mb-4 text-gray-400">
                    <FiClock className="mr-2" />
                    <span>{university.duration}</span>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-400 mb-2">
                      Available Programs:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {university.programs.map((program, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full"
                        >
                          {program}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedUniversity(university)}
                    className="w-full py-2 mt-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all flex items-center justify-center"
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

      {/* Search and Filter */}
      <section className="py-12 bg-gray-800/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <h2 className="text-2xl font-bold">All Partner Universities</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search universities..."
                  className="pl-10 pr-4 py-2 rounded-lg bg-gray-800 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                value={filterCountry}
                onChange={(e) => setFilterCountry(e.target.value)}
                className="px-4 py-2 rounded-lg bg-gray-800 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country === "All" ? "All Countries" : country}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUniversities.map((university) => (
              <div
                key={university.id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-purple-500/30 transition-all cursor-pointer"
                onClick={() => setSelectedUniversity(university)}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-2xl">{university.flag}</div>
                  <div>
                    <h3 className="font-semibold">{university.name}</h3>
                    <p className="text-sm text-gray-400">
                      {university.country}
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-400 mb-4">
                  <FiClock className="mr-2" />
                  <span>{university.duration}</span>
                  <span className="mx-2">•</span>
                  <FiCalendar className="mr-2" />
                  <span>Deadline: {university.deadline}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {university.programs.slice(0, 2).map((program, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full"
                    >
                      {program}
                    </span>
                  ))}
                  {university.programs.length > 2 && (
                    <span className="text-xs bg-gray-700 px-2 py-1 rounded-full">
                      +{university.programs.length - 2} more
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
        </div>
      </section>

      {/* University Details Modal */}
      {selectedUniversity && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-white/10 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative h-64">
              <img
                src={selectedUniversity.image}
                alt={selectedUniversity.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedUniversity(null)}
                className="absolute top-4 right-4 bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
              >
                <FiX className="h-6 w-6" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                <div className="flex items-center">
                  <span className="text-3xl mr-3">
                    {selectedUniversity.flag}
                  </span>
                  <div>
                    <h2 className="text-2xl font-bold">
                      {selectedUniversity.name}
                    </h2>
                    <p className="text-gray-300">
                      {selectedUniversity.country}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <FiAward className="mr-2 text-blue-400" />
                    Available Programs
                  </h3>
                  <ul className="space-y-2">
                    {selectedUniversity.programs.map((program, idx) => (
                      <li key={idx} className="flex items-start">
                        <FiCheck className="mr-2 text-green-400 mt-1 flex-shrink-0" />
                        <span>{program}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <FiGlobe className="mr-2 text-blue-400" />
                    Requirements
                  </h3>
                  <ul className="space-y-2">
                    {selectedUniversity.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start">
                        <FiCheck className="mr-2 text-green-400 mt-1 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold mb-2 flex items-center">
                  <FiClock className="mr-2 text-blue-400" />
                  Program Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Duration</p>
                    <p>{selectedUniversity.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">
                      Application Deadline
                    </p>
                    <p>{selectedUniversity.deadline}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setSelectedUniversity(null)}
                  className="px-4 py-2 border border-white/20 rounded-lg"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FAQ Section */}
      <section className="py-16 bg-gray-800/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Frequently Asked Questions
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-gray-800/50 border border-white/10 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">
                What is Double Diplomation?
              </h3>
              <p className="text-gray-300">
                Double Diplomation allows you to earn two degrees simultaneously
                through our international partnerships. You'll typically spend
                time studying at both institutions and receive diplomas from
                both upon successful completion.
              </p>
            </div>
            <div className="bg-gray-800/50 border border-white/10 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">
                How long does it take?
              </h3>
              <p className="text-gray-300">
                Most double diplomation programs last 2 years, with time spent
                at both institutions. The exact duration depends on the specific
                program and partner university.
              </p>
            </div>
            <div className="bg-gray-800/50 border border-white/10 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">
                What are the language requirements?
              </h3>
              <p className="text-gray-300">
                Language requirements vary by country and institution. Most
                programs require at least B1/B2 proficiency in the local
                language, though some offer English-taught programs with
                different requirements.
              </p>
            </div>
            <div className="bg-gray-800/50 border border-white/10 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">
                Are scholarships available?
              </h3>
              <p className="text-gray-300">
                Yes, various scholarships are available through our partner
                universities, government programs, and private organizations.
                Our international office can provide guidance on available
                options.
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/20">
              View All FAQs
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-purple-900 z-0"></div>
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Begin Your International Journey?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Take the first step toward earning prestigious international
            qualifications and building a global career network.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/20">
              Apply for Double Diplomation
            </button>
            <button className="px-6 py-3 border border-white/20 rounded-lg font-medium hover:bg-white/10 transition-all">
              Schedule a Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <FooterSection/>
    </div>
  );
};

export default DoubleDiplomation;
