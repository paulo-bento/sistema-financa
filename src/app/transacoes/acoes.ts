"use server";

import { revalidatePath } from "next/cache";
import { exigirUsuario } from "@/lib/auth";
import { lerDadosTransacao } from "@/lib/validar-transacao";
import { atualizarTransacao, criarTransacao, removerTransacao } from "@/models/transacoes";
import type { ResultadoTransacao } from "@/types/transacao";

export async function salvarTransacao(id: string | null, formulario: FormData): Promise<ResultadoTransacao> {
  const usuario = await exigirUsuario();
  const leitura = lerDadosTransacao(formulario);
  if ("erro" in leitura) return { ok: false, erro: leitura.erro };

  try {
    if (id === null) {
      await criarTransacao(usuario.id, leitura.dados);
    } else if (!(await atualizarTransacao(usuario.id, id, leitura.dados))) {
      return { ok: false, erro: "Transação não encontrada." };
    }
  } catch {
    return { ok: false, erro: "Não foi possível salvar a transação. Tente novamente." };
  }

  revalidatePath("/dashboard");
  if (id !== null) revalidatePath(`/transacoes/${id}`);
  return { ok: true };
}

export async function excluirTransacao(id: string): Promise<ResultadoTransacao> {
  const usuario = await exigirUsuario();

  try {
    if (!(await removerTransacao(usuario.id, id))) {
      return { ok: false, erro: "Transação não encontrada." };
    }
  } catch {
    return { ok: false, erro: "Não foi possível excluir a transação. Tente novamente." };
  }

  revalidatePath("/dashboard");
  revalidatePath(`/transacoes/${id}`);
  return { ok: true };
}
