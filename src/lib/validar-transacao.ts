import {
  categoriasTransacao,
  tiposTransacao,
  type CategoriaTransacao,
  type DadosTransacao,
  type TipoTransacao,
} from "@/types/transacao";

export function tipoValido(valor: unknown): valor is TipoTransacao {
  return tiposTransacao.some((tipo) => tipo === valor);
}

export function categoriaValida(valor: unknown): valor is CategoriaTransacao {
  return categoriasTransacao.some((categoria) => categoria === valor);
}

function lerCentavos(campo: FormDataEntryValue | null): number | null {
  if (typeof campo !== "string") return null;
  const partes = /^(\d+)(?:[.,](\d{1,2}))?$/.exec(campo.trim());
  if (!partes) return null;

  const centavos = Number(partes[1] + (partes[2] ?? "").padEnd(2, "0"));
  return Number.isSafeInteger(centavos) && centavos > 0 ? centavos : null;
}

function lerData(campo: FormDataEntryValue | null): Date | null {
  if (typeof campo !== "string" || !/^(?!0000)\d{4}-\d{2}-\d{2}$/.test(campo)) return null;

  const data = new Date(`${campo}T00:00:00.000Z`);
  return Number.isFinite(data.getTime()) && data.toISOString().slice(0, 10) === campo ? data : null;
}

export function lerDadosTransacao(formulario: FormData): { dados: DadosTransacao } | { erro: string } {
  const tipo = formulario.get("tipo");
  const categoria = formulario.get("categoria");
  const descricao = formulario.get("descricao");
  const valor = lerCentavos(formulario.get("valor"));
  const data = lerData(formulario.get("data"));

  if (!tipoValido(tipo)) return { erro: "Selecione um tipo válido." };
  if (typeof descricao !== "string" || !descricao.trim()) return { erro: "Informe uma descrição." };
  if (valor === null) return { erro: "Informe um valor positivo com até duas casas decimais." };
  if (!categoriaValida(categoria)) return { erro: "Selecione uma categoria válida." };
  if (!data) return { erro: "Informe uma data válida." };

  return { dados: { tipo, descricao: descricao.trim(), valor, categoria, data } };
}
