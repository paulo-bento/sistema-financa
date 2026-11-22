import type { JSX } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const overview = [
  {
    title: "Receitas",
    description: "Registre o dinheiro que entra.",
    symbol: "↙",
    color: "text-success",
  },
  {
    title: "Despesas",
    description: "Organize seus gastos por categoria.",
    symbol: "↗",
    color: "text-destructive",
  },
  {
    title: "Saldo",
    description: "Veja quanto sobra em cada período.",
    symbol: "=",
    color: "text-foreground",
  },
];

export default function Home(): JSX.Element {
  return (
    <>
      <header className="grid min-h-[54px] place-items-center border-b bg-card px-[18px] py-3">
        <p className="text-sm font-bold">Finanças pessoais</p>
      </header>

      <main className="mx-auto w-full max-w-lg px-[18px] py-12 sm:py-[72px]">
        <div className="mb-6 space-y-3">
          <span
            aria-hidden="true"
            className="grid size-12 place-items-center rounded-xl bg-accent text-lg font-bold text-accent-foreground"
          >
            R$
          </span>
          <h1 className="text-3xl/tight font-bold sm:text-4xl/tight">
            Controle de gastos pessoais
          </h1>
          <p className="max-w-[40ch] text-muted-foreground">
            Acompanhe suas movimentações por mês, tipo e categoria.
          </p>
          <Link href="/login" className={buttonVariants()}>Entrar</Link>
        </div>

        <Card className="overflow-hidden">
          <ul className="divide-y divide-border" aria-label="Movimentações e saldo">
            {overview.map(({ title, description, symbol, color }) => (
              <li key={title} className="flex items-center gap-3 px-[18px] py-3">
                <span
                  aria-hidden="true"
                  className={`grid size-9 shrink-0 place-items-center rounded-md bg-muted text-lg font-bold ${color}`}
                >
                  {symbol}
                </span>
                <div>
                  <p className="font-bold">{title}</p>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </main>
    </>
  );
}
