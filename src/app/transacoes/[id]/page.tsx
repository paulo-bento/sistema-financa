import type { JSX } from "react";
import { notFound } from "next/navigation";
import { ExcluirTransacao } from "@/components/excluir-transacao";
import { FormularioTransacao } from "@/components/formulario-transacao";
import { Card } from "@/components/ui/card";
import { exigirUsuario } from "@/lib/auth";
import { formatarValorCampo } from "@/lib/formatacao";
import { buscarTransacao } from "@/models/transacoes";

export default async function TransacaoPage({ params }: { params: Promise<{ id: string }> }): Promise<JSX.Element> {
  const usuario = await exigirUsuario();
  const { id } = await params;
  const transacao = await buscarTransacao(usuario.id, id);
  if (!transacao) notFound();

  return (
    <main className="mx-auto grid w-full max-w-xl gap-3 px-[18px] py-6 sm:py-9">
      <h1 className="text-2xl font-bold">Editar transação</h1>
      <Card className="p-[18px]">
        <FormularioTransacao edicao={{
          id,
          descricao: transacao.descricao,
          tipo: transacao.tipo,
          categoria: transacao.categoria,
          valor: formatarValorCampo(transacao.valor),
          data: transacao.data.toISOString().slice(0, 10),
        }} />
      </Card>
      <div className="flex justify-start">
        <ExcluirTransacao id={id} descricao={transacao.descricao} />
      </div>
    </main>
  );
}
