import React, { useState, useEffect } from "react";
import {
  Recycle,
  Users,
  Building2,
  Leaf,
  Trash2,
  Clock,
  TrendingUp,
  MapPin,
  Calendar,
  BarChart3,
  Award,
  DollarSign,
  Smartphone,
  Globe,
  CheckCircle,
  Target,
  ArrowRight,
  Lightbulb,
  Shield,
  Zap,
  PackageCheck,
} from "lucide-react";

export default function SmartCycleSections() {
  const [visibleElements, setVisibleElements] = useState(new Set());

  useEffect(() => {
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

  const problems = [
    {
      icon: Trash2,
      title: "Inefficient waste collection",
      description:
        "Irregular pickup schedules and unclear collection times lead to overflowing bins and missed collections.",
    },
    {
      icon: Clock,
      title: "Lack of transparency in service",
      description:
        "Residents struggle to track collection status, report issues, or know when to expect pickups.",
    },
    {
      icon: Globe,
      title: "Limited recycling participation",
      description:
        "Without proper incentives and education, recycling rates remain low and environmental impact grows.",
    },
  ];

  const howItWorksSteps = [
    {
      id: 1,
      icon: Calendar,
      title: "Schedule Collection",
      description: "Request pickups through our app with flexible time slots",
      color: "bg-emerald-600",
      lightBg: "bg-emerald-600/10",
    },
    {
      id: 2,
      icon: MapPin,
      title: "Track in Real-Time",
      description:
        "Monitor collector location and receive arrival notifications",
      color: "bg-blue-600",
      lightBg: "bg-blue-600/10",
    },
    {
      id: 3,
      icon: PackageCheck,
      title: "Waste Collection",
      description: "Collectors arrive, verify waste type, and complete pickup",
      color: "bg-cyan-600",
      lightBg: "bg-cyan-600/10",
    },
    {
      id: 4,
      icon: DollarSign,
      title: "Easy Payment",
      description: "Automated billing and earn points for recycling efforts",
      color: "bg-green-600",
      lightBg: "bg-green-600/10",
    },
  ];

  const keyFeatures = [
    {
      icon: Smartphone,
      title: "Mobile App Access",
      description:
        "Manage collections, payments, and track waste from anywhere",
      color: "text-blue-600",
      bgColor: "bg-blue-600/10",
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description:
        "Flexible pickup times that fit your schedule with reminders",
      color: "text-cyan-600",
      bgColor: "bg-cyan-600/10",
    },
    {
      icon: MapPin,
      title: "Real-Time Tracking",
      description: "Live GPS tracking of collection vehicles and ETA updates",
      color: "text-emerald-600",
      bgColor: "bg-emerald-600/10",
    },
    {
      icon: Award,
      title: "Rewards Program",
      description: "Earn points for recycling and redeem for discounts",
      color: "text-green-600",
      bgColor: "bg-green-600/10",
    },
    {
      icon: DollarSign,
      title: "Seamless Payments",
      description: "Multiple payment options with automatic billing support",
      color: "text-blue-600",
      bgColor: "bg-blue-600/10",
    },
    {
      icon: BarChart3,
      title: "Impact Dashboard",
      description: "Visualize your waste reduction and recycling metrics",
      color: "text-cyan-600",
      bgColor: "bg-cyan-600/10",
    },
    {
      icon: Recycle,
      title: "Waste Categorization",
      description: "Easy sorting guides for proper recycling and disposal",
      color: "text-emerald-600",
      bgColor: "bg-emerald-600/10",
    },
    {
      icon: Shield,
      title: "Verified Collectors",
      description: "Licensed and background-checked collection professionals",
      color: "text-green-600",
      bgColor: "bg-green-600/10",
    },
  ];

  return (
    <div className="bg-white">
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

        @keyframes pulseArrow {
          0%,
          100% {
            opacity: 0.6;
            transform: translateX(0);
          }
          50% {
            opacity: 1;
            transform: translateX(4px);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-up.visible {
          opacity: 1;
        }

        .animate-pulse-arrow {
          animation: pulseArrow 2s ease-in-out infinite;
        }

        .animation-delay-200.visible {
          animation-delay: 200ms;
        }

        .animation-delay-400.visible {
          animation-delay: 400ms;
        }

        .animation-delay-800.visible {
          animation-delay: 800ms;
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

      {/* Problem & Mission Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center space-x-2 bg-emerald-600/10 rounded-full px-4 py-2 mb-4"
              data-animate-id="problem-badge"
            >
              <Target className="h-5 w-5 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-600">
                Why Smart Cycle?
              </span>
            </div>
            <h2
              className={`text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up ${
                visibleElements.has("problem-title") ? "visible" : ""
              }`}
              data-animate-id="problem-title"
            >
              Revolutionizing Waste Management
            </h2>
            <p
              className={`text-lg text-gray-600 max-w-3xl mx-auto animate-fade-in-up animation-delay-200 ${
                visibleElements.has("problem-desc") ? "visible" : ""
              }`}
              data-animate-id="problem-desc"
            >
              We're solving critical challenges in urban waste management while
              promoting sustainable practices and environmental responsibility.
            </p>
          </div>

          {/* Problem Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {problems.map((problem, index) => {
              const IconComponent = problem.icon;
              const animateId = `problem-card-${index}`;
              const delayClass =
                index === 0
                  ? ""
                  : index === 1
                  ? "stagger-delay-200"
                  : "stagger-delay-400";

              return (
                <div
                  key={index}
                  className={`bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl hover:border-emerald-600/30 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 animate-fade-in-up cursor-pointer group ${delayClass} ${
                    visibleElements.has(animateId) ? "visible" : ""
                  }`}
                  data-animate-id={animateId}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-emerald-600/10 p-3 rounded-lg group-hover:bg-emerald-600/20 group-hover:scale-110 transition-all duration-300">
                      <IconComponent className="h-6 w-6 text-emerald-600 group-hover:text-emerald-700 transition-colors duration-300" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300">
                      {problem.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {problem.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Mission Statement */}
          <div
            className={`bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 md:p-12 text-center border border-emerald-600/20 animate-fade-in-up will-change-transform transition-transform duration-500 hover:scale-[1.006] ${
              visibleElements.has("mission-statement") ? "visible" : ""
            }`}
            data-animate-id="mission-statement"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6 transition-transform duration-500 hover:rotate-6 border-2 border-white backdrop-blur-sm">
              <Lightbulb className="h-8 w-8 text-white" />
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
              Our Mission
            </h3>
            <p className="text-lg md:text-xl text-white/90 font-medium italic max-w-4xl mx-auto">
              "We empower communities to manage waste responsibly through
              technology, creating cleaner cities and a sustainable future."
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-7">
              <button className="bg-white flex items-center justify-center gap-2 text-emerald-600 w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-103 cursor-pointer relative z-10 border-2 border-transparent hover:border-white/30">
                <Calendar size={20} /> Schedule Pickup
              </button>
              <button className="bg-white flex items-center justify-center gap-2 text-emerald-600 w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-103 cursor-pointer relative z-10 border-2 border-transparent hover:border-white/30">
                <Leaf size={20} /> Track Impact
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center space-x-2 bg-cyan-600/10 rounded-full px-4 py-2 mb-4"
              data-animate-id="works-badge"
            >
              <Zap className="h-5 w-5 text-cyan-600" />
              <span className="text-sm font-medium text-cyan-600">
                Simple Process
              </span>
            </div>
            <h2
              className={`text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up ${
                visibleElements.has("works-title") ? "visible" : ""
              }`}
              data-animate-id="works-title"
            >
              How Smart Cycle Works
            </h2>
            <p
              className={`text-lg text-gray-600 max-w-3xl mx-auto animate-fade-in-up animation-delay-200 ${
                visibleElements.has("works-desc") ? "visible" : ""
              }`}
              data-animate-id="works-desc"
            >
              From scheduling to payment, our streamlined process makes waste
              management effortless and transparent.
            </p>
          </div>

          {/* How It Works Steps */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((step, index) => {
              const IconComponent = step.icon;
              const animateId = `works-step-${index}`;
              const delayClass = `stagger-delay-${(index + 1) * 100}`;

              return (
                <div key={step.id} className="relative group">
                  <div
                    className={`bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 animate-fade-in-up cursor-pointer border-2 border-transparent hover:border-emerald-600/30 ${delayClass} ${
                      visibleElements.has(animateId) ? "visible" : ""
                    }`}
                    data-animate-id={animateId}
                  >
                    {/* Step Number */}
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div
                        className={`w-8 h-8 ${step.color} rounded-full flex items-center justify-center text-white font-bold text-sm group-hover:scale-125 transition-transform duration-300 shadow-lg`}
                      >
                        {step.id}
                      </div>
                    </div>

                    {/* Icon */}
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 ${step.lightBg} rounded-full mb-4 mt-2 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                    >
                      <IconComponent
                        className={`h-8 w-8 ${step.color.replace(
                          "bg-",
                          "text-"
                        )} group-hover:scale-110 transition-transform duration-300`}
                      />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {step.description}
                    </p>
                  </div>

                  {/* Animated Arrow */}
                  {index < howItWorksSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ArrowRight className="h-8 w-8 text-emerald-600/60 animate-pulse-arrow hover:text-emerald-600 transition-colors duration-300" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center space-x-2 bg-green-600/10 rounded-full px-4 py-2 mb-4"
              data-animate-id="features-badge"
            >
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-600">
                Platform Features
              </span>
            </div>
            <h2
              className={`text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up ${
                visibleElements.has("features-title") ? "visible" : ""
              }`}
              data-animate-id="features-title"
            >
              Powerful Features for Smart Waste Management
            </h2>
            <p
              className={`text-lg text-gray-600 max-w-3xl mx-auto animate-fade-in-up animation-delay-200 ${
                visibleElements.has("features-desc") ? "visible" : ""
              }`}
              data-animate-id="features-desc"
            >
              Discover comprehensive tools that make waste collection, tracking,
              and payment seamless for everyone.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              const animateId = `feature-card-${index}`;
              const delayClass = `stagger-delay-${((index % 4) + 1) * 100}`;

              return (
                <div
                  key={index}
                  className={`bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 group cursor-pointer animate-fade-in-up hover:border-emerald-600/30 ${delayClass} ${
                    visibleElements.has(animateId) ? "visible" : ""
                  }`}
                  data-animate-id={animateId}
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 ${feature.bgColor} rounded-lg mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 group-hover:shadow-lg`}
                  >
                    <IconComponent
                      className={`h-6 w-6 ${feature.color} group-hover:scale-110 transition-transform duration-300`}
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Call to Action */}
          <div
            className={`text-center mt-16 animate-fade-in-up animation-delay-800 ${
              visibleElements.has("cta-section") ? "visible" : ""
            }`}
            data-animate-id="cta-section"
          >
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 md:p-12 hover:shadow-2xl transition-all duration-500 transform hover:scale-101 relative overflow-hidden group">
              {/* Animated Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-700/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 relative z-10">
                Ready to Go Green?
              </h3>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto relative z-10">
                Join thousands of households and businesses already using Smart
                Cycle for efficient, eco-friendly waste management.
              </p>
              <button className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-103 cursor-pointer relative z-10 border-2 border-transparent hover:border-white/30">
                Get Started Today
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "50K+", label: "Active Users", icon: Users },
              { value: "1M+", label: "Tons Recycled", icon: Recycle },
              { value: "98%", label: "On-Time Pickups", icon: Clock },
              { value: "500+", label: "Verified Collectors", icon: Award },
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              const animateId = `stat-${index}`;
              const delayClass = `stagger-delay-${(index + 1) * 100}`;

              return (
                <div
                  key={index}
                  className={`bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group cursor-pointer animate-fade-in-up ${delayClass} ${
                    visibleElements.has(animateId) ? "visible" : ""
                  }`}
                  data-animate-id={animateId}
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-600/10 rounded-full mb-4 group-hover:bg-emerald-600/20 group-hover:scale-110 transition-all duration-300">
                    <IconComponent className="h-7 w-7 text-emerald-600" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors duration-300">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium group-hover:text-gray-700 transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
