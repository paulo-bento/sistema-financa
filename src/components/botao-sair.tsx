"use client";

import { useTransition, type JSX } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { sair } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export function BotaoSair(): JSX.Element {
  const router = useRouter();
  const [pendente, iniciar] = useTransition();

  function encerrar(): void {
    iniciar(async () => {
      const erro = await sair();
      if (erro) {
        toast.error(erro);
        return;
      }
      toast.success("Sessão encerrada.");
      router.replace("/login");
    });
  }

  return (
    <Button variant="ghost" disabled={pendente} onClick={encerrar}>
      {pendente && <Spinner />}
      Sair
    </Button>
  );
}
