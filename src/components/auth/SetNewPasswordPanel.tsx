"use client";

import React, { useState } from "react";
import { Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthInputField from "./AuthInputField";
import UniqueEmporiumLogo from "@/components/logo/UniqueEmporiumLogo";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface SetNewPasswordPanelProps {
  onPasswordUpdated: () => void;
}

const SetNewPasswordPanel: React.FC<SetNewPasswordPanelProps> = ({ onPasswordUpdated }) => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || !confirmNewPassword) {
      toast.error("Please enter and confirm your new password.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    setIsResettingPassword(true);
    toast.loading("Updating password...", { id: "update-password" });

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      toast.dismiss("update-password");
      toast.error("Failed to update password.", { description: error.message });
    } else {
      toast.dismiss("update-password");
      toast.success("Password updated successfully!", {
        description: "You can now sign in with your new password.",
      });
      setNewPassword("");
      setConfirmNewPassword("");
      onPasswordUpdated(); // Notify parent that password has been updated
      navigate("/auth", { replace: true }); // Redirect to auth page without recovery params
    }
    setIsResettingPassword(false);
  };

  return (
    <div className="bg-gray-50 rounded-2xl shadow-2xl relative overflow-hidden w-full max-w-md min-h-[480px] flex flex-col justify-center items-center p-8 text-center">
      <UniqueEmporiumLogo className="h-[80px] w-auto mb-6" />
      <h1 className="font-bold text-xl text-foreground mb-4">Set Your New Password</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Enter your new password below.
      </p>
      <form onSubmit={handleUpdatePassword} className="flex flex-col w-full items-center">
        <AuthInputField
          type="password"
          placeholder="New Password"
          Icon={Lock}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="mb-2"
        />
        <AuthInputField
          type="password"
          placeholder="Confirm New Password"
          Icon={Lock}
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          className="mb-4"
        />
        <Button
          type="submit"
          className="rounded-full border border-secondary bg-secondary text-white text-xs font-bold py-3 px-11 tracking-wider uppercase transition duration-80 active:scale-95 focus:outline-none hover:bg-secondary/80 disabled:opacity-50"
          disabled={isResettingPassword}
        >
          {isResettingPassword ? <Loader2 className="h-4 w-4 animate-spin" /> : "Set Password"}
        </Button>
      </form>
    </div>
  );
};

export default SetNewPasswordPanel;