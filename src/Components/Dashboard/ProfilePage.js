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
  Bell,
  Settings,
  Award,
  Key,
  Clock,
  Eye,
  EyeOff,
  MessageSquare,
  Activity,
  UserCheck,
  Zap,
  BookOpen
} from "lucide-react";

const ProfilePage = () => {
  // Sample user data
  const [userData, setUserData] = useState({
    firstName: "Admin",
    lastName: "Dupont",
    email: "admin@ecole.fr",
    phone: "+33 1 23 45 67 89",
    role: "Super Administrateur",
    joinDate: "15/09/2022",
    lastLogin: "31/03/2025, 09:42",
    permissions: [
      "Gestion des utilisateurs",
      "Gestion des cours",
      "Rapports",
      "Configuration du système",
    ],
  });

  // Edit mode state
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({ ...userData });

  // Password visibility toggle
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password change state
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Recent activities
  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      action: "Modification d'un cours",
      date: "31/03/2025, 08:15",
      icon: BookOpen,
    },
    {
      id: 2,
      action: "Ajout d'un nouvel étudiant",
      date: "30/03/2025, 14:30",
      icon: UserCheck,
    },
    {
      id: 3,
      action: "Mise à jour système",
      date: "28/03/2025, 10:22",
      icon: Zap,
    },
    {
      id: 4,
      action: "Génération de rapports",
      date: "27/03/2025, 16:45",
      icon: Activity,
    },
  ]);

  // Notification preferences
  const [notifications, setNotifications] = useState({
    email: true,
    browser: true,
    system: false,
    updates: true,
  });

  // Stats animation
  const [statsVisible, setStatsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setStatsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: value,
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications({
      ...notifications,
      [name]: checked,
    });
  };

  // Save profile changes
  const saveChanges = () => {
    setUserData({ ...editedData });
    setIsEditing(false);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditedData({ ...userData });
    setIsEditing(false);
  };

  // Reset password form
  const resetPasswordForm = () => {
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setShowPasswordChange(false);
  };

  // Get initials for avatar
  const getInitials = () => {
    return `${userData.firstName.charAt(0)}${userData.lastName.charAt(0)}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header with background gradient */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-900/40 to-purple-900/40 p-8 backdrop-blur-sm border border-white/10">
          {/* Floating particles effect */}
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
                  animation: `float ${
                    Math.random() * 10 + 10
                  }s linear infinite`,
                }}
              />
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
            {/* Profile picture */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold ring-4 ring-white/10 shadow-lg">
                {getInitials()}
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-gray-800 rounded-full border border-gray-700 hover:bg-gray-700 transition-colors">
                <Camera className="w-5 h-5 text-blue-400" />
              </button>
            </div>

            {/* Profile header info */}
            <div className="flex flex-col items-center md:items-start">
              <h1 className="text-3xl font-bold text-white">
                {userData.firstName} {userData.lastName}
              </h1>
              <p className="text-xl text-blue-300 mt-1">{userData.role}</p>
              <div className="flex items-center mt-4 space-x-2">
                <Shield className="w-5 h-5 text-purple-400" />
                <span className="text-purple-300">Compte administrateur</span>
              </div>
              <div className="flex mt-4 space-x-4">
                <div className="flex items-center space-x-2 text-gray-300">
                  <Calendar className="w-4 h-4" />
                  <span>Membre depuis {userData.joinDate}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Clock className="w-4 h-4" />
                  <span>Dernière connexion: {userData.lastLogin}</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="md:ml-auto flex space-x-2">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-all backdrop-blur-sm border border-blue-500/30"
                >
                  <Edit className="w-5 h-5 mr-2" />
                  Modifier le profil
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={saveChanges}
                    className="flex items-center px-4 py-2 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition-all backdrop-blur-sm border border-green-500/30"
                  >
                    <Save className="w-5 h-5 mr-2" />
                    Enregistrer
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="flex items-center px-4 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-all backdrop-blur-sm border border-red-500/30"
                  >
                    <X className="w-5 h-5 mr-2" />
                    Annuler
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal information card */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-all hover:border-blue-500/20">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-400" />
                  Informations Personnelles
                </h2>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      Nom
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="lastName"
                        value={editedData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                      />
                    ) : (
                      <div className="w-full px-4 py-2 bg-gray-700/20 border border-gray-700 rounded-lg">
                        {userData.lastName}
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
                        name="firstName"
                        value={editedData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                      />
                    ) : (
                      <div className="w-full px-4 py-2 bg-gray-700/20 border border-gray-700 rounded-lg">
                        {userData.firstName}
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
                      <Mail className="w-4 h-4 mr-2 text-blue-400" />
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
                      <Phone className="w-4 h-4 mr-2 text-blue-400" />
                      {userData.phone}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Rôle
                  </label>
                  {isEditing ? (
                    <select
                      name="role"
                      value={editedData.role}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                    >
                      <option value="Super Administrateur">
                        Super Administrateur
                      </option>
                      <option value="Administrateur">Administrateur</option>
                      <option value="Gestionnaire">Gestionnaire</option>
                    </select>
                  ) : (
                    <div className="w-full px-4 py-2 bg-gray-700/20 border border-gray-700 rounded-lg flex items-center">
                      <Shield className="w-4 h-4 mr-2 text-purple-400" />
                      {userData.role}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Password security card */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-all hover:border-purple-500/20">
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

              {showPasswordChange && (
                <div className="space-y-4 border border-purple-500/20 rounded-lg p-4 bg-purple-900/10 backdrop-blur-sm">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      Mot de passe actuel
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5 text-gray-400" />
                        ) : (
                          <Eye className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

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
                        type="button"
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
                    <div className="mt-1 flex space-x-1">
                      <div className="h-1 w-1/4 rounded-full bg-gray-700"></div>
                      <div className="h-1 w-1/4 rounded-full bg-gray-700"></div>
                      <div className="h-1 w-1/4 rounded-full bg-gray-700"></div>
                      <div className="h-1 w-1/4 rounded-full bg-gray-700"></div>
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
                        type="button"
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
                    <button className="px-4 py-2 bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30 transition-all border border-purple-500/30">
                      Mettre à jour
                    </button>
                  </div>
                </div>
              )}

              {!showPasswordChange && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-700/20 rounded-lg">
                    <div className="flex items-center">
                      <Key className="w-5 h-5 mr-2 text-gray-400" />
                      <span>Dernier changement de mot de passe</span>
                    </div>
                    <span className="text-gray-400">15/02/2025</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-700/20 rounded-lg">
                    <div className="flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-gray-400" />
                      <span>Authentification à deux facteurs</span>
                    </div>
                    <span className="text-green-400">Activé</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-700/20 rounded-lg">
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-gray-400" />
                      <span>Expiration de session</span>
                    </div>
                    <span className="text-gray-400">30 minutes</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Right column */}
          <div className="space-y-6">
            {/* Statistics */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-all hover:border-green-500/20">
              <h2 className="text-xl font-semibold text-white flex items-center mb-6">
                <Activity className="w-5 h-5 mr-2 text-green-400" />
                Statistiques
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div
                  className={`bg-gray-700/30 rounded-lg p-4 border border-green-500/20 transition-all ${
                    statsVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                  style={{ transitionDelay: "100ms" }}
                >
                  <span className="text-sm text-gray-400">Étudiants</span>
                  <div className="text-2xl font-bold text-white mt-1">264</div>
                </div>

                <div
                  className={`bg-gray-700/30 rounded-lg p-4 border border-blue-500/20 transition-all ${
                    statsVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                  style={{ transitionDelay: "200ms" }}
                >
                  <span className="text-sm text-gray-400">Cours</span>
                  <div className="text-2xl font-bold text-white mt-1">42</div>
                </div>

                <div
                  className={`bg-gray-700/30 rounded-lg p-4 border border-purple-500/20 transition-all ${
                    statsVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                  style={{ transitionDelay: "300ms" }}
                >
                  <span className="text-sm text-gray-400">Ouvrages</span>
                  <div className="text-2xl font-bold text-white mt-1">128</div>
                </div>

                <div
                  className={`bg-gray-700/30 rounded-lg p-4 border border-yellow-500/20 transition-all ${
                    statsVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                  style={{ transitionDelay: "400ms" }}
                >
                  <span className="text-sm text-gray-400">Examens</span>
                  <div className="text-2xl font-bold text-white mt-1">86</div>
                </div>
              </div>
            </div>

            {/* Permissions */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-all hover:border-yellow-500/20">
              <h2 className="text-xl font-semibold text-white flex items-center mb-6">
                <Shield className="w-5 h-5 mr-2 text-yellow-400" />
                Permissions
              </h2>

              <div className="space-y-2">
                {userData.permissions.map((permission, index) => (
                  <div
                    key={index}
                    className="flex items-center p-2 rounded-lg bg-gray-700/20"
                  >
                    <div className="w-2 h-2 rounded-full bg-yellow-400 mr-3"></div>
                    <span>{permission}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent activity */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-all hover:border-blue-500/20">
              <h2 className="text-xl font-semibold text-white flex items-center mb-6">
                <Clock className="w-5 h-5 mr-2 text-blue-400" />
                Activités Récentes
              </h2>

              <div className="space-y-4">
                {recentActivities.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div
                      key={activity.id}
                      className="flex items-start p-3 rounded-lg bg-gray-700/20 border border-gray-700"
                    >
                      <div className="p-2 rounded-lg bg-blue-900/30 text-blue-400 mr-3">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">
                          {activity.action}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {activity.date}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Notification settings */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-all hover:border-purple-500/20">
              <h2 className="text-xl font-semibold text-white flex items-center mb-6">
                <Bell className="w-5 h-5 mr-2 text-purple-400" />
                Paramètres de notification
              </h2>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-700/20 rounded-lg">
                  <span>Notifications par email</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      name="email"
                      checked={notifications.email}
                      onChange={handleNotificationChange}
                    />
                    <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-purple-900/50 peer-checked:border-purple-500/50 border border-gray-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-700/20 rounded-lg">
                  <span>Notifications navigateur</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      name="browser"
                      checked={notifications.browser}
                      onChange={handleNotificationChange}
                    />
                    <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-purple-900/50 peer-checked:border-purple-500/50 border border-gray-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-700/20 rounded-lg">
                  <span>Notifications système</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      name="system"
                      checked={notifications.system}
                      onChange={handleNotificationChange}
                    />
                    <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-purple-900/50 peer-checked:border-purple-500/50 border border-gray-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-700/20 rounded-lg">
                  <span>Mises à jour de la plateforme</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      name="updates"
                      checked={notifications.updates}
                      onChange={handleNotificationChange}
                    />
                    <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-purple-900/50 peer-checked:border-purple-500/50 border border-gray-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                </div>
              </div>
            </div>
            {/* System Preferences */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-all hover:border-blue-500/20">
              <h2 className="text-xl font-semibold text-white flex items-center mb-6">
                <Settings className="w-5 h-5 mr-2 text-blue-400" />
                Préférences Système
              </h2>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-700/20 rounded-lg">
                  <span>Mode sombre</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-blue-900/50 peer-checked:border-blue-500/50 border border-gray-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-700/20 rounded-lg">
                  <span>Langue</span>
                  <select className="px-2 py-1 bg-gray-700/50 rounded border border-gray-600">
                    <option>Français</option>
                    <option>English</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-all hover:border-red-500/20">
              <button className="w-full flex items-center justify-center px-4 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-all backdrop-blur-sm border border-red-500/30">
                <LogOut className="w-5 h-5 mr-2" />
                Déconnexion
              </button>
            </div>
          </div>{" "}
          {/* End of right column */}
        </div>{" "}
        {/* End of main grid */}
      </div>{" "}
      {/* End of max-w-6xl container */}
    </div>
  );
};

export default ProfilePage; 
            