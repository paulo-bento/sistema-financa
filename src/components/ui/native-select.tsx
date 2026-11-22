import type { ComponentProps, JSX } from "react";
import { cn } from "@/lib/utils";

export function NativeSelect({ className, children, ...props }: ComponentProps<"select">): JSX.Element {
  return (
    <span className="relative block min-w-0">
      <select
        data-slot="native-select"
        className={cn(
          "min-h-[42px] w-full appearance-none rounded-md border border-input bg-background py-1.5 pr-9 pl-3 text-base font-normal focus-visible:outline-2 focus-visible:outline-ring disabled:opacity-60",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <span aria-hidden="true" className="pointer-events-none absolute top-1/2 right-3 size-2 -translate-y-2/3 rotate-45 border-r border-b border-current" />
    </span>
  );
}
