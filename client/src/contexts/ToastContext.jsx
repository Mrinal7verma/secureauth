import React, { createContext, useContext, useState } from "react";
import Toast from "../components/Toast";

const ToastContext = createContext();

export const useToast = () => {
  return useContext(ToastContext);
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // Add a new toast
  const showToast = (message, type = "success", duration = 3000) => {
    const id = Date.now().toString();
    setToasts([...toasts, { id, message, type, duration }]);
    return id;
  };

  // Remove a toast by id
  const hideToast = (id) => {
    setToasts(toasts.filter((toast) => toast.id !== id));
  };

  // Success toast shorthand
  const success = (message, duration = 3000) => {
    return showToast(message, "success", duration);
  };

  // Error toast shorthand
  const error = (message, duration = 3000) => {
    return showToast(message, "error", duration);
  };

  // Info toast shorthand
  const info = (message, duration = 3000) => {
    return showToast(message, "info", duration);
  };

  const value = {
    showToast,
    hideToast,
    success,
    error,
    info,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-0 right-0 p-4 space-y-4 z-50">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => hideToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
