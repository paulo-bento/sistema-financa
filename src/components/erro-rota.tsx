"use client";

import type { JSX } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ErroRota({ retry }: { retry: () => void }): JSX.Element {
  return (
    <main className="mx-auto w-full max-w-lg px-[18px] py-12">
      <Card className="grid gap-3 p-[18px]">
        <h1 role="alert" className="text-lg font-bold">Não foi possível carregar a página.</h1>
        <Button className="w-fit" onClick={retry}>Tentar novamente</Button>
      </Card>
    </main>
  );
}
