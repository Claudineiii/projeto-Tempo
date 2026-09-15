import type { Forecast, ForecastItem } from "../types/weather";

import { listaPrevisaoHoraria, listaPrevisaoDiaria, abaHoraria, abaDiaria } from "../dom/elementos";

import { converterTemperatura } from "../utils/convertTemp";
import { obterURLIconeClima, DESCRICOES_ICONES } from "../utils/iconWeather";

function criarCardHoraria(item: ForecastItem, ehAgora: boolean = false): HTMLElement {
  const div = document.createElement("div");

  div.className = `card-previsao-horaria${ehAgora ? " active" : ""}`;

  const horaTexto = item.datetime.includes("T") ? item.datetime.split("T")[1].substring(0, 5) : item.datetime;

  const urlIcone = obterURLIconeClima(item.icon);

  const descricaoIcone = DESCRICOES_ICONES[item.icon] || "Clima";

  const hora = document.createElement("span");
  hora.className = "hora-label";
  hora.textContent = ehAgora ? "Agora" : horaTexto;
  const icone = document.createElement("div");
  icone.className = "hora-icone";
  const imagem = document.createElement("img");
  imagem.src = urlIcone;
  imagem.alt = descricaoIcone;
  imagem.width = 40;
  imagem.height = 40;
  icone.appendChild(imagem);
  const temperatura = document.createElement("span");
  temperatura.className = "hora-temp";
  temperatura.textContent = converterTemperatura(item.temperature, "C");
  div.append(hora, icone, temperatura);

  return div;
}

function criarCardDiario(item: ForecastItem): HTMLElement {
  const div = document.createElement("div");

  div.className = "card-previsao-diaria";

  const urlIcone = obterURLIconeClima(item.icon);

  const descricaoIcone = DESCRICOES_ICONES[item.icon] || "Clima";

  const [ano, mes, dia] = item.datetime.split("T")[0].split("-").map(Number);
  const data = new Date(Date.UTC(ano, mes - 1, dia));

  const dataFormatada = data.toLocaleDateString("pt-BR", {
    timeZone: "UTC",
    day: "2-digit",
    month: "2-digit",
  });

  const nomeDia = data.toLocaleDateString("pt-BR", {
    timeZone: "UTC",
    weekday: "short",
  });

  const cabecalho = document.createElement("div");
  cabecalho.className = "dia-header";
  const dataTexto = document.createElement("span");
  dataTexto.className = "dia-data";
  dataTexto.textContent = dataFormatada;
  const diaTexto = document.createElement("span");
  diaTexto.className = "dia-nome";
  diaTexto.textContent = nomeDia;
  cabecalho.append(dataTexto, diaTexto);
  const icone = document.createElement("div");
  icone.className = "dia-icone";
  const imagem = document.createElement("img");
  imagem.src = urlIcone;
  imagem.alt = descricaoIcone;
  imagem.width = 50;
  imagem.height = 50;
  icone.appendChild(imagem);
  const temperaturas = document.createElement("div");
  temperaturas.className = "dia-temps";
  const maxima = document.createElement("span");
  maxima.className = "temp-max";
  maxima.textContent = `Máx: ${converterTemperatura(item.tempMax, "C")}`;
  const minima = document.createElement("span");
  minima.className = "temp-min";
  minima.textContent = `Mín: ${converterTemperatura(item.tempMin, "C")}`;
  temperaturas.append(maxima, minima);
  div.append(cabecalho, icone, temperaturas);

  return div;
}

export function renderizarPrevisaoHoraria(forecast: Forecast): void {
  listaPrevisaoHoraria.replaceChildren();

  const horas = forecast.hourly.slice(0, 8);

  horas.forEach((item, index) => {
    const cardHoraria = criarCardHoraria(item, index === 0);

    listaPrevisaoHoraria.appendChild(cardHoraria);
  });
}

export function renderizarPrevisaoDiaria(forecast: Forecast): void {
  listaPrevisaoDiaria.replaceChildren();

  const dias = forecast.daily.slice(0, 7);

  if (dias.length === 0) {
    const mensagem = document.createElement("p");

    mensagem.textContent = "Previsão diária indisponível";

    listaPrevisaoDiaria.appendChild(mensagem);

    return;
  }

  dias.forEach((item) => {
    const cardDiario = criarCardDiario(item);

    listaPrevisaoDiaria.appendChild(cardDiario);
  });
}

export function renderizarPrevisao(forecast: Forecast): void {
  renderizarPrevisaoHoraria(forecast);
  renderizarPrevisaoDiaria(forecast);
}

export function inicializarAbasPrevisao(): void {
  abaHoraria.addEventListener("click", () => {
    listaPrevisaoHoraria.classList.remove("is-hidden");
    listaPrevisaoDiaria.classList.add("is-hidden");

    abaHoraria.classList.add("active");
    abaDiaria.classList.remove("active");
  });

  abaDiaria.addEventListener("click", () => {
    listaPrevisaoHoraria.classList.add("is-hidden");
    listaPrevisaoDiaria.classList.remove("is-hidden");

    abaHoraria.classList.remove("active");
    abaDiaria.classList.add("active");
  });
}
