"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Banknote, Loader2, Upload, Package, ArrowLeft } from "lucide-react"; // Added ArrowLeft
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client"; // Import Supabase client
import { useAuth } from "@/context/AuthContext.tsx"; // Import useAuth

// Zod schema for bank transfer information
const bankTransferSchema = z.object({
  receiptFile: z.any()
    .refine((file) => file instanceof File || typeof file === 'string' || file === undefined, "Payment receipt is required.")
    .optional(),
  receiptImageUrl: z.string().optional(), // New field for the uploaded image URL
  deliveryMethod: z.enum(["pickup", "dispatch-rider", "park-delivery"], {
    required_error: "Please select a delivery method",
  }),
});

export type BankTransferFormData = z.infer<typeof bankTransferSchema>;

interface BankTransferPaymentFormProps {
  onNext: (data: BankTransferFormData) => void;
  onPrevious: () => void;
  initialData?: BankTransferFormData | null;
}

// Define deliveryOptions here for display purposes
const deliveryOptionsMap: Record<BankTransferFormData['deliveryMethod'], string> = {
  "pickup": "Pick-up (Free)",
  "dispatch-rider": "Dispatch Rider (@ ₦1)",
  "park-delivery": "Park Delivery (@ ₦1)",
};

const BankTransferPaymentForm = ({ onNext, onPrevious, initialData }: BankTransferPaymentFormProps) => {
  const { user } = useAuth(); // Get user from AuthContext
  const [receiptUploaded, setReceiptUploaded] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const {
    handleSubmit,
    formState: { isSubmitting },
    setValue,
    watch,
  } = useForm<BankTransferFormData>({
    resolver: zodResolver(bankTransferSchema),
    defaultValues: {
      receiptFile: initialData?.receiptFile,
      receiptImageUrl: initialData?.receiptImageUrl, // Set initial image URL
      deliveryMethod: initialData?.deliveryMethod || "pickup", // Ensure default is set
    },
  });

  const currentReceiptFile = watch("receiptFile");
  const currentReceiptImageUrl = watch("receiptImageUrl"); // Watch the image URL
  const selectedDeliveryMethod = watch("deliveryMethod");

  useEffect(() => {
    if (initialData?.receiptFile && typeof initialData.receiptFile === 'object') {
      setFileName(initialData.receiptFile.name);
      setReceiptUploaded(true);
    } else if (initialData?.receiptImageUrl) {
      setFileName("Previously uploaded"); // Indicate a file was already uploaded
      setReceiptUploaded(true);
    }
  }, [initialData?.receiptFile, initialData?.receiptImageUrl]);


  const handleReceiptUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!user) {
      toast.error("You must be logged in to upload a receipt.");
      return;
    }

    if (file) {
      setFileName(file.name);
      setReceiptUploaded(false); // Reset until upload is complete
      toast.loading("Uploading receipt...", { id: "receipt-upload" });

      const fileExtension = file.name.split('.').pop();
      const filePath = `${user.id}/${Date.now()}.${fileExtension}`; // Use user.id from AuthContext

      const { data, error } = await supabase.storage
        .from('receipts')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        toast.dismiss("receipt-upload");
        toast.error("Failed to upload receipt.", { description: error.message });
        console.error("Supabase upload error:", error);
        setValue("receiptFile", undefined);
        setValue("receiptImageUrl", undefined);
        setFileName(null);
      } else {
        const { data: publicUrlData } = supabase.storage.from('receipts').getPublicUrl(data.path);
        setValue("receiptFile", file); // Keep the file object for form submission if needed
        setValue("receiptImageUrl", publicUrlData.publicUrl); // Store the public URL
        setReceiptUploaded(true);
        toast.dismiss("receipt-upload");
        toast.success("Receipt uploaded successfully!", { description: file.name });
      }
    } else {
      setValue("receiptFile", undefined);
      setValue("receiptImageUrl", undefined);
      setFileName(null);
      setReceiptUploaded(false);
      toast.info("No receipt selected.");
    }
  };

  const onSubmit = async (data: BankTransferFormData) => {
    if (!data.receiptImageUrl) { // Check for the URL instead of the file object
      toast.error("Please upload your payment receipt to continue.");
      return;
    }
    onNext(data);
  };

  return (
    <Card className="rounded-2xl shadow-lg h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <Banknote className="h-6 w-6 text-primary" /> Bank Transfer Payment
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-muted/30 rounded-lg p-6 border border-border">
            <p className="font-semibold text-lg text-foreground">Please make your payment to:</p>
            <ul className="mt-3 space-y-1 text-muted-foreground text-sm">
              <li><strong>Bank Name:</strong> Opay</li>
              <li><strong>Account Name:</strong> Hashim Aishat Omowunmi</li>
              <li><strong>Account Number:</strong> 9039144261</li>
            </ul>

            <p className="mt-4 text-xs text-muted-foreground">
              💡 Use your Full Name as the payment reference.
            </p>
          </div>

          {/* Display selected Delivery Method (read-only) */}
          <div className="space-y-2">
            <Label htmlFor="deliveryMethodDisplay" className="flex items-center gap-2">
              <Package className="h-4 w-4" /> Selected Delivery Method
            </Label>
            <Input
              id="deliveryMethodDisplay"
              value={deliveryOptionsMap[selectedDeliveryMethod]}
              readOnly
              className="bg-muted text-foreground font-medium"
            />
            {(selectedDeliveryMethod === "dispatch-rider" || selectedDeliveryMethod === "park-delivery") && (
              <p className="text-xs text-primary font-medium mt-2">
                *Actual delivery fees are negotiated directly with the driver.
              </p>
            )}
          </div>

          {/* Upload Section */}
          <div className="space-y-2">
            <Label htmlFor="receiptFile" className="flex items-center gap-2">
              <Upload className="h-4 w-4" /> Upload Payment Receipt
            </Label>
            <div className="flex items-center space-x-2">
              <Input
                id="receiptFile"
                type="file"
                accept="image/*,application/pdf"
                className="flex-grow"
                onChange={handleReceiptUpload}
              />
              {fileName && (
                <span className="text-sm text-muted-foreground truncate max-w-[150px]">{fileName}</span>
              )}
            </div>
            {!receiptUploaded && (
              <p className="text-destructive text-sm">Please upload your payment receipt.</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
            <Button type="button" variant="outline" onClick={onPrevious} className="w-full sm:w-auto">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Delivery Method
            </Button>
            <Button type="submit" className="w-full sm:w-auto" size="lg" disabled={isSubmitting || !receiptUploaded}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                </>
              ) : (
                "Continue to Shipping"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BankTransferPaymentForm;