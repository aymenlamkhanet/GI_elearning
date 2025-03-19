import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import RegistrationForm from "./Components/Register/RegistrationForm";
import Products from "./Components/Products/products";
import BooksCollectionDisplay from "./Components/Biblio_Ouvrages/BooksCollectionDisplay";
import TeamMembers from "./Components/Divers/TeamMembers";
import Partenaires from "./Components/Divers/Partenaires";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
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
