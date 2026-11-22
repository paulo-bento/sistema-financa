import type { JSX } from "react";
import { FormularioTransacao } from "@/components/formulario-transacao";
import { Card } from "@/components/ui/card";
import { exigirUsuario } from "@/lib/auth";

export default async function NovaTransacaoPage(): Promise<JSX.Element> {
  await exigirUsuario();

  return (
    <main className="mx-auto grid w-full max-w-xl gap-3 px-[18px] py-6 sm:py-9">
      <h1 className="text-2xl font-bold">Nova transação</h1>
      <Card className="p-[18px]">
        <FormularioTransacao />
      </Card>
    </main>
  );
}
