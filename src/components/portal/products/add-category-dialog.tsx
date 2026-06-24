"use client";

import { useState, useTransition } from "react";
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
import { createCategory } from "@/lib/products-actions";
import { toast } from "sonner";

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------

const categorySchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  description: z.string().min(1, "Description is required").max(500),
  targetAudience: z.string().min(1, "Target audience is required").max(100),
  occasion: z.string().min(1, "Occasion is required"),
  season: z.string().min(1, "Season is required"),
  material: z.string().min(1, "Material is required"),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

// ---------------------------------------------------------------------------
// Options
// ---------------------------------------------------------------------------

const OCCASION_OPTIONS = [
  { value: "Wedding", label: "Wedding" },
  { value: "Birthday Party", label: "Birthday Party" },
  { value: "Office Party", label: "Office Party" },
  { value: "Corporate", label: "Corporate" },
  { value: "Casual", label: "Casual" },
  { value: "Street", label: "Street" },
  { value: "Other", label: "Other" },
];

const SEASON_OPTIONS = [
  { value: "Dry Season", label: "Dry Season" },
  { value: "Rainy Season", label: "Rainy Season" },
  { value: "Sunny Season", label: "Sunny Season" },
];

const MATERIAL_OPTIONS = [
  { value: "Cotton", label: "Cotton" },
  { value: "Linen", label: "Linen" },
  { value: "Denim", label: "Denim" },
  { value: "Leather", label: "Leather" },
  { value: "Silk", label: "Silk" },
  { value: "Wool", label: "Wool" },
  { value: "Senator", label: "Senator" },
  { value: "Polyester", label: "Polyester" },
  { value: "Jersey", label: "Jersey" },
  { value: "Other", label: "Other" },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface AddCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function AddCategoryDialog({
  open,
  onOpenChange,
  onSuccess,
}: AddCategoryDialogProps) {
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
      targetAudience: "",
      occasion: "",
      season: "",
      material: "",
    },
  });

  const onSubmit = (values: CategoryFormValues) => {
    setServerError(null);
    startTransition(async () => {
      const result = await createCategory(values);
      if (result.success) {
        toast.success("Category created successfully.");
        form.reset();
        onOpenChange(false);
        onSuccess();
      } else {
        setServerError(result.error ?? "Failed to create category.");
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
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto sm:[&>button.absolute]:hidden">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Add Category</DialogTitle>
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

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 mt-2"
        >
          {/* Category Name */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Category Name <span className="text-destructive">*</span>
            </Label>
            <Input id="name" placeholder="e.g. Men's Casual Wear" {...form.register("name")} />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Category Description <span className="text-destructive">*</span>
            </Label>
            <Textarea id="description" placeholder="Describe this category..." rows={3} {...form.register("description")} />
            {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
          </div>

          {/* Target Audience */}
          <div className="space-y-2">
            <Label htmlFor="targetAudience">
              Target Audience <span className="text-destructive">*</span>
            </Label>
            <Input id="targetAudience" placeholder="e.g. Men, Women, Unisex, Teenagers..." {...form.register("targetAudience")} />
            {errors.targetAudience && <p className="text-sm text-destructive">{errors.targetAudience.message}</p>}
          </div>

          {/* Occasion */}
          <div className="space-y-2">
            <Label htmlFor="occasion">
              Occasion <span className="text-destructive">*</span>
            </Label>
            <Select
              onValueChange={(val) => form.setValue("occasion", val || "", { shouldValidate: true })}
              defaultValue={form.getValues("occasion") || undefined}
            >
              <SelectTrigger id="occasion">
                <SelectValue placeholder="Select occasion" />
              </SelectTrigger>
              <SelectContent>
                {OCCASION_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.occasion && <p className="text-sm text-destructive">{errors.occasion.message}</p>}
          </div>

          {/* Season */}
          <div className="space-y-2">
            <Label htmlFor="season">
              Season <span className="text-destructive">*</span>
            </Label>
            <Select
              onValueChange={(val) => form.setValue("season", val || "", { shouldValidate: true })}
              defaultValue={form.getValues("season") || undefined}
            >
              <SelectTrigger id="season">
                <SelectValue placeholder="Select season" />
              </SelectTrigger>
              <SelectContent>
                {SEASON_OPTIONS.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.season && <p className="text-sm text-destructive">{errors.season.message}</p>}
          </div>

          {/* Material */}
          <div className="space-y-2">
            <Label htmlFor="material">
              Material <span className="text-destructive">*</span>
            </Label>
            <Select
              onValueChange={(val) => form.setValue("material", val || "", { shouldValidate: true })}
              defaultValue={form.getValues("material") || undefined}
            >
              <SelectTrigger id="material">
                <SelectValue placeholder="Select material" />
              </SelectTrigger>
              <SelectContent>
                {MATERIAL_OPTIONS.map((m) => (
                  <SelectItem key={m.value} value={m.value}>
                    {m.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.material && <p className="text-sm text-destructive">{errors.material.message}</p>}
          </div>

          {/* Server Error */}
          {serverError && (
            <p className="text-sm text-destructive">{serverError}</p>
          )}

          {/* Submit */}
          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              disabled={!isValid || isPending}
              id="add-category-submit"
            >
              {isPending ? "Creating..." : "Finish"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
