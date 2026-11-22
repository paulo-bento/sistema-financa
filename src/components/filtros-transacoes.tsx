"use client";

import { useId, useState, useTransition, type FormEvent, type JSX } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "zustand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { Spinner } from "@/components/ui/spinner";
import { filtrosVazios, parametrosFiltros } from "@/lib/filtros-transacao";
import { categoriaValida, tipoValido } from "@/lib/validar-transacao";
import { criarStoreFiltros } from "@/store/filtros";
import { categoriasTransacao, rotulosTipo, tiposTransacao, type FiltrosTransacao } from "@/types/transacao";

export function FiltrosTransacoes({ iniciais }: { iniciais: FiltrosTransacao }): JSX.Element {
  const router = useRouter();
  const tipoId = useId();
  const categoriaId = useId();
  const [store] = useState(() => criarStoreFiltros(iniciais));
  const filtros = useStore(store);
  const [pendente, iniciar] = useTransition();

  function aplicar(evento: FormEvent<HTMLFormElement>): void {
    evento.preventDefault();
    const parametros = parametrosFiltros(filtros);
    iniciar(() => router.push(parametros ? `/dashboard?${parametros}` : "/dashboard"));
  }

  function limpar(): void {
    store.setState(filtrosVazios);
    iniciar(() => router.push("/dashboard"));
  }

  return (
    <form onSubmit={aplicar} aria-label="Filtros de transações" className="grid gap-3">
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="grid min-w-0 gap-1.5 text-sm font-bold">
          Mês
          <Input
            type="month"
            name="mes"
            pattern="[0-9]{4}-(0[1-9]|1[0-2])"
            placeholder="AAAA-MM"
            value={filtros.mes}
            onChange={(evento) => store.setState({ mes: evento.target.value })}
          />
        </label>
        <div className="grid min-w-0 gap-1.5">
          <label htmlFor={tipoId} className="text-sm font-bold">Tipo</label>
          <NativeSelect
            id={tipoId}
            name="tipo"
            value={filtros.tipo}
            onChange={(evento) => {
              const { value } = evento.target;
              store.setState({ tipo: tipoValido(value) ? value : "" });
            }}
          >
            <option value="">Todos os tipos</option>
            {tiposTransacao.map((tipo) => <option key={tipo} value={tipo}>{rotulosTipo[tipo]}</option>)}
          </NativeSelect>
        </div>
        <div className="grid min-w-0 gap-1.5">
          <label htmlFor={categoriaId} className="text-sm font-bold">Categoria</label>
          <NativeSelect
            id={categoriaId}
            name="categoria"
            value={filtros.categoria}
            onChange={(evento) => {
              const { value } = evento.target;
              store.setState({ categoria: categoriaValida(value) ? value : "" });
            }}
          >
            <option value="">Todas as categorias</option>
            {categoriasTransacao.map((categoria) => <option key={categoria}>{categoria}</option>)}
          </NativeSelect>
        </div>
      </div>
      <div className="flex flex-wrap justify-end gap-1.5">
        <Button variant="ghost" disabled={pendente} onClick={limpar}>Limpar filtros</Button>
        <Button type="submit" disabled={pendente}>
          {pendente && <Spinner />}
          {pendente ? "Aplicando…" : "Aplicar filtros"}
        </Button>
      </div>
    </form>
  );
}
