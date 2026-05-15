import * as React from "react";
import { cn } from "../../lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "flex h-12 w-full rounded-[10px] border border-[color:var(--color-line-strong)] bg-[color:var(--color-bg-elev)] px-4 text-[15px] text-[color:var(--color-ink)] placeholder:text-[color:var(--color-ink-mute)] focus:border-[color:var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-ink)]/10 transition",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex w-full rounded-[10px] border border-[color:var(--color-line-strong)] bg-[color:var(--color-bg-elev)] px-4 py-3 text-[15px] text-[color:var(--color-ink)] placeholder:text-[color:var(--color-ink-mute)] focus:border-[color:var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-ink)]/10 transition resize-y min-h-[120px]",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
