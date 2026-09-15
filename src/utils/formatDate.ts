export function converterData(timestamp: number, timezone: number): string {
  const data = new Date((timestamp + timezone) * 1000);

  return data.toLocaleDateString("pt-BR", {
    timeZone: "UTC",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function converterHora(timestamp: number, timezone: number): string {
  const data = new Date((timestamp + timezone) * 1000);

  return data.toLocaleTimeString("pt-BR", {
    timeZone: "UTC",
    hour: "2-digit",
    minute: "2-digit",
  });
}

