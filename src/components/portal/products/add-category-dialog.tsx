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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Add Category</DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            type="button"
            onClick={handleClose}
            disabled={isPending}
            className="text-muted-foreground hover:text-foreground"
          >
            Cancel
          </Button>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-2"
          >
            {/* Category Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Category Name <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Men's Casual Wear" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Category Description{" "}
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe this category..."
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Target Audience */}
            <FormField
              control={form.control}
              name="targetAudience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Target Audience <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Men, Women, Unisex, Teenagers..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Occasion */}
            <FormField
              control={form.control}
              name="occasion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Occasion <span className="text-destructive">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select occasion" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {OCCASION_OPTIONS.map((o) => (
                        <SelectItem key={o.value} value={o.value}>
                          {o.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Season */}
            <FormField
              control={form.control}
              name="season"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Season <span className="text-destructive">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select season" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {SEASON_OPTIONS.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Material */}
            <FormField
              control={form.control}
              name="material"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Material <span className="text-destructive">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select material" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {MATERIAL_OPTIONS.map((m) => (
                        <SelectItem key={m.value} value={m.value}>
                          {m.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

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
        </Form>
      </DialogContent>
    </Dialog>
  );
}
