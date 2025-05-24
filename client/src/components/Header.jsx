import React from "react";
import { Link } from "react-router-dom";

const Header = ({ isAuthenticated }) => {
  return (
    <header className="relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6 md:py-8">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl flex items-center justify-center shadow-lg">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h1 className="ml-3 text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              SecureAuth
            </h1>
          </div>

          {!isAuthenticated && (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-slate-600 hover:text-slate-800 transition-colors duration-200 font-medium"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-blue-400 to-purple-400 text-white px-6 py-2.5 rounded-xl font-medium hover:from-blue-500 hover:to-purple-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Get Started
              </Link>
            </div>
          )}

          {isAuthenticated && (
            <Link
              to="/dashboard"
              className="bg-gradient-to-r from-emerald-400 to-teal-400 text-white px-6 py-2.5 rounded-xl font-medium hover:from-emerald-500 hover:to-teal-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Dashboard
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
