"use client";

import { useId, useState, useTransition, type FormEvent, type JSX } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { salvarTransacao } from "@/app/transacoes/acoes";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { Spinner } from "@/components/ui/spinner";
import { categoriasTransacao, rotulosTipo, tiposTransacao, type DadosTransacao } from "@/types/transacao";

type Edicao = Pick<DadosTransacao, "descricao" | "tipo" | "categoria"> & {
  id: string;
  valor: string;
  data: string;
};

export function FormularioTransacao({ edicao }: { edicao?: Edicao }): JSX.Element {
  const router = useRouter();
  const tipoId = useId();
  const categoriaId = useId();
  const [erro, definirErro] = useState("");
  const [pendente, iniciar] = useTransition();

  function enviar(evento: FormEvent<HTMLFormElement>): void {
    evento.preventDefault();
    const dados = new FormData(evento.currentTarget);
    definirErro("");
    iniciar(async () => {
      const resultado = await salvarTransacao(edicao?.id ?? null, dados);
      if (!resultado.ok) {
        definirErro(resultado.erro);
        toast.error(resultado.erro);
        return;
      }
      toast.success(edicao ? "Transação atualizada." : "Transação criada.");
      router.replace("/dashboard");
    });
  }

  return (
    <form method="post" onSubmit={enviar} className="grid gap-3">
      <label className="grid gap-1.5 text-sm font-bold">
        Descrição
        <Input name="descricao" defaultValue={edicao?.descricao} required />
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <label htmlFor={tipoId} className="text-sm font-bold">Tipo</label>
          <NativeSelect id={tipoId} name="tipo" defaultValue={edicao?.tipo ?? ""} required>
            <option value="" disabled>Selecione o tipo</option>
            {tiposTransacao.map((tipo) => <option key={tipo} value={tipo}>{rotulosTipo[tipo]}</option>)}
          </NativeSelect>
        </div>
        <label className="grid gap-1.5 text-sm font-bold">
          Valor em reais
          <Input name="valor" inputMode="decimal" defaultValue={edicao?.valor} placeholder="0,00" required />
        </label>
        <div className="grid gap-1.5">
          <label htmlFor={categoriaId} className="text-sm font-bold">Categoria</label>
          <NativeSelect id={categoriaId} name="categoria" defaultValue={edicao?.categoria ?? ""} required>
            <option value="" disabled>Selecione a categoria</option>
            {categoriasTransacao.map((categoria) => <option key={categoria}>{categoria}</option>)}
          </NativeSelect>
        </div>
        <label className="grid gap-1.5 text-sm font-bold">
          Data
          <Input name="data" type="date" defaultValue={edicao?.data} required />
        </label>
      </div>
      {erro && <p role="alert" className="text-sm text-destructive">{erro}</p>}
      <div className="mt-1.5 flex flex-wrap justify-end gap-1.5">
        <Link href="/dashboard" className={buttonVariants("ghost")}>Cancelar</Link>
        <Button type="submit" disabled={pendente}>
          {pendente && <Spinner />}
          {pendente ? "Salvando…" : "Salvar transação"}
        </Button>
      </div>
    </form>
  );
}
