"use client";

import { useEffect, useId, useRef, useState, useTransition, type JSX } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useStore } from "zustand";
import { excluirTransacao } from "@/app/transacoes/acoes";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { criarStoreModal } from "@/store/modal";

export function ExcluirTransacao({ id, descricao }: { id: string; descricao: string }): JSX.Element {
  const router = useRouter();
  const dialogo = useRef<HTMLDialogElement>(null);
  const tituloId = useId();
  const descricaoId = useId();
  const [modal] = useState(criarStoreModal);
  const aberto = useStore(modal, (estado) => estado.aberto);
  const [erro, definirErro] = useState("");
  const [pendente, iniciar] = useTransition();

  useEffect(() => {
    const elemento = dialogo.current;
    if (aberto && !elemento?.open) elemento?.showModal();
    if (!aberto && elemento?.open) elemento.close();
  }, [aberto]);

  function abrir(): void {
    definirErro("");
    modal.setState({ aberto: true });
  }

  function fechar(): void {
    modal.setState({ aberto: false });
  }

  function confirmar(): void {
    iniciar(async () => {
      const resultado = await excluirTransacao(id);
      if (!resultado.ok) {
        definirErro(resultado.erro);
        toast.error(resultado.erro);
        return;
      }
      fechar();
      toast.success("Transação excluída.");
      router.replace("/dashboard");
    });
  }

  return (
    <>
      <Button variant="destructive" onClick={abrir}>Excluir transação</Button>
      <dialog
        ref={dialogo}
        role="alertdialog"
        aria-labelledby={tituloId}
        aria-describedby={descricaoId}
        onCancel={(evento) => { if (pendente) evento.preventDefault(); }}
        onClose={fechar}
        className="m-auto max-h-[calc(100dvh-36px)] w-[calc(100%-36px)] max-w-sm rounded-xl border bg-popover p-[18px] text-popover-foreground shadow-md backdrop:bg-black/35"
      >
        <h2 id={tituloId} className="text-lg font-bold">Excluir transação?</h2>
        <p id={descricaoId} className="mt-1.5 wrap-anywhere text-muted-foreground">
          A transação “{descricao}” será removida permanentemente.
        </p>
        {erro && <p role="alert" className="mt-3 text-sm text-destructive">{erro}</p>}
        <div className="mt-3 flex flex-wrap justify-end gap-1.5">
          <Button variant="ghost" onClick={fechar} disabled={pendente}>Cancelar</Button>
          <Button variant="destructive" onClick={confirmar} disabled={pendente}>
            {pendente && <Spinner />}
            {pendente ? "Excluindo…" : "Confirmar exclusão"}
          </Button>
        </div>
      </dialog>
    </>
  );
}
