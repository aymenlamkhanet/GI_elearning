import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Shield,
  Edit,
  Save,
  X,
  Camera,
  Lock,
  LogOut,
  Award,
  Key,
  Eye,
  EyeOff,
} from "lucide-react";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    nom: "",
    prenom: "",
    email: "",
    phone: "",
    poste: "",
    departement: "",
  });
   const [passwordError, setPasswordError] = useState("");
  // Password states
  const API_URL = "http://localhost:8084/api/chef/67f2e7cbca67094104bf5f40";
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8084/api/chef/67f2e7cbca67094104bf5f40"
        );
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setUserData(data);
        setEditedData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  const handlePasswordUpdate = async () => {
    const { newPassword, confirmPassword } = passwordData;

    // Validation
    if (!newPassword || !confirmPassword) {
      setPasswordError("Veuillez remplir tous les champs");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      setIsSaving(true);

      // Merge password with existing user data
      const updateData = {
        ...userData,
        motDePasse: newPassword,
      };

      const response = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Échec de la mise à jour du mot de passe"
        );
      }

      const updatedUser = await response.json();
      setUserData(updatedUser);
      resetPasswordForm();
      setPasswordError("");
    } catch (err) {
      setPasswordError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  

  const saveChanges = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedData = await response.json();
      setUserData(updatedData);
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };
  const cancelEditing = () => {
    setEditedData(userData);
    setIsEditing(false);
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
    return `${userData?.prenom?.charAt(0) || ""}${
      userData?.nom?.charAt(0) || ""
    }`;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!userData) return <div>No user data found</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-900/40 to-purple-900/40 p-8 backdrop-blur-sm border border-white/10">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold ring-4 ring-white/10 shadow-lg">
                {getInitials()}
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-gray-800 rounded-full border border-gray-700 hover:bg-gray-700 transition-colors">
                <Camera className="w-5 h-5 text-blue-400" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex flex-col items-center md:items-start">
              <h1 className="text-3xl font-bold text-white">
                {userData.prenom} {userData.nom}
              </h1>
              <p className="text-xl text-blue-300 mt-1">{userData.poste}</p>
              <div className="flex items-center mt-4 space-x-2">
                <Shield className="w-5 h-5 text-purple-400" />
                <span className="text-purple-300">Compte administrateur</span>
              </div>
              <div className="flex mt-4 space-x-4">
                <div className="flex items-center space-x-2 text-gray-300">
                  <Calendar className="w-4 h-4" />
                  <span>Département: {userData.departement}</span>
                </div>
              </div>
            </div>

            {/* Edit Controls */}
            <div className="md:ml-auto flex space-x-2">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-all backdrop-blur-sm border border-blue-500/30"
                >
                  <Edit className="w-5 h-5 mr-2" /> Modifier le profil
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={saveChanges}
                    disabled={isSaving}
                    className="flex items-center px-4 py-2 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition-all backdrop-blur-sm border border-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? (
                      <>
                        <Save className="w-5 h-5 mr-2 animate-pulse" />
                        Enregistrement...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5 mr-2" />
                        Enregistrer
                      </>
                    )}
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="flex items-center px-4 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-all backdrop-blur-sm border border-red-500/30"
                  >
                    <X className="w-5 h-5 mr-2" /> Annuler
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold text-white flex items-center mb-6">
                <User className="w-5 h-5 mr-2 text-blue-400" />
                Informations Personnelles
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      Nom
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="nom"
                        value={editedData.nom}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                      />
                    ) : (
                      <div className="w-full px-4 py-2 bg-gray-700/20 border border-gray-700 rounded-lg">
                        {userData.nom}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      Prénom
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="prenom"
                        value={editedData.prenom}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                      />
                    ) : (
                      <div className="w-full px-4 py-2 bg-gray-700/20 border border-gray-700 rounded-lg">
                        {userData.prenom}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={editedData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                    />
                  ) : (
                    <div className="w-full px-4 py-2 bg-gray-700/20 border border-gray-700 rounded-lg flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-blue-400" />{" "}
                      {userData.email}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Téléphone
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={editedData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                    />
                  ) : (
                    <div className="w-full px-4 py-2 bg-gray-700/20 border border-gray-700 rounded-lg flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-blue-400" />{" "}
                      {userData.phone}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Security Section */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <Lock className="w-5 h-5 mr-2 text-purple-400" />
                  Sécurité et Mot de Passe
                </h2>
                <button
                  onClick={() => setShowPasswordChange(!showPasswordChange)}
                  className="text-sm text-purple-400 hover:text-purple-300 flex items-center"
                >
                  <Key className="w-4 h-4 mr-1" />
                  {showPasswordChange ? "Annuler" : "Changer le mot de passe"}
                </button>
              </div>

              {showPasswordChange ? (
                <div className="space-y-4 border border-purple-500/20 rounded-lg p-4 bg-purple-900/10 backdrop-blur-sm">
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
                        className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all pr-10"
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
                        className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all pr-10"
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
                      className="px-4 py-2 bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30 transition-all border border-purple-500/30 disabled:opacity-50"
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
            {/* Department Info */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold text-white flex items-center mb-6">
                <Award className="w-5 h-5 mr-2 text-purple-400" />
                Information du Département
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-700/20 rounded-lg">
                  <span className="text-gray-400">Nom du département</span>
                  <span className="text-white">{userData.departement}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-700/20 rounded-lg">
                  <span className="text-gray-400">Nombre d'étudiants</span>
                  <span className="text-blue-400">264</span>
                </div>
              </div>
            </div>
            {/* Logout */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <button className="w-full flex items-center justify-center px-4 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-all backdrop-blur-sm border border-red-500/30">
                <LogOut className="w-5 h-5 mr-2" /> Déconnexion
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
