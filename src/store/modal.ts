import { createStore, type StoreApi } from "zustand";

interface EstadoModal {
  aberto: boolean;
}

export function criarStoreModal(): StoreApi<EstadoModal> {
  return createStore<EstadoModal>()(() => ({ aberto: false }));
}
