import React, { useState } from "react";
import "./RegistrationForm.css";
import FooterSection from "../LandingPage/FooterSection";
import Navbar from "../Products/Navbar";
import axios from "axios";

const RegistrationForm = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [userType, setUserType] = useState("student");
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    motDePasse: "",
    confirmPassword: "",
    phone: "",
    niveau: "GI1",
    specialty: "", // This will be mapped to 'module' for professors
    role: "student",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setFormData({
      ...formData,
      role: type,
      niveau: type === "student" ? "GI1" : "",
      specialty: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (isSignUp) {
        if (formData.motDePasse !== formData.confirmPassword) {
          throw new Error("Passwords do not match");
        }

        // Determine the API endpoint based on user type
        const endpoint =
          userType === "student"
            ? "http://localhost:8084/auth/sign-up"
            : "http://localhost:8084/auth/sign-up-prof";

        // Create the appropriate payload based on user type
        const payload = {
          nom: formData.nom,
          prenom: formData.prenom,
          email: formData.email,
          motDePasse: formData.motDePasse,
          phone: formData.phone,
        };

        // Add specific fields based on user type
        if (userType === "student") {
          payload.niveau = formData.niveau;
        } else {
          // For professor, map 'specialty' to 'module' as expected by the API
          payload.module = formData.specialty;
        }

        const response = await axios.post(endpoint, payload, {
          headers: { "Content-Type": "application/json" },
        });

        setSuccess("Registration successful! You can now log in.");
        setTimeout(() => setIsSignUp(false), 2000);
      } else {
        const response = await axios.post(
          "http://localhost:8084/auth/login",
          {
            email: formData.email,
            motDePasse: formData.motDePasse,
          },
          { headers: { "Content-Type": "application/json" } }
        );

        // Save user data in local storage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: response.data.id,
            email: response.data.email,
            role: response.data.role,
            nom: response.data.nom,
          })
        );

        // Fetch JSON data and redirect based on role
        const redirectPath = determineRedirectPath(response.data.type);
        window.location.href = redirectPath;
      }
    } catch (err) {
      console.error("Authentication error:", err);
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          err.message ||
          "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const determineRedirectPath = (role) => {
    // Direct the user based on their role
    switch (role) {
      case "chef_departement":
        return "/AdminDashboard";
      case "professeur":
        return "/ProfDashboard";
      default:
        return "/items";
    }
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setFormData({
      nom: "",
      prenom: "",
      email: "",
      motDePasse: "",
      confirmPassword: "",
      phone: "",
      niveau: "GI1",
      specialty: "",
      role: "student",
    });
    setUserType("student");
    setError(null);
    setSuccess(null);
  };

  return (
    <>
      <Navbar />

      <section className="relative py-24 bg-gradient-to-br from-gray-900 to-gray-950 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05]"></div>
        <div className="absolute inset-0 border-2 border-white/5 rounded-xl pointer-events-none animate-border-pulse"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10 shadow-2xl">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-2xl blur-2xl opacity-75 animate-glow -z-10"></div>

              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 animate-text-gradient">
                  {isSignUp ? "Create an Account" : "Welcome Back"}
                </h2>
                <p className="text-gray-400 mt-2">
                  {isSignUp
                    ? "Join the platform and start your journey"
                    : "Sign in to continue your experience"}
                </p>
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-500/20 border border-green-500/50 text-green-100 px-4 py-3 rounded mb-4">
                  {success}
                </div>
              )}

              {isSignUp && (
                <div className="mb-8">
                  <div className="relative bg-gray-800 rounded-full p-1 flex">
                    <div
                      className="absolute top-1 bottom-1 left-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
                      style={{
                        width: "50%",
                        transform: `translateX(${
                          userType === "student" ? 0 : "100%"
                        })`,
                      }}
                    ></div>
                    <button
                      type="button"
                      onClick={() => handleUserTypeChange("student")}
                      className={`relative flex-1 px-6 py-2 text-sm font-medium rounded-full z-10 transition-colors ${
                        userType === "student"
                          ? "text-white"
                          : "text-gray-400 hover:text-gray-200"
                      }`}
                    >
                      Student
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUserTypeChange("professor")}
                      className={`relative flex-1 px-6 py-2 text-sm font-medium rounded-full z-10 transition-colors ${
                        userType === "professor"
                          ? "text-white"
                          : "text-gray-400 hover:text-gray-200"
                      }`}
                    >
                      Professor
                    </button>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {isSignUp && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative group">
                        <input
                          type="text"
                          name="nom"
                          value={formData.nom}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-gray-500 transition-all"
                          placeholder="Last Name"
                          required
                        />
                      </div>
                      <div className="relative group">
                        <input
                          type="text"
                          name="prenom"
                          value={formData.prenom}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-gray-500 transition-all"
                          placeholder="First Name"
                          required
                        />
                      </div>
                    </div>

                    <div className="relative group">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-gray-500 transition-all"
                        placeholder="Phone Number"
                        required
                      />
                    </div>

                    {isSignUp && userType === "student" && (
                      <div className="relative group">
                        <select
                          name="niveau"
                          value={formData.niveau}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-gray-500 transition-all"
                          required
                        >
                          <option value="GI1">GI1</option>
                          <option value="GI2">GI2</option>
                          <option value="GI3">GI3</option>
                        </select>
                      </div>
                    )}

                    {isSignUp && userType === "professor" && (
                      <div className="relative group">
                        <input
                          type="text"
                          name="specialty"
                          value={formData.specialty}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-gray-500 transition-all"
                          placeholder="Teaching Specialty"
                          required
                        />
                      </div>
                    )}
                  </>
                )}

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
                </div>

                <div className="relative group">
                  <input
                    type="password"
                    name="motDePasse"
                    value={formData.motDePasse}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-gray-500 transition-all"
                    placeholder="Password"
                    required
                  />
                </div>

                {isSignUp && (
                  <div className="relative group">
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-gray-500 transition-all"
                      placeholder="Confirm Password"
                      required
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-lg hover:shadow-2xl hover:shadow-purple-500/30 transform transition-all duration-300 hover:-translate-y-1 disabled:opacity-50"
                >
                  <span className="relative z-10">
                    {loading
                      ? "Processing..."
                      : isSignUp
                      ? "Create Account"
                      : "Sign In"}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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

                <div className="relative flex items-center py-6">
                  <div className="flex-grow border-t border-gray-700"></div>
                  <span className="flex-shrink mx-4 text-gray-500">OR</span>
                  <div className="flex-grow border-t border-gray-700"></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Social login buttons remain the same */}
                </div>
              </form>

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

        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full filter blur-3xl animate-float-delayed"></div>
      </section>

      <FooterSection />
    </>
  );
};

export default RegistrationForm;
