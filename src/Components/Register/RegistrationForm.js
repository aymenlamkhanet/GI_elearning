import React, { useState } from "react";
import "./RegistrationForm.css";
import FooterSection from "../LandingPage/FooterSection";

const RegistrationForm = () => {
  const [isSignUp, setIsSignUp] = useState(true); // true = Sign Up, false = Sign In
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      console.log("Sign Up Data:", formData);
    } else {
      console.log("Sign In Data:", {
        email: formData.email,
        password: formData.password,
      });
    }
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setFormData({ name: "", email: "", password: "" }); // Réinitialiser le formulaire
  };

  return (
    <>
      {/* Registration Form Section */}
      <section className="relative py-24 bg-gradient-to-br from-gray-900 to-gray-950 overflow-hidden">
        {/* Floating grid pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.05]"></div>

        {/* Glowing border effect */}
        <div className="absolute inset-0 border-2 border-white/5 rounded-xl pointer-events-none animate-border-pulse"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto">
            {/* Form container */}
            <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10 shadow-2xl">
              {/* Glowing background */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-2xl blur-2xl opacity-75 animate-glow -z-10"></div>

              {/* Form header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 animate-text-gradient">
                  {isSignUp ? "Join the Revolution" : "Welcome Back"}
                </h2>
                <p className="text-gray-400 mt-2">
                  {isSignUp
                    ? "Create your account and start your learning journey today"
                    : "Sign in to continue your learning journey"}
                </p>
              </div>

              {/* Form fields */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name field (only for Sign Up) */}
                {isSignUp && (
                  <div className="relative group">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-gray-500 transition-all"
                      placeholder="Full Name"
                      required={isSignUp}
                    />
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
                  </div>
                )}

                {/* Email field */}
                <div className="relative group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-gray-500 transition-all"
                    placeholder="Email Address"
                    required
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
                </div>

                {/* Password field */}
                <div className="relative group">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-gray-500 transition-all"
                    placeholder="Password"
                    required
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-lg hover:shadow-2xl hover:shadow-purple-500/30 transform transition-all duration-300 hover:-translate-y-1"
                >
                  <span className="relative z-10">
                    {isSignUp ? "Create Account" : "Sign In"}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Button sparkles */}
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-sparkle"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${i * 0.2}s`,
                      }}
                    />
                  ))}
                </button>

                {/* Divider */}
                <div className="relative flex items-center py-6">
                  <div className="flex-grow border-t border-gray-700"></div>
                  <span className="flex-shrink mx-4 text-gray-500">OR</span>
                  <div className="flex-grow border-t border-gray-700"></div>
                </div>

                {/* Social login buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    className="flex items-center justify-center space-x-2 bg-gray-800/50 hover:bg-gray-800/70 text-gray-400 hover:text-white py-3 px-4 rounded-lg transition-all"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {/* Google icon */}
                      <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866.549 3.921 1.453l2.814-2.814C17.503 2.332 15.139 1 12.545 1 7.021 1 2.545 5.476 2.545 11s4.476 10 10 10c5.523 0 10-4.476 10-10 0-.671-.069-1.325-.189-1.971H12.545z" />
                    </svg>
                    <span>Google</span>
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center space-x-2 bg-gray-800/50 hover:bg-gray-800/70 text-gray-400 hover:text-white py-3 px-4 rounded-lg transition-all"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {/* GitHub icon */}
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span>GitHub</span>
                  </button>
                </div>
              </form>

              {/* Footer */}
              <div className="mt-8 text-center text-gray-500">
                {isSignUp
                  ? "Already have an account? "
                  : "Don't have an account? "}
                <button
                  onClick={toggleForm}
                  className="text-blue-400 hover:text-blue-300 focus:outline-none"
                >
                  {isSignUp ? "Sign In" : "Sign Up"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Floating 3D elements */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full filter blur-3xl animate-float-delayed"></div>
      </section>

      {/* Modified Section: Why Choose Us - Now with matching background */}
      <section className="relative py-24 bg-gradient-to-br from-gray-900 to-gray-950 overflow-hidden">
        {/* Floating grid pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.05]"></div>

        {/* Glowing border effect */}
        <div className="absolute inset-0 border-2 border-white/5 rounded-xl pointer-events-none animate-border-pulse"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 animate-text-gradient">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Discover the unique features that make us the best choice for your
              learning journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-2xl group hover:shadow-xl transition-shadow">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 animate-glow -z-10"></div>
              <div className="text-4xl mb-4 text-blue-500">📚</div>
              <h3 className="text-xl font-bold mb-4 text-white">
                Comprehensive Courses
              </h3>
              <p className="text-gray-400">
                Access a wide range of well-structured courses designed by
                experts.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-2xl group hover:shadow-xl transition-shadow">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 animate-glow -z-10"></div>
              <div className="text-4xl mb-4 text-purple-500">💡</div>
              <h3 className="text-xl font-bold mb-4 text-white">
                Interactive Learning
              </h3>
              <p className="text-gray-400">
                Engage with hands-on exercises and real-world projects.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-2xl group hover:shadow-xl transition-shadow">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 animate-glow -z-10"></div>
              <div className="text-4xl mb-4 text-indigo-500">🚀</div>
              <h3 className="text-xl font-bold mb-4 text-white">
                Career Support
              </h3>
              <p className="text-gray-400">
                Get career guidance and job placement assistance.
              </p>
            </div>
          </div>
        </div>

        {/* Floating 3D elements */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full filter blur-3xl animate-float-delayed"></div>
      </section>

      {/* Footer Section */}
      <FooterSection />
    </>
  );
};

export default RegistrationForm;
