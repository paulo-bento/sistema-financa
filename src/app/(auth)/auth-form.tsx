"use client";

import { useState, useTransition, type FormEvent, type JSX } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { entrar, registrar } from "./actions";

export function AuthForm({ cadastro = false }: { cadastro?: boolean }): JSX.Element {
  const router = useRouter();
  const [erro, definirErro] = useState("");
  const [pendente, iniciar] = useTransition();

  function enviar(evento: FormEvent<HTMLFormElement>): void {
    evento.preventDefault();
    const dados = new FormData(evento.currentTarget);
    definirErro("");
    iniciar(async () => {
      const erro = await (cadastro ? registrar(dados) : entrar(dados));
      if (erro) {
        definirErro(erro);
        toast.error(erro);
        return;
      }
      toast.success(cadastro ? "Conta criada." : "Sessão iniciada.");
      router.replace(cadastro ? "/login?cadastro=ok" : "/dashboard");
    });
  }

  return (
    <form method="post" onSubmit={enviar} className="grid gap-3">
      {cadastro && (
        <label className="grid gap-1.5 text-sm font-bold">
          Nome
          <Input name="nome" autoComplete="name" maxLength={100} required />
        </label>
      )}
      <label className="grid gap-1.5 text-sm font-bold">
        E-mail
        <Input name="email" type="email" autoComplete="email" maxLength={254} required />
      </label>
      <label className="grid gap-1.5 text-sm font-bold">
        Senha
        <Input
          name="senha"
          type="password"
          autoComplete={cadastro ? "new-password" : "current-password"}
          minLength={cadastro ? 8 : undefined}
          required
        />
      </label>
      {erro && <p role="alert" className="text-sm text-destructive">{erro}</p>}
      <Button type="submit" disabled={pendente}>
        {pendente && <Spinner />}
        {pendente ? "Aguarde…" : cadastro ? "Criar conta" : "Entrar"}
      </Button>
    </form>
  );
}
