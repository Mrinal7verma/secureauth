import React from "react";
import Spinner from "./Spinner";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
}) => {
  // Variant classes
  const variantClasses = {
    primary:
      "bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg hover:shadow-xl",
    secondary:
      "bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 text-slate-700 shadow-sm hover:shadow-md",
    outline:
      "bg-white/80 backdrop-blur-sm border-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 shadow-sm hover:shadow-md",
    danger:
      "bg-gradient-to-r from-red-400 to-pink-400 hover:from-red-500 hover:to-pink-500 text-white shadow-lg hover:shadow-xl",
    success:
      "bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg hover:shadow-xl",
  };

  // Size classes
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5",
    lg: "px-6 py-3 text-lg",
  };
  const baseClasses = `
    rounded-xl font-medium 
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400
    transform hover:-translate-y-0.5 active:translate-y-0
    flex justify-center items-center gap-2
  `;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseClasses}
        ${variantClasses[variant]} 
        ${sizeClasses[size]} 
        ${fullWidth ? "w-full" : ""}
        ${disabled ? "opacity-60 cursor-not-allowed hover:translate-y-0" : ""}
      `}
    >
      {loading ? (
        <>
          <Spinner size="sm" />
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
