"use client";

import type { CSSProperties, JSX } from "react";
import { Toaster as Sonner } from "sonner";

export function Toaster(): JSX.Element {
  return (
    <Sonner
      position="bottom-right"
      theme="system"
      containerAriaLabel="Notificações"
      style={{
        "--normal-bg": "var(--card)",
        "--normal-text": "var(--foreground)",
        "--normal-border": "var(--border)",
        "fontFamily": "inherit",
      } as CSSProperties}
      toastOptions={{
        classNames: {
          toast: "toast-financas",
          success: "toast-financas-sucesso",
          error: "toast-financas-erro",
        },
      }}
    />
  );
}
