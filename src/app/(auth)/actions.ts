"use server";

import { hash } from "bcryptjs";
import { AuthError } from "next-auth";
import { signIn, signOut } from "@/lib/auth";
import { normalizarEmail, validarSenha } from "@/lib/credenciais";
import { cadastrarUsuario } from "@/models/usuarios";

export async function entrar(dados: FormData): Promise<string> {
  const email = normalizarEmail(dados.get("email"));
  const senha = dados.get("senha");
  if (!email || !validarSenha(senha)) return "E-mail ou senha inválidos.";

  try {
    await signIn("credentials", { email, senha, redirect: false, redirectTo: "/dashboard" });
  } catch (error) {
    if (error instanceof AuthError && error.type === "CredentialsSignin") return "E-mail ou senha inválidos.";
    return "Não foi possível entrar. Tente novamente.";
  }

  return "";
}

export async function registrar(dados: FormData): Promise<string> {
  const nome = dados.get("nome");
  const email = normalizarEmail(dados.get("email"));
  const senha = dados.get("senha");
  if (typeof nome !== "string" || !nome.trim() || nome.trim().length > 100) {
    return "Informe um nome de até 100 caracteres.";
  }
  if (!email) return "Informe um e-mail válido.";
  if (!validarSenha(senha)) return "Use uma senha de 8 caracteres ou mais, com até 72 bytes.";

  try {
    const senhaHash = await hash(senha, 12);
    const cadastrado = await cadastrarUsuario({ nome: nome.trim(), email, senhaHash });
    if (!cadastrado) return "Este e-mail já está cadastrado.";
  } catch {
    return "Não foi possível criar a conta. Tente novamente.";
  }

  return "";
}

export async function sair(): Promise<string> {
  try {
    await signOut({ redirect: false, redirectTo: "/login" });
    return "";
  } catch {
    return "Não foi possível sair. Tente novamente.";
  }
}
