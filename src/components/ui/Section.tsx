import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  spacing?: "none" | "sm" | "md" | "lg" | "xl";
  background?: "default" | "alternate" | "dark" | "gradient";
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, spacing = "lg", background = "default", children, ...props }, ref) => {
    
    const spacings = {
      none: "py-0",
      sm: "py-8 sm:py-12",
      md: "py-12 sm:py-16 lg:py-20",
      lg: "py-16 sm:py-20 lg:py-24",
      xl: "py-24 sm:py-32 lg:py-36"
    };
    
    const backgrounds = {
      default: "bg-surface-0",
      alternate: "bg-surface-1",
      dark: "bg-ink-900 text-white",
      gradient: "bg-gradient-to-b from-surface-1 to-surface-0"
    };

    return (
      <section
        ref={ref}
        className={cn(
          "relative w-full overflow-hidden",
          spacings[spacing],
          backgrounds[background],
          className
        )}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = "Section";

export const Container = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";
