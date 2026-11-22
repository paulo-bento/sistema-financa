import "server-only";

export function normalizarEmail(valor: unknown): string | null {
  if (typeof valor !== "string") return null;
  const email = valor.trim().toLowerCase();
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null;
}

export function validarSenha(valor: unknown): valor is string {
  return typeof valor === "string" && valor.length >= 8 && Buffer.byteLength(valor, "utf8") <= 72;
}
