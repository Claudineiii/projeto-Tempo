export function converterParaFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

export function converterParaCelsius(fahrenheit: number): number {
  return ((fahrenheit - 32) * 5) / 9;
}

export function converterTemperatura(celsius: number, unidade: "C" | "F" = "C"): string {
  if (unidade === "F") {
    const fahrenheit = converterParaFahrenheit(celsius);
    return `${Math.round(fahrenheit)}°${unidade}`;
  }
  return `${Math.round(celsius)}°${unidade}`;
}

export function arredondarTemperatura(temp: number): number {
  return Math.round(temp);
}
