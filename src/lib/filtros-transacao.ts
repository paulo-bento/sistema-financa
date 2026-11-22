import { categoriaValida, tipoValido } from "@/lib/validar-transacao";
import type { FiltrosTransacao } from "@/types/transacao";

export const filtrosVazios: FiltrosTransacao = { mes: "", tipo: "", categoria: "" };

export function lerFiltrosTransacao(parametros: Record<string, string | string[] | undefined>): FiltrosTransacao {
  const { mes, tipo, categoria } = parametros;
  return {
    mes: typeof mes === "string" && /^(?!0000)\d{4}-(0[1-9]|1[0-2])$/.test(mes) ? mes : "",
    tipo: tipoValido(tipo) ? tipo : "",
    categoria: categoriaValida(categoria) ? categoria : "",
  };
}

export function parametrosFiltros(filtros: FiltrosTransacao): string {
  const parametros = new URLSearchParams();
  if (filtros.mes) parametros.set("mes", filtros.mes);
  if (filtros.tipo) parametros.set("tipo", filtros.tipo);
  if (filtros.categoria) parametros.set("categoria", filtros.categoria);
  return parametros.toString();
}
