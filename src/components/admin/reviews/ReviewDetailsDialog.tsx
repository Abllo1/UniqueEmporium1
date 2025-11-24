"use client";

import React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star, MessageSquare, User, Phone, CalendarDays, CheckCircle, Copy } from "lucide-react";
import { AdminReview } from "@/pages/admin/ReviewsManagement.tsx";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ReviewDetailsDialogProps {
  review: AdminReview;
  onClose: () => void;
}

const ReviewDetailsDialog = ({ review, onClose }: ReviewDetailsDialogProps) => {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={cn(
            "h-5 w-5",
            i < rating ? "fill-yellow-500 text-yellow-500" : "fill-gray-300 text-gray-300"
          )}
        />
      );
    }
    return <div className="flex items-center space-x-0.5">{stars}</div>;
  };

  const handleCopyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone);
    toast.success("Phone number copied!", { description: phone });
  };

  return (
    <DialogContent className="sm:max-w-2xl p-6 rounded-xl shadow-lg bg-card/80 backdrop-blur-md border border-border/50 overflow-y-auto max-h-[90vh]">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-primary" /> Review Details
        </DialogTitle>
        <DialogDescription>
          Full details of the review by {review.customer_name} for {review.product_name}.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-6 py-4">
        {/* Customer Information */}
        <div className="border-b pb-4">
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-foreground">
            <User className="h-5 w-5" /> Customer
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <p className="text-muted-foreground">Name</p>
              <p className="font-bold text-foreground">{review.customer_name}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Email</p>
              <p className="font-medium text-foreground">{review.customer_email}</p>
            </div>
            <div className="space-y-1 col-span-2">
              <p className="text-muted-foreground">Phone Number</p>
              <div className="flex items-center gap-2">
                <p className="font-bold text-xl text-primary">{review.customer_phone || 'N/A'}</p>
                {review.customer_phone && review.customer_phone !== 'N/A' && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => handleCopyPhone(review.customer_phone)} className="h-8 w-8">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Copy Phone</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Product Information */}
        <div className="border-b pb-4">
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-foreground">
            <MessageSquare className="h-5 w-5" /> Product
          </h3>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p><strong>Product Name:</strong> <span className="font-medium text-foreground">{review.product_name}</span></p>
            <p><strong>Product ID:</strong> <span className="font-medium text-foreground">{review.product_id}</span></p>
          </div>
        </div>

        {/* Review Details */}
        <div>
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-foreground">
            <Star className="h-5 w-5" /> Review
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <p className="text-muted-foreground">Rating:</p>
              {renderStars(review.rating)}
            </div>
            <p><strong>Title:</strong> <span className="font-medium text-foreground">{review.title}</span></p>
            <p><strong>Comment:</strong> <span className="text-muted-foreground">{review.comment}</span></p>
            <div className="flex items-center gap-2">
              <p className="text-muted-foreground">Date:</p>
              <p className="font-medium text-foreground flex items-center gap-1">
                <CalendarDays className="h-4 w-4" /> {new Date(review.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-muted-foreground">Verified Buyer:</p>
              {review.is_verified_buyer ? (
                <Badge variant="default" className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" /> Yes
                </Badge>
              ) : (
                <Badge variant="secondary">No</Badge>
              )}
            </div>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>
          Close
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default ReviewDetailsDialog;