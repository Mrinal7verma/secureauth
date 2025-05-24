import React, { useState } from "react";

const FormInput = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  required = false,
  disabled = false,
  options = [],
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className="mb-4 relative">
      <label
        htmlFor={id}
        className={`block text-sm font-medium mb-1 transition-colors ${
          isFocused
            ? "text-primary-600"
            : error
            ? "text-red-600"
            : "text-gray-700"
        }`}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {type === "select" ? (
        <select
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full px-4 py-2.5 border rounded-md bg-white transition-all duration-200
            ${
              error
                ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                : isFocused
                ? "border-primary-500 ring-2 ring-primary-100"
                : "border-gray-200 hover:border-gray-300"
            }
            ${disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""}
            form-input-animated
          `}
        >
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full px-4 py-2.5 border rounded-md transition-all duration-200
            ${
              error
                ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                : isFocused
                ? "border-primary-500 ring-2 ring-primary-100"
                : "border-gray-200 hover:border-gray-300"
            }
            ${disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""}
            form-input-animated
          `}
        />
      )}

      {error && (
        <p
          id={`${id}-error`}
          className="mt-1.5 text-sm text-red-600 flex items-center"
          role="alert"
        >
          <svg
            className="w-3.5 h-3.5 mr-1.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

export default FormInput;
