import React from "react";
import { Link } from "react-router-dom";

const HeroSection = ({ isAuthenticated }) => {
  return (
    <main className="relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 md:pt-20 md:pb-28">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-800 mb-6 leading-tight">
            Secure Authentication
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Made Simple
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Experience seamless user authentication with enterprise-grade
            security. Built with modern technologies for reliability,
            scalability, and ease of use.
          </p>

          {!isAuthenticated ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/register"
                className="w-full sm:w-auto bg-gradient-to-r from-blue-400 to-purple-400 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-500 hover:to-purple-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Create Account
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto bg-white text-slate-700 px-8 py-4 rounded-xl text-lg font-semibold border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Sign In
              </Link>
            </div>
          ) : (
            <Link
              to="/dashboard"
              className="inline-block bg-gradient-to-r from-emerald-400 to-teal-400 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-emerald-500 hover:to-teal-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Go to Dashboard
            </Link>
          )}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-gradient-to-r from-pink-200 to-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
    </main>
  );
};

export default HeroSection;
