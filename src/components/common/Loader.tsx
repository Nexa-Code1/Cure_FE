import * as React from "react";
import { LoaderCircle } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const loaderVariants = cva("animate-spin", {
  variants: {
    size: {
      sm: "h-4 w-4",
      md: "h-6 w-6",
      lg: "h-8 w-8",
      xl: "h-12 w-12",
      xxl: "h-20 w-20",
    },
    variant: {
      default: "text-primary",
      white: "text-white",
      secondary: "text-secondary",
      destructive: "text-destructive",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
});

function Loader({
  className,
  size,
  variant,
  ...props
}: React.ComponentProps<"svg"> & VariantProps<typeof loaderVariants>) {
  return (
    <LoaderCircle
      aria-label="Loading"
      className={cn(loaderVariants({ size, variant }), className)}
      {...props}
    />
  );
}

export { Loader, loaderVariants };
