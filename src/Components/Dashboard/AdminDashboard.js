import React, { useState } from "react";
import DashboardComponent from "./DashboardComponent";
import StudentsComponent from "./StudentsComponent";
import ProfesseurComponent from "./ProfesseurComponent";
import CoursesComponent from "./CoursesComponent";
import ExamenComponent from "./ExamenComponent";
import ExerciseComponent from "./ExerciseComponent";
import OuvragesComponent from "./OuvragesComponent";
import ProfilePage from "./ProfilePage";
import RapportsPage from "./RapportsPage";
import {
  Home,
  GraduationCap,
  ClipboardList,
  BarChart2,
  User,
  Menu,
  X,
  UserCheck, // For Professeur
  Book as BookIcon, // For Courses
  Layers, // For Ouvrages
  FileSpreadsheet, // For Exercises
} from "lucide-react";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <DashboardComponent/>
        );

      case "students":
        return (
          <StudentsComponent/>
        );

      case "professors":
        return (
          
          <ProfesseurComponent/>
        );

      case "courses":
        return (
          <CoursesComponent/>
        );

      case "exams":
        return (
          <ExamenComponent/>
        );

      case "exercises":
        return (
          <ExerciseComponent/>
        );

      case "ouvrages":
        return (
          <OuvragesComponent/>
        );

      case "reports":
        return (
          <RapportsPage/>
        );

      case "profile":
        return (
          <ProfilePage/>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-screen bg-gray-900 text-gray-100 overflow-hidden">
      <div className="flex h-full">
        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? "w-64" : "w-20"
          } bg-gray-800/50 backdrop-blur-sm border-r border-white/10 transition-all duration-300 relative h-full flex flex-col`}
        >
          <button
            onClick={toggleSidebar}
            className="absolute -right-3 top-4 bg-gray-800 p-2 rounded-full border border-white/10 hover:bg-gray-700/30 transition-colors"
          >
            {sidebarOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>

          <div className="p-4">
            <nav className="space-y-2">
              {[
                { section: "dashboard", icon: Home, label: "Accueil" },
                {
                  section: "students",
                  icon: GraduationCap,
                  label: "Étudiants",
                },
                {
                  section: "professors",
                  icon: UserCheck,
                  label: "Professeurs",
                },
                { section: "courses", icon: BookIcon, label: "Cours" },
                { section: "exams", icon: ClipboardList, label: "Examens" },
                {
                  section: "exercises",
                  icon: FileSpreadsheet,
                  label: "Exercices",
                },
                { section: "ouvrages", icon: Layers, label: "Ouvrages" },
                { section: "reports", icon: BarChart2, label: "Rapports" },
                { section: "profile", icon: User, label: "Profil" },
              ].map(({ section, icon: Icon, label }) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeSection === section
                      ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                      : "text-gray-400 hover:bg-gray-700/30"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {sidebarOpen && <span className="text-sm">{label}</span>}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-8 overflow-auto">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
