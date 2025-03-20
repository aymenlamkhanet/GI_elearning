import React from "react";
import { FiLinkedin, FiGithub, FiTwitter, FiMail } from "react-icons/fi";
import Navbar from "../Products/Navbar";
import FooterSection from "../LandingPage/FooterSection";
import ana from "./WhatsApp Image 2024-12-12 at 23.55.44_14762e88.jpg"
import ihab from "./WhatsApp Image 2025-03-19 at 21.33.57_bfc9e5f0.jpg";

const TeamMembers = () => {
  const teamMembers = [
    {
      name: "Aymen Lamkhanet",
      role: "Etudiant 2eme annee en Genie Informatique",
      bio: "Passionné de technologies web (MERN & JEE) , DevOps",
      image: ana,
      social: {
        linkedin: "https://linkedin.com/in/username",
        github: "https://github.com/username",
        twitter: "https://twitter.com/username",
        email: "mohammed@example.com",
      },
    },
    {
      name: "Ihab Hilal",
      role: "Etudiant 2eme annee en Genie Informatique",
      bio: "Plus de 5 ans d'expérience dans la gestion de projets e-learning.",
      image: ihab,
      social: {
        linkedin: "https://linkedin.com/in/username",
        github: "https://github.com/username",
        twitter: "https://twitter.com/username",
        email: "youssef@example.com",
      },
    },
  ];

  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Navbar at the top */}
      <Navbar />

      {/* Main content with proper spacing */}
      <div className="pt-32 pb-40 px-4">
        <div className="container mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
              Notre Équipe
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Découvrez les talents qui contribuent au succès de la plateforme
              GI E-Learning de l'ENSA Khouribga.
            </p>
          </div>

          {/* Team Members Grid - Centered for 2 members */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
              {teamMembers.map((member, index) => (
                <div key={index} className="relative group">
                  {/* Card with hover effect */}
                  <div className="relative overflow-hidden rounded-xl transition-all duration-500 transform group-hover:scale-105 group-hover:-translate-y-2">
                    {/* Background gradient effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Border gradient */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-30 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Content container */}
                    <div className="relative bg-gray-800 p-6 rounded-xl h-full flex flex-col">
                      {/* Profile image */}
                      <div className="relative mx-auto mb-6">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-sm opacity-60 group-hover:opacity-100 transition-opacity"></div>
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-32 h-32 object-cover rounded-full border-2 border-transparent group-hover:border-purple-400 transition-all relative z-10"
                        />
                      </div>

                      {/* Member details */}
                      <h3 className="text-xl font-bold text-white text-center">
                        {member.name}
                      </h3>
                      <p className="text-blue-400 text-center mb-3">
                        {member.role}
                      </p>
                      <p className="text-gray-400 text-center mb-6">
                        {member.bio}
                      </p>

                      {/* Social links */}
                      <div className="flex justify-center space-x-4 mt-auto">
                        <a
                          href={member.social.linkedin}
                          className="text-gray-400 hover:text-blue-400 transition-colors p-2 rounded-full hover:bg-gray-700/50"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FiLinkedin size={20} />
                        </a>
                        <a
                          href={member.social.github}
                          className="text-gray-400 hover:text-blue-400 transition-colors p-2 rounded-full hover:bg-gray-700/50"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FiGithub size={20} />
                        </a>
                        <a
                          href={member.social.twitter}
                          className="text-gray-400 hover:text-blue-400 transition-colors p-2 rounded-full hover:bg-gray-700/50"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FiTwitter size={20} />
                        </a>
                        <a
                          href={`mailto:${member.social.email}`}
                          className="text-gray-400 hover:text-blue-400 transition-colors p-2 rounded-full hover:bg-gray-700/50"
                        >
                          <FiMail size={20} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <FooterSection/>
    </div>
  );
};

export default TeamMembers;
