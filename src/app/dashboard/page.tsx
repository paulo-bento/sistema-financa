import type { JSX } from "react";
import Link from "next/link";
import { FiltrosTransacoes } from "@/components/filtros-transacoes";
import { ListaTransacoes } from "@/components/lista-transacoes";
import { ResumoTransacoes } from "@/components/resumo-transacoes";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { exigirUsuario } from "@/lib/auth";
import { lerFiltrosTransacao, parametrosFiltros } from "@/lib/filtros-transacao";
import { listarTransacoes } from "@/models/transacoes";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<JSX.Element> {
  const usuario = await exigirUsuario();
  const filtros = lerFiltrosTransacao(await searchParams);
  const transacoes = await listarTransacoes(usuario.id, filtros);

  return (
    <main className="mx-auto grid w-full max-w-4xl gap-6 px-[18px] py-6 sm:py-9">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold sm:text-3xl">Visão geral</h1>
        <Link href="/transacoes/nova" className={buttonVariants()}>
          <span aria-hidden="true" className="text-lg leading-none">+</span>
          Nova transação
        </Link>
      </div>
      <ResumoTransacoes transacoes={transacoes} />
      <section aria-labelledby="titulo-transacoes" className="grid gap-3">
        <h2 id="titulo-transacoes" className="text-lg font-bold">Transações</h2>
        <Card className="p-[18px]">
          <FiltrosTransacoes key={parametrosFiltros(filtros)} iniciais={filtros} />
        </Card>
        <ListaTransacoes transacoes={transacoes} />
      </section>
    </main>
  );
}
