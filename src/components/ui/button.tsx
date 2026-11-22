import type { ComponentProps, JSX } from "react";
import { cn } from "@/lib/utils";

const variantes = {
  default: "bg-primary text-primary-foreground hover:brightness-95",
  destructive: "bg-destructive text-destructive-foreground hover:brightness-95",
  ghost: "hover:bg-muted",
};

type Variante = keyof typeof variantes;

export function buttonVariants(variant: Variante = "default", className?: string): string {
  return cn(
    "inline-flex min-h-9 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-60",
    variantes[variant],
    className,
  );
}

export function Button({
  className,
  variant = "default",
  type = "button",
  ...props
}: ComponentProps<"button"> & { variant?: Variante }): JSX.Element {
  return <button data-slot="button" type={type} className={buttonVariants(variant, className)} {...props} />;
}
