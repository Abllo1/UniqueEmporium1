"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence, Easing } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
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
  BellRing,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  ChevronFirst,
  ChevronLast,
  CalendarIcon,
  Eye,
  XCircle,
  CheckCircle2,
} from "lucide-react";
import * as LucideIcons from "lucide-react"; // Import all Lucide icons
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDeliveryBanners, DeliveryBannerMessage } from "@/hooks/useDeliveryBanners";
import { format, parseISO } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

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

// Zod Schema for Add/Edit Banner Form
const bannerFormSchema = z.object({
  id: z.string().optional(),
  message_type: z.string().min(1, "Message Type is required"),
  content: z.string().min(1, "Content is required"),
  start_date: z.date().nullable().optional(),
  end_date: z.date().nullable().optional(),
  is_active: z.boolean().default(true),
  priority: z.coerce.number().min(0, "Priority must be 0 or greater").default(0),
  link_url: z.string().url("Invalid URL format").nullable().optional().or(z.literal('')),
  link_text: z.string().nullable().optional(),
  background_color: z.string().nullable().optional(),
  text_color: z.string().nullable().optional(),
  icon_name: z.string().nullable().optional(),
});

type BannerFormData = z.infer<typeof bannerFormSchema>;

// Type guard to check if a string is a valid Lucide icon key
const isLucideIconKey = (key: string): key is keyof typeof LucideIcons => {
  return key in LucideIcons;
};

