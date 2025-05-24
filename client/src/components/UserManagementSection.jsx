import React from "react";
import UserTable from "./UserTable";
import Alert from "./Alert";
import DashboardStats from "./DashboardStats";

const UserManagementSection = ({
  users,
  loading,
  error,
  isAdmin,
  onDelete,
  onEdit,
  onRefresh,
}) => {
  return (
    <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
      {/* Section Header */}
      <div className="mb-8 flex flex-wrap items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            User Management
          </h2>
          <p className="text-lg text-slate-600">
            View and manage all registered users in the system.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button
            onClick={onRefresh}
            className="bg-gradient-to-r from-blue-100 to-purple-100 hover:from-blue-200 hover:to-purple-200 text-blue-700 px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh Data
          </button>
        </div>
      </div>

      {/* Dashboard Statistics */}
      <DashboardStats users={users} isAdmin={isAdmin} />

      {/* Error Alert */}
      {error && (
        <div className="mb-6">
          <Alert type="error" message={error} />
        </div>
      )}

      {/* User Table Container */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl border border-slate-100 overflow-hidden">
        <UserTable
          users={users}
          loading={loading}
          isAdmin={isAdmin}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      </div>
    </main>
  );
};

export default UserManagementSection;
