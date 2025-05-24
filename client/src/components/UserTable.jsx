import React from "react";
import Spinner from "./Spinner";
import { useAuth } from "../contexts/AuthContext";

const UserTable = ({ users, loading, isAdmin, onEdit, onDelete }) => {
  // Get current user from auth context
  const { user: currentUser } = useAuth();

  // Format date to readable format
  const formatDate = (dateString) => {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }
  if (!users || users.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
            />
          </svg>
        </div>
        <p className="text-slate-500 text-lg">No users found.</p>
        <p className="text-slate-400 text-sm mt-1">
          Users will appear here when they register.
        </p>
      </div>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-gradient-to-r from-blue-50 to-purple-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider hidden md:table-cell"
            >
              Phone
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider hidden md:table-cell"
            >
              City
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider hidden lg:table-cell"
            >
              Last Login
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"
            >
              Role
            </th>
            {isAdmin && (
              <th
                scope="col"
                className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider"
              >
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white/50 divide-y divide-slate-200">
          {users.map((user, index) => (
            <tr
              key={user._id}
              className={`transition-all duration-200 hover:bg-blue-50/50 ${
                index % 2 === 0 ? "bg-white/80" : "bg-slate-50/50"
              }`}
            >
              {" "}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">
                      {user.firstName?.charAt(0) || ""}
                      {user.lastName?.charAt(0) || ""}
                    </span>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-semibold text-slate-800">
                      {user.firstName} {user.lastName}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-slate-700">{user.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                <div className="text-sm text-slate-700">
                  {user.mobileNumber || "-"}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                <div className="text-sm text-slate-700">{user.city || "-"}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                <div className="text-sm text-slate-500">
                  {formatDate(user.lastLogin)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.role === "Admin"
                      ? "bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700"
                      : "bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-700"
                  }`}
                >
                  {user.role}
                </span>
              </td>{" "}
              {isAdmin && (
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onEdit(user._id)}
                    className="text-blue-600 hover:text-blue-800 mr-4 transition-colors duration-200 font-medium"
                  >
                    Edit
                  </button>
                  {/* Disable delete button for admins and self */}
                  <button
                    onClick={() => onDelete(user._id)}
                    className={`${
                      user._id === currentUser?._id || user.role === "Admin"
                        ? "text-slate-400 cursor-not-allowed"
                        : "text-red-500 hover:text-red-700"
                    } transition-colors duration-200 font-medium`}
                    disabled={
                      user._id === currentUser?._id || user.role === "Admin"
                    }
                    title={
                      user._id === currentUser?._id
                        ? "Cannot delete your own account"
                        : user.role === "Admin"
                        ? "Cannot delete admin users"
                        : "Delete user"
                    }
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
