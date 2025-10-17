import React, { useState } from "react";
import { Lock, Mail, Recycle, Shield, Leaf, Clock } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      console.log("Login:", { email, password });
      alert("Login successful!");
      setIsLoading(false);
      window.location.href = "/v1/resident";
    }, 1500);
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
                alt="Smart Cycle Logo"
                className="w-8 h-8 object-contain"
              />
            </div>
            <div>
              <h1 className="text-white text-2xl font-bold">Smart Cycle</h1>
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
          <Leaf className="w-14 h-14 opacity-25" />
          <Shield className="w-12 h-12 opacity-20" />
          <Clock className="w-16 h-16 opacity-30" />
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="bg-white bg-opacity-20 p-3 rounded-2xl backdrop-blur-sm">
              <img
                src="/smart-logo.png"
                alt="Smart Cycle Logo"
                className="w-8 h-8 object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">EcoWaste</h1>
              <p className="text-sm text-gray-600">Smart Waste Management</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <div className="inline-flex bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-2xl shadow-lg mb-4">
                <Recycle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Resident Login
              </h2>
              <p className="text-gray-500">
                Access your eco-friendly dashboard
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                  </div>
                  <input
                    type="email"
                    placeholder="resident@example.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                  </div>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center group cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="ml-2 text-gray-700 group-hover:text-gray-800 transition-colors">
                    Remember me
                  </span>
                </label>
                <a
                  href="#"
                  className="text-green-600 hover:text-green-700 font-medium transition-colors"
                >
                  Forgot password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    <Recycle className="w-4 h-4" />
                    Sign In
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <a
                  href="/v1/register"
                  className="text-green-600 hover:text-green-700 font-medium transition-colors"
                >
                  Create account
                </a>
              </p>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                <Shield className="w-3 h-3" />
                <span>Secure login • Data protected</span>
              </div>
            </div>
          </div>

          {/* Bottom footer */}
          <p className="text-center text-sm text-gray-500 mt-8">
            © 2024 EcoWaste. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
