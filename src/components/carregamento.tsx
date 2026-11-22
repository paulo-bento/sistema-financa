import type { JSX } from "react";
import { Spinner } from "@/components/ui/spinner";

export default function Carregamento(): JSX.Element {
  return (
    <main className="mx-auto max-w-4xl px-[18px] py-12">
      <div role="status" className="flex items-center gap-3 text-sm text-muted-foreground">
        <Spinner />
        Carregando…
      </div>
    </main>
  );
}
