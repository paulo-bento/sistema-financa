import type { JSX } from "react";
import type { WithId } from "mongodb";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { formatarData, formatarMoeda } from "@/lib/formatacao";
import type { Transacao } from "@/types/transacao";

export function ListaTransacoes({ transacoes }: { transacoes: WithId<Transacao>[] }): JSX.Element {
  return (
    <Card className="overflow-hidden">
      {transacoes.length === 0 ? (
        <p className="px-[18px] py-3 text-sm text-muted-foreground">Nenhuma transação encontrada.</p>
      ) : (
        <ul aria-label="Transações" className="divide-y divide-border">
          {transacoes.map((transacao) => (
            <li key={transacao._id.toHexString()}>
              <Link
                href={`/transacoes/${transacao._id.toHexString()}`}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-[18px] py-3 hover:bg-muted focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
              >
                <span className="min-w-0">
                  <span className="block font-bold wrap-anywhere">{transacao.descricao}</span>
                  <span className="block text-sm text-muted-foreground">
                    {transacao.categoria} · <time dateTime={transacao.data.toISOString().slice(0, 10)}>{formatarData(transacao.data)}</time>
                  </span>
                </span>
                <span className="text-right text-sm font-bold tabular-nums sm:text-base">
                  {formatarMoeda(transacao.tipo === "despesa" ? -transacao.valor : transacao.valor)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
