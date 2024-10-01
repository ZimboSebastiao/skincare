export function getCurrentDate() {
  const today = new Date();
  const day = today.getDate();
  const month = today.toLocaleString("pt-BR", { month: "long" });

  return `${day} de ${month.charAt(0).toUpperCase() + month.slice(1)}`;
}
