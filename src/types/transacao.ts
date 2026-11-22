import type { ObjectId } from "mongodb";

export const tiposTransacao = ["receita", "despesa"] as const;
export const categoriasTransacao = [
  "Alimentação",
  "Transporte",
  "Moradia",
  "Saúde",
  "Lazer",
  "Educação",
  "Salário",
  "Outros",
] as const;

export type TipoTransacao = (typeof tiposTransacao)[number];
export type CategoriaTransacao = (typeof categoriasTransacao)[number];

export const rotulosTipo: Record<TipoTransacao, string> = {
  receita: "Receita",
  despesa: "Despesa",
};

export interface DadosTransacao {
  tipo: TipoTransacao;
  descricao: string;
  valor: number;
  categoria: CategoriaTransacao;
  data: Date;
}

export interface Transacao extends DadosTransacao {
  userId: ObjectId;
}

export type ResultadoTransacao = { ok: true } | { ok: false; erro: string };

export interface FiltrosTransacao {
  mes: string;
  tipo: TipoTransacao | "";
  categoria: CategoriaTransacao | "";
}
