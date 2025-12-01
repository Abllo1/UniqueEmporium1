"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Loader2, Plus, Edit } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserFormData, userFormSchema, AdminUser } from "@/hooks/useAdminUsers"; // Import schema and types

interface UserFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: AdminUser | null;
  onSubmit: (data: UserFormData) => Promise<void>;
  isSubmitting: boolean;
}

const UserFormDialog = ({
  isOpen,
  onOpenChange,
  initialData,
  onSubmit,
  isSubmitting,
}: UserFormDialogProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: initialData ? {
      id: initialData.id,
      custom_user_id: initialData.custom_user_id,
      first_name: initialData.first_name,
      last_name: initialData.last_name,
      email: initialData.email,
      phone: initialData.phone,
      role: initialData.role,
      status: initialData.status,
      password: "", // Never pre-fill passwords
    } : {
      role: "customer",
      status: "active",
      password: "",
    },
  });

  const currentStatus = watch("status");
  const currentRole = watch("role");

  // Reset form when dialog opens/closes or initialData changes
  React.useEffect(() => {
    if (isOpen) {
      reset(initialData ? {
        id: initialData.id,
        custom_user_id: initialData.custom_user_id,
        first_name: initialData.first_name,
        last_name: initialData.last_name,
        email: initialData.email,
        phone: initialData.phone,
        role: initialData.role,
        status: initialData.status,
        password: "",
      } : {
        role: "customer",
        status: "active",
        password: "",
      });
    }
  }, [isOpen, initialData, reset]);

  const handleFormSubmit = async (data: UserFormData) => {
    await onSubmit(data);
    if (!isSubmitting) { // Only close if submission was successful and not still submitting
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-6 rounded-xl shadow-lg bg-card/80 backdrop-blur-md border border-border/50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            {initialData ? <Edit className="h-6 w-6 text-primary" /> : <Plus className="h-6 w-6 text-primary" />}
            {initialData ? "Edit User" : "Add New User"}
          </DialogTitle>
          <DialogDescription>
            {initialData ? "Update the details for this user account." : "Fill in the details to create a new user account."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 py-4">
          <input type="hidden" {...register("id")} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name</Label>
              <Input id="first_name" {...register("first_name")} className={cn(errors.first_name && "border-destructive")} />
              {errors.first_name && <p className="text-destructive text-sm">{errors.first_name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name</Label>
              <Input id="last_name" {...register("last_name")} className={cn(errors.last_name && "border-destructive")} />
              {errors.last_name && <p className="text-destructive text-sm">{errors.last_name.message}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} className={cn(errors.email && "border-destructive")} disabled={!!initialData} />
            {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
            {initialData && <p className="text-xs text-muted-foreground">Email cannot be changed.</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" {...register("phone")} className={cn(errors.phone && "border-destructive")} />
            {errors.phone && <p className="text-destructive text-sm">{errors.phone.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select onValueChange={(value) => setValue("role", value as "customer" | "admin")} value={currentRole}>
              <SelectTrigger className={cn(errors.role && "border-destructive")}>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="customer">Customer</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && <p className="text-destructive text-sm">{errors.role.message}</p>}
          </div>
          {!initialData && ( // Password only required for new users
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register("password")} className={cn(errors.password && "border-destructive")} />
              {errors.password && <p className="text-destructive text-sm">{errors.password.message}</p>}
            </div>
          )}
          <div className="flex items-center space-x-2">
            <Switch
              id="status-toggle"
              checked={currentStatus === "active"}
              onCheckedChange={(checked) => setValue("status", checked ? "active" : "inactive")}
            />
            <Label htmlFor="status-toggle">Account Status: {currentStatus === "active" ? "Active" : "Inactive"}</Label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                </>
              ) : (
                initialData ? "Save Changes" : "Add User"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserFormDialog;