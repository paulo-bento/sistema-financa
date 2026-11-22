import type { ComponentProps, JSX } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: ComponentProps<"div">): JSX.Element {
  return (
    <div
      data-slot="card"
      className={cn("rounded-xl border bg-card text-card-foreground", className)}
      {...props}
    />
  );
}
