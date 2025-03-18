import React, { useEffect } from "react";

const HeroSection = () => {
  useEffect(() => {
    // Simple animation for background particles
    const canvas = document.getElementById("hero-canvas");
    if (canvas) {
      const ctx = canvas.getContext("2d");
      canvas.width = window.innerWidth;
      canvas.height = 600;

      const particles = [];
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 3 + 1,
          speedX: Math.random() * 1 - 0.5,
          speedY: Math.random() * 1 - 0.5,
          opacity: Math.random() * 0.5 + 0.3,
        });
      }

      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";

        particles.forEach((p) => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
          ctx.fill();

          p.x += p.speedX;
          p.y += p.speedY;

          if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
          if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        });

        requestAnimationFrame(animate);
      }

      animate();
    }
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-800 to-purple-900 text-white py-24">
      <canvas id="hero-canvas" className="absolute inset-0 z-0"></canvas>

      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full filter blur-3xl opacity-20 translate-x-1/3 translate-y-1/3"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
            <div className="inline-block mb-4 bg-white/10 backdrop-blur-sm px-4 py-1 rounded-full">
              <span className="text-xs uppercase tracking-wider font-semibold">
                ENSA Khouribga
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              GI{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
                elearning
              </span>{" "}
              Platform
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-2xl">
              Your ultimate digital learning experience for computer science
              excellence.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-3 px-8 rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transform hover:-translate-y-1 transition-all duration-300">
                Get Started
              </button>
              <button className="bg-white/10 backdrop-blur-sm border border-white/20 py-3 px-8 rounded-xl hover:bg-white/20 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="relative bg-gradient-to-tr from-blue-900/80 to-indigo-900/80 backdrop-blur-sm rounded-2xl shadow-2xl p-4 border border-white/10 transform rotate-2 hover:rotate-0 transition-all duration-500">
              <img
                src="https://via.placeholder.com/600x400"
                alt="Platform preview"
                className="rounded-lg shadow-lg transform -rotate-2 hover:rotate-0 transition-all duration-500"
              />
              <div className="absolute -top-6 -right-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg shadow-lg p-3 transform rotate-12 hover:rotate-6 transition-all duration-300">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="absolute -bottom-10 -left-10 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl shadow-lg p-4 transform -rotate-6 hover:rotate-0 transition-all duration-300 z-20">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="mt-2 bg-white rounded p-2">
                <code className="text-xs text-indigo-800">
                  class GILearning extends Future {}
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
