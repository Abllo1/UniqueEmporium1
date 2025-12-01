"use client";

import React, { useState } from "react";
import { motion, Easing } from "framer-motion";
import { Users as UsersIcon, Loader2 } from "lucide-react"; // Renamed Users to UsersIcon to avoid conflict
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useAdminUsers, AdminUser, UserFormData } from "@/hooks/useAdminUsers"; // Import the custom hook and types
import UserTable from "@/components/admin/users/UserTable"; // Import the new UserTable component
import UserFormDialog from "@/components/admin/users/UserFormDialog"; // Import the new UserFormDialog
import UserDetailsDialog from "@/components/admin/users/UserDetailsDialog"; // Import the new UserDetailsDialog
import DeactivateUserAlertDialog from "@/components/admin/users/DeactivateUserAlertDialog"; // NEW: Import DeactivateUserAlertDialog

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as Easing } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const UsersManagement = () => {
  const {
    users,
    isLoadingUsers,
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    filterRole,
    setFilterRole,
    currentPage,
    setCurrentPage,
    totalPages,
    totalFilteredUsersCount,
    usersPerPage,
    addUser,
    updateUser,
    deactivateUser,
    fetchUsers, // Keep fetchUsers to trigger re-fetch after CRUD
  } = useAdminUsers();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [isDeactivateAlertOpen, setIsDeactivateAlertOpen] = useState(false); // Renamed from isDeleteAlertOpen
  const [deactivatingUserId, setDeactivatingUserId] = useState<string | null>(null); // Renamed from deletingUserId
  const [deactivatingUserName, setDeactivatingUserName] = useState<string>(""); // Renamed from deletingUserName
  const [isViewDetailsModalOpen, setIsViewDetailsModalOpen] = useState(false);
  const [viewingUser, setViewingUser] = useState<AdminUser | null>(null);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false); // For form submission state

  const handleAddUserClick = () => {
    setEditingUser(null);
    setIsAddModalOpen(true);
  };

  const handleEditUserClick = (user: AdminUser) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  const handleDeactivateUserClick = (userId: string, userName: string) => { // Renamed from handleDeleteUserClick
    setDeactivatingUserId(userId);
    setDeactivatingUserName(userName);
    setIsDeactivateAlertOpen(true);
  };

  const handleViewDetailsClick = (user: AdminUser) => {
    setViewingUser(user);
    setIsViewDetailsModalOpen(true);
  };

  const handleAddOrUpdateUser = async (data: UserFormData) => {
    setIsSubmittingForm(true);
    let success = false;
    if (editingUser) {
      success = await updateUser(editingUser.id, data);
    } else {
      success = await addUser(data);
    }
    setIsSubmittingForm(false);
    if (success) {
      setIsAddModalOpen(false);
      setIsEditModalOpen(false);
      fetchUsers(); // Re-fetch users to update the list
    }
  };

  const confirmDeactivateUser = async () => {
    if (deactivatingUserId) {
      await deactivateUser(deactivatingUserId);
      setIsDeactivateAlertOpen(false);
      setDeactivatingUserId(null);
      setDeactivatingUserName("");
      fetchUsers(); // Re-fetch users to update the list
    }
  };

  return (
    <motion.div
      className="space-y-8"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <div className="space-y-2">
        <motion.h1 className="text-2xl md:text-3xl font-bold text-foreground" variants={fadeInUp}>
          Users Management
        </motion.h1>
        <motion.p className="text-base md:text-lg text-muted-foreground" variants={fadeInUp}>
          Manage all registered user accounts and their roles.
        </motion.p>
      </div>

      <UserTable
        users={users}
        isLoadingUsers={isLoadingUsers}
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        filterStatus={filterStatus}
        onFilterStatusChange={setFilterStatus}
        filterRole={filterRole}
        onFilterRoleChange={setFilterRole}
        onAddUser={handleAddUserClick}
        onEditUser={handleEditUserClick}
        onDeleteUser={handleDeactivateUserClick}
        onViewDetails={handleViewDetailsClick}
        currentPage={currentPage}
        totalPages={totalPages}
        goToFirstPage={() => setCurrentPage(1)}
        goToPrevPage={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
        goToNextPage={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
        goToLastPage={() => setCurrentPage(totalPages)}
        totalFilteredUsersCount={totalFilteredUsersCount}
        usersPerPage={usersPerPage}
      />

      {/* Add User Dialog */}
      <UserFormDialog
        isOpen={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onSubmit={handleAddOrUpdateUser}
        isSubmitting={isSubmittingForm}
      />

      {/* Edit User Dialog */}
      <UserFormDialog
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        initialData={editingUser}
        onSubmit={handleAddOrUpdateUser}
        isSubmitting={isSubmittingForm}
      />

      {/* View User Details Dialog */}
      <UserDetailsDialog
        user={viewingUser}
        isOpen={isViewDetailsModalOpen}
        onClose={() => setIsViewDetailsModalOpen(false)}
      />

      {/* Deactivate User Confirmation Dialog */}
      <DeactivateUserAlertDialog
        isOpen={isDeactivateAlertOpen}
        onOpenChange={setIsDeactivateAlertOpen}
        onConfirm={confirmDeactivateUser}
        userName={deactivatingUserName}
      />
    </motion.div>
  );
};

export default UsersManagement;