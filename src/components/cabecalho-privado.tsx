import type { JSX } from "react";
import Link from "next/link";
import { BotaoSair } from "@/components/botao-sair";

export function CabecalhoPrivado({ nome }: { nome?: string | null }): JSX.Element {
  return (
    <header className="grid min-h-[54px] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 border-b bg-card px-[18px] py-1.5">
      <Link href="/dashboard" className="col-start-2 rounded-md text-sm font-bold focus-visible:outline-2 focus-visible:outline-ring">
        Finanças pessoais
      </Link>
      <div className="flex min-w-0 flex-col items-end justify-end sm:flex-row sm:items-center sm:gap-3">
        {nome && <span title={nome} className="max-w-full truncate text-xs text-muted-foreground sm:text-sm">{nome}</span>}
        <BotaoSair />
      </div>
    </header>
  );
}
