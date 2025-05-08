import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Edit,
  Save,
  X,
  Camera,
  GraduationCap,
  BookOpen,
  Shield,
  Lock,
  LogOut,
  Key,
  Eye,
  EyeOff,
} from "lucide-react";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    nom: "",
    prenom: "",
    email: "",
    phone: "",
    module: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Get user info from localStorage
  const getUserFromLocalStorage = () => {
    const userString = localStorage.getItem("user");
    if (!userString) {
      return null;
    }
    return JSON.parse(userString);
  };

  useEffect(() => {
    const userInfo = getUserFromLocalStorage();
    if (!userInfo) {
      setError("Information utilisateur non trouvée");
      setLoading(false);
      return;
    }

    // Fetch the latest user data from the backend
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8084/api/professeur/${userInfo.id}`
        );
        setUserData(response.data);
        setEditedData({
          nom: response.data.nom,
          prenom: response.data.prenom,
          email: response.data.email,
          phone: response.data.phone,
          module: response.data.module,
        });
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const saveChanges = async () => {
    setIsSaving(true);
    try {
      const userInfo = getUserFromLocalStorage();
      if (!userInfo) {
        throw new Error("User information not found");
      }

      const response = await axios.put(
        `http://localhost:8084/api/professeur/${userInfo.id}`,
        editedData
      );

      setUserData(response.data);
      setIsEditing(false);
      setSuccessMessage("Profil mis à jour avec succès");

      // Update local storage with the new data
      const updatedUser = { ...userInfo, ...response.data };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const cancelEditing = () => {
    setEditedData({
      nom: userData.nom,
      prenom: userData.prenom,
      email: userData.email,
      phone: userData.phone,
      module: userData.module,
    });
    setIsEditing(false);
  };

  const handlePasswordUpdate = async () => {
    const { newPassword, confirmPassword } = passwordData;

    if (!newPassword || !confirmPassword) {
      setPasswordError("Veuillez remplir tous les champs");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas");
      return;
    }

    setIsSaving(true);
    try {
      const userInfo = getUserFromLocalStorage();
      if (!userInfo) {
        throw new Error("User information not found");
      }

      // In a real implementation, you would call your backend API to update the password
      // This is just a simulation
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccessMessage("Mot de passe mis à jour avec succès");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowPasswordChange(false);
    } catch (err) {
      setPasswordError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const resetPasswordForm = () => {
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setShowPasswordChange(false);
  };

  const getInitials = () => {
    if (!userData) return "";
    return `${userData.prenom?.charAt(0) || ""}${
      userData.nom?.charAt(0) || ""
    }`;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/register";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Chargement...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        Erreur: {error}
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Aucune donnée utilisateur trouvée
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-blue-900 rounded-2xl shadow-xl border border-white/10 p-8">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-gray-100 to-teal-100 flex items-center justify-center text-3xl font-bold text-teal-900">
              {getInitials()}
            </div>
            <button className="absolute bottom-0 right-0 p-1 bg-teal-600 rounded-full border-2 border-white">
              <Camera className="w-4 h-4 text-white" />
            </button>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">
              {isEditing ? (
                <input
                  type="text"
                  name="prenom"
                  value={editedData.prenom}
                  onChange={handleInputChange}
                  className="bg-transparent border-b-2 border-teal-400 mr-2"
                />
              ) : (
                userData.prenom
              )}
              {isEditing ? (
                <input
                  type="text"
                  name="nom"
                  value={editedData.nom}
                  onChange={handleInputChange}
                  className="bg-transparent border-b-2 border-teal-400 uppercase"
                />
              ) : (
                <span className="uppercase">{userData.nom}</span>
              )}
            </h1>
            <div className="mt-2 flex items-center space-x-3">
              {isEditing ? (
                <select
                  name="module"
                  value={editedData.module}
                  onChange={handleInputChange}
                  className="bg-gray-800 text-teal-300 px-3 py-1 rounded-lg"
                >
                  <option>Cybersecurity</option>
                  <option>Réseaux</option>
                  <option>Développement</option>
                  <option>Cloud Computing</option>
                </select>
              ) : (
                <>
                  <Shield className="w-5 h-5 text-teal-400" />
                  <span className="text-xl text-teal-300">
                    {userData.module}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`p-2 rounded-lg ${
            isEditing
              ? "bg-red-500/20 hover:bg-red-500/30 text-red-400"
              : "bg-teal-500/20 hover:bg-teal-500/30 text-teal-400"
          }`}
        >
          {isEditing ? <X className="w-6 h-6" /> : <Edit className="w-6 h-6" />}
        </button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          <div className="bg-gray-800/30 p-6 rounded-xl border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <User className="w-6 h-6 mr-2 text-teal-400" />
              Informations Personnelles
            </h2>
            <div className="space-y-4">
              <InfoField
                icon={<Mail />}
                label="Email"
                name="email"
                value={isEditing ? editedData.email : userData.email}
                editing={isEditing}
                onChange={handleInputChange}
                type="email"
              />
              <InfoField
                icon={<Phone />}
                label="Téléphone"
                name="phone"
                value={isEditing ? editedData.phone : userData.phone}
                editing={isEditing}
                onChange={handleInputChange}
                type="tel"
              />
              <InfoField
                icon={<Calendar />}
                label="Module"
                name="module"
                value={isEditing ? editedData.module : userData.module}
                editing={isEditing}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Security Section */}
          <div className="bg-gray-800/30 p-6 rounded-xl border border-white/10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <Lock className="w-6 h-6 mr-2 text-teal-400" />
                Sécurité
              </h2>
              <button
                onClick={() => setShowPasswordChange(!showPasswordChange)}
                className="text-sm text-teal-400 hover:text-teal-300 flex items-center"
              >
                <Key className="w-4 h-4 mr-1" />
                {showPasswordChange ? "Annuler" : "Changer mot de passe"}
              </button>
            </div>

            {showPasswordChange ? (
              <div className="space-y-4 border border-teal-500/20 rounded-lg p-4 bg-teal-900/10">
                {passwordError && (
                  <div className="text-red-400 text-sm">{passwordError}</div>
                )}

                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Nouveau mot de passe
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all pr-10"
                    />
                    <button
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-2"
                    >
                      {showNewPassword ? (
                        <EyeOff className="w-5 h-5 text-gray-400" />
                      ) : (
                        <Eye className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Confirmer le mot de passe
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all pr-10"
                    />
                    <button
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-2"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5 text-gray-400" />
                      ) : (
                        <Eye className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    onClick={resetPasswordForm}
                    className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-700 transition-all"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handlePasswordUpdate}
                    disabled={isSaving}
                    className="px-4 py-2 bg-teal-600/20 text-teal-400 rounded-lg hover:bg-teal-600/30 transition-all border border-teal-500/30 disabled:opacity-50"
                  >
                    {isSaving ? "Enregistrement..." : "Mettre à jour"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-700/20 rounded-lg">
                  <div className="flex items-center">
                    <Key className="w-5 h-5 mr-2 text-gray-400" />
                    <span>Dernier changement de mot de passe</span>
                  </div>
                  <span className="text-gray-400">15/02/2025</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="bg-gray-800/30 p-6 rounded-xl border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <GraduationCap className="w-6 h-6 mr-2 text-teal-400" />
              Information Professionnelle
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-700/20 rounded-lg">
                <span className="text-gray-400">Statut</span>
                <span className="text-teal-300">Professeur</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-700/20 rounded-lg">
                <span className="text-gray-400">Années d'expérience</span>
                <span className="text-teal-300">5 ans</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/30 p-6 rounded-xl border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <BookOpen className="w-6 h-6 mr-2 text-teal-400" />
              Cours Enseignés
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-2 bg-teal-900/20 rounded-lg text-sm text-teal-300 text-center">
                Sécurité Réseaux
              </div>
              <div className="p-2 bg-teal-900/20 rounded-lg text-sm text-teal-300 text-center">
                Cryptographie
              </div>
              <div className="p-2 bg-teal-900/20 rounded-lg text-sm text-teal-300 text-center">
                Ethical Hacking
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="bg-gray-800/30 p-6 rounded-xl border border-white/10">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center px-4 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-all backdrop-blur-sm border border-red-500/30"
            >
              <LogOut className="w-5 h-5 mr-2" /> Déconnexion
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      {isEditing && (
        <div className="mt-8 pt-6 border-t border-white/10 flex justify-end space-x-4">
          <button
            onClick={saveChanges}
            disabled={isSaving}
            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition flex items-center disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Save className="w-5 h-5 mr-2 animate-pulse" />
                Enregistrement...
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Sauvegarder les modifications
              </>
            )}
          </button>
          <button
            onClick={cancelEditing}
            className="px-6 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition"
          >
            Annuler
          </button>
        </div>
      )}

      {successMessage && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
          {successMessage}
          <button
            onClick={() => setSuccessMessage("")}
            className="ml-2 text-white hover:text-gray-200"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

// Reusable Info Field Component
const InfoField = ({
  icon,
  label,
  value,
  name,
  editing,
  onChange,
  type = "text",
  static: isStatic,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <span className="text-teal-400">{icon}</span>
        <span className="text-gray-400">{label}</span>
      </div>
      {editing && !isStatic ? (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="bg-gray-700/50 px-3 py-1 rounded-lg w-48 text-right border border-teal-400/30"
        />
      ) : (
        <span className="text-gray-300">{value}</span>
      )}
    </div>
  );
};

export default Profile;
