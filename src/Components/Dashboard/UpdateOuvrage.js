import React, { useState, useEffect } from "react";
import { Save, X, Upload } from "lucide-react";

const UpdateOuvrage = ({
  isOpen,
  onClose,
  ouvrageId,
  modules,
  onOuvrageUpdated,
}) => {
  const [formData, setFormData] = useState({
    titre: "",
    module: "",
    description: "",
    niveau: "Gi1",
    datePublication: "",
    nbrPages: "",
    version: 1,
    ratingAvg: 0,
    reviews: "",
    domaine: "",
    fichier: null,
    date: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [fileName, setFileName] = useState("Aucun fichier sélectionné");
  const [fileChanged, setFileChanged] = useState(false);

  useEffect(() => {
    const fetchOuvrageData = async () => {
      if (!isOpen || !ouvrageId) return;

      try {
        const response = await fetch(
          `http://localhost:8084/api/ouvrages/${ouvrageId}`
        );
        if (!response.ok) throw new Error("Failed to fetch ouvrage");

        const ouvrageData = await response.json();

        setFormData({
          titre: ouvrageData.titre || "",
          module: ouvrageData.module || "",
          description: ouvrageData.description || "",
          niveau: ouvrageData.niveau || "Gi1",
          datePublication: ouvrageData.datePublication?.slice(0, 10) || "",
          nbrPages: ouvrageData.nbrPages || "",
          version: ouvrageData.version || 1,
          ratingAvg: ouvrageData.ratingAvg || 0,
          reviews: ouvrageData.reviews || "",
          domaine: ouvrageData.domaine || "",
          fichier: null,
          date: ouvrageData.date?.slice(0, 16) || "",
        });

        setFileName(
          ouvrageData.fichierId ? "Fichier PDF existant" : "Aucun fichier"
        );
      } catch (error) {
        console.error("Fetch error:", error);
        setShowErrorAlert(true);
        setTimeout(() => setShowErrorAlert(false), 2000);
      }
    };

    fetchOuvrageData();
  }, [isOpen, ouvrageId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, fichier: file }));
      setFileName(file.name);
      setFileChanged(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined && key !== "fichier") {
        formDataToSend.append(key, value);
      }
    });

    if (fileChanged && formData.fichier) {
      formDataToSend.append("file", formData.fichier);
    }

    try {
      const response = await fetch(
        `http://localhost:8084/api/ouvrages/${ouvrageId}`,
        {
          method: "PUT",
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update ouvrage");
      }

      setShowSuccessAlert(true);
      setTimeout(() => {
        onClose();
        onOuvrageUpdated?.();
        setShowSuccessAlert(false);
      }, 2000);
    } catch (error) {
      console.error("Update error:", error.message);
      setShowErrorAlert(true);
      setTimeout(() => setShowErrorAlert(false), 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-[#111827] text-white rounded-xl shadow-lg max-w-4xl w-full mx-4 border border-white/10">
        <div className="p-4">
          {showSuccessAlert && (
            <div className="mb-4 p-3 bg-green-500/90 text-white rounded-md">
              Ouvrage mis à jour avec succès !
            </div>
          )}
          {showErrorAlert && (
            <div className="mb-4 p-3 bg-red-500/90 text-white rounded-md">
              Erreur lors de la mise à jour de l'ouvrage
            </div>
          )}

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">
              Modifier l'Ouvrage
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700/30 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label htmlFor="titre" className="block text-white">
                  Titre
                </label>
                <input
                  id="titre"
                  name="titre"
                  value={formData.titre}
                  onChange={handleChange}
                  type="text"
                  required
                  className="w-full px-4 py-2 rounded bg-[#1f2937] border border-gray-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="module" className="block text-white">
                  Module
                </label>
                <select
                  id="module"
                  name="module"
                  value={formData.module}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-[#1f2937] border border-gray-700 text-white"
                  required
                >
                  <option value="">Sélectionner un module</option>
                  {modules.map((module) => (
                    <option key={module} value={module}>
                      {module}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="domaine" className="block text-white">
                  Domaine
                </label>
                <input
                  id="domaine"
                  name="domaine"
                  value={formData.domaine}
                  onChange={handleChange}
                  type="text"
                  required
                  className="w-full px-4 py-2 rounded bg-[#1f2937] border border-gray-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="niveau" className="block text-white">
                  Niveau
                </label>
                <select
                  id="niveau"
                  name="niveau"
                  value={formData.niveau}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-[#1f2937] border border-gray-700 text-white"
                  required
                >
                  <option value="Gi1">Gi1</option>
                  <option value="Gi2">Gi2</option>
                  <option value="Gi3">Gi3</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="datePublication" className="block text-white">
                  Date de Publication
                </label>
                <input
                  id="datePublication"
                  name="datePublication"
                  type="date"
                  value={formData.datePublication}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-[#1f2937] border border-gray-700 text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="nbrPages" className="block text-white">
                  Nombre de Pages
                </label>
                <input
                  id="nbrPages"
                  name="nbrPages"
                  type="number"
                  value={formData.nbrPages}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-[#1f2937] border border-gray-700 text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="version" className="block text-white">
                  Version
                </label>
                <input
                  id="version"
                  name="version"
                  type="text"
                  value={formData.version}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-[#1f2937] border border-gray-700 text-white"
                  required
                />
              </div>

              <div className="space-y-2 col-span-2">
                <label className="block text-white">Fichier PDF</label>
                <div className="flex items-center gap-2">
                  <label className="px-4 py-2 rounded bg-[#1f2937] border border-gray-700 text-white flex items-center cursor-pointer">
                    <Upload size={16} className="mr-2" />
                    {fileChanged ? "Nouveau fichier sélectionné" : fileName}
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
                {fileChanged && (
                  <p className="text-sm text-green-400">
                    Un nouveau fichier sera uploadé
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="block text-white">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-[#1f2937] border border-gray-700 text-white min-h-[80px]"
                required
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded bg-transparent border border-gray-500 text-white hover:bg-gray-700"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50"
              >
                {isSubmitting ? "Enregistrement..." : "Enregistrer"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateOuvrage;
