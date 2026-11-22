import type { JSX } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function TransacaoNaoEncontrada(): JSX.Element {
  return (
    <main className="mx-auto w-full max-w-xl px-[18px] py-6 sm:py-9">
      <Card className="grid gap-3 p-[18px]">
        <h1 className="text-lg font-bold">Transação não encontrada.</h1>
        <Link href="/dashboard" className={buttonVariants("ghost", "w-fit")}>Voltar ao painel</Link>
      </Card>
    </main>
  );
}
