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
  DialogDescription, // Added DialogDescription
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
  Settings,
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
  Image as ImageIcon,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client"; // Import Supabase client
import ImageWithFallback from "@/components/common/ImageWithFallback.tsx"; // Import ImageWithFallback

// Define the AdminCategory interface based on your database structure
export interface AdminCategory {
  id: string;
  name: string;
  product_count: number; // Changed to snake_case for consistency with DB
  status: "active" | "inactive";
  image_url?: string | null; // Added image_url
  created_at?: string;
  updated_at?: string;
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

// Form Schema for Add/Edit Category
const categoryFormSchema = z.object({
  id: z.string().optional(), // For editing
  name: z.string().min(1, "Category Name is required"),
  status: z.enum(["active", "inactive"]).default("active"),
  image_url: z.string().optional().nullable(), // Existing image URL
  newImageFile: z.any().optional(), // New file object
});

type CategoryFormData = z.infer<typeof categoryFormSchema>;

const CategoriesManagement = () => {
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 10;

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<AdminCategory | null>(null);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [deletingCategoryId, setDeletingCategoryId] = useState<string | null>(null);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);


  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      status: "active", // Default status for new categories
      image_url: null,
      newImageFile: undefined,
    }
  });

  const currentStatus = watch("status");
  const currentImageUrl = watch("image_url");
  const currentNewImageFile = watch("newImageFile");

  const fetchCategories = useCallback(async () => {
    setIsLoadingCategories(true);
    const { data, error } = await supabase.from('categories').select('*').order('name', { ascending: true });

    if (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories.", { description: error.message });
      setCategories([]);
    } else {
      // Map snake_case from DB to camelCase for AdminCategory interface
      const fetchedCategories: AdminCategory[] = data.map((c: any) => ({
        id: c.id,
        name: c.name,
        product_count: c.product_count,
        status: c.status,
        image_url: c.image_url, // Map new field
        created_at: c.created_at,
        updated_at: c.updated_at,
      }));
      setCategories(fetchedCategories);
    }
    setIsLoadingCategories(false);
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);


  const filteredCategories = useMemo(() => {
    let filtered = categories;

    if (searchTerm) {
      filtered = filtered.filter(
        (category) =>
          category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          category.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter(
        (category) => category.status === filterStatus
      );
    }

    return filtered;
  }, [categories, searchTerm, filterStatus]);

  // Pagination logic
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirstCategory, indexOfLastCategory);
  const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  // New pagination functions
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPrevPage = () => setCurrentPage(prev => Math.max(1, prev - 1));
  const goToNextPage = () => setCurrentPage(prev => Math.min(totalPages, prev + 1));

  const handleAddCategoryClick = () => {
    reset({
      status: "active",
      image_url: null,
      newImageFile: undefined,
    }); // Clear form fields
    setIsAddModalOpen(true);
  };

  const handleEditCategoryClick = (category: AdminCategory) => {
    setEditingCategory(category);
    reset({
      id: category.id,
      name: category.name,
      status: category.status,
      image_url: category.image_url,
      newImageFile: undefined,
    });
    setIsEditModalOpen(true);
  };

  const handleDeleteCategoryClick = (categoryId: string) => {
    setDeletingCategoryId(categoryId);
    setIsDeleteAlertOpen(true);
  };

  const handleImageUpload = async (file: File, categoryId: string): Promise<string | null> => {
    const fileExtension = file.name.split('.').pop();
    const filePath = `${categoryId}/${Date.now()}.${fileExtension}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('category_images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (uploadError) {
      console.error("Error uploading category image:", uploadError);
      toast.error("Failed to upload image.", { description: uploadError.message });
      return null;
    }

    const { data: publicUrlData } = supabase.storage.from('category_images').getPublicUrl(uploadData.path);
    return publicUrlData.publicUrl;
  };

  const handleDeleteOldImage = async (imageUrl: string) => {
    if (!imageUrl) return;
    
    // Extract path from public URL
    const urlParts = imageUrl.split('/public/storage/v1/object/public/category_images/');
    if (urlParts.length > 1) {
      const filePath = urlParts[1];
      const { error: deleteError } = await supabase.storage
        .from('category_images')
        .remove([filePath]);

      if (deleteError) {
        console.error("Error deleting old category image:", deleteError);
        // Do not throw, just log the error
      }
    }
  };

  const handleAddOrUpdateCategory = async (data: CategoryFormData) => {
    const isEditing = !!editingCategory;
    const categoryId = data.id || data.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    let finalImageUrl = data.image_url;

    // 1. Handle Image Upload/Deletion
    if (data.newImageFile instanceof File) {
      // If a new file is selected, upload it
      const uploadToastId = toast.loading("Uploading image...");
      
      // Delete old image if it exists and we are replacing it
      if (isEditing && editingCategory?.image_url) {
        await handleDeleteOldImage(editingCategory.image_url);
      }

      finalImageUrl = await handleImageUpload(data.newImageFile, categoryId);
      toast.dismiss(uploadToastId);
      if (!finalImageUrl) return; // Stop if upload failed
    } else if (isEditing && !data.image_url && editingCategory?.image_url) {
      // If editing, no new file, and image_url was explicitly cleared (set to null/undefined in form)
      // This case is handled by the form logic below, but we need to delete the file if it was removed.
      if (editingCategory.image_url !== finalImageUrl) {
         await handleDeleteOldImage(editingCategory.image_url);
      }
    }


    const categoryPayload = {
      name: data.name,
      status: data.status,
      image_url: finalImageUrl,
    };

    if (isEditing) {
      // Update existing category
      const { error } = await supabase
        .from('categories')
        .update(categoryPayload)
        .eq('id', editingCategory.id);

      if (error) {
        console.error("Supabase Update Error:", error);
        toast.error("Failed to update category.", { description: error.message });
      } else {
        toast.success(`Category "${data.name}" updated successfully!`);
        setIsEditModalOpen(false);
        setEditingCategory(null);
        fetchCategories(); // Re-fetch categories to update the list
      }
    } else {
      // Add new category
      const { error } = await supabase
        .from('categories')
        .insert([{ ...categoryPayload, id: categoryId, product_count: 0 }]); // Default product_count to 0

      if (error) {
        console.error("Supabase Insert Error:", error);
        let description = error.message;
        if (error.code === '23505') { // PostgreSQL unique violation error code (Primary Key/Unique Constraint)
            description = `A category with the name/ID "${categoryId}" already exists. Please choose a different name.`;
        }
        toast.error("Failed to add category.", { description });
      } else {
        toast.success(`Category "${data.name}" added successfully!`);
        setIsAddModalOpen(false);
        fetchCategories(); // Re-fetch categories to update the list
      }
    }
  };

  const confirmDeleteCategory = useCallback(async () => {
    if (deletingCategoryId) {
      const categoryToDelete = categories.find(c => c.id === deletingCategoryId);
      const categoryName = categoryToDelete?.name || deletingCategoryId;

      // Attempt to delete the image first
      if (categoryToDelete?.image_url) {
        await handleDeleteOldImage(categoryToDelete.image_url);
      }

      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', deletingCategoryId);

      if (error) {
        console.error("Supabase Delete Error:", error);
        let description = error.message;
        if (error.code === '23503') { // PostgreSQL foreign key violation error code
            description = `Cannot delete category "${categoryName}". Please ensure all associated products are removed or reassigned first.`;
        }
        toast.error("Failed to delete category.", { description });
      } else {
        toast.info(`Category "${categoryName}" deleted.`);
        setDeletingCategoryId(null);
        setIsDeleteAlertOpen(false);
        fetchCategories(); // Re-fetch categories to update the list
      }
    }
  }, [deletingCategoryId, fetchCategories, categories]); // Added 'categories' dependency

  const handleRemoveImage = () => {
    setValue("image_url", null, { shouldDirty: true });
    setValue("newImageFile", undefined, { shouldDirty: true });
    toast.info("Image removed. Save changes to confirm deletion.");
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
          Categories Management
        </motion.h1>
        <motion.p className="text-base md:text-lg text-muted-foreground" variants={fadeInUp}>
          Manage your product categories, including adding, editing, and deleting them.
        </motion.p>
      </div>

      <Card className="rounded-xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" /> All Categories
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b p-4">
            <div className="relative flex-grow w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by Category Name or ID..."
                className="w-full pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
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
              <Button onClick={handleAddCategoryClick} className="w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" /> Add New Category
              </Button>
            </div>
          </div>

          {isLoadingCategories ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="ml-3 text-muted-foreground">Loading categories...</p>
            </div>
          ) : filteredCategories.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              <Filter className="h-12 w-12 mx-auto mb-4" />
              <p>No categories found matching your filters.</p>
              <Button onClick={() => { setSearchTerm(""); setFilterStatus("all"); }} className="mt-4">
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto w-full"> {/* Added w-full to ensure the container takes full width */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Image</TableHead>
                    <TableHead className="w-[150px]">Category ID</TableHead>
                    <TableHead>Category Name</TableHead>
                    <TableHead>Products Count</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {currentCategories.map((category) => (
                      <motion.tr
                        key={category.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}
                      >
                        <TableCell>
                          <ImageWithFallback
                            src={category.image_url || undefined}
                            alt={category.name}
                            containerClassName="h-10 w-10 rounded-full overflow-hidden border"
                            fallbackLogoClassName="h-6 w-6"
                          />
                        </TableCell>
                        <TableCell className="font-medium text-xs">{category.id}</TableCell>
                        <TableCell className="font-medium">{category.name}</TableCell>
                        <TableCell>{category.product_count}</TableCell>
                        <TableCell>
                          <Badge variant={category.status === "active" ? "default" : "destructive"}>
                            {category.status.charAt(0).toUpperCase() + category.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="outline" size="icon" onClick={() => handleEditCategoryClick(category)}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Edit Category</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <AlertDialog>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <AlertDialogTrigger asChild>
                                      <Button variant="outline" size="icon" onClick={() => handleDeleteCategoryClick(category.id)}>
                                        <Trash2 className="h-4 w-4 text-red-600" />
                                      </Button>
                                    </AlertDialogTrigger>
                                  </TooltipTrigger>
                                  <TooltipContent>Delete Category</TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action will permanently delete the category "{category.name}".
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={confirmDeleteCategory}>
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
          {filteredCategories.length > categoriesPerPage && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t">
              <div className="text-sm text-muted-foreground">
                Showing {indexOfFirstCategory + 1} to {Math.min(indexOfLastCategory, filteredCategories.length)} of {filteredCategories.length} categories
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

      {/* Add Category Dialog */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[425px] p-6 rounded-xl shadow-lg bg-card/80 backdrop-blur-md border border-border/50">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Plus className="h-6 w-6 text-primary" /> Add New Category
            </DialogTitle>
            <DialogDescription>
              Enter the details for the new product category.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(handleAddOrUpdateCategory)} className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Category Name</Label>
              <Input id="name" {...register("name")} className={cn(errors.name && "border-destructive")} />
              {errors.name && <p className="text-destructive text-sm">{errors.name.message}</p>}
            </div>

            {/* Image Upload Section */}
            <div className="space-y-2">
              <Label htmlFor="newImageFile" className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" /> Category Image (Optional)
              </Label>
              <Input
                id="newImageFile"
                type="file"
                accept="image/*"
                {...register("newImageFile")}
                onChange={(e) => {
                  setValue("newImageFile", e.target.files?.[0]);
                  setValue("image_url", null); // Clear existing URL if a new file is selected
                }}
              />
              {currentImageUrl && (
                <div className="flex items-center gap-3 mt-2 p-2 border rounded-lg bg-muted/50">
                  <ImageWithFallback
                    src={currentImageUrl}
                    alt="Current Category Image"
                    containerClassName="h-10 w-10 rounded-full overflow-hidden flex-shrink-0"
                    fallbackLogoClassName="h-6 w-6"
                  />
                  <span className="text-sm text-muted-foreground truncate">Current Image Uploaded</span>
                  <Button type="button" variant="ghost" size="icon" className="ml-auto h-6 w-6 text-destructive" onClick={handleRemoveImage}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="status-toggle"
                checked={currentStatus === "active"}
                onCheckedChange={(checked) => setValue("status", checked ? "active" : "inactive")}
              />
              <Label htmlFor="status-toggle">Category Status: {currentStatus === "active" ? "Active" : "Inactive"}</Label>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                  </>
                ) : (
                  "Add Category"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px] p-6 rounded-xl shadow-lg bg-card/80 backdrop-blur-md border border-border/50">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Edit className="h-6 w-6 text-primary" /> Edit Category
            </DialogTitle>
            <DialogDescription>
              Update the details for this product category.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(handleAddOrUpdateCategory)} className="space-y-6 py-4">
            <input type="hidden" {...register("id")} /> {/* Hidden field for category ID */}
            <div className="space-y-2">
              <Label htmlFor="name">Category Name</Label>
              <Input id="name" {...register("name")} className={cn(errors.name && "border-destructive")} />
              {errors.name && <p className="text-destructive text-sm">{errors.name.message}</p>}
            </div>

            {/* Image Upload Section (Edit) */}
            <div className="space-y-2">
              <Label htmlFor="newImageFile" className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" /> Category Image (Optional)
              </Label>
              <Input
                id="newImageFile"
                type="file"
                accept="image/*"
                {...register("newImageFile")}
                onChange={(e) => {
                  setValue("newImageFile", e.target.files?.[0]);
                  setValue("image_url", null); // Clear existing URL if a new file is selected
                }}
              />
              {(currentImageUrl || currentNewImageFile) && (
                <div className="flex items-center gap-3 mt-2 p-2 border rounded-lg bg-muted/50">
                  <ImageWithFallback
                    src={currentImageUrl || (currentNewImageFile instanceof File ? URL.createObjectURL(currentNewImageFile) : undefined)}
                    alt="Current Category Image"
                    containerClassName="h-10 w-10 rounded-full overflow-hidden flex-shrink-0"
                    fallbackLogoClassName="h-6 w-6"
                  />
                  <span className="text-sm text-muted-foreground truncate">
                    {currentNewImageFile instanceof File ? currentNewImageFile.name : "Current Image Uploaded"}
                  </span>
                  <Button type="button" variant="ghost" size="icon" className="ml-auto h-6 w-6 text-destructive" onClick={handleRemoveImage}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="status-toggle-edit"
                checked={currentStatus === "active"}
                onCheckedChange={(checked) => setValue("status", checked ? "active" : "inactive")}
              />
              <Label htmlFor="status-toggle-edit">Category Status: {currentStatus === "active" ? "Active" : "Inactive"}</Label>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default CategoriesManagement;