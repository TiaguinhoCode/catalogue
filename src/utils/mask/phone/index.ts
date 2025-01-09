export function applyPhoneMask(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .slice(0, 14)
    .replace(/(\d{4,5})(\d{4})$/, "$1-$2");
}
