"use client";

import React, { Suspense } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Mail,
  Phone,
  ShoppingBag,
  User as UserIcon,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AdminUser } from "@/hooks/useAdminUsers"; // Import AdminUser interface
import RecentOrdersList from "./RecentOrdersList"; // Import the new RecentOrdersList component

interface UserDetailsDialogProps {
  user: AdminUser | null;
  isOpen: boolean;
  onClose: () => void;
}

const getStatusBadgeVariant = (status: AdminUser["status"]) => {
  return status === "active" ? "default" : "destructive";
};

const getRoleBadgeVariant = (role: AdminUser["role"]) => {
  return role === "admin" ? "default" : "secondary";
};

const UserDetailsDialog = ({ user, isOpen, onClose }: UserDetailsDialogProps) => {
  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-6 rounded-xl shadow-lg bg-card/80 backdrop-blur-md border border-border/50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <UserIcon className="h-6 w-6 text-primary" /> User Details: {user.first_name} {user.last_name}
          </DialogTitle>
          <DialogDescription>
            Detailed information about this user's account and activity.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Custom User ID</p>
              <p className="font-medium text-foreground">{user.custom_user_id}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Supabase UUID</p>
              <p className="font-medium text-foreground text-xs">{user.id}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium text-foreground">{user.email}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium text-foreground">{user.phone}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Role</p>
              <Badge variant={getRoleBadgeVariant(user.role)}>
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Account Status</p>
              <Badge variant={getStatusBadgeVariant(user.status)}>
                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
              </Badge>
            </div>
          </div>

          <div className="border-t pt-4 mt-4">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" /> Recent Orders ({user.total_orders})
            </h3>
            {user.total_orders > 0 ? (
              <Suspense fallback={<p className="text-sm text-muted-foreground">Loading recent orders...</p>}>
                <RecentOrdersList userId={user.id} />
              </Suspense>
            ) : (
              <p className="text-sm text-muted-foreground">No recent orders found.</p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailsDialog;