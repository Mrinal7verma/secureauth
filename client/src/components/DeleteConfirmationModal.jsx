import React from "react";
import Button from "./Button";

const DeleteConfirmationModal = ({ user, onConfirm, onCancel, loading }) => {
  return (
    <div className="fixed inset-0 bg-slate-600/50 backdrop-blur-sm overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl max-w-md mx-auto p-6 w-full border border-slate-200">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-red-100 to-pink-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>

          <h3 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
            Delete User
          </h3>

          <p className="text-slate-600 mb-6 leading-relaxed">
            Are you sure you want to delete the user{" "}
            <span className="font-semibold text-slate-800">{user?.email}</span>?
            This action cannot be undone.
          </p>

          <div className="flex justify-center space-x-4 w-full mt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
              disabled={loading}
              className="w-full"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="danger"
              onClick={onConfirm}
              loading={loading}
              disabled={loading}
              className="w-full"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
