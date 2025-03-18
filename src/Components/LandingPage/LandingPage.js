import React from "react";
import StatsSection from "./StatsSection";
import CTA from "./CTA"
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import TestimonialsSection from "./TestimonialsSection";
import FooterSection from "./FooterSection";
import Navbar from "../Products/Navbar";
import "./landingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <CTA />
      <StatsSection />
      <TestimonialsSection />
      <FooterSection />
    </div>
  );
};

export default LandingPage;
