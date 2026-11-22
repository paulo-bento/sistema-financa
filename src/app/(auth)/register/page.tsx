import type { JSX } from "react";
import Link from "next/link";
import { AuthForm } from "../auth-form";

export default function RegisterPage(): JSX.Element {
  return (
    <div className="grid gap-3">
      <h1 className="text-2xl font-bold">Criar conta</h1>
      <AuthForm cadastro />
      <Link href="/login" className="w-fit rounded-md text-sm font-bold underline">Já tenho uma conta</Link>
    </div>
  );
}
