import React, { useState, useEffect } from "react";
import {
  Heart,
  Recycle,
  Users,
  TreePine,
  Globe,
  Target,
  CheckCircle,
  TrendingUp,
  Award,
  Sparkles,
  Leaf,
  DollarSign,
  CreditCard,
  Building,
  UserCheck,
  Clock,
  Shield,
  Star,
} from "lucide-react";
import Navbar from "../../components/global.components/navbar";
import Footer from "../../components/global.components/footer";

export default function DonatePage() {
  const [visibleElements, setVisibleElements] = useState(new Set());
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState("");
  const [donationType, setDonationType] = useState("one-time");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    amount: 50,
    message: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    document.title = "Donate - Smart Cycle";

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

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount("");
    setFormData((prev) => ({ ...prev, amount }));
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    setCustomAmount(value);
    setSelectedAmount(null);
    setFormData((prev) => ({ ...prev, amount: parseFloat(value) || 0 }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({
        fullName: "",
        email: "",
        amount: 50,
        message: "",
      });
      setSelectedAmount(50);
      setCustomAmount("");
      setDonationType("one-time");
    }, 4000);
  };

  const donationAmounts = [25, 50, 100, 250, 500, 1000];

  const impactStats = [
    {
      icon: Recycle,
      value: "500 kg",
      label: "Waste Recycled",
      amount: "$25",
    },
    {
      icon: TreePine,
      value: "10 Trees",
      label: "Worth of Impact",
      amount: "$50",
    },
    {
      icon: Users,
      value: "50 Families",
      label: "Communities Served",
      amount: "$100",
    },
    {
      icon: Globe,
      value: "1 Ton CO₂",
      label: "Carbon Offset",
      amount: "$250",
    },
  ];

  const impactAreas = [
    {
      icon: Recycle,
      title: "Waste Collection Programs",
      description:
        "Support efficient waste collection services in underserved communities.",
      percentage: 40,
    },
    {
      icon: Users,
      title: "Community Education",
      description:
        "Fund workshops and training programs on sustainable waste management.",
      percentage: 30,
    },
    {
      icon: Leaf,
      title: "Technology Innovation",
      description:
        "Invest in developing better recycling and tracking technologies.",
      percentage: 20,
    },
    {
      icon: Target,
      title: "Infrastructure Development",
      description:
        "Build recycling centers and collection points in new areas.",
      percentage: 10,
    },
  ];

  const testimonials = [
    {
      name: "Jennifer Martinez",
      role: "Monthly Donor",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      message:
        "Supporting Smart Cycle has been incredibly rewarding. Knowing my contribution helps communities manage waste better gives me such satisfaction.",
    },
    {
      name: "Robert Chen",
      role: "Corporate Partner",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      message:
        "Our company's partnership with Smart Cycle aligns perfectly with our sustainability goals. The transparency and impact are remarkable.",
    },
    {
      name: "Lisa Thompson",
      role: "Annual Supporter",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      message:
        "I've been donating to Smart Cycle for two years now. Seeing the growth and positive change in my community has been amazing.",
    },
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Tax Deductible",
      description: "All donations are 100% tax deductible",
    },
    {
      icon: TrendingUp,
      title: "Transparent Impact",
      description: "Track exactly how your donation is used",
    },
    {
      icon: Award,
      title: "Recognition",
      description: "Certificate of appreciation for donors",
    },
    {
      icon: UserCheck,
      title: "Updates",
      description: "Regular reports on project progress",
    },
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
                "url('https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
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
            <Heart className="h-5 w-5 text-white" />
            <span className="text-sm font-medium text-white">
              Make an Impact
            </span>
          </div>

          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up animation-delay-200 ${
              visibleElements.has("hero-title") ? "visible" : ""
            }`}
            data-animate-id="hero-title"
          >
            Your Support Creates
            <br />
            Lasting Environmental Change
          </h1>

          <p
            className={`text-xl text-white/90 max-w-3xl mx-auto animate-fade-in-up animation-delay-400 ${
              visibleElements.has("hero-desc") ? "visible" : ""
            }`}
            data-animate-id="hero-desc"
          >
            Help us build a sustainable future by supporting waste management
            programs, community education, and innovative recycling solutions.
          </p>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-fade-in-up ${
                visibleElements.has("impact-title") ? "visible" : ""
              }`}
              data-animate-id="impact-title"
            >
              Your Donation Impact
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See the real-world impact your contribution can make
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => {
              const IconComponent = stat.icon;
              const animateId = `impact-${index}`;
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
                  <div className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors duration-300">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 mb-2">{stat.label}</div>
                  <div className="text-emerald-600 font-bold text-lg">
                    {stat.amount}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Donation Form */}
            <div
              className={`animate-fade-in-up ${
                visibleElements.has("donation-form") ? "visible" : ""
              }`}
              data-animate-id="donation-form"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Make a Donation
                  </h2>
                  <p className="text-gray-600">
                    Choose your contribution amount and help us create a cleaner
                    planet
                  </p>
                </div>

                {/* Donation Type Toggle */}
                <div className="mb-6">
                  <div className="flex gap-3 bg-gray-100 p-1 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setDonationType("one-time")}
                      className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                        donationType === "one-time"
                          ? "bg-emerald-600 text-white shadow-md"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      One-Time
                    </button>
                    <button
                      type="button"
                      onClick={() => setDonationType("monthly")}
                      className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                        donationType === "monthly"
                          ? "bg-emerald-600 text-white shadow-md"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Monthly
                    </button>
                  </div>
                </div>

                {/* Amount Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Select Amount
                  </label>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {donationAmounts.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => handleAmountSelect(amount)}
                        className={`py-4 px-4 rounded-lg border-2 font-bold text-lg transition-all duration-300 ${
                          selectedAmount === amount
                            ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                            : "border-gray-200 hover:border-emerald-300 text-gray-700"
                        }`}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount */}
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      placeholder="Custom amount"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 outline-none"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 outline-none"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Message (Optional)
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 outline-none resize-none"
                      placeholder="Share why you're supporting Smart Cycle..."
                    ></textarea>
                  </div>
                </div>

                {/* Success Message */}
                {showSuccess && (
                  <div className="mb-6 flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <p className="text-green-700 font-medium">
                      Thank you for your generous donation! You'll receive a
                      confirmation email shortly.
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  className="w-full bg-emerald-600 text-white px-6 py-4 rounded-lg font-semibold text-lg hover:bg-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-102 flex items-center justify-center space-x-2"
                >
                  <Heart className="h-5 w-5" />
                  <span>
                    Donate ${selectedAmount || customAmount || "0"}
                    {donationType === "monthly" && "/month"}
                  </span>
                </button>

                <div className="mt-4 flex items-center justify-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Shield className="h-4 w-4" />
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CreditCard className="h-4 w-4" />
                    <span>All Cards Accepted</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Impact Areas */}
            <div
              className={`animate-fade-in-up animation-delay-200 ${
                visibleElements.has("impact-areas") ? "visible" : ""
              }`}
              data-animate-id="impact-areas"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Where Your Donation Goes
                </h2>
                <p className="text-gray-600">
                  We're committed to transparent use of every dollar donated
                </p>
              </div>

              <div className="space-y-6">
                {impactAreas.map((area, index) => {
                  const IconComponent = area.icon;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-600/10 rounded-full">
                            <IconComponent className="h-6 w-6 text-emerald-600" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-bold text-gray-900">
                              {area.title}
                            </h3>
                            <span className="text-emerald-600 font-bold text-lg">
                              {area.percentage}%
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">
                            {area.description}
                          </p>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-emerald-600 h-2 rounded-full transition-all duration-1000"
                              style={{ width: `${area.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Donor Benefits */}
              <div className="mt-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Donor Benefits
                </h3>
                <div className="space-y-3">
                  {benefits.map((benefit, index) => {
                    const BenefitIcon = benefit.icon;
                    return (
                      <div key={index} className="flex items-start space-x-3">
                        <BenefitIcon className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-gray-900">
                            {benefit.title}
                          </div>
                          <div className="text-sm text-gray-600">
                            {benefit.description}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-emerald-600/10 rounded-full px-4 py-2 mb-4">
              <Star className="h-5 w-5 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-600">
                Donor Stories
              </span>
            </div>
            <h2
              className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-fade-in-up ${
                visibleElements.has("testimonials-title") ? "visible" : ""
              }`}
              data-animate-id="testimonials-title"
            >
              What Our Supporters Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => {
              const animateId = `testimonial-${index}`;
              const delayClass = `stagger-delay-${(index + 1) * 100}`;

              return (
                <div
                  key={index}
                  className={`bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 animate-fade-in-up ${delayClass} ${
                    visibleElements.has(animateId) ? "visible" : ""
                  }`}
                  data-animate-id={animateId}
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-gray-900">
                        {testimonial.name}
                      </h3>
                      <p className="text-emerald-600 text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    "{testimonial.message}"
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 md:p-12 text-center hover:shadow-2xl transition-all duration-500 transform hover:scale-101 relative overflow-hidden group animate-fade-in-up ${
              visibleElements.has("cta-section") ? "visible" : ""
            }`}
            data-animate-id="cta-section"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-700/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <Sparkles className="h-16 w-16 text-white mx-auto mb-6 relative z-10" />
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 relative z-10">
              Every Contribution Counts
            </h3>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto relative z-10">
              Join our community of changemakers who are committed to building a
              sustainable future through better waste management practices.
            </p>
            <div className="flex flex-wrap justify-center gap-4 relative z-10">
              <button className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-103 cursor-pointer border-2 border-transparent hover:border-white/30">
                Become a Monthly Donor
              </button>
              <button className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-emerald-600 cursor-pointer">
                Corporate Partnerships
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
