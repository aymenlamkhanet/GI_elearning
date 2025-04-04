import React, { useState } from "react";
import ProfessorProfile from "./ProfileComponent";
import HistoryComponent from "./HistoryComponent";
import { User, Menu, X, PlusSquare, History } from "lucide-react";
import AddNewItem from "./AddNewItem";

const ProfDashboard = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return <ProfessorProfile />;

      case "addNew":
        return (
          <AddNewItem/>
        );

      case "history":
        return (
          <HistoryComponent/>
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
                { section: "profile", icon: User, label: "Profil" },
                { section: "addNew", icon: PlusSquare, label: "Ajouter" },
                { section: "history", icon: History, label: "Historique" },
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

export default ProfDashboard;
