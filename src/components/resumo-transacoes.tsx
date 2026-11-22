import type { JSX } from "react";
import { formatarMoeda } from "@/lib/formatacao";
import type { DadosTransacao } from "@/types/transacao";

export function ResumoTransacoes({ transacoes }: { transacoes: DadosTransacao[] }): JSX.Element {
  let receitas = BigInt(0);
  let despesas = BigInt(0);

  for (const transacao of transacoes) {
    if (transacao.tipo === "receita") receitas += BigInt(transacao.valor);
    else despesas += BigInt(transacao.valor);
  }

  const totais = [
    { rotulo: "Receitas", valor: receitas },
    { rotulo: "Despesas", valor: despesas },
    { rotulo: "Saldo", valor: receitas - despesas },
  ];

  return (
    <dl aria-label="Resumo do período" className="grid divide-y divide-border rounded-xl border bg-card sm:grid-cols-3 sm:gap-3 sm:divide-y-0 sm:rounded-none sm:border-0 sm:bg-transparent">
      {totais.map(({ rotulo, valor }) => (
        <div key={rotulo} className="flex min-w-0 items-baseline justify-between gap-3 px-[18px] py-3 sm:grid sm:gap-1.5 sm:rounded-xl sm:border sm:bg-card">
          <dt className="text-sm text-muted-foreground">{rotulo}</dt>
          <dd className="text-right text-lg font-bold wrap-anywhere tabular-nums sm:text-left sm:text-2xl">{formatarMoeda(valor)}</dd>
        </div>
      ))}
    </dl>
  );
}
