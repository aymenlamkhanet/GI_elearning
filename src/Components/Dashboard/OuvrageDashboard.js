import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import _ from "lodash";
import { Loader, AlertCircle } from "lucide-react";
import axios from "axios";

export default function OuvrageDashboard() {
  const [books, setBooks] = useState([]);
  const [modules, setModules] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    module: "all",
    niveau: "all",
    rating: "all",
    domaine: "all",
  });
  const [chartType, setChartType] = useState("module");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [ouvragesRes, modulesRes] = await Promise.all([
          axios.get("http://localhost:8084/api/ouvrages"),
          axios.get("http://localhost:8084/api/ouvrages/modules/distinct"),
        ]);

        const normalizedData = ouvragesRes.data.map((item) => ({
          id: item._id,
          titre: item.titre,
          description: item.description,
          niveau: item.niveau,
          module: item.module,
          domaine: item.domaine,
          datePublication: item.datePublication,
          nbrPages: item.nbrPages,
          rating: item.ratingAvg,
          version: item.version,
          date: new Date(item.date),
        }));

        setBooks(normalizedData);
        setModules(["all", ...modulesRes.data]);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch books data");
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Apply filters and prepare data for the selected chart type
  useEffect(() => {
    if (books.length === 0) return;

    // Apply filters
    let filtered = [...books];

    if (filters.module !== "all") {
      filtered = filtered.filter((book) => book.module === filters.module);
    }

    if (filters.niveau !== "all") {
      filtered = filtered.filter((book) => book.niveau === filters.niveau);
    }

    if (filters.rating !== "all") {
      filtered = filtered.filter(
        (book) => Math.floor(book.rating / 100) === parseInt(filters.rating)
      );
    }

    if (filters.domaine !== "all") {
      filtered = filtered.filter((book) => book.domaine === filters.domaine);
    }

    // Group and count based on the selected chart type
    let chartData = [];

    if (chartType === "module") {
      const grouped = _.groupBy(filtered, "module");
      chartData = Object.keys(grouped).map((key) => ({
        name: key,
        count: grouped[key].length,
      }));
    } else if (chartType === "niveau") {
      const grouped = _.groupBy(filtered, "niveau");
      chartData = Object.keys(grouped).map((key) => ({
        name: key,
        count: grouped[key].length,
      }));
    } else if (chartType === "rating") {
      const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

      filtered.forEach((book) => {
        const rating = Math.floor(book.rating / 100);
        if (rating >= 1 && rating <= 5) {
          ratingCounts[rating]++;
        }
      });

      chartData = Object.keys(ratingCounts).map((rating) => ({
        name: `${rating} Star${rating !== "1" ? "s" : ""}`,
        count: ratingCounts[rating],
      }));
    } else if (chartType === "domaine") {
      const grouped = _.groupBy(filtered, "domaine");
      chartData = Object.keys(grouped).map((key) => ({
        name: key,
        count: grouped[key].length,
      }));
    } else if (chartType === "publicationYear") {
      const grouped = _.groupBy(filtered, "datePublication");
      chartData = Object.keys(grouped)
        .sort()
        .map((key) => ({
          name: key,
          count: grouped[key].length,
        }));
    }

    setFilteredData(chartData);
  }, [books, filters, chartType]);

  // Extract unique values for dropdowns
  const niveaux =
    books.length > 0
      ? ["all", ...new Set(books.map((book) => book.niveau))]
      : ["all"];
  const domaines =
    books.length > 0
      ? ["all", ...new Set(books.map((book) => book.domaine))]
      : ["all"];
  const ratings = ["all", 1, 2, 3, 4, 5];

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="w-8 h-8 animate-spin text-blue-400" />
        <span className="ml-2 text-gray-300">Loading books data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/20 border border-red-500/30 text-red-300 p-4 rounded-lg flex items-center">
        <AlertCircle className="w-5 h-5 mr-2" />
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 bg-gray-900 text-gray-100 rounded-xl border border-white/10">
      <h1 className="text-2xl font-bold">Books Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Filter controls */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Module
          </label>
          <select
            className="w-full rounded-md bg-gray-800/50 border border-white/10 p-2 text-gray-200"
            value={filters.module}
            onChange={(e) => handleFilterChange("module", e.target.value)}
          >
            {modules.map((module) => (
              <option key={module} value={module} className="bg-gray-800">
                {module === "all" ? "All Modules" : module}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Niveau
          </label>
          <select
            className="w-full rounded-md bg-gray-800/50 border border-white/10 p-2 text-gray-200"
            value={filters.niveau}
            onChange={(e) => handleFilterChange("niveau", e.target.value)}
          >
            {niveaux.map((niveau) => (
              <option key={niveau} value={niveau} className="bg-gray-800">
                {niveau === "all" ? "All Levels" : niveau}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Rating
          </label>
          <select
            className="w-full rounded-md bg-gray-800/50 border border-white/10 p-2 text-gray-200"
            value={filters.rating}
            onChange={(e) => handleFilterChange("rating", e.target.value)}
          >
            {ratings.map((rating) => (
              <option key={rating} value={rating} className="bg-gray-800">
                {rating === "all"
                  ? "All Ratings"
                  : `${rating} Star${rating !== 1 ? "s" : ""}`}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Domain
          </label>
          <select
            className="w-full rounded-md bg-gray-800/50 border border-white/10 p-2 text-gray-200"
            value={filters.domaine}
            onChange={(e) => handleFilterChange("domaine", e.target.value)}
          >
            {domaines.map((domaine) => (
              <option key={domaine} value={domaine} className="bg-gray-800">
                {domaine === "all" ? "All Domains" : domaine}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Group By
          </label>
          <select
            className="w-full rounded-md bg-gray-800/50 border border-white/10 p-2 text-gray-200"
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
          >
            <option value="module" className="bg-gray-800">
              Module
            </option>
            <option value="niveau" className="bg-gray-800">
              Level (Niveau)
            </option>
            <option value="rating" className="bg-gray-800">
              Rating
            </option>
            <option value="domaine" className="bg-gray-800">
              Domain
            </option>
            <option value="publicationYear" className="bg-gray-800">
              Publication Year
            </option>
          </select>
        </div>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800/50 p-4 rounded-lg border border-white/10 text-center">
          <h3 className="text-lg font-medium text-gray-400">Total Books</h3>
          <p className="text-2xl font-bold text-white">{books.length}</p>
        </div>

        <div className="bg-gray-800/50 p-4 rounded-lg border border-white/10 text-center">
          <h3 className="text-lg font-medium text-gray-400">Average Rating</h3>
          <p className="text-2xl font-bold text-white">
            {books.length > 0
              ? (
                  books.reduce(
                    (sum, book) => sum + Math.floor(book.rating / 100),
                    0
                  ) / books.length
                ).toFixed(1)
              : "N/A"}
          </p>
        </div>

        <div className="bg-gray-800/50 p-4 rounded-lg border border-white/10 text-center">
          <h3 className="text-lg font-medium text-gray-400">Avg. Pages</h3>
          <p className="text-2xl font-bold text-white">
            {books.length > 0
              ? Math.round(
                  books.reduce((sum, book) => sum + book.nbrPages, 0) /
                    books.length
                )
              : "N/A"}
          </p>
        </div>

        <div className="bg-gray-800/50 p-4 rounded-lg border border-white/10 text-center">
          <h3 className="text-lg font-medium text-gray-400">Filtered Count</h3>
          <p className="text-2xl font-bold text-white">
            {filteredData.reduce((sum, item) => sum + item.count, 0)}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80 w-full bg-gray-800/50 p-4 rounded-lg border border-white/10">
        {filteredData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={filteredData}
              margin={{ top: 5, right: 30, left: 20, bottom: 50 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
              <XAxis
                dataKey="name"
                angle={chartType === "publicationYear" ? 0 : -45}
                textAnchor={chartType === "publicationYear" ? "middle" : "end"}
                height={70}
                interval={0}
                stroke="#9ca3af"
              />
              <YAxis allowDecimals={false} stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  borderColor: "#4b5563",
                }}
                itemStyle={{ color: "#f3f4f6" }}
              />
              <Legend wrapperStyle={{ color: "#f3f4f6" }} />
              <Bar
                dataKey="count"
                name="Number of Books"
                fill="#8884d8"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400">
              No data available with current filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
