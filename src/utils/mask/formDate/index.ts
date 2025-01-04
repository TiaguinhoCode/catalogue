export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return "N/A"; 
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formattedDate;
}
