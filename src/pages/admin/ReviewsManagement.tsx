"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence, Easing } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  MessageSquare,
  Search,
  Filter,
  Trash2,
  Eye,
  Star,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  ChevronFirst,
  ChevronLast,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

// Define Review interface based on the dedicated table structure
interface Review {
  id: string;
  user_id: string;
  product_id: string;
  rating: number;
  title: string;
  comment: string;
  is_verified_buyer: boolean;
  created_at: string;
  // Joined data from profiles table
  profiles: {
    first_name: string;
    last_name: string;
    email: string;
  } | null;
}

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

const ReviewsManagement = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRating, setFilterRating] = useState("all");
  const [filterVerified, setFilterVerified] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 10;

  const [isViewDetailsModalOpen, setIsViewDetailsModalOpen] = useState(false);
  const [viewingReview, setViewingReview] = useState<Review | null>(null);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [deletingReviewId, setDeletingReviewId] = useState<string | null>(null);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);

  const fetchReviews = useCallback(async () => {
    setIsLoadingReviews(true);
    const { data, error } = await supabase
      .from('product_reviews')
      .select(`
        *,
        profiles(first_name, last_name, email)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to load reviews.", { description: error.message });
      setReviews([]);
    } else {
      setReviews(data as Review[]);
    }
    setIsLoadingReviews(false);
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const filteredReviews = useMemo(() => {
    let filtered = reviews;

    if (searchTerm) {
      filtered = filtered.filter(
        (review) =>
          review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
          review.product_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          review.profiles?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          review.profiles?.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          review.profiles?.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterRating !== "all") {
      filtered = filtered.filter(
        (review) => review.rating === parseInt(filterRating)
      );
    }

    if (filterVerified !== "all") {
      const isVerified = filterVerified === "true";
      filtered = filtered.filter(
        (review) => review.is_verified_buyer === isVerified
      );
    }

    return filtered;
  }, [reviews, searchTerm, filterRating, filterVerified]);

  // Pagination logic
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPrevPage = () => setCurrentPage(prev => Math.max(1, prev - 1));
  const goToNextPage = () => setCurrentPage(prev => Math.min(totalPages, prev + 1));

  const handleViewDetailsClick = (review: Review) => {
    setViewingReview(review);
    setIsViewDetailsModalOpen(true);
  };

  const handleDeleteReviewClick = (reviewId: string) => {
    setDeletingReviewId(reviewId);
    setIsDeleteAlertOpen(true);
  };

  const confirmDeleteReview = useCallback(async () => {
    if (deletingReviewId) {
      const { error } = await supabase
        .from('product_reviews')
        .delete()
        .eq('id', deletingReviewId);

      if (error) {
        toast.error("Failed to delete review.", { description: error.message });
      } else {
        toast.info(`Review ${deletingReviewId} deleted.`);
        setDeletingReviewId(null);
        setIsDeleteAlertOpen(false);
        fetchReviews(); // Re-fetch reviews to update the list
      }
    }
  }, [deletingReviewId, fetchReviews]);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i < rating ? "fill-yellow-500 text-yellow-500" : "fill-gray-300 text-gray-300"
          )}
        />
      );
    }
    return <div className="flex items-center">{stars}</div>;
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
          Reviews Management
        </motion.h1>
        <motion.p className="text-base md:text-lg text-muted-foreground" variants={fadeInUp}>
          Manage all customer product reviews.
        </motion.p>
      </div>

      <Card className="rounded-xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" /> All Reviews
          </CardTitle>
        </CardHeader>
        <CardContent className="min-w-0 p-0">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b p-4">
            <div className="relative flex-grow w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by Title, Comment, Product ID, or Author..."
                className="w-full pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Select value={filterRating} onValueChange={setFilterRating}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  {[5, 4, 3, 2, 1].map(r => (
                    <SelectItem key={r} value={r.toString()}>{r} Stars</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterVerified} onValueChange={setFilterVerified}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by Verified Buyer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Buyers</SelectItem>
                  <SelectItem value="true">Verified Buyers</SelectItem>
                  <SelectItem value="false">Unverified Buyers</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoadingReviews ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="ml-3 text-muted-foreground">Loading reviews...</p>
            </div>
          ) : filteredReviews.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              <Filter className="h-12 w-12 mx-auto mb-4" />
              <p>No reviews found matching your filters.</p>
              <Button onClick={() => { setSearchTerm(""); setFilterRating("all"); setFilterVerified("all"); }} className="mt-4">
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">Product ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Verified</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {currentReviews.map((review) => (
                      <motion.tr
                        key={review.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}
                      >
                        <TableCell className="font-medium text-xs">{review.product_id}</TableCell>
                        <TableCell className="font-medium line-clamp-1">{review.title}</TableCell>
                        <TableCell>{renderStars(review.rating)}</TableCell>
                        <TableCell>
                          {review.profiles ? `${review.profiles.first_name} ${review.profiles.last_name}` : 'Anonymous'}
                          <div className="text-xs text-muted-foreground">{review.profiles?.email}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={review.is_verified_buyer ? "default" : "secondary"}>
                            {review.is_verified_buyer ? "Yes" : "No"}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(review.created_at).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="outline" size="icon" onClick={() => handleViewDetailsClick(review)}>
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>View Details</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <AlertDialog>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <AlertDialogTrigger asChild>
                                      <Button variant="outline" size="icon" onClick={() => handleDeleteReviewClick(review.id)}>
                                        <Trash2 className="h-4 w-4 text-red-600" />
                                      </Button>
                                    </AlertDialogTrigger>
                                  </TooltipTrigger>
                                  <TooltipContent>Delete Review</TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the review by "{review.profiles?.first_name || 'Anonymous'}" for product "{review.product_id}".
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={confirmDeleteReview}>
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </div>
          )}

          {/* Pagination Controls */}
          {filteredReviews.length > reviewsPerPage && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t">
              <div className="text-sm text-muted-foreground">
                Showing {indexOfFirstReview + 1} to {Math.min(indexOfLastReview, filteredReviews.length)} of {filteredReviews.length} reviews
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToFirstPage}
                  disabled={currentPage === 1}
                  className="hidden sm:flex"
                >
                  <ChevronFirst className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex items-center">
                  <span className="text-sm font-medium">
                    Page {currentPage} of {totalPages}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToLastPage}
                  disabled={currentPage === totalPages}
                  className="hidden sm:flex"
                >
                  <ChevronLast className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Review Details Dialog */}
      <Dialog open={isViewDetailsModalOpen} onOpenChange={setIsViewDetailsModalOpen}>
        <DialogContent className="sm:max-w-[600px] p-6 rounded-xl shadow-lg bg-card/80 backdrop-blur-md border border-border/50">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Eye className="h-6 w-6 text-primary" /> Review Details
            </DialogTitle>
            <DialogDescription>
              Full content of the review.
            </DialogDescription>
          </DialogHeader>
          {viewingReview && (
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-xl text-foreground">{viewingReview.title}</h3>
                {renderStars(viewingReview.rating)}
              </div>
              <p className="text-sm text-muted-foreground flex items-center">
                By <span className="font-medium text-foreground ml-1">{viewingReview.profiles ? `${viewingReview.profiles.first_name} ${viewingReview.profiles.last_name}` : 'Anonymous'}</span>
                <span className="text-xs text-muted-foreground ml-1">({viewingReview.profiles?.email || 'N/A'})</span>
                <span className="ml-2">on {new Date(viewingReview.created_at).toLocaleDateString()}</span>
                {viewingReview.is_verified_buyer && (
                  <Badge variant="default" className="ml-3 text-xs px-2 py-0.5 flex items-center">
                    <CheckCircle2 className="h-3 w-3 mr-1" /> Verified Buyer
                  </Badge>
                )}
              </p>
              <p className="text-base text-foreground leading-relaxed">{viewingReview.comment}</p>
              <div className="border-t pt-4 mt-4">
                <p className="text-sm text-muted-foreground">Product ID: <span className="font-medium text-foreground">{viewingReview.product_id}</span></p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsViewDetailsModalOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default ReviewsManagement;