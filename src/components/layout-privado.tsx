import type { JSX, ReactNode } from "react";
import { CabecalhoPrivado } from "@/components/cabecalho-privado";
import { exigirUsuario } from "@/lib/auth";

export default async function LayoutPrivado({ children }: { children: ReactNode }): Promise<JSX.Element> {
  const usuario = await exigirUsuario();

  return (
    <>
      <CabecalhoPrivado nome={usuario.name} />
      {children}
    </>
  );
}
