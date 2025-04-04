import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Edit,
  Save,
  X,
  Camera,
  Award,
  GraduationCap,
  Briefcase,
  BookOpen,
  Shield,
} from "lucide-react";

const Profile = () => {
  const [userData, setUserData] = useState({
    firstName: "Marie",
    lastName: "Laurent",
    email: "m.laurent@ecole.fr",
    phone: "+33 1 98 76 54 32",
    role: "Professeur Principal",
    department: "Sciences Naturelles",
    joinDate: "03/09/2019",
    lastLogin: "02/04/2025",
    education: "Doctorat en Biologie Moléculaire",
    office: "Bâtiment C, Bureau 304",
    courses: ["Biologie Avancée", "Génétique Moléculaire", "Écologie"],
    specializations: ["Biologie Cellulaire", "Génétique", "Écologie Marine"],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({ ...userData });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const saveChanges = () => {
    setUserData({ ...editedData });
    setIsEditing(false);
  };

  const cancelEditing = () => {
    setEditedData({ ...userData });
    setIsEditing(false);
  };

  const getInitials = () => {
    return `${userData.firstName.charAt(0)}${userData.lastName.charAt(0)}`;
  };

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
                  name="firstName"
                  value={editedData.firstName}
                  onChange={handleInputChange}
                  className="bg-transparent border-b-2 border-teal-400 mr-2"
                />
              ) : (
                userData.firstName
              )}
              {isEditing ? (
                <input
                  type="text"
                  name="lastName"
                  value={editedData.lastName}
                  onChange={handleInputChange}
                  className="bg-transparent border-b-2 border-teal-400 uppercase"
                />
              ) : (
                <span className="uppercase">{userData.lastName}</span>
              )}
            </h1>
            <div className="mt-2 flex items-center space-x-3">
              {isEditing ? (
                <select
                  name="role"
                  value={editedData.role}
                  onChange={handleInputChange}
                  className="bg-gray-800 text-teal-300 px-3 py-1 rounded-lg"
                >
                  <option>Professeur Principal</option>
                  <option>Professeur</option>
                  <option>Chercheur-Enseignant</option>
                </select>
              ) : (
                <>
                  <Shield className="w-5 h-5 text-teal-400" />
                  <span className="text-xl text-teal-300">{userData.role}</span>
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
                label="Membre depuis"
                value={userData.joinDate}
                static
              />
            </div>
          </div>

          <div className="bg-gray-800/30 p-6 rounded-xl border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <BookOpen className="w-6 h-6 mr-2 text-teal-400" />
              Cours Enseignés
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {userData.courses.map((course, index) => (
                <div
                  key={index}
                  className="p-2 bg-teal-900/20 rounded-lg text-sm text-teal-300 text-center"
                >
                  {course}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="bg-gray-800/30 p-6 rounded-xl border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <GraduationCap className="w-6 h-6 mr-2 text-teal-400" />
              Formation Académique
            </h2>
            {isEditing ? (
              <textarea
                name="education"
                value={editedData.education}
                onChange={handleInputChange}
                className="w-full bg-gray-700/50 rounded-lg p-3 text-white border border-teal-400/30"
                rows="3"
              />
            ) : (
              <p className="text-gray-300">{userData.education}</p>
            )}
          </div>

          <div className="bg-gray-800/30 p-6 rounded-xl border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Briefcase className="w-6 h-6 mr-2 text-teal-400" />
              Détails Professionnels
            </h2>
            <div className="space-y-4">
              <InfoField
                icon={<Award />}
                label="Département"
                name="department"
                value={isEditing ? editedData.department : userData.department}
                editing={isEditing}
                onChange={handleInputChange}
              />
              <InfoField
                icon={<Shield />}
                label="Bureau"
                name="office"
                value={isEditing ? editedData.office : userData.office}
                editing={isEditing}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="bg-gray-800/30 p-6 rounded-xl border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Award className="w-6 h-6 mr-2 text-teal-400" />
              Spécialisations
            </h2>
            <div className="flex flex-wrap gap-2">
              {userData.specializations.map((spec, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-teal-900/30 text-teal-300 text-sm rounded-full border border-teal-400/20"
                >
                  {spec}
                </span>
              ))}
              {isEditing && (
                <button className="px-3 py-1 bg-teal-600/20 text-teal-400 text-sm rounded-full border border-teal-400/20 hover:bg-teal-600/30">
                  + Ajouter
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      {isEditing && (
        <div className="mt-8 pt-6 border-t border-white/10 flex justify-end space-x-4">
          <button
            onClick={saveChanges}
            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition flex items-center"
          >
            <Save className="w-5 h-5 mr-2" />
            Sauvegarder les modifications
          </button>
          <button
            onClick={cancelEditing}
            className="px-6 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition"
          >
            Annuler
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
