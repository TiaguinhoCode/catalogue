function formatCurrency(value: string): string {
  const numericValue = value.replace(/[^\d]/g, "");

  if (!numericValue) return "R$ 0,00";

  const formattedValue = (parseInt(numericValue) / 100).toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  );

  return formattedValue;
}

export function MoneyMaskInput({
  setValue,
}: {
  setValue: (value: string) => void;
}) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const formattedValue = formatCurrency(inputValue);
    setValue(formattedValue);
  };

  return { handleChange };
}
