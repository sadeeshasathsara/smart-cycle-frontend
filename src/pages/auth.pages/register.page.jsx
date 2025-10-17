import React, { useState } from "react";
import {
  Trash2,
  Mail,
  User,
  MapPin,
  Lock,
  Recycle,
  Leaf,
  Shield,
  Clock,
  TreePine,
  Droplets,
} from "lucide-react";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registered Resident:", formData);
    alert("Registration successful! Redirecting to login...");
  };

  const benefits = [
    { icon: <Clock className="w-5 h-5" />, text: "Scheduled Pickups" },
    { icon: <Shield className="w-5 h-5" />, text: "Secure Service" },
    { icon: <Recycle className="w-5 h-5" />, text: "Recycling Rewards" },
    { icon: <Leaf className="w-5 h-5" />, text: "Eco-Friendly" },
  ];

  const stats = [
    { number: "50K+", label: "Active Users" },
    { number: "98%", label: "On-Time Pickup" },
    { number: "1M+", label: "Tons Recycled" },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100">
      {/* Left Side - Branding & Info */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 p-12 flex-col justify-between">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white opacity-5 rounded-full -ml-40 -mb-40"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-white bg-opacity-20 p-3 rounded-2xl backdrop-blur-sm">
              <img
                src="/smart-logo.png"
                alt="Smart Waste Logo"
                className="w-8 h-8 object-contain"
              />
            </div>
            <div>
              <h1 className="text-white text-2xl font-bold">SmartCycle</h1>
              <p className="text-green-100 text-sm">Smart Waste Management</p>
            </div>
          </div>

          <h2 className="text-white text-4xl font-bold mb-4 leading-tight">
            Building a Cleaner Tomorrow, Together
          </h2>
          <p className="text-green-100 text-lg mb-12">
            Join thousands of residents making a difference in their communities
            through smart waste management.
          </p>

          {/* Benefits Grid */}
          <div className="grid grid-cols-2 gap-4 mb-12">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 bg-white bg-opacity-10 backdrop-blur-sm p-4 rounded-xl"
              >
                <div className="text-green-200">{benefit.icon}</div>
                <span className="text-white font-medium">{benefit.text}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-white text-3xl font-bold mb-1">
                  {stat.number}
                </div>
                <div className="text-green-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="relative z-10 flex items-center gap-8 text-green-100">
          <TreePine className="w-16 h-16 opacity-30" />
          <Droplets className="w-12 h-12 opacity-20" />
          <Leaf className="w-14 h-14 opacity-25" />
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 relative">
        {/* Mobile logo */}
        <div className="lg:hidden absolute top-4 left-4 flex items-center gap-2 z-20">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-xl">
            <Recycle className="w-6 h-6 text-white" />
          </div>
          <span className="text-gray-800 text-xl font-bold">EcoWaste</span>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-10 right-6 w-24 h-24 bg-green-200 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-6 w-32 h-32 bg-teal-200 rounded-full opacity-20 blur-3xl animate-pulse"></div>

        <div className="relative bg-white rounded-3xl shadow-2xl p-6 w-full max-w-md border border-gray-100">
          {/* Header */}
          <div className="text-center mb-4">
            <div className="inline-flex bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-2xl shadow-lg mb-3">
              <Recycle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
            <p className="text-gray-500 text-sm mt-1">
              Start your journey to a greener future
            </p>
          </div>

          {/* Form Inputs */}
          <div className="space-y-3 mb-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="w-5 h-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
              </div>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                className="w-full pl-12 pr-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                onChange={handleChange}
                value={formData.fullName}
                required
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="w-5 h-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full pl-12 pr-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                onChange={handleChange}
                value={formData.email}
                required
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MapPin className="w-5 h-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
              </div>
              <input
                type="text"
                name="address"
                placeholder="Residential Address"
                className="w-full pl-12 pr-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                onChange={handleChange}
                value={formData.address}
                required
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
              </div>
              <input
                type="password"
                name="password"
                placeholder="Create Password"
                className="w-full pl-12 pr-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                onChange={handleChange}
                value={formData.password}
                required
              />
            </div>
            <div className="h-4 mt-1">
              <p className="text-xs text-gray-500 ml-1">Min. 8 characters</p>
            </div>
          </div>

          {/* Terms checkbox */}
          <label className="flex items-start gap-2 mb-3 cursor-pointer group">
            <input
              type="checkbox"
              className="mt-0.5 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              required
            />
            <span className="text-xs text-gray-600 group-hover:text-gray-800 transition-colors">
              I agree to the{" "}
              <span className="text-green-600 font-medium">Terms</span> and{" "}
              <span className="text-green-600 font-medium">Privacy Policy</span>
            </span>
          </label>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2.5 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm mb-3"
          >
            <Trash2 className="w-4 h-4" />
            Create Account
          </button>

          {/* Login Link */}
          <div className="text-center">
            <span className="text-gray-500 text-sm">
              Already registered?{" "}
              <a
                href="/v1/login"
                className="text-green-600 font-medium hover:underline hover:text-green-700 transition-colors"
              >
                Sign in
              </a>
            </span>
          </div>

          {/* Footer */}
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
              <Shield className="w-3 h-3" />
              <span>Secure registration • Data protected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
