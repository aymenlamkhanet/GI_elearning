import React, { useState, useEffect } from "react";
import axios from "axios";
import { X, Upload, Download, Save } from "lucide-react";

const UpdateExercise = ({ isOpen, onClose, exerciseId, onExerciseUpdated }) => {
  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    module: "",
    niveau: "",
    ratingAvg: 0,
    date: "",
  });
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileChanged, setFileChanged] = useState(false);
  const [fileName, setFileName] = useState("Aucun fichier sélectionné");
  const [existingFileId, setExistingFileId] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  useEffect(() => {
    if (isOpen && exerciseId) {
      fetchExercise();
    }
  }, [isOpen, exerciseId]);

  const fetchExercise = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8084/api/exercices/${exerciseId}`
      );
      const data = response.data;

      setFormData({
        titre: data.titre || "",
        description: data.description || "",
        module: data.module || "",
        niveau: data.niveau || "",
        ratingAvg: data.ratingAvg || 0,
        date: data.date ? new Date(data.date).toISOString().slice(0, 16) : "",
      });

      if (data.fichierId) {
        setFileName("Fichier existant");
        setExistingFileId(data.fichierId);
      } else {
        setFileName("Aucun fichier sélectionné");
        setExistingFileId(null);
      }

      // Reset file changed flag
      setFileChanged(false);
    } catch (error) {
      console.error("Fetch Error:", {
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
        data: error.response?.data,
      });
      setShowErrorAlert(true);
      setTimeout(() => setShowErrorAlert(false), 2000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setFileChanged(true);
    }
  };

  const handleDownload = () => {
    if (existingFileId) {
      const pdfUrl = `http://localhost:8084/api/exercices/fichier/${existingFileId}`;
      const a = document.createElement("a");
      a.href = pdfUrl;
      a.download = `${formData.titre || "exercice"}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    if (fileChanged && file) {
      formDataToSend.append("file", file);
    }

    try {
      await axios.put(
        `http://localhost:8084/api/exercices/update/${exerciseId}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setShowSuccessAlert(true);
      setTimeout(() => {
        onExerciseUpdated();
        onClose();
        setShowSuccessAlert(false);
      }, 2000);
    } catch (error) {
      console.error("Update Error:", {
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
        data: error.response?.data,
      });
      setShowErrorAlert(true);
      setTimeout(() => setShowErrorAlert(false), 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl border border-gray-700">
        <div className="flex justify-between items-center border-b border-gray-700 p-4">
          <h2 className="text-xl font-semibold text-white">
            Modifier l'Exercice
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {showSuccessAlert && (
          <div className="m-4 p-3 bg-green-500/90 text-white rounded-md">
            Exercice mis à jour avec succès !
          </div>
        )}
        {showErrorAlert && (
          <div className="m-4 p-3 bg-red-500/90 text-white rounded-md">
            Erreur lors de la mise à jour de l'exercice
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Titre*
              </label>
              <input
                name="titre"
                value={formData.titre}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-1 focus:ring-purple-400 focus:border-purple-400"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Module*
              </label>
              <input
                name="module"
                value={formData.module}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-1 focus:ring-purple-400 focus:border-purple-400"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Niveau*
              </label>
              <select
                name="niveau"
                value={formData.niveau}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-1 focus:ring-purple-400 focus:border-purple-400"
                required
              >
                <option value="Gi1">Gi1</option>
                <option value="Gi2">Gi2</option>
                <option value="Gi3">Gi3</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Rating
              </label>
              <input
                type="number"
                name="ratingAvg"
                value={formData.ratingAvg}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-1 focus:ring-purple-400 focus:border-purple-400"
                min="0"
                max="5"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Date*
              </label>
              <input
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-1 focus:ring-purple-400 focus:border-purple-400"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-1 focus:ring-purple-400 focus:border-purple-400 min-h-[100px]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Fichier PDF
              </label>
              <div className="flex items-center gap-3">
                <label className="flex items-center px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors">
                  <Upload className="w-4 h-4 mr-2 text-purple-400" />
                  <span className="text-white">
                    {fileChanged ? "Remplacer" : "Changer"} le fichier
                  </span>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                <span className="text-sm text-gray-300">{fileName}</span>
                {existingFileId && (
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="flex items-center px-3 py-1 text-purple-400 hover:text-purple-300"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Télécharger
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Enregistrement...
                </>
              ) : (
                <>
                  <Save size={18} className="mr-1" />
                  Enregistrer
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateExercise;
