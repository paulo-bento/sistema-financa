import type { JSX } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function NotFound(): JSX.Element {
  return (
    <main className="mx-auto w-full max-w-lg px-[18px] py-12">
      <Card className="grid gap-3 p-[18px]">
        <h1 className="text-lg font-bold">Página não encontrada.</h1>
        <Link href="/" className={buttonVariants("ghost", "w-fit")}>Voltar ao início</Link>
      </Card>
    </main>
  );
}
