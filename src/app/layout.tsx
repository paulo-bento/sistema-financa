import type { Metadata } from "next";
import type { JSX, ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Finanças pessoais",
  description: "Controle suas receitas e despesas e acompanhe seu saldo.",
};

export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <html lang="pt-BR">
      <body className="min-h-dvh antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
