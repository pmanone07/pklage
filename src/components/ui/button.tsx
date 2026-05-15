import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-bg)] focus-visible:ring-[color:var(--color-brand)] disabled:opacity-50 disabled:pointer-events-none select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-[color:var(--color-ink)] text-white hover:bg-[color:var(--color-ink-soft)] active:translate-y-[1px]",
        brand:
          "bg-[color:var(--color-brand)] text-white hover:bg-[color:var(--color-brand-dark)] active:translate-y-[1px] shadow-[0_1px_0_rgba(0,0,0,0.08),0_8px_24px_-8px_rgba(210,63,26,0.45)]",
        outline:
          "border border-[color:var(--color-line-strong)] bg-transparent text-[color:var(--color-ink)] hover:bg-[color:var(--color-bg-elev)]",
        ghost:
          "text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)] hover:bg-[color:var(--color-line)]/50",
        link:
          "text-[color:var(--color-brand)] underline-offset-4 hover:underline px-0",
      },
      size: {
        sm: "h-9 px-3 text-[13px]",
        md: "h-11 px-5",
        lg: "h-14 px-7 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";

export { buttonVariants };
