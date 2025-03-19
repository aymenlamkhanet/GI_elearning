import React, { useState, useEffect } from "react";
import {
FaDownload,
FaEye,
FaBookOpen,
FaSearch,
} from "react-icons/fa";
import Navbar from "../Products/Navbar";
import FooterSection from "../LandingPage/FooterSection";

const BooksCollectionDisplay = () => {
// State for animations and filtering
const [visibleCollections, setVisibleCollections] = useState([]);
const [hoveredBook, setHoveredBook] = useState(null);
const [filters, setFilters] = useState({
search: "",
subject: "",
level: "",
});

// Collection data
const collections = [
{
id: "concours",
title: 'Collection "100% Concours"',
books: [
{
id: 1,
title: "Tous les exercices d'Analyse MP",
subject: "math",
level: "mp",
},
{
id: 2,
title: "Tous les exercices d'Algèbre et de Géométrie MP",
subject: "math",
level: "mp",
},
{
id: 3,
title: "Tous les exercices d'Analyse PC/PSI",
subject: "math",
level: "pcpsi",
},
{
id: 4,
title: "Tous les exercices d'Algèbre et de Géométrie PC-PSI",
subject: "math",
level: "pcpsi",
},
{
id: 5,
title: "Tous les exercices de Chimie MP-PSI-PT",
subject: "chimie",
level: "mp",
},
],
},
{
id: "methodes",
title: 'Collection "Méthodes et annales & Mille et une question"',
books: [
{
id: 6,
title: "Physique MP-MP* - PT-PT*",
subject: "physique",
level: "mp",
},
{
id: 7,
title: "Physique MPSI-PTSI",
subject: "physique",
level: "mpsi",
},
{
id: 8,
title: "Les Mille et Une Questions en PRÉPA - PHYSIQUE",
subject: "physique",
level: "all",
},
{
id: 9,
title: "Les Mille et Une Questions en PRÉPA - PHYSIQUE (2)",
subject: "physique",
level: "all",
},
],
},
{
id: "grandes_ecoles",
title: 'Collection "Préparation aux Grandes Écoles"',
books: [
{ id: 10, title: "Mathématiques X-ENS", subject: "math", level: "mp" },
{
id: 11,
title: "Physique Centrale-Mines",
subject: "physique",
level: "mp",
},
{ id: 12, title: "Chimie CCP", subject: "chimie", level: "pcsi" },
{ id: 13, title: "Informatique MP", subject: "info", level: "mp" },
{
id: 14,
title: "Sciences Industrielles PSI",
subject: "si",
level: "psi",
},
],
},
];

// Animation to reveal collections one by one
useEffect(() => {
const timer = setTimeout(() => {
const revealSequentially = async () => {
for (let i = 0; i < collections.length; i++) { await new Promise((resolve)=> setTimeout(resolve, 300));
    setVisibleCollections((prev) => [...prev, i]);
    }
    };

    revealSequentially();
    }, 100);

    return () => clearTimeout(timer);
    }, []);

    // Filter function
    const filterBooks = (book) => {
    const searchMatch =
    filters.search === "" ||
    book.title.toLowerCase().includes(filters.search.toLowerCase());

    const subjectMatch =
    filters.subject === "" || book.subject === filters.subject;
    const levelMatch = filters.level === "" || book.level === filters.level;

    return searchMatch && subjectMatch && levelMatch;
    };

    // Get all unique subjects and levels for filters
    const allSubjects = [
    ...new Set(collections.flatMap((c) => c.books.map((b) => b.subject))),
    ];
    const allLevels = [
    ...new Set(collections.flatMap((c) => c.books.map((b) => b.level))),
    ];

    return (
    <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        {/* Search and filter area */}
        <div className="container mx-auto px-4 py-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-700/50 shadow-lg">
                <h2
                    className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 mb-4">
                    Découvrez nos Ressources
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Search input */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSearch className="text-gray-400" />
                        </div>
                        <input type="text" placeholder="Rechercher un ouvrage..."
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                            value={filters.search} onChange={(e)=>
                        setFilters({ ...filters, search: e.target.value })
                        }
                        />
                    </div>

                    {/* Subject filter */}
                    <div>
                        <select
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                            value={filters.subject} onChange={(e)=>
                            setFilters({ ...filters, subject: e.target.value })
                            }
                            >
                            <option value="">Toutes les matières</option>
                            {allSubjects.map((subject) => (
                            <option key={subject} value={subject}>
                                {subject === "math"
                                ? "Mathématiques"
                                : subject === "physique"
                                ? "Physique"
                                : subject === "chimie"
                                ? "Chimie"
                                : subject === "info"
                                ? "Informatique"
                                : subject === "si"
                                ? "Sciences Industrielles"
                                : subject}
                            </option>
                            ))}
                        </select>
                    </div>

                    {/* Level filter */}
                    <div>
                        <select
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                            value={filters.level} onChange={(e)=>
                            setFilters({ ...filters, level: e.target.value })
                            }
                            >
                            <option value="">Tous les niveaux</option>
                            {allLevels.map((level) => (
                            <option key={level} value={level}>
                                {level.toUpperCase()}
                            </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Collections */}
            {collections.map((collection, collectionIndex) => {
            // Filter books based on criteria
            const filteredBooks = collection.books.filter(filterBooks);

            // Skip rendering if no books match the filter
            if (filteredBooks.length === 0) return null;

            return (
            <div key={collection.id} className={`mb-16 transition-opacity duration-500 ${
                visibleCollections.includes(collectionIndex) ? "opacity-100" : "opacity-0" }`}>
                {/* Collection title with animated underline */}
                <div className="mb-8 relative">
                    <h2
                        className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                        {collection.title}
                    </h2>
                    <div className={`h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 transition-all
                        duration-1000 ${ visibleCollections.includes(collectionIndex) ? "w-40" : "w-0" }`} />
                </div>

                {/* Books grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {filteredBooks.map((book, bookIndex) => (
                    <div key={book.id} className={`group relative transition-all duration-500 transform ${
                        visibleCollections.includes(collectionIndex) ? "translate-y-0 opacity-100"
                        : "translate-y-10 opacity-0" }`} style={{ transitionDelay: `${bookIndex * 100}ms` }}
                        onMouseEnter={()=>
                        setHoveredBook(`${collection.id}-${book.id}`)
                        }
                        onMouseLeave={() => setHoveredBook(null)}
                        >
                        {/* Book card */}
                        <div
                            className="relative bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 shadow-lg transition-all duration-500 h-full group-hover:border-purple-500/50">
                            {/* Book cover */}
                            <div className="relative aspect-[3/4] overflow-hidden">
                                <div
                                    className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900/90 z-10" />
                                <img src={`https://source.unsplash.com/400x500/?textbook,${book.subject},${book.id}`}
                                    alt={book.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

                                {/* Shine effect */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-all duration-1000 ease-in-out z-20" />
                            </div>

                            {/* Subject badge */}
                            <div className="absolute top-4 left-4 z-20">
                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${ book.subject==="math"
                                    ? "bg-blue-500/80" : book.subject==="physique" ? "bg-purple-500/80" :
                                    book.subject==="chimie" ? "bg-green-500/80" : book.subject==="info"
                                    ? "bg-yellow-500/80" : "bg-gray-500/80" }`}>
                                    {book.subject}
                                </span>
                            </div>

                            {/* Book info */}
                            <div className="p-4 z-20 relative">
                                <h3
                                    className="text-sm font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                                    {book.title}
                                </h3>
                                <div className="flex justify-between items-center text-xs text-gray-400 mb-3">
                                    <span className="inline-flex items-center">
                                        <FaBookOpen className="mr-1" /> EdScience
                                    </span>
                                    <span className="inline-flex items-center">
                                        <FaEye className="mr-1" />{" "}
                                        {Math.floor(Math.random() * 1000) + 500}
                                    </span>
                                </div>

                                {/* Download button */}
                                <button
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xs font-medium rounded-lg py-2 transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-purple-500/20">
                                    <span>Télécharger</span>
                                    <FaDownload />
                                </button>
                            </div>

                            {/* Level indicator */}
                            <div className="absolute bottom-4 right-4 z-20">
                                <span className="bg-gray-700/80 text-xs px-2 py-1 rounded-full">
                                    {book.level.toUpperCase()}
                                </span>
                            </div>
                        </div>

                        {/* Background glow effect */}
                        <div className={`absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl
                            blur-xl -z-10 transition-opacity duration-500 ${ hoveredBook===`${collection.id}-${book.id}`
                            ? "opacity-70" : "opacity-0" }`} />
                    </div>
                    ))}
                </div>
            </div>
            );
            })}
            <div className="inline-flex items-center p-4 mb-4 bg-blue-50 border border-blue-100 rounded-lg">
                {/* Simple SVG info icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-400 mr-3" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-blue-700">
                    Plus de livres seront ajoutes prochainement
                </span>
            </div>
        </div>

        <FooterSection />
    </div>
    );
    };

    export default BooksCollectionDisplay;