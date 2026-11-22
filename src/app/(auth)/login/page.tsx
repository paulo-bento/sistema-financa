import type { JSX } from "react";
import Link from "next/link";
import { AuthForm } from "../auth-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ cadastro?: string }>;
}): Promise<JSX.Element> {
  const { cadastro } = await searchParams;

  return (
    <div className="grid gap-3">
      <h1 className="text-2xl font-bold">Entrar</h1>
      {cadastro === "ok" && <p role="status" className="text-sm">Conta criada. Entre com seu e-mail e senha.</p>}
      <AuthForm />
      <Link href="/register" className="w-fit rounded-md text-sm font-bold underline">Criar conta</Link>
    </div>
  );
}