const DeliveryBannerManagement = () => {
  const { banners, isLoading, addBanner, updateBanner, deleteBanner, fetchBanners } = useDeliveryBanners();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const bannersPerPage = 10;

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<DeliveryBannerMessage | null>(null);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [deletingBannerId, setDeletingBannerId] = useState<string | null>(null);
  const [deletingBannerContent, setDeletingBannerContent] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BannerFormData>({
    resolver: zodResolver(bannerFormSchema),
    defaultValues: {
      message_type: "delivery",
      is_active: true,
      priority: 0,
      start_date: null,
      end_date: null,
      link_url: "",
      link_text: "",
      background_color: "bg-red-600", // Default to current banner style
      text_color: "text-white",      // Default to current banner style
      icon_name: "Truck",            // Default to current banner style
    },
  });

  const currentIsActive = watch("is_active");
  const currentStartDate = watch("start_date");
  const currentEndDate = watch("end_date");
  const currentIconName = watch("icon_name");

  useEffect(() => {
    if (isAddModalOpen || isEditModalOpen) {
      // Reset form when dialog opens
      if (editingBanner) {
        reset({
          ...editingBanner,
          start_date: editingBanner.start_date ? parseISO(editingBanner.start_date) : null,
          end_date: editingBanner.end_date ? parseISO(editingBanner.end_date) : null,
        });
      } else {
        reset({
          message_type: "delivery",
          content: "",
          is_active: true,
          priority: 0,
          start_date: null,
          end_date: null,
          link_url: "",
          link_text: "",
          background_color: "bg-red-600",
          text_color: "text-white",
          icon_name: "Truck",
        });
      }
    }
  }, [isAddModalOpen, isEditModalOpen, editingBanner, reset]);

  const filteredBanners = useMemo(() => {
    let filtered = banners;

    if (searchTerm) {
      filtered = filtered.filter(
        (banner) =>
          banner.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          banner.message_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          banner.link_text?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== "all") {
      filtered = filtered.filter(
        (banner) => banner.message_type === filterType
      );
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter(
        (banner) => banner.is_active === (filterStatus === "active")
      );
    }

    return filtered;
  }, [banners, searchTerm, filterType, filterStatus]);

  // Pagination logic
  const indexOfLastBanner = currentPage * bannersPerPage;
  const indexOfFirstBanner = indexOfLastBanner - bannersPerPage;
  const currentBanners = filteredBanners.slice(indexOfFirstBanner, indexOfLastBanner);
  const totalPages = Math.ceil(filteredBanners.length / bannersPerPage);

  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPrevPage = () => setCurrentPage((prev) => Math.max(1, prev - 1));
  const goToNextPage = () => setCurrentPage((prev) => Math.min(totalPages, prev + 1));

  const handleAddBannerClick = () => {
    setEditingBanner(null);
    setIsAddModalOpen(true);
  };

  const handleEditBannerClick = (banner: DeliveryBannerMessage) => {
    setEditingBanner(banner);
    setIsEditModalOpen(true);
  };

  const handleDeleteBannerClick = (bannerId: string, bannerContent: string) => {
    setDeletingBannerId(bannerId);
    setDeletingBannerContent(bannerContent);
    setIsDeleteAlertOpen(true);
  };

  const handleAddOrUpdateBanner = async (data: BannerFormData) => {
    const payload = {
      ...data,
      start_date: data.start_date ? data.start_date.toISOString() : null,
      end_date: data.end_date ? data.end_date.toISOString() : null,
      link_url: data.link_url || null,
      link_text: data.link_text || null,
      background_color: data.background_color || null,
      text_color: data.text_color || null,
      icon_name: data.icon_name || null,
    };

    let success = false;
    if (editingBanner) {
      success = await updateBanner(editingBanner.id, payload);
    } else {
      success = await addBanner(payload);
    }

    if (success) {
      setIsAddModalOpen(false);
      setIsEditModalOpen(false);
    }
  };

  const confirmDeleteBanner = useCallback(async () => {
    if (deletingBannerId) {
      await deleteBanner(deletingBannerId);
      setIsDeleteAlertOpen(false);
      setDeletingBannerId(null);
      setDeletingBannerContent("");
    }
  }, [deletingBannerId, deleteBanner]);

  const renderIcon = (iconName: string | null, className?: string) => {
    if (!iconName) return null;
    const IconComponent = isLucideIconKey(iconName) ? LucideIcons[iconName] : null;
    return IconComponent ? <IconComponent className={cn("h-5 w-5", className)} /> : null;
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
          Delivery Banner Management
        </motion.h1>
        <motion.p className="text-base md:text-lg text-muted-foreground" variants={fadeInUp}>
          Control the dynamic messages displayed in the delivery banner across your site.
        </motion.p>
      </div>

      <Card className="rounded-xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <BellRing className="h-5 w-5 text-primary" /> All Banners
          </CardTitle>
        </CardHeader>
        <CardContent className="min-w-0 p-0">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b p-4">
            <div className="relative flex-grow w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by content or type..."
                className="w-full pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="delivery">Delivery</SelectItem>
                  <SelectItem value="promo">Promotion</SelectItem>
                  <SelectItem value="alert">Alert</SelectItem>
                  <SelectItem value="info">Information</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleAddBannerClick} className="w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" /> Add New Banner
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="ml-3 text-muted-foreground">Loading banners...</p>
            </div>
          ) : filteredBanners.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              <Filter className="h-12 w-12 mx-auto mb-4" />
              <p>No banners found matching your filters.</p>
              <Button onClick={() => { setSearchTerm(""); setFilterType("all"); setFilterStatus("all"); }} className="mt-4">
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">Content</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {currentBanners.map((banner) => (
                      <motion.tr
                        key={banner.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}
                      >
                        <TableCell className="font-medium max-w-[250px] truncate">
                          <div className="flex items-center gap-2">
                            {renderIcon(banner.icon_name, banner.text_color || "text-foreground")}
                            <span className={cn(banner.text_color)} style={{ backgroundColor: banner.background_color }}>
                              {banner.content}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{banner.message_type}</TableCell>
                        <TableCell>
                          <Badge variant={banner.is_active ? "default" : "secondary"}>
                            {banner.is_active ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>{banner.priority}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {banner.start_date ? format(parseISO(banner.start_date), 'MMM dd, yyyy') : 'No Start'} -{" "}
                          {banner.end_date ? format(parseISO(banner.end_date), 'MMM dd, yyyy') : 'No End'}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="outline" size="icon" onClick={() => handleEditBannerClick(banner)}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Edit Banner</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <AlertDialog>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <AlertDialogTrigger asChild>
                                      <Button variant="outline" size="icon" onClick={() => handleDeleteBannerClick(banner.id, banner.content)}>
                                        <Trash2 className="h-4 w-4 text-red-600" />
                                      </Button>
                                    </AlertDialogTrigger>
                                  </TooltipTrigger>
                                  <TooltipContent>Delete Banner</TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action will permanently delete the banner: "{banner.content}".
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={confirmDeleteBanner}>
                                    Continue
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
          {filteredBanners.length > bannersPerPage && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t">
              <div className="text-sm text-muted-foreground">
                Showing {indexOfFirstBanner + 1} to {Math.min(indexOfLastBanner, filteredBanners.length)} of {filteredBanners.length} banners
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

      {/* Add/Edit Banner Dialog */}
      <Dialog open={isAddModalOpen || isEditModalOpen} onOpenChange={isEditModalOpen ? setIsEditModalOpen : setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[550px] p-6 rounded-xl shadow-lg bg-card/80 backdrop-blur-md border border-border/50 overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              {editingBanner ? <Edit className="h-6 w-6 text-primary" /> : <Plus className="h-6 w-6 text-primary" />}
              {editingBanner ? "Edit Banner Message" : "Add New Banner Message"}
            </DialogTitle>
            <DialogDescription>
              {editingBanner ? "Update the details for this banner." : "Create a new banner message to display on your site."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(handleAddOrUpdateBanner)} className="space-y-6 py-4">
            <input type="hidden" {...register("id")} />
            
            <div className="space-y-2">
              <Label htmlFor="message_type">Message Type</Label>
              <Select onValueChange={(value) => setValue("message_type", value)} value={watch("message_type")}>
                <SelectTrigger className={cn(errors.message_type && "border-destructive")}>
                  <SelectValue placeholder="Select message type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="delivery">Delivery Update</SelectItem>
                  <SelectItem value="promo">Promotion/Offer</SelectItem>
                  <SelectItem value="alert">Urgent Alert</SelectItem>
                  <SelectItem value="info">General Information</SelectItem>
                </SelectContent>
              </Select>
              {errors.message_type && <p className="text-destructive text-sm">{errors.message_type.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Banner Content</Label>
              <Textarea id="content" {...register("content")} className={cn(errors.content && "border-destructive")} rows={3} placeholder="e.g., Next Delivery Days: Monday & Thursday" />
              {errors.content && <p className="text-destructive text-sm">{errors.content.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start_date">Start Date (Optional)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !currentStartDate && "text-muted-foreground",
                        errors.start_date && "border-destructive"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {currentStartDate ? format(currentStartDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={currentStartDate || undefined}
                      onSelect={(date) => setValue("start_date", date || null, { shouldValidate: true })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.start_date && <p className="text-destructive text-sm">{errors.start_date.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="end_date">End Date (Optional)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !currentEndDate && "text-muted-foreground",
                        errors.end_date && "border-destructive"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {currentEndDate ? format(currentEndDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={currentEndDate || undefined}
                      onSelect={(date) => setValue("end_date", date || null, { shouldValidate: true })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.end_date && <p className="text-destructive text-sm">{errors.end_date.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priority">Priority (Higher = More Prominent)</Label>
                <Input id="priority" type="number" {...register("priority")} className={cn(errors.priority && "border-destructive")} />
                {errors.priority && <p className="text-destructive text-sm">{errors.priority.message}</p>}
              </div>
              <div className="flex items-center space-x-2 mt-auto pb-2">
                <Switch
                  id="is_active-toggle"
                  checked={currentIsActive}
                  onCheckedChange={(checked) => setValue("is_active", checked)}
                />
                <Label htmlFor="is_active-toggle">Status: {currentIsActive ? "Active" : "Inactive"}</Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="link_url">Link URL (Optional)</Label>
              <Input id="link_url" type="url" {...register("link_url")} className={cn(errors.link_url && "border-destructive")} placeholder="https://yourstore.com/promo" />
              {errors.link_url && <p className="text-destructive text-sm">{errors.link_url.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="link_text">Link Text (Optional, e.g., "Shop Now")</Label>
              <Input id="link_text" {...register("link_text")} placeholder="Shop Now" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="background_color">Background Color (Tailwind Class)</Label>
                <Input id="background_color" {...register("background_color")} placeholder="e.g., bg-red-600" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="text_color">Text Color (Tailwind Class)</Label>
                <Input id="text_color" {...register("text_color")} placeholder="e.g., text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="icon_name">Icon Name (Lucide Icon)</Label>
                <Input id="icon_name" {...register("icon_name")} placeholder="e.g., Truck, Gift, BellRing" />
                {currentIconName && renderIcon(currentIconName, "mt-2 text-muted-foreground")}
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => { isEditModalOpen ? setIsEditModalOpen(false) : setIsAddModalOpen(false); }}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                  </>
                ) : (
                  editingBanner ? "Save Changes" : "Add Banner"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default DeliveryBannerManagement;