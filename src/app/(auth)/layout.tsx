import type { JSX, ReactNode } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function AuthLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <>
      <header className="grid min-h-[54px] place-items-center border-b bg-card px-[18px] py-3">
        <Link href="/" className="rounded-md text-sm font-bold hover:underline focus-visible:outline-2 focus-visible:outline-ring">
          Finanças pessoais
        </Link>
      </header>
      <main className="mx-auto w-full max-w-sm px-[18px] py-12">
        <Card className="p-[18px]">{children}</Card>
      </main>
    </>
  );
}
