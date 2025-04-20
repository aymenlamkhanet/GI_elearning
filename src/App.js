import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import AboutPage from "./Components/LandingPage/AboutPage";
import RegistrationForm from "./Components/Register/RegistrationForm";
import Products from "./Components/Products/products";
import BooksCollectionDisplay from "./Components/Biblio_Ouvrages/BooksCollectionDisplay";
import TeamMembers from "./Components/Divers/TeamMembers";
import Partenaires from "./Components/Divers/Partenaires";
import ConcoursPage from "./Components/Biblio-Concours/ConcoursPage";
import AlgorithmsPage from "./Components/Biblio_Algo/AlgorithmsPage";
import BiblioFichesPage from "./Components/Biblio_Fiche/BiblioFichesPage";
import CourseDashboard from "./Components/Cours&Exos/CourseDashboard";
import OrientationPage from "./Components/Conseils/OrientationPage";

import ExchangePage from "./Components/Conseils/ExchangePage";
import AdminDashboard from "./Components/Dashboard/AdminDashboard";
import ProfDashboard from "./Components/Privatespace/Prof/ProfDashboard";
import QuestionsForum from "./Components/Discussion/QuestionsForum";
import GI2CourseDashboard from "./Components/Cours&Exos/GI2CourseDashboard";
import GI3CourseDashboard from "./Components/Cours&Exos/GI3CourseDashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />

        <Route path="/ProfDashboard" element={<ProfDashboard />} />
        <Route path="/Forum" element={<QuestionsForum />} />
        <Route path="/algos" element={<AlgorithmsPage />} />
        <Route path="/ExchangePage" element={<ExchangePage />} />
        <Route path="/OrientationPage" element={<OrientationPage />} />
        <Route path="/CourseDashboard" element={<CourseDashboard />} />
        <Route path="/GI2CourseDashboard" element={<GI2CourseDashboard />} />
        <Route path="/GI3CourseDashboard" element={<GI3CourseDashboard />} />
        <Route path="/BiblioFiches" element={<BiblioFichesPage />} />
        <Route path="/Biblio-Concours" element={<ConcoursPage />} />
        <Route path="/About" element={<AboutPage />} />
        <Route path="/Partenaires" element={<Partenaires />} />
        <Route path="/team" element={<TeamMembers />} />
        <Route path="/biblio_ouvrages" element={<BooksCollectionDisplay />} />
        <Route path="/items" element={<Products />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
