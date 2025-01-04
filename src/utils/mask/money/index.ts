export function formatCurrency(value: string): string {
  let numericValue = parseFloat(value.replace(",", "."));

  if (isNaN(numericValue)) return "R$ 0,00";

  return numericValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}


export function parseCurrency(value: string): number {
  return parseFloat(value.replace(/[^0-9,-]+/g, "").replace(",", ".")) || 0;
}