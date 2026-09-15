import type { Weather } from "../types/weather";

import {
  nomeCidade,
  condicaoClima,
  temperaturaAtual,
  sensacaoTermica,
  umidade,
  vento,
  pressao,
  visibilidade,
  nascerSol,
  porSol,
  imgIconeClima,
} from "../dom/elementos";

import { converterTemperatura } from "../utils/convertTemp";
import { converterHora } from "../utils/formatDate";
import { obterURLIconeClima, DESCRICOES_ICONES } from "../utils/iconWeather";

export function atualizarClima(clima: Weather): void {
  nomeCidade.textContent = `${clima.city.name}, ${clima.city.country}`;
  condicaoClima.textContent = clima.description;
  temperaturaAtual.textContent = converterTemperatura(clima.temperature, "C");
  sensacaoTermica.textContent = converterTemperatura(clima.feels_like, "C");

  umidade.textContent = `${clima.humidity}%`;

  vento.textContent = `${clima.windSpeed.toFixed(1)} m/s`;

  pressao.textContent = `${clima.pressure} hPa`;

  const visibilidadeKm = (clima.visibility / 1000).toFixed(1);

  visibilidade.textContent = `${visibilidadeKm} km`;

  nascerSol.textContent = converterHora(clima.sunrise, clima.timezone);

  porSol.textContent = converterHora(clima.sunset, clima.timezone);

  const urlIcone = obterURLIconeClima(clima.icon);

  const descricaoIcone = DESCRICOES_ICONES[clima.icon] || clima.description;

  imgIconeClima.src = urlIcone;
  imgIconeClima.alt = descricaoIcone;
}
