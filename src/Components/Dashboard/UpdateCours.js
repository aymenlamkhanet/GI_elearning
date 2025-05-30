import React, { useState, useEffect } from "react";
import { Save, X, Upload } from "lucide-react";
import axios from "axios";

const UpdateCours = ({ isOpen, onClose, coursId, onCourseUpdated }) => {
  const initialFormState = {
    titre: "",
    module: "",
    description: "",
    niveau: "",
    duree: "",
    liens: "",
    fichier: null,
    ratingAvg: 0,
    date: new Date().toISOString().slice(0, 16),
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [fileName, setFileName] = useState("Aucun fichier sélectionné");
  const [fileChanged, setFileChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && coursId) {
      console.log("Fetching data for cours ID:", coursId);
      fetchCoursData();
    }
  }, [isOpen, coursId]);

  const fetchCoursData = async () => {
    setIsLoading(true);
    try {
      console.log("Starting to fetch cours data...");
      const [coursRes, fileVerifyRes] = await Promise.all([
        axios.get(`http://localhost:8084/api/cours/${coursId}`),
        axios.get(`http://localhost:8084/api/cours/fichier/verify/${coursId}`),
      ]);

      // Handle cours data
      const coursData = coursRes.data;
      console.log("Fetched cours data:", coursData);

      setFormData({
        titre: coursData.titre || "",
        module: coursData.module || "",
        description: coursData.description || "",
        niveau: coursData.niveau || "Gi1",
        duree: coursData.duree || "",
        liens: coursData.liens || "",
        ratingAvg: coursData.ratingAvg || 0,
        date: coursData.date
          ? new Date(coursData.date).toISOString().slice(0, 16)
          : new Date().toISOString().slice(0, 16),
        fichier: null,
      });

      // Handle file verification
      setFileName(
        fileVerifyRes.status === 200 ? "Fichier PDF existant" : "Aucun fichier"
      );
      setFileChanged(false);
    } catch (error) {
      console.error("Fetch Error:", error);
      console.error("Fetch Error Details:", {
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
        data: error.response?.data,
      });
      alert(
        `Error fetching data: ${error.response?.data?.message || error.message}`
      );
      setShowErrorAlert(true);
      setTimeout(() => setShowErrorAlert(false), 2000);
    } finally {
      setIsLoading(false);
    }
  };

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

    try {
      const formDataToSend = new FormData();
      // Append all form fields
      formDataToSend.append("titre", formData.titre);
      formDataToSend.append("module", formData.module);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("niveau", formData.niveau);
      formDataToSend.append("duree", formData.duree);
      formDataToSend.append("liens", formData.liens);
      formDataToSend.append("ratingAvg", formData.ratingAvg);
      formDataToSend.append("date", formData.date);

      // Only append file if changed
      if (formData.fichier && fileChanged) {
        formDataToSend.append("file", formData.fichier);
      }

      console.log(
        "Sending update request to:",
        `http://localhost:8084/api/cours/update/${coursId}`
      );
      console.log("Form data being sent:", Object.fromEntries(formDataToSend));

      const response = await axios.put(
        `http://localhost:8084/api/cours/update/${coursId}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log(`Upload Progress: ${percentCompleted}%`);
          },
        }
      );

      console.log("Update response:", response.data);
      setShowSuccessAlert(true);
      setTimeout(() => {
        onClose();
        onCourseUpdated?.();
        setShowSuccessAlert(false);
      }, 2000);
    } catch (error) {
      console.error("Update Error:", error);
      console.error("Update Error Details:", {
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
        data: error.response?.data,
      });
      alert(`Error: ${error.response?.data?.message || error.message}`);
      setShowErrorAlert(true);
      setTimeout(() => setShowErrorAlert(false), 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-[#111827] text-white rounded-xl shadow-lg max-w-[600px] w-full mx-4 border border-white/10">
        <div className="p-6">
          {showSuccessAlert && (
            <div className="mb-4 p-3 bg-green-500/90 text-white rounded-md">
              Cours mis à jour avec succès !
            </div>
          )}
          {showErrorAlert && (
            <div className="mb-4 p-3 bg-red-500/90 text-white rounded-md">
              Erreur lors de la mise à jour du cours
            </div>
          )}

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Modifier le Cours</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700/30 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
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
                    placeholder="Titre du cours"
                    className="w-full px-4 py-2 rounded bg-[#1f2937] border border-gray-700 text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="module" className="block text-white">
                    Module
                  </label>
                  <input
                    id="module"
                    name="module"
                    value={formData.module}
                    onChange={handleChange}
                    type="text"
                    placeholder="Nom du module"
                    className="w-full px-4 py-2 rounded bg-[#1f2937] border border-gray-700 text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="date" className="block text-white">
                    Date
                  </label>
                  <input
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    type="datetime-local"
                    className="w-full px-4 py-2 rounded bg-[#1f2937] border border-gray-700 text-white"
                    required
                  />
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
                    placeholder="Description du cours"
                    className="w-full px-4 py-2 rounded bg-[#1f2937] border border-gray-700 text-white min-h-[100px]"
                    required
                  ></textarea>
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
                  <label htmlFor="duree" className="block text-white">
                    Durée (minutes)
                  </label>
                  <input
                    id="duree"
                    name="duree"
                    value={formData.duree}
                    onChange={handleChange}
                    type="number"
                    min="0"
                    placeholder="Durée en minutes"
                    className="w-full px-4 py-2 rounded bg-[#1f2937] border border-gray-700 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="liens" className="block text-white">
                    Liens
                  </label>
                  <input
                    id="liens"
                    name="liens"
                    value={formData.liens}
                    onChange={handleChange}
                    type="url"
                    placeholder="Lien externe (optionnel)"
                    className="w-full px-4 py-2 rounded bg-[#1f2937] border border-gray-700 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="ratingAvg" className="block text-white">
                    Rating
                  </label>
                  <input
                    id="ratingAvg"
                    name="ratingAvg"
                    value={formData.ratingAvg}
                    onChange={handleChange}
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    className="w-full px-4 py-2 rounded bg-[#1f2937] border border-gray-700 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-white">Fichier PDF</label>
                <div className="flex items-center gap-2">
                  <label className="px-4 py-2 rounded bg-[#1f2937] border border-gray-700 text-white flex items-center cursor-pointer">
                    <Upload size={16} className="mr-2" />
                    {fileChanged ? "Remplacer" : "Télécharger"} un PDF
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  <span className="text-sm text-gray-400">{fileName}</span>
                </div>
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
                  className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50 flex items-center"
                >
                  <Save size={18} className="mr-1" />
                  {isSubmitting ? "Enregistrement..." : "Enregistrer"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateCours;
