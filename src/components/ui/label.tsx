import * as React from "react";
import { cn } from "../../lib/utils";

export function Label({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn(
        "text-sm font-medium text-[color:var(--color-ink)] mb-1.5 block",
        className,
      )}
      {...props}
    />
  );
}

export function Hint({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-[13px] text-[color:var(--color-ink-soft)] mt-1.5",
        className,
      )}
      {...props}
    />
  );
}
