import React, { useState, useEffect } from "react";
import img1 from "./img/pexels-pixabay-247322.jpg";
import img2 from "./img/pexels-italo-melo-881954-2379005.jpg";
import img3 from "./img/pexels-vinicius-wiesehofer-289347-1130626.jpg";
import img4 from "./img/pexels-moh-adbelghaffar-764529.jpg";
import img5 from "./img/pexels-brynna-spencer-63356-227294.jpg";
import img6 from "./img/pexels-lolarussian-1855582.jpg";
import img7 from "./img/pexels-moose-photos-170195-1587009.jpg";
import img8 from "./img/pexels-olly-762020.jpg";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Ahmed Benali",
      role: "3rd Year Computer Science Student",
      image: img2,
      quote:
        "This platform has completely transformed how I study. The course materials are well-organized and the practice exercises have helped me improve my coding skills significantly.",
    },
    {
      name: "Dr. Laila Mokhtar",
      role: "Professor of Computer Science",
      image: img1,
      quote:
        "As an educator, I find this platform extremely useful for sharing course materials and monitoring student progress. It has streamlined the way I teach and interact with my students.",
    },
    {
      name: "Fatima Zahra",
      role: "Graduate Student",
      image: img3,
      quote:
        "The recommendation system is amazing! It helped me discover resources that perfectly matched my learning needs. I especially appreciate the exam preparation materials.",
    },
    // Additional testimonials
    {
      name: "Imane Kaddouri",
      role: "Software Engineering Student",
      image: img4,
      quote:
        "The interactive coding challenges pushed me to think differently. I've improved my problem-solving skills tremendously and landed an internship at a top tech company!",
    },
    {
      name: "Prof. Nadia El Ouazzani",
      role: "Department Chair, Computer Engineering",
      image: img5,
      quote:
        "This platform bridges the gap between theoretical knowledge and practical application. My students are more engaged than ever and show remarkable improvement in their projects.",
    },
    {
      name: "Aroua Tazi",
      role: "Recent Graduate & Junior Developer",
      image: img6,
      quote:
        "I credit this platform for helping me transition from student to professional. The career resources and industry-focused projects gave me exactly what I needed to succeed in interviews.",
    },
    {
      name: "Amina Bouali",
      role: "Distance Learning Student",
      image: img7,
      quote:
        "As someone studying remotely, this platform has been invaluable. The virtual labs and collaborative features make me feel connected to my peers despite the physical distance.",
    },
    {
      name: "Dr. Hassan Mekouar",
      role: "AI Research Scientist",
      image: img8,
      quote:
        "The advanced courses are comprehensive and up-to-date with the latest developments in machine learning and artificial intelligence. I recommend this to all my research assistants.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-24 bg-gradient-to-br from-indigo-900 to-blue-900 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl opacity-10"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-blue-200 text-sm font-semibold mb-4">
            TESTIMONIALS
          </div>
          <h2 className="text-4xl font-bold mb-6">What Our Users Say</h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative h-96">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 transform ${
                  index === activeIndex
                    ? "opacity-100 translate-x-0"
                    : index < activeIndex
                    ? "opacity-0 -translate-x-full"
                    : "opacity-0 translate-x-full"
                }`}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 h-full">
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <svg
                        className="w-12 h-12 text-blue-300 mb-6 opacity-50"
                        fill="currentColor"
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10 8c-2.2 0-4 1.8-4 4v10h10V12h-6c0-1.1 0.9-2 2-2h2V8h-4zm12 0c-2.2 0-4 1.8-4 4v10h10V12h-6c0-1.1 0.9-2 2-2h2V8h-4z" />
                      </svg>
                      <p className="text-xl mb-8 leading-relaxed">
                        {testimonial.quote}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-white/30 mr-4"
                      />
                      <div>
                        <h4 className="font-bold text-lg">
                          {testimonial.name}
                        </h4>
                        <p className="text-blue-200">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "bg-white w-8" : "bg-white/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
