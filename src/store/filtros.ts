import { createStore, type StoreApi } from "zustand";
import type { FiltrosTransacao } from "@/types/transacao";

export function criarStoreFiltros(iniciais: FiltrosTransacao): StoreApi<FiltrosTransacao> {
  return createStore<FiltrosTransacao>()(() => iniciais);
}
