import type { ComponentProps, JSX } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, type, ...props }: ComponentProps<"input">): JSX.Element {
  return (
    <input
      data-slot="input"
      type={type}
      className={cn(
        "min-h-[42px] w-full min-w-0 rounded-md border border-input bg-background px-3 py-1.5 text-base font-normal focus-visible:outline-2 focus-visible:outline-ring disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
}
