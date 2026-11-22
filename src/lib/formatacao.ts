const moeda = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const dia = new Intl.DateTimeFormat("pt-BR", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  timeZone: "UTC",
});

export function formatarMoeda(centavos: number | bigint): string {
  const sinal = centavos < 0 ? "-" : "";
  const digitos = String(centavos < 0 ? -centavos : centavos).padStart(3, "0");
  const valor = `${sinal}${digitos.slice(0, -2)}.${digitos.slice(-2)}`;
  return moeda.format(valor as `${number}`);
}

export function formatarData(data: Date): string {
  return dia.format(data);
}

export function formatarValorCampo(centavos: number): string {
  const digitos = String(centavos).padStart(3, "0");
  return `${digitos.slice(0, -2)},${digitos.slice(-2)}`;
}
