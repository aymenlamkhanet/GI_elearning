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
import DoubleDiplomation from "./Components/Conseils/DoubleDiplomation";
import ExchangePage from "./Components/Conseils/ExchangePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/algos" element={<AlgorithmsPage />} />
        <Route path="/ExchangePage" element={<ExchangePage />} />
        <Route path="/DoubleDiplomation" element={<DoubleDiplomation />} />
        <Route path="/OrientationPage" element={<OrientationPage />} />
        <Route path="/CourseDashboard" element={<CourseDashboard />} />
        <Route path="/BiblioFiches" element={<BiblioFichesPage />} />
        <Route path="/Biblio-Concours" element={<ConcoursPage />} />
        <Route path="/" element={<LandingPage />} />
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
