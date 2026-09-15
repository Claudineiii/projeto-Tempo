export function obterURLIconeClima(iconCode: string): string {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

export const DESCRICOES_ICONES: Record<string, string> = {
  "01d": "Céu limpo - Dia",
  "01n": "Céu limpo - Noite",
  "02d": "Poucas nuvens - Dia",
  "02n": "Poucas nuvens - Noite",
  "03d": "Nublado - Dia",
  "03n": "Nublado - Noite",
  "04d": "Muito nublado - Dia",
  "04n": "Muito nublado - Noite",
  "09d": "Chuva leve - Dia",
  "09n": "Chuva leve - Noite",
  "10d": "Chuva moderada - Dia",
  "10n": "Chuva moderada - Noite",
  "11d": "Tempestade - Dia",
  "11n": "Tempestade - Noite",
  "13d": "Neve - Dia",
  "13n": "Neve - Noite",
  "50d": "Neblina - Dia",
  "50n": "Neblina - Noite",
};
