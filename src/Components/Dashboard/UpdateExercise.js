import React, { useState, useEffect } from "react";
import { X, Upload } from "lucide-react";

const UpdateExercise = ({ isOpen, onClose, exerciseId, onExerciseUpdated }) => {
  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    module: "",
    niveau: "Gi1",
    ratingAvg: 0,
    date: "",
  });
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileChanged, setFileChanged] = useState(false);
  const [fileName, setFileName] = useState("Aucun fichier sélectionné");

  useEffect(() => {
    if (isOpen && exerciseId) {
      fetchExercise();
    }
  }, [isOpen, exerciseId]);

  const fetchExercise = async () => {
    try {
      const response = await fetch(
        `http://localhost:8084/api/exercices/${exerciseId}`
      );
      const data = await response.json();

      setFormData({
        titre: data.titre,
        description: data.description,
        module: data.module,
        niveau: data.niveau,
        ratingAvg: data.ratingAvg,
        date: data.date ? new Date(data.date).toISOString().slice(0, 16) : "",
      });

      if (data.fichierId) {
        setFileName("Fichier existant");
      }
    } catch (error) {
      console.error("Error fetching exercise:", error);
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
      const response = await fetch(
        `http://localhost:8084/api/exercices/${exerciseId}`,
        {
          method: "PUT",
          body: formDataToSend,
        }
      );

      if (response.ok) {
        onExerciseUpdated();
        onClose();
      }
    } catch (error) {
      console.error("Error updating exercise:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-semibold">Modifier l'Exercice</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Titre*</label>
              <input
                name="titre"
                value={formData.titre}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block mb-1">Module*</label>
              <input
                name="module"
                value={formData.module}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block mb-1">Niveau*</label>
              <select
                name="niveau"
                value={formData.niveau}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="Gi1">Gi1</option>
                <option value="Gi2">Gi2</option>
                <option value="Gi3">Gi3</option>
              </select>
            </div>

            <div>
              <label className="block mb-1">Rating</label>
              <input
                type="number"
                name="ratingAvg"
                value={formData.ratingAvg}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                min="0"
                max="5"
              />
            </div>

            <div>
              <label className="block mb-1">Date*</label>
              <input
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border rounded min-h-[100px]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-1">Fichier PDF</label>
              <div className="flex items-center gap-2">
                <label className="flex items-center px-4 py-2 border rounded cursor-pointer">
                  <Upload className="mr-2" size={16} />
                  {fileChanged ? "Remplacer" : "Changer"} le fichier
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                <span className="text-sm text-gray-500">{fileName}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateExercise;
