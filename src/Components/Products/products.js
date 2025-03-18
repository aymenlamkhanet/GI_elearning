import React, { useEffect } from "react";
import FooterSection from "../LandingPage/FooterSection";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import RecommendationCards from "./RecommendationCards";
import ProductGrid from "./ProductGrid";
import ProductFilter from "./ProductFilter";

const Products = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize particle animation
    const canvas = document.getElementById("hero-canvas");
    if (canvas) {
      const ctx = canvas.getContext("2d");
      canvas.width = window.innerWidth;
      canvas.height = 600;

      class Particle {
        constructor(x, y, radius, color, velocity) {
          this.x = x;
          this.y = y;
          this.radius = radius;
          this.color = color;
          this.velocity = velocity;
          this.alpha = 1;
        }

        draw() {
          ctx.save();
          ctx.globalAlpha = this.alpha;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
          ctx.fillStyle = this.color;
          ctx.fill();
          ctx.restore();
        }

        update() {
          this.draw();
          this.x += this.velocity.x;
          this.y += this.velocity.y;
          this.alpha -= 0.008;
        }
      }

      const particles = [];
      const colors = ["#6366f1", "#8b5cf6", "#ec4899", "#3b82f6"];

      function animate() {
        requestAnimationFrame(animate);
        ctx.fillStyle = "rgba(15, 23, 42, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle, index) => {
          if (particle.alpha <= 0) {
            particles.splice(index, 1);
          } else {
            particle.update();
          }
        });
      }

      function createParticles(event) {
        const particleCount = 30;
        const angleIncrement = (Math.PI * 2) / particleCount;

        for (let i = 0; i < particleCount; i++) {
          particles.push(
            new Particle(
              event.clientX,
              event.clientY,
              Math.random() * 2 + 1,
              colors[Math.floor(Math.random() * colors.length)],
              {
                x: Math.cos(angleIncrement * i) * (Math.random() * 3),
                y: Math.sin(angleIncrement * i) * (Math.random() * 3),
              }
            )
          );
        }
      }

      animate();
      window.addEventListener("mousemove", createParticles);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-gray-900 to-gray-950 overflow-hidden">
        {/* Interactive particle canvas */}
        <canvas
          id="hero-canvas"
          className="absolute inset-0 z-0"
          style={{ pointerEvents: "none" }}
        ></canvas>

        {/* Floating grid pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.05]"></div>

        {/* Glowing border effect */}
        <div className="absolute inset-0 border-2 border-white/5 rounded-xl pointer-events-none animate-border-pulse"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            {/* Animated heading with gradient text */}
            <h2 className="text-5xl md:text-6xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 animate-text-gradient">
              Transform Your Learning Experience
            </h2>

            {/* Glowing text container */}
            <div className="relative inline-block max-w-3xl mb-12">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-2xl blur-2xl opacity-75 animate-glow"></div>
              <p className="relative text-xl text-gray-300 bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-white/10">
                Join the revolution in computer science education at{" "}
                <span className="font-semibold text-purple-300">
                  ENSA Khouribga
                </span>
                . Access cutting-edge resources, personalized learning paths,
                and expert guidance to accelerate your career.
              </p>
            </div>

            {/* Interactive button with particle effect */}
            <button
              onClick={() => navigate("/register")}
              className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-5 px-16 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/30 transform transition-all duration-300 hover:-translate-y-1"
            >
              <span className="relative z-10">Start Your Journey Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

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
          </div>
        </div>

        {/* Floating 3D elements */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full filter blur-3xl animate-float-delayed"></div>

        {/* Animated grid overlay */}
        <div className="absolute inset-0 opacity-10 pattern-dots pattern-blue-500 pattern-size-4 pattern-opacity-20" />
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <RecommendationCards />

        <section className="my-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-200">
              Explore Learning Resources
            </h1>
          </div>

          <ProductFilter />
          <ProductGrid />
        </section>
      </main>
      <FooterSection/>
    </div>
  );
};

export default Products;
