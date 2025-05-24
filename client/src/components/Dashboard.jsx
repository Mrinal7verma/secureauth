import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import DashboardHeader from "./DashboardHeader";
import UserManagementSection from "./UserManagementSection";
import { getAllUsers, deleteUser } from "../utils/api";
import EditUserModal from "./EditUserModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal states
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const isAdmin = user?.role === "Admin";

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      // console.log("Fetched users:", data);
      setUsers(data.data || []);
    } catch (err) {
      setError("Failed to load users. Please try again later.");
      console.error("Error fetching users:", err);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      setError("Failed to logout. Please try again.");
      toast.error("Failed to logout");
    }
  };
  const handleDeleteUser = async (userId) => {
    // Find the user to delete
    const userToDelete = users.find((u) => u._id === userId);

    // Prevent deleting admin users or self
    if (userToDelete) {
      if (userToDelete._id === user?._id) {
        toast.error("You cannot delete your own account");
        return;
      }

      if (userToDelete.role === "Admin") {
        toast.error("Admin users cannot be deleted");
        return;
      }

      setSelectedUser(userToDelete);
      setShowDeleteModal(true);
    }
  };

  const confirmDeleteUser = async () => {
    if (!selectedUser) return;

    try {
      setDeleteLoading(true);
      await deleteUser(selectedUser._id);
      setUsers(users.filter((u) => u._id !== selectedUser._id));
      toast.success(`User ${selectedUser.email} has been deleted`);
      setShowDeleteModal(false);
    } catch (err) {
      toast.error("Failed to delete user");
      console.error("Error deleting user:", err);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleEditUser = (userId) => {
    // Find the user to edit
    const userToEdit = users.find((u) => u._id === userId);
    if (userToEdit) {
      setSelectedUser(userToEdit);
      setShowEditModal(true);
    }
  };

  const handleUserUpdated = (updatedUserData) => {
    // Update the user in the local state
    setUsers(
      users.map((u) =>
        u._id === selectedUser._id ? { ...u, ...updatedUserData } : u
      )
    );
    toast.success("User updated successfully");
    setShowEditModal(false);
  };
  return (
    <div className="flex flex-col h-full">
      <DashboardHeader user={user} onLogout={handleLogout} />

      <UserManagementSection
        users={users}
        loading={loading}
        error={error}
        isAdmin={isAdmin}
        onDelete={handleDeleteUser}
        onEdit={handleEditUser}
        onRefresh={fetchUsers}
      />

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <EditUserModal
          userId={selectedUser._id}
          onClose={() => setShowEditModal(false)}
          onSave={handleUserUpdated}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedUser && (
        <DeleteConfirmationModal
          user={selectedUser}
          onConfirm={confirmDeleteUser}
          onCancel={() => setShowDeleteModal(false)}
          loading={deleteLoading}
        />
      )}
    </div>
  );
};

export default Dashboard;
