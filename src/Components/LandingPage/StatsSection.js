import React, { useEffect, useState } from "react";

const StatsSection = () => {
  const stats = [
    { id: 1, title: "Active Students", value: 2500, suffix: "+", icon: "👨🎓" },
    { id: 2, title: "Course Modules", value: 120, suffix: "+", icon: "📚" },
    { id: 3, title: "Practice Hours", value: 10000, suffix: "+", icon: "⏳" },
    { id: 4, title: "Success Rate", value: 98, suffix: "%", icon: "🚀" },
  ];

  const [counters, setCounters] = useState(stats.map(() => 0));

  useEffect(() => {
    const duration = 3000; // Animation duration in ms
    const startTime = Date.now();

    const updateCounters = () => {
      const progress = Math.min(1, (Date.now() - startTime) / duration);

      setCounters(
        stats.map((stat, i) => {
          if (stat.suffix === "%") {
            return Math.floor(progress * stat.value);
          }
          return Math.floor(progress * (stat.value * 0.8)); // Slow down slightly
        })
      );

      if (progress < 1) {
        requestAnimationFrame(updateCounters);
      }
    };

    requestAnimationFrame(updateCounters);
  }, []);

  return (
    <section className="relative py-24 bg-gradient-to-br from-purple-50 to-blue-50 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-30 animate-float-delayed"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-semibold rounded-full mb-6 shadow-lg">
            ACADEMIC EXCELLENCE
          </div>
          <h2 className="text-4xl font-bold mb-6">
            Transforming Computer Science Education
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of students who have already revolutionized their
            learning experience with our comprehensive platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className="group relative bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="mb-6 text-4xl">{stat.icon}</div>
                <div className="flex items-baseline mb-2">
                  <span className="text-5xl font-bold text-gray-900">
                    {counters[index]}
                  </span>
                  {stat.suffix && (
                    <span className="text-2xl ml-2 text-purple-600">
                      {stat.suffix}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {stat.title}
                </h3>
              </div>

              {/* Hover effect line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Animated floating elements */}
        <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-purple-200 rounded-full filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-blue-300 rounded-full filter blur-xl opacity-20 animate-float-delayed"></div>
      </div>

      {/* Glowing particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
            }}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
