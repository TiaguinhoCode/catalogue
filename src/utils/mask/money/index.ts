export function formatCurrency(value: string): string {
  const numericValue = parseFloat(value.replace(/[^\d.-]/g, ""));

  const options: Intl.NumberFormatOptions = {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  if (isNaN(numericValue)) {
    return "R$ 0,00";
  }

  return numericValue.toLocaleString("pt-BR", options);
}
