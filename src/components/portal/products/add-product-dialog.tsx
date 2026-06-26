"use client";

import { useState, useTransition, KeyboardEvent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UploadDropzone } from "@/utils/uploadthing";
import { createProduct } from "@/lib/products-actions";
import { toast } from "sonner";
import Image from "next/image";
import { XIcon, StarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------

const productSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  description: z.string().min(1, "Description is required").max(1000),
  costPrice: z.number({ message: "Must be a number" }).min(0, "Must be >= 0"),
  sellingPrice: z.number({ message: "Must be a number" }).min(0, "Must be >= 0"),
  stock: z.number({ message: "Must be a number" }).int().min(0, "Must be >= 0"),
  categoryId: z.string().min(1, "Category is required"),
  promotionId: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

export interface ProductImageItem {
  url: string;
  isCover: boolean;
  order: number;
}

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: { id: string; name: string }[];
  promotions: { id: string; name: string; discountPercent: number }[];
  onSuccess: () => void;
}

export function AddProductDialog({
  open,
  onOpenChange,
  categories,
  promotions,
  onSuccess,
}: AddProductDialogProps) {
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const [images, setImages] = useState<ProductImageItem[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState("");

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      costPrice: 0,
      sellingPrice: 0,
      stock: 0,
      categoryId: "",
      promotionId: "",
    },
  });

  // Reset local state on close
  useEffect(() => {
    if (!open) {
      /* eslint-disable react-hooks/set-state-in-effect */
      setImages([]);
      setKeywords([]);
      setKeywordInput("");
      /* eslint-enable react-hooks/set-state-in-effect */
    }
  }, [open]);

  // Handle keywords
  const handleKeywordKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "," || e.key === ".") {
      e.preventDefault();
      const val = keywordInput.trim().replace(/[,.]+$/, "");
      if (val && !keywords.includes(val)) {
        setKeywords([...keywords, val]);
      }
      setKeywordInput("");
    }
  };

  const removeKeyword = (kw: string) => {
    setKeywords(keywords.filter((k) => k !== kw));
  };

  // Handle Images
  const handleRemoveImage = (url: string) => {
    const newImages = images.filter((img) => img.url !== url);
    // if cover was removed, assign first to cover
    if (images.find((i) => i.url === url)?.isCover && newImages.length > 0) {
      newImages[0].isCover = true;
    }
    setImages(newImages);
  };

  const handleSetCover = (url: string) => {
    setImages(images.map((img) => ({
      ...img,
      isCover: img.url === url,
    })));
  };

  const onSubmit = (values: ProductFormValues) => {
    setServerError(null);

    if (images.length === 0) {
      setServerError("Please upload at least one image.");
      return;
    }
    if (keywords.length === 0) {
      setServerError("Please add at least one keyword.");
      return;
    }

    startTransition(async () => {
      const result = await createProduct({
        ...values,
        promotionId: values.promotionId || undefined,
        keywords,
        images,
      });

      if (result.success) {
        toast.success("Product created successfully.");
        form.reset();
        onOpenChange(false);
        onSuccess();
      } else {
        setServerError(result.error ?? "Failed to create product.");
      }
    });
  };

  const handleClose = () => {
    if (!isPending) {
      form.reset();
      setServerError(null);
      onOpenChange(false);
    }
  };

  const isValid = form.formState.isValid;
  const errors = form.formState.errors;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] flex flex-col p-0 overflow-hidden sm:[&>button.absolute]:hidden">
        <DialogHeader className="px-6 py-6 border-b flex flex-row items-center justify-between shrink-0">
          <DialogTitle>Add Product</DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            type="button"
            onClick={handleClose}
            disabled={isPending}
            className="hidden sm:block text-muted-foreground hover:text-foreground"
          >
            Cancel
          </Button>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6 py-4">
          <form
            id="add-product-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Product Name */}
            <div className="space-y-2">
              <Label htmlFor="name">
                Product Name <span className="text-destructive">*</span>
              </Label>
              <Input id="name" placeholder="e.g. Vintage Leather Jacket" {...form.register("name")} />
              {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">
                Description <span className="text-destructive">*</span>
              </Label>
              <Textarea id="description" placeholder="Describe this product..." rows={4} {...form.register("description")} />
              {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
            </div>

            {/* Pricing Section (Row 1) */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="costPrice">
                  Cost Price <span className="text-destructive">*</span>
                </Label>
                <Input id="costPrice" type="number" step="0.01" {...form.register("costPrice", { valueAsNumber: true })} />
                {errors.costPrice && <p className="text-sm text-destructive">{errors.costPrice.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="sellingPrice">
                  Selling Price <span className="text-destructive">*</span>
                </Label>
                <Input id="sellingPrice" type="number" step="0.01" {...form.register("sellingPrice", { valueAsNumber: true })} />
                {errors.sellingPrice && <p className="text-sm text-destructive">{errors.sellingPrice.message}</p>}
              </div>
            </div>

            {/* Inventory & Category (Row 2) */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stock">
                  Stock Quantity <span className="text-destructive">*</span>
                </Label>
                <Input id="stock" type="number" {...form.register("stock", { valueAsNumber: true })} />
                {errors.stock && <p className="text-sm text-destructive">{errors.stock.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="categoryId">
                  Category <span className="text-destructive">*</span>
                </Label>
                <Select
                  onValueChange={(val) => form.setValue("categoryId", val || "", { shouldValidate: true })}
                  defaultValue={form.getValues("categoryId") || undefined}
                >
                  <SelectTrigger id="categoryId">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.categoryId && <p className="text-sm text-destructive">{errors.categoryId.message}</p>}
              </div>
            </div>

            {/* Promotion (Row 3) */}
            <div className="space-y-2">
              <Label htmlFor="promotionId">
                Promotion
              </Label>
              <Select
                onValueChange={(val) => form.setValue("promotionId", val || "", { shouldValidate: true })}
                defaultValue={form.getValues("promotionId") || undefined}
              >
                <SelectTrigger id="promotionId">
                  <SelectValue placeholder="No active promotion" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {promotions.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name} (-{p.discountPercent}%)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Keywords (Row 4) */}
            <div className="space-y-2">
              <Label htmlFor="keywords">
                Keywords <span className="text-destructive">*</span>
              </Label>
              <div className="flex flex-col gap-2">
                <Input
                  id="keywords"
                  placeholder="Type and press enter, comma, or period"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyDown={handleKeywordKeyDown}
                />
                {keywords.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {keywords.map((kw) => (
                      <Badge key={kw} variant="secondary" className="flex items-center gap-1">
                        {kw}
                        <button
                          type="button"
                          onClick={() => removeKeyword(kw)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <XIcon size={12} />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Product Images (Row 5) */}
            <div className="space-y-4">
              <Label>Product Images <span className="text-destructive">*</span></Label>
              
              <UploadDropzone
                endpoint="productImageUploader"
                onClientUploadComplete={(res) => {
                  const newImgs = res.map((r, i) => ({
                    url: r.url,
                    isCover: images.length === 0 && i === 0, // first one is cover if none exists
                    order: images.length + i,
                  }));
                  setImages((prev) => [...prev, ...newImgs]);
                  toast.success("Images uploaded");
                }}
                onUploadError={(error: Error) => {
                  toast.error(`Error: ${error.message}`);
                }}
                className="mb-4 ut-button:bg-primary ut-button:text-primary-foreground"
              />

              {images.length > 0 && (
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {images.map((img) => (
                    <div key={img.url} className={cn(
                      "relative aspect-square rounded-md overflow-hidden border group",
                      img.isCover && "ring-2 ring-primary border-transparent"
                    )}>
                      <Image src={img.url} alt="Product image" fill className="object-cover" />
                      
                      {/* Overlay actions */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-start justify-between p-2">
                        <button
                          type="button"
                          title="Set as Cover"
                          onClick={() => handleSetCover(img.url)}
                          className={cn(
                            "p-1.5 rounded-md text-white hover:bg-white/20 transition-colors",
                            img.isCover && "text-yellow-400 opacity-100" // Always show star if cover
                          )}
                        >
                          <StarIcon size={16} fill={img.isCover ? "currentColor" : "none"} />
                        </button>

                        <button
                          type="button"
                          title="Remove Image"
                          onClick={() => handleRemoveImage(img.url)}
                          className="p-1.5 rounded-md text-white hover:bg-destructive/80 transition-colors"
                        >
                          <XIcon size={16} />
                        </button>
                      </div>

                      {img.isCover && (
                        <div className="absolute bottom-0 inset-x-0 bg-primary/90 text-primary-foreground text-[10px] font-medium text-center py-0.5">
                          COVER
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Server Error */}
            {serverError && (
              <p className="text-sm text-destructive">{serverError}</p>
            )}

          </form>
        </ScrollArea>

        <div className="p-6 pt-4 border-t shrink-0 flex justify-end">
          <Button
            type="submit"
            form="add-product-form"
            disabled={!isValid || isPending || images.length === 0 || keywords.length === 0}
            id="add-product-submit"
          >
            {isPending ? "Saving..." : "Finish"}
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
}
