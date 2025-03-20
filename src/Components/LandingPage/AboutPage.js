import React from "react";
import { 
  FiUsers, 
  FiAward, 
  FiBookOpen, 
  FiTarget, 
  FiHeart, 
  FiMessageCircle,
  FiGlobe,
  FiClock
} from "react-icons/fi";
import Navbar from "../Products/Navbar";
import FooterSection from "./FooterSection";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200">
      {/* Your Navbar component would be imported and used here */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              À Propos de Nous
            </h1>
            <p className="text-xl text-gray-300">
              Découvrez notre mission, notre équipe et notre engagement envers
              l'excellence éducative à l'ENSA Khouribga.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 relative">
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-8">
              <div className="mr-4 p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg border border-white/10">
                <FiTarget className="h-8 w-8 text-blue-400" />
              </div>
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Notre Mission
              </h2>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              GI E-Learning a été créé avec une vision claire : faciliter
              l'accès aux ressources éducatives de qualité pour tous les
              étudiants de l'ENSA Khouribga. Notre plateforme vise à combler le
              fossé entre l'enseignement traditionnel et les besoins
              d'apprentissage modernes.
            </p>

            <p className="text-gray-300 leading-relaxed">
              Nous nous engageons à fournir des contenus pédagogiques
              pertinents, actualisés et adaptés aux programmes de formation en
              génie informatique. Notre objectif est de créer un environnement
              d'apprentissage collaboratif où les étudiants peuvent exceller
              dans leurs études et se préparer efficacement à leur future
              carrière professionnelle.
            </p>
          </div>
        </div>
      </section>

      {/* Histoire Section */}
      <section className="py-16 bg-gray-900/50 backdrop-blur-sm border-y border-white/10 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-8">
              <div className="mr-4 p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg border border-white/10">
                <FiClock className="h-8 w-8 text-blue-400" />
              </div>
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Notre Histoire
              </h2>
            </div>

            <div className="space-y-8">
              <div className="flex">
                <div className="mr-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    2018
                  </div>
                  <div className="h-full w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 mx-auto mt-2"></div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-6 border border-white/10 flex-1">
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">
                    Création de l'Initiative
                  </h3>
                  <p className="text-gray-300">
                    Lancé par un petit groupe d'étudiants passionnés de la
                    filière Génie Informatique, notre projet a débuté comme une
                    simple collection de ressources partagées.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="mr-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    2020
                  </div>
                  <div className="h-full w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 mx-auto mt-2"></div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-6 border border-white/10 flex-1">
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">
                    Expansion et Structuration
                  </h3>
                  <p className="text-gray-300">
                    Avec l'augmentation de la demande, nous avons structuré
                    notre plateforme et élargi notre équipe pour couvrir
                    davantage de modules et de ressources pédagogiques.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="mr-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    2023
                  </div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-6 border border-white/10 flex-1">
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">
                    Plateforme Moderne
                  </h3>
                  <p className="text-gray-300">
                    Aujourd'hui, GI E-Learning est devenu une référence pour les
                    étudiants de l'ENSA Khouribga, offrant une expérience
                    d'apprentissage complète et interactive.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs Section */}
      <section className="py-16 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-12">
              <div className="mr-4 p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg border border-white/10">
                <FiHeart className="h-8 w-8 text-blue-400" />
              </div>
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Nos Valeurs
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-blue-500/50 transition-colors group">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-4 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all">
                  <FiUsers className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-blue-400 mb-2">
                  Collaboration
                </h3>
                <p className="text-gray-300">
                  Nous croyons en la puissance du travail d'équipe et de
                  l'échange de connaissances entre étudiants, enseignants et
                  professionnels.
                </p>
              </div>

              <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-blue-500/50 transition-colors group">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-4 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all">
                  <FiAward className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-blue-400 mb-2">
                  Excellence
                </h3>
                <p className="text-gray-300">
                  Notre engagement envers la qualité se reflète dans chaque
                  ressource que nous partageons, visant toujours les plus hauts
                  standards pédagogiques.
                </p>
              </div>

              <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-blue-500/50 transition-colors group">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-4 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all">
                  <FiGlobe className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-blue-400 mb-2">
                  Accessibilité
                </h3>
                <p className="text-gray-300">
                  Nous nous efforçons de rendre l'éducation accessible à tous,
                  indépendamment des contraintes temporelles ou géographiques.
                </p>
              </div>

              <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-blue-500/50 transition-colors group">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-4 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all">
                  <FiBookOpen className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-blue-400 mb-2">
                  Innovation
                </h3>
                <p className="text-gray-300">
                  En tant que futurs ingénieurs informatiques, nous valorisons
                  l'innovation et l'adaptation continue aux technologies
                  éducatives émergentes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section className="py-16 relative">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-12">
              <div className="mr-4 p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg border border-white/10">
                <FiMessageCircle className="h-8 w-8 text-blue-400" />
              </div>
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Contactez-Nous
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <p className="text-gray-300 leading-relaxed">
                  Vous avez des questions, des suggestions ou souhaitez
                  rejoindre notre équipe ? N'hésitez pas à nous contacter. Nous
                  sommes toujours ouverts à de nouvelles idées et
                  collaborations.
                </p>

                <div className="flex items-start">
                  <div className="mr-4 p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10">
                    <svg
                      className="w-5 h-5 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-400 mb-1">
                      Email
                    </h3>
                    <p className="text-gray-300">
                      contact@gi-elearning.ensa.ma
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10">
                    <svg
                      className="w-5 h-5 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-400 mb-1">
                      Adresse
                    </h3>
                    <p className="text-gray-300">
                      ENSA Khouribga, Bd Béni Amir, BP 77, Khouribga, Maroc
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10">
                    <svg
                      className="w-5 h-5 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-400 mb-1">
                      Heures de Disponibilité
                    </h3>
                    <p className="text-gray-300">Lundi - Vendredi: 9h - 18h</p>
                  </div>
                </div>

                <div className="flex space-x-4 mt-6">
                  <a
                    href="#"
                    className="p-3 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 text-blue-400 hover:text-white hover:from-blue-500/40 hover:to-purple-500/40 transition-all"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="p-3 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 text-blue-400 hover:text-white hover:from-blue-500/40 hover:to-purple-500/40 transition-all"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="p-3 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 text-blue-400 hover:text-white hover:from-blue-500/40 hover:to-purple-500/40 transition-all"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Votre Nom
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-gray-900/50 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-200 placeholder-gray-400 transition-all"
                      placeholder="Entrez votre nom"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Adresse Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-gray-900/50 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-200 placeholder-gray-400 transition-all"
                      placeholder="email@exemple.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Sujet
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-gray-900/50 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-200 placeholder-gray-400 transition-all"
                      placeholder="Objet de votre message"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      rows="4"
                      className="w-full px-4 py-3 bg-gray-900/50 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-200 placeholder-gray-400 transition-all"
                      placeholder="Écrivez votre message ici..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all"
                  >
                    Envoyer le Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FooterSection/>
    </div>
  );
};

export default AboutPage;