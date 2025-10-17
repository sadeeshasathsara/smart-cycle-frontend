import React, { useState, useEffect } from "react";
import {
  Recycle,
  Users,
  Target,
  Eye,
  Heart,
  Leaf,
  TrendingUp,
  Globe,
  Shield,
  Award,
  Zap,
  Lightbulb,
  CheckCircle,
  MapPin,
  Clock,
  BarChart3,
  Sparkles,
} from "lucide-react";
import Navbar from "../../components/global.components/navbar";
import Footer from "../../components/global.components/footer";

export default function AboutPage() {
  const [visibleElements, setVisibleElements] = useState(new Set());

  useEffect(() => {
    document.title = "About Us - Smart Cycle";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-animate-id");
            if (id) {
              setVisibleElements((prev) => new Set([...prev, id]));
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll("[data-animate-id]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const values = [
    {
      icon: Leaf,
      title: "Sustainability First",
      description:
        "Every decision we make prioritizes environmental impact and long-term sustainability for our planet.",
    },
    {
      icon: Users,
      title: "Community Focused",
      description:
        "We empower communities to take ownership of their waste management and environmental responsibility.",
    },
    {
      icon: Lightbulb,
      title: "Innovation Driven",
      description:
        "Leveraging cutting-edge technology to solve age-old waste management challenges efficiently.",
    },
    {
      icon: Shield,
      title: "Transparency & Trust",
      description:
        "Building trust through transparent operations, verified collectors, and real-time tracking.",
    },
  ];

  const milestones = [
    {
      year: "2021",
      title: "The Beginning",
      description:
        "Smart Cycle was founded with a vision to revolutionize urban waste management through technology.",
      icon: Sparkles,
    },
    {
      year: "2022",
      title: "First 10K Users",
      description:
        "Reached 10,000 active users across 5 cities, recycling over 100 tons of waste monthly.",
      icon: Users,
    },
    {
      year: "2023",
      title: "National Expansion",
      description:
        "Expanded operations to 25 cities with 500+ verified collectors on our platform.",
      icon: MapPin,
    },
    {
      year: "2024",
      title: "1 Million Tons",
      description:
        "Achieved milestone of 1 million tons of waste properly managed and recycled.",
      icon: TrendingUp,
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      description:
        "Environmental engineer with 15+ years of experience in sustainable waste management.",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      description:
        "Tech innovator passionate about using AI and IoT for environmental solutions.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Operations",
      description:
        "Logistics expert ensuring seamless waste collection across all service areas.",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "David Kumar",
      role: "Sustainability Director",
      description:
        "Environmental scientist dedicated to maximizing recycling rates and reducing landfill waste.",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
  ];

  const stats = [
    { value: "50K+", label: "Active Users", icon: Users },
    { value: "25+", label: "Cities Served", icon: MapPin },
    { value: "1M+", label: "Tons Recycled", icon: Recycle },
    { value: "98%", label: "Customer Satisfaction", icon: Award },
  ];

  return (
    <div className="bg-white">
      <Navbar />
      <style jsx="true">{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-up.visible {
          opacity: 1;
        }

        .animation-delay-200.visible {
          animation-delay: 200ms;
        }

        .animation-delay-400.visible {
          animation-delay: 400ms;
        }

        .stagger-delay-100.visible {
          animation-delay: 100ms;
        }

        .stagger-delay-200.visible {
          animation-delay: 200ms;
        }

        .stagger-delay-300.visible {
          animation-delay: 300ms;
        }

        .stagger-delay-400.visible {
          animation-delay: 400ms;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-600"></div>
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
            }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className={`inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-fade-in-up ${
              visibleElements.has("hero-badge") ? "visible" : ""
            }`}
            data-animate-id="hero-badge"
          >
            <Recycle className="h-5 w-5 text-white" />
            <span className="text-sm font-medium text-white">
              About Smart Cycle
            </span>
          </div>

          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up animation-delay-200 ${
              visibleElements.has("hero-title") ? "visible" : ""
            }`}
            data-animate-id="hero-title"
          >
            Building a Sustainable Future,
            <br />
            One Collection at a Time
          </h1>

          <p
            className={`text-xl text-white/90 max-w-3xl mx-auto animate-fade-in-up animation-delay-400 ${
              visibleElements.has("hero-desc") ? "visible" : ""
            }`}
            data-animate-id="hero-desc"
          >
            We're on a mission to transform waste management through innovative
            technology, making it easier for everyone to contribute to a
            cleaner, greener planet.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <div
              className={`animate-fade-in-up ${
                visibleElements.has("mission-card") ? "visible" : ""
              }`}
              data-animate-id="mission-card"
            >
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-emerald-100">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-full mb-6">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  To revolutionize waste management by connecting communities
                  with reliable collection services, promoting recycling, and
                  making sustainable practices accessible to everyone through
                  innovative technology.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div
              className={`animate-fade-in-up animation-delay-200 ${
                visibleElements.has("vision-card") ? "visible" : ""
              }`}
              data-animate-id="vision-card"
            >
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-blue-100">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-6">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Our Vision
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  A world where waste is managed efficiently, resources are
                  preserved, and every individual has the tools to make
                  environmentally conscious decisions that create lasting
                  positive impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center space-x-2 bg-emerald-600/10 rounded-full px-4 py-2 mb-4"
              data-animate-id="values-badge"
            >
              <Heart className="h-5 w-5 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-600">
                Our Values
              </span>
            </div>
            <h2
              className={`text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up ${
                visibleElements.has("values-title") ? "visible" : ""
              }`}
              data-animate-id="values-title"
            >
              What Drives Us Forward
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              const animateId = `value-${index}`;
              const delayClass = `stagger-delay-${(index + 1) * 100}`;

              return (
                <div
                  key={index}
                  className={`bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group cursor-pointer animate-fade-in-up ${delayClass} ${
                    visibleElements.has(animateId) ? "visible" : ""
                  }`}
                  data-animate-id={animateId}
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-600/10 rounded-full mb-4 group-hover:bg-emerald-600/20 group-hover:scale-110 transition-all duration-300">
                    <IconComponent className="h-7 w-7 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Journey/Timeline Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center space-x-2 bg-blue-600/10 rounded-full px-4 py-2 mb-4"
              data-animate-id="journey-badge"
            >
              <Clock className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">
                Our Journey
              </span>
            </div>
            <h2
              className={`text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up ${
                visibleElements.has("journey-title") ? "visible" : ""
              }`}
              data-animate-id="journey-title"
            >
              Milestones That Matter
            </h2>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-emerald-600 to-teal-600"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => {
                const IconComponent = milestone.icon;
                const animateId = `milestone-${index}`;
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={index}
                    className={`relative animate-fade-in-up ${
                      visibleElements.has(animateId) ? "visible" : ""
                    }`}
                    data-animate-id={animateId}
                  >
                    <div
                      className={`lg:flex lg:items-center ${
                        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                      }`}
                    >
                      {/* Content */}
                      <div className="lg:w-5/12">
                        <div
                          className={`bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group cursor-pointer ${
                            isEven ? "lg:text-right" : "lg:text-left"
                          }`}
                        >
                          <div
                            className={`inline-flex items-center space-x-2 bg-emerald-600/10 rounded-full px-3 py-1 mb-3 ${
                              isEven ? "lg:ml-auto" : ""
                            }`}
                          >
                            <span className="text-sm font-bold text-emerald-600">
                              {milestone.year}
                            </span>
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors duration-300">
                            {milestone.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                            {milestone.description}
                          </p>
                        </div>
                      </div>

                      {/* Center Icon */}
                      <div className="hidden lg:flex lg:w-2/12 justify-center">
                        <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white z-10">
                          <IconComponent className="h-8 w-8 text-white" />
                        </div>
                      </div>

                      {/* Spacer */}
                      <div className="hidden lg:block lg:w-5/12"></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center space-x-2 bg-teal-600/10 rounded-full px-4 py-2 mb-4"
              data-animate-id="team-badge"
            >
              <Users className="h-5 w-5 text-teal-600" />
              <span className="text-sm font-medium text-teal-600">
                Leadership Team
              </span>
            </div>
            <h2
              className={`text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up ${
                visibleElements.has("team-title") ? "visible" : ""
              }`}
              data-animate-id="team-title"
            >
              Meet the Minds Behind Smart Cycle
            </h2>
            <p
              className={`text-lg text-gray-600 max-w-3xl mx-auto animate-fade-in-up animation-delay-200 ${
                visibleElements.has("team-desc") ? "visible" : ""
              }`}
              data-animate-id="team-desc"
            >
              A passionate team of innovators, environmental experts, and tech
              enthusiasts dedicated to creating a cleaner future.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => {
              const animateId = `team-${index}`;
              const delayClass = `stagger-delay-${(index + 1) * 100}`;

              return (
                <div
                  key={index}
                  className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group cursor-pointer animate-fade-in-up ${delayClass} ${
                    visibleElements.has(animateId) ? "visible" : ""
                  }`}
                  data-animate-id={animateId}
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-emerald-600 font-semibold mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-fade-in-up ${
                visibleElements.has("stats-title") ? "visible" : ""
              }`}
              data-animate-id="stats-title"
            >
              Our Impact in Numbers
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              const animateId = `stat-${index}`;
              const delayClass = `stagger-delay-${(index + 1) * 100}`;

              return (
                <div
                  key={index}
                  className={`bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group cursor-pointer border border-emerald-100 animate-fade-in-up ${delayClass} ${
                    visibleElements.has(animateId) ? "visible" : ""
                  }`}
                  data-animate-id={animateId}
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-600 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-7 w-7 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors duration-300">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 md:p-12 text-center hover:shadow-2xl transition-all duration-500 transform hover:scale-101 relative overflow-hidden group animate-fade-in-up ${
              visibleElements.has("cta-section") ? "visible" : ""
            }`}
            data-animate-id="cta-section"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-700/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 relative z-10">
              Ready to Make a Difference?
            </h3>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto relative z-10">
              Join our growing community of environmentally conscious
              individuals and organizations making waste management smarter and
              greener.
            </p>
            <button className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-103 cursor-pointer relative z-10 border-2 border-transparent hover:border-white/30">
              Get Started Today
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
