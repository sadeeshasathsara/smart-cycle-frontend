import React, { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Headphones,
  Globe,
  CheckCircle,
  AlertCircle,
  Recycle,
  Users,
  Building,
  HelpCircle,
} from "lucide-react";
import Navbar from "../../components/global.components/navbar";
import Footer from "../../components/global.components/footer";

export default function ContactPage() {
  const [visibleElements, setVisibleElements] = useState(new Set());
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "general",
  });
  const [formStatus, setFormStatus] = useState(null);

  useEffect(() => {
    document.title = "Contact Us - Smart Cycle";

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus("success");
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        inquiryType: "general",
      });
      setFormStatus(null);
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      details: ["+1 (555) 123-4567", "+1 (555) 765-4321"],
      description: "Mon-Fri from 8am to 6pm",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["support@smartcycle.com", "info@smartcycle.com"],
      description: "We'll respond within 24 hours",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["123 Green Street", "Eco City, EC 12345"],
      description: "Headquarters",
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Monday - Friday: 8am - 6pm", "Saturday: 9am - 4pm"],
      description: "Sunday: Closed",
    },
  ];

  const inquiryTypes = [
    { value: "general", label: "General Inquiry", icon: MessageSquare },
    { value: "support", label: "Technical Support", icon: Headphones },
    { value: "partnership", label: "Partnership", icon: Users },
    { value: "business", label: "Business Inquiry", icon: Building },
  ];

  const faqs = [
    {
      question: "How do I schedule a waste collection?",
      answer:
        "You can schedule a collection through our mobile app or website by selecting your preferred date and time.",
    },
    {
      question: "What types of waste do you collect?",
      answer:
        "We collect general waste, recyclables, organic waste, and e-waste. Hazardous materials require special arrangements.",
    },
    {
      question: "How can I become a verified collector?",
      answer:
        "Visit our Collector Registration page, complete the application form, and our team will verify your credentials.",
    },
    {
      question: "Is there a fee for using Smart Cycle?",
      answer:
        "Basic services are free for residents. Premium features and bulk collections may have associated fees.",
    },
  ];

  const socialLinks = [
    { icon: Globe, name: "Facebook", url: "#" },
    { icon: MessageSquare, name: "Twitter", url: "#" },
    { icon: Mail, name: "Instagram", url: "#" },
    { icon: Users, name: "LinkedIn", url: "#" },
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
                "url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
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
            <Mail className="h-5 w-5 text-white" />
            <span className="text-sm font-medium text-white">Contact Us</span>
          </div>

          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up animation-delay-200 ${
              visibleElements.has("hero-title") ? "visible" : ""
            }`}
            data-animate-id="hero-title"
          >
            We're Here to Help
          </h1>

          <p
            className={`text-xl text-white/90 max-w-3xl mx-auto animate-fade-in-up animation-delay-400 ${
              visibleElements.has("hero-desc") ? "visible" : ""
            }`}
            data-animate-id="hero-desc"
          >
            Have questions or need assistance? Our team is ready to support you
            with all your waste management needs.
          </p>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              const animateId = `contact-info-${index}`;
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
                    {info.title}
                  </h3>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-700 font-medium mb-1">
                      {detail}
                    </p>
                  ))}
                  <p className="text-gray-500 text-sm mt-2">
                    {info.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div
              className={`animate-fade-in-up ${
                visibleElements.has("contact-form") ? "visible" : ""
              }`}
              data-animate-id="contact-form"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Send Us a Message
                  </h2>
                  <p className="text-gray-600">
                    Fill out the form below and we'll get back to you as soon as
                    possible.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Inquiry Type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Inquiry Type
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {inquiryTypes.map((type) => {
                        const TypeIcon = type.icon;
                        return (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                inquiryType: type.value,
                              }))
                            }
                            className={`flex items-center space-x-2 p-3 rounded-lg border-2 transition-all duration-300 ${
                              formData.inquiryType === type.value
                                ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                                : "border-gray-200 hover:border-emerald-300 text-gray-700"
                            }`}
                          >
                            <TypeIcon className="h-5 w-5" />
                            <span className="text-sm font-medium">
                              {type.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 outline-none"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 outline-none"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 outline-none"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 outline-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows="5"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 outline-none resize-none"
                      placeholder="Tell us more about your inquiry..."
                    ></textarea>
                  </div>

                  {/* Success Message */}
                  {formStatus === "success" && (
                    <div className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <p className="text-green-700 font-medium">
                        Thank you! Your message has been sent successfully.
                        We'll get back to you soon.
                      </p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 text-white px-6 py-4 rounded-lg font-semibold text-lg hover:bg-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-102 flex items-center justify-center space-x-2"
                  >
                    <Send className="h-5 w-5" />
                    <span>Send Message</span>
                  </button>
                </form>
              </div>
            </div>

            {/* FAQ Section */}
            <div
              className={`animate-fade-in-up animation-delay-200 ${
                visibleElements.has("faq-section") ? "visible" : ""
              }`}
              data-animate-id="faq-section"
            >
              <div className="mb-8">
                <div className="inline-flex items-center space-x-2 bg-blue-600/10 rounded-full px-4 py-2 mb-4">
                  <HelpCircle className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-600">
                    Quick Answers
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Frequently Asked Questions
                </h2>
                <p className="text-gray-600">
                  Find quick answers to common questions below.
                </p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300"
                  >
                    <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-start">
                      <span className="text-emerald-600 mr-2">Q:</span>
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed pl-6">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Connect With Us
                </h3>
                <p className="text-gray-600 mb-4">
                  Follow us on social media for updates, tips, and news.
                </p>
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => {
                    const SocialIcon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.url}
                        className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110 group"
                        aria-label={social.name}
                      >
                        <SocialIcon className="h-5 w-5 text-gray-600 group-hover:text-emerald-600 transition-colors duration-300" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-fade-in-up ${
                visibleElements.has("map-title") ? "visible" : ""
              }`}
              data-animate-id="map-title"
            >
              Find Our Location
            </h2>
            <p className="text-lg text-gray-600">
              Visit our headquarters or reach out to us digitally
            </p>
          </div>

          <div
            className={`bg-gray-200 rounded-2xl overflow-hidden shadow-xl h-96 animate-fade-in-up ${
              visibleElements.has("map-section") ? "visible" : ""
            }`}
            data-animate-id="map-section"
          >
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-100 to-teal-100">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
                <p className="text-gray-700 font-semibold text-lg">
                  123 Green Street, Eco City, EC 12345
                </p>
                <p className="text-gray-600 mt-2">
                  Interactive map would be embedded here
                </p>
              </div>
            </div>
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

            <Recycle className="h-16 w-16 text-white mx-auto mb-6 relative z-10" />
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 relative z-10">
              Ready to Start Your Sustainable Journey?
            </h3>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto relative z-10">
              Join thousands of users who are making waste management smarter
              and more efficient with Smart Cycle.
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
