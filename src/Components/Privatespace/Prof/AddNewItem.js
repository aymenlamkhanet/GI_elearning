import React, { useState } from "react";
import {
  BookOpen,
  FileText,
  ClipboardList,
  PlusCircle,
  Calendar,
  Check,
  Upload,
  X,
  Film,
  Link,
  FileSpreadsheet,
} from "lucide-react";

const AddNewItem = () => {
  const [selectedType, setSelectedType] = useState("cours");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    class: "",
    files: [],
    links: [],
  });
  const [link, setLink] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { type: selectedType, ...formData });

    // Show success message
    setShowSuccess(true);

    // Reset form after short delay
    setTimeout(() => {
      setFormData({
        title: "",
        description: "",
        date: "",
        class: "",
        files: [],
        links: [],
      });
      setShowSuccess(false);
    }, 3000);
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
                id="title"
                name="title"
                type="text"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all"
                placeholder={`Titre du ${selectedType}`}
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

              <div>
                <label
                  className="block text-sm text-gray-400 mb-1"
                  htmlFor="class"
                >
                  Classe*
                </label>
                <select
                  id="class"
                  name="class"
                  required
                  value={formData.class}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all"
                >
                  <option value="">Sélectionnez une classe</option>
                  <option value="biologie-avancee">
                    Biologie Avancée - Terminale S
                  </option>
                  <option value="sciences-vie">
                    Sciences de la Vie - Seconde
                  </option>
                  <option value="ecologie">
                    Écologie et Environnement - Première ES
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Fichiers
              </label>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-purple-400 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p>Glissez-déposez des fichiers ici ou</p>
                <button
                  type="button"
                  className="mt-2 px-4 py-2 bg-purple-600/30 text-purple-300 rounded-lg hover:bg-purple-600/40 transition-colors"
                >
                  Parcourir
                </button>
                <input type="file" className="hidden" />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Liens</label>
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <Link
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="url"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all"
                    placeholder="Ajouter un lien (vidéo, ressource, etc.)"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddLink}
                  className="px-4 py-2 bg-purple-600/30 text-purple-300 rounded-lg hover:bg-purple-600/40 transition-colors"
                >
                  <PlusCircle className="w-5 h-5" />
                </button>
              </div>

              {formData.links.length > 0 && (
                <div className="mt-2 space-y-2">
                  {formData.links.map((url, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-700/30 rounded-lg"
                    >
                      <div className="flex items-center">
                        <Film className="w-4 h-4 mr-2 text-purple-400" />
                        <span className="text-sm truncate">{url}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveLink(url)}
                        className="text-gray-400 hover:text-red-400"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="px-6 py-2 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-colors"
              >
                <div className="flex items-center">
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Créer
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
