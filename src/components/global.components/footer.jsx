import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Heart,
  Globe,
  ChevronRight,
  Send,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: "About Smart Cycle", href: "#about" },
      { name: "Our Mission", href: "#mission" },
      { name: "Team", href: "#team" },
      { name: "Partners", href: "#partners" },
    ],
    resources: [
      { name: "Recycling Guide", href: "#guide" },
      { name: "Smart Bin Locations", href: "#locations" },
      { name: "Mobile App", href: "#app" },
      { name: "Community Initiatives", href: "#community" },
    ],
    support: [
      { name: "Help Center", href: "#help" },
      { name: "Contact Us", href: "#contact" },
      { name: "Feedback", href: "#feedback" },
    ],
    legal: [
      { name: "Privacy Policy", href: "#privacy" },
      { name: "Terms & Conditions", href: "#terms" },
    ],
  };

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      href: "#facebook",
      color: "hover:text-green-600",
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "#twitter",
      color: "hover:text-green-500",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "#instagram",
      color: "hover:text-emerald-600",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "#linkedin",
      color: "hover:text-lime-600",
    },
    {
      name: "YouTube",
      icon: Youtube,
      href: "#youtube",
      color: "hover:text-red-600",
    },
  ];

  const contactInfo = [
    {
      icon: Mail,
      text: "smartcycle.info@gmail.com",
      href: "mailto:smartcycle.info@gmail.com",
    },
    { icon: Phone, text: "+94 77 123 4567", href: "tel:+94771234567" },
    { icon: MapPin, text: "Colombo, Sri Lanka", href: "#location" },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand & SDG Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <div className="mb-4">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-green-500 via-lime-400 to-emerald-600 bg-clip-text text-transparent mb-2">
                  Smart Cycle
                </h2>
                <p className="text-sm text-gray-400 font-medium">
                  Intelligent Waste Management
                </p>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Revolutionizing waste collection and recycling with smart
                technology. Together, we’re building cleaner cities and a
                sustainable planet.
              </p>
            </div>

            {/* SDG Badge */}
            <div className="mb-6">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-2 rounded-lg">
                <Globe className="h-5 w-5 text-white" />
                <span className="text-sm font-semibold text-white">
                  SDG 12: Responsible Consumption & Production
                </span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map((contact, index) => {
                const IconComponent = contact.icon;
                return (
                  <a
                    key={index}
                    href={contact.href}
                    className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-200 group"
                  >
                    <IconComponent className="h-4 w-4 text-gray-400 group-hover:text-white" />
                    <span className="text-sm">{contact.text}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm flex items-center group"
                  >
                    <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm flex items-center group"
                  >
                    <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">
              Stay Connected
            </h3>

            {/* Newsletter */}
            <div className="mb-8">
              <p className="text-gray-300 text-sm mb-4">
                Subscribe to our newsletter for recycling tips and updates.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-l-lg text-white text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-r-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Support Links */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold mb-3 text-gray-200">
                Support
              </h4>
              <ul className="space-y-2">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm flex items-center group"
                    >
                      <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media & Legal Section */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            {/* Social Media */}
            <div className="flex items-center space-x-6">
              <span className="text-gray-300 text-sm font-medium">
                Follow us:
              </span>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className={`text-gray-400 ${social.color} transition-colors duration-200 hover:scale-110 transform`}
                      aria-label={social.name}
                    >
                      <IconComponent className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center md:justify-end items-center space-x-6 text-sm">
              {footerLinks.legal.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>© {currentYear} Smart Cycle. All rights reserved.</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-green-500" />
              <span>for a cleaner future</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
