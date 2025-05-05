import React, { useState } from "react";
import { XIcon, Save } from "lucide-react";
import axios from 'axios';

const AjoutProfesseur = ({ isOpen, onClose, onProfesseurAdded }) => {
  const initialFormState = {
    nom: "",
    prenom: "",
    email: "",
    phone: "",
    module: "", // Added module field
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    return (
      formData.nom &&
      formData.prenom &&
      /^\S+@\S+\.\S+$/.test(formData.email) &&
      /^\+?[0-9\s-]{6,}$/.test(formData.phone) &&
      formData.module // Added module validation
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (!validateForm()) {
      setShowErrorAlert(true);
      setTimeout(() => setShowErrorAlert(false), 2000);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "http://localhost:8084/api/professeur/addProfesseur",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setShowSuccessAlert(true);
      setTimeout(() => {
        onClose();
        onProfesseurAdded?.();
        setFormData(initialFormState);
        setShowSuccessAlert(false);
      }, 2000);
    } catch (error) {
      console.error("Submission Error:", {
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-[#111827] text-white rounded-xl shadow-lg max-w-[600px] w-full mx-4 border border-white/10">
        <div className="p-6">
          {showSuccessAlert && (
            <div className="mb-4 p-3 bg-green-500/90 text-white rounded-md">
              Professeur ajouté avec succès !
            </div>
          )}
          {showErrorAlert && (
            <div className="mb-4 p-3 bg-red-500/90 text-white rounded-md">
              Veuillez remplir tous les champs correctement
            </div>
          )}

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              Ajouter un Professeur
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700/30 transition-colors"
            >
              <XIcon size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label htmlFor="nom" className="block text-white">
                  Nom
                </label>
                <input
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  type="text"
                  className="w-full px-4 py-2 rounded bg-[#1f2937] border border-gray-700 text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="prenom" className="block text-white">
                  Prénom
                </label>
                <input
                  id="prenom"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  type="text"
                  className="w-full px-4 py-2 rounded bg-[#1f2937] border border-gray-700 text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-white">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  className="w-full px-4 py-2 rounded bg-[#1f2937] border border-gray-700 text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="block text-white">
                  Téléphone
                </label>
                <input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="tel"
                  className="w-full px-4 py-2 rounded bg-[#1f2937] border border-gray-700 text-white"
                  required
                />
              </div>

              {/* Added module field */}
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
                  className="w-full px-4 py-2 rounded bg-[#1f2937] border border-gray-700 text-white"
                  required
                />
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
                <Save className="mr-2" size={18} />
                {isSubmitting ? "Enregistrement..." : "Enregistrer"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AjoutProfesseur;
