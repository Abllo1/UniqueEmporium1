"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Star, CheckCircle, MessageSquare, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import ReviewForm from "./ReviewForm.tsx"; // Import the new form component
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Define Review interface for the new dedicated table structure
interface Review {
  id: string;
  user_id: string;
  product_id: string;
  rating: number;
  title: string;
  comment: string;
  is_verified_buyer: boolean;
  created_at: string;
  // Join data from profiles table
  profiles: {
    first_name: string;
    last_name: string;
  } | null;
}

// Define the interface for the old JSONB structure (for backward compatibility display)
interface LegacyReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  isVerifiedBuyer: boolean;
}

interface ProductReviewsTabProps {
  reviews: LegacyReview[]; // Keep this for legacy data display
  productId: string;
}

const ProductReviewsTab: React.FC<ProductReviewsTabProps> = ({ reviews: legacyReviews, productId }) => {
  const [liveReviews, setLiveReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLiveReviews = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('product_reviews')
      .select(`
        *,
        profiles(first_name, last_name)
      `)
      .eq('product_id', productId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching live reviews:", error);
      toast.error("Failed to load reviews.");
      setLiveReviews([]);
    } else {
      setLiveReviews(data as Review[]);
    }
    setIsLoading(false);
  }, [productId]);

  useEffect(() => {
    fetchLiveReviews();
  }, [fetchLiveReviews]);

  const reviewsToDisplay = liveReviews.length > 0 ? liveReviews : legacyReviews;

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i < fullStars ? "fill-yellow-500 text-yellow-500" : "fill-gray-300 text-gray-300"
          )}
        />
      );
    }
    return <div className="flex items-center space-x-0.5">{stars}</div>;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <p className="ml-3 text-muted-foreground">Loading reviews...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {reviewsToDisplay.length === 0 ? (
        <div className="py-8 text-center text-muted-foreground">
          <MessageSquare className="h-12 w-12 mx-auto mb-4" />
          <p className="text-lg">No reviews yet.</p>
          <p className="text-sm">Be the first to review this product!</p>
        </div>
      ) : (
        reviewsToDisplay.map((review, index) => {
          // Determine author name and verified status based on source (live or legacy)
          let authorName: string;
          let isVerified: boolean;
          let reviewDate: string;
          let reviewTitle: string;
          let reviewComment: string;

          if ('user_id' in review) { // Live Review
            authorName = `${review.profiles?.first_name || 'Anonymous'} ${review.profiles?.last_name || ''}`.trim() || 'Anonymous User';
            isVerified = review.is_verified_buyer;
            reviewDate = new Date(review.created_at).toLocaleDateString();
            reviewTitle = review.title;
            reviewComment = review.comment;
          } else { // Legacy Review
            authorName = (review as LegacyReview).author;
            isVerified = (review as LegacyReview).isVerifiedBuyer;
            reviewDate = new Date((review as LegacyReview).date).toLocaleDateString();
            reviewTitle = (review as LegacyReview).title;
            reviewComment = (review as LegacyReview).comment;
          }

          return (
            <div key={review.id} className="border-b pb-6 last:border-b-0">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-lg md:text-xl text-foreground">{reviewTitle}</h4>
                {renderStars(review.rating)}
              </div>
              <div className="mt-2">
                <p className="text-xs text-foreground mb-2 flex items-center">
                  By <span className="font-medium text-xs ml-1">{authorName}</span> on {reviewDate}
                  {isVerified && (
                    <Badge variant="secondary" className="ml-3 text-xs px-2 py-0.5 flex items-center">
                      <CheckCircle className="h-3 w-3 mr-1" /> Verified Buyer
                    </Badge>
                  )}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">{reviewComment}</p>
              </div>
            </div>
          );
        })
      )}

      {/* Review Submission Form */}
      <div className="pt-8 border-t border-border">
        <ReviewForm productId={productId} onReviewSubmitted={fetchLiveReviews} />
      </div>
    </div>
  );
};

export default ProductReviewsTab;