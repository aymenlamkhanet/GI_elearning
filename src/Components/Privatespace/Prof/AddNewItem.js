import React, { useState } from "react";
import axios from "axios";
import {
  BookOpen,
  ClipboardList,
  PlusCircle,
  Calendar,
  Check,
  Upload,
  X,
  FileSpreadsheet,
} from "lucide-react";

const AddNewItem = () => {
  const [selectedType, setSelectedType] = useState("cours");
  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    date: "",
    module: "",
    niveau: "",
    ratingAvg: 0,
    fichier: null,
    links: [],
    duree: "",
  });
  const [link, setLink] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, fichier: file });
  };

  const handleAddLink = () => {
    if (link && !formData.links.includes(link)) {
      setFormData({
        ...formData,
        links: [...formData.links, link],
      });
      setLink("");
    }
  };

  const handleRemoveLink = (linkToRemove) => {
    setFormData({
      ...formData,
      links: formData.links.filter((l) => l !== linkToRemove),
    });
  };

  // Get token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem("token");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowError(false);

    const formDataToSend = new FormData();
    // Append all fields
    formDataToSend.append("titre", formData.titre);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("date", formData.date + "T00:00:00");
    formDataToSend.append("module", formData.module);
    formDataToSend.append("niveau", formData.niveau);
    formDataToSend.append("ratingAvg", formData.ratingAvg);

    if (selectedType === "cours") {
      formDataToSend.append("duree", formData.duree);
      formDataToSend.append("links", JSON.stringify(formData.links));
    }

    if (formData.fichier) {
      formDataToSend.append("file", formData.fichier); // Use "file" if backend expects it
    }

    // DEBUG: Log FormData contents
    console.log("--- FormData Contents ---");
    for (let [key, value] of formDataToSend.entries()) {
      console.log(key, value);
    }

    try {
      const response = await axios.post(
        `http://localhost:8084/api/${selectedType}s/ajouter`,
        formDataToSend
      );
      setShowSuccess(true);
    } catch (error) {
      console.error("Backend error:", error.response?.data);
      setErrorMessage(error.response?.data?.message || "Request failed");
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-900/40 to-purple-900/40 p-8 backdrop-blur-sm border border-white/10 mb-8">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white/20 rounded-full"
              style={{
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.3,
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white mb-2">
            Ajouter un élément
          </h1>
          <p className="text-purple-300">
            Créez un nouveau contenu pour vos étudiants
          </p>
        </div>
      </div>

      {showSuccess && (
        <div className="mb-6 bg-green-900/30 border border-green-500/30 text-green-400 p-4 rounded-lg flex items-center animate-fade-in">
          <Check className="w-5 h-5 mr-2" />
          Votre élément a été créé avec succès!
        </div>
      )}

      {showError && (
        <div className="mb-6 bg-red-900/30 border border-red-500/30 text-red-400 p-4 rounded-lg flex items-center animate-fade-in">
          <X className="w-5 h-5 mr-2" />
          {errorMessage}
        </div>
      )}

      <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Type d'élément
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => setSelectedType("cours")}
              className={`p-4 rounded-lg flex flex-col items-center hover:bg-purple-800/20 transition-all ${
                selectedType === "cours"
                  ? "bg-purple-900/30 border border-purple-500/50 text-purple-300"
                  : "bg-gray-700/20 border border-gray-700 text-gray-300"
              }`}
            >
              <BookOpen className="w-8 h-8 mb-2" />
              <span>Cours</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedType("exercice")}
              className={`p-4 rounded-lg flex flex-col items-center hover:bg-blue-800/20 transition-all ${
                selectedType === "exercice"
                  ? "bg-blue-900/30 border border-blue-500/50 text-blue-300"
                  : "bg-gray-700/20 border border-gray-700 text-gray-300"
              }`}
            >
              <FileSpreadsheet className="w-8 h-8 mb-2" />
              <span>Exercice</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedType("examen")}
              className={`p-4 rounded-lg flex flex-col items-center hover:bg-green-800/20 transition-all ${
                selectedType === "examen"
                  ? "bg-green-900/30 border border-green-500/50 text-green-300"
                  : "bg-gray-700/20 border border-gray-700 text-gray-300"
              }`}
            >
              <ClipboardList className="w-8 h-8 mb-2" />
              <span>Examen</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label
                className="block text-sm text-gray-400 mb-1"
                htmlFor="title"
              >
                Titre*
              </label>
              <input
                id="titre"
                name="titre"
                value={formData.titre}
                onChange={handleInputChange}
                type="text"
                required
                className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all"
                placeholder={`Titre du ${selectedType}`}
              />
            </div>

            <div>
              <label
                className="block text-sm text-gray-400 mb-1"
                htmlFor="module"
              >
                Module*
              </label>
              <input
                id="module"
                name="module"
                value={formData.module}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all"
                placeholder="Entrez le module"
                required
              />
            </div>

            <div>
              <label
                className="block text-sm text-gray-400 mb-1"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all"
                placeholder="Description du contenu"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm text-gray-400 mb-1"
                  htmlFor="date"
                >
                  Date*
                </label>
                <div className="relative">
                  <Calendar
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    id="date"
                    name="date"
                    type="date"
                    required
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all"
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                className="block text-sm text-gray-400 mb-1"
                htmlFor="niveau"
              >
                Niveau*
              </label>
              <select
                id="niveau"
                required
                name="niveau"
                value={formData.niveau}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all"
              >
                <option value="">Sélectionnez un niveau</option>
                <option value="GI1">GI1</option>
                <option value="GI2">GI2</option>
                <option value="GI3">GI3</option>
              </select>
            </div>

            <div>
              <label
                className="block text-sm text-gray-400 mb-1"
                htmlFor="ratingAvg"
              >
                Note moyenne
              </label>
              <input
                type="number"
                id="ratingAvg"
                name="ratingAvg"
                value={formData.ratingAvg}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all"
                min="0"
                max="5"
                step="0.1"
              />
            </div>

            {selectedType === "cours" && (
              <div>
                <label
                  className="block text-sm text-gray-400 mb-1"
                  htmlFor="duree"
                >
                  Durée*
                </label>
                <input
                  id="duree"
                  name="duree"
                  value={formData.duree}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all"
                  placeholder="Durée du cours (ex: 1h30)"
                />
              </div>
            )}

            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Fichier
              </label>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-purple-400 transition-colors cursor-pointer">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="fileInput"
                />
                <label htmlFor="fileInput" className="cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p>Glissez-déposez un fichier ici ou</p>
                </label>
                {formData.fichier && (
                  <p className="mt-2 text-sm text-gray-300">
                    Fichier sélectionné: {formData.fichier.name}
                  </p>
                )}
              </div>
            </div>

            {selectedType === "cours" && (
              <div>
                <label
                  className="block text-sm text-gray-400 mb-1"
                  htmlFor="link"
                >
                  Ajouter un lien
                </label>
                <div className="flex gap-2">
                  <input
                    id="link"
                    type="url"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="flex-1 px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg"
                    placeholder="https://exemple.com"
                  />
                  <button
                    type="button"
                    onClick={handleAddLink}
                    className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                  >
                    Ajouter
                  </button>
                </div>
                <ul className="mt-2 text-sm text-gray-300 space-y-1">
                  {formData.links.map((l, idx) => (
                    <li
                      key={idx}
                      className="flex items-center justify-between bg-gray-700/40 p-2 rounded-md"
                    >
                      <span className="break-all">{l}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveLink(l)}
                        className="text-red-400 hover:text-red-600"
                      >
                        <X size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="px-6 py-2 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-colors disabled:opacity-50"
              >
                <div className="flex items-center">
                  {isSubmitting ? (
                    "Création en cours..."
                  ) : (
                    <>
                      <PlusCircle className="w-5 h-5 mr-2" />
                      Créer
                    </>
                  )}
                </div>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewItem;
