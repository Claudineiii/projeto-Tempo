import type { City, Weather } from "./types/weather";

import {
  inputCidade,
  btnLocalizacao,
  btnFavorito,
  btnTema,
  btnAdicionarFavorito,
  btnExpandirMapa,
  cardMapa,
} from "./dom/elementos";

import { buscarClima } from "./api/fetchweather";
import { buscarPrevisao } from "./api/fetchforecast";

import { atualizarClima } from "./dom/renderforecast";

import { renderizarPrevisao, inicializarAbasPrevisao } from "./dom/renderprevisao";

import { adicionarAosFavoritos, renderizarFavoritos } from "./dom/renderfavorites";
import { buscarCidade, buscarCidadePorCoordenadas } from "./api/geocoding";
import { salvarHistorico } from "./storage/savehistory";
import { renderizarHistorico } from "./dom/renderhistory";
import { initializeMap, updateMapLocation } from "./map/map";

let climaAtual: Weather | null = null;
let mapa: L.Map;

async function carregarCidade(localizacao: City): Promise<void> {
  try {
    const [clima, previsao] = await Promise.all([buscarClima(localizacao), buscarPrevisao(localizacao)]);

    climaAtual = clima;

    atualizarClima(clima);
    renderizarPrevisao(previsao);
    updateMapLocation(mapa, clima);

    salvarHistorico(clima.city);
    renderizarHistorico(pesquisarCidade);
  } catch (erro) {
    console.error("Erro ao buscar dados da cidade:", erro);

    alert("Não foi possível encontrar os dados dessa cidade.");
  }
}

export async function pesquisarCidade(cidade: string): Promise<void> {
  const cidadeLimpa = cidade.trim();

  if (!cidadeLimpa) {
    alert("Digite o nome de uma cidade.");
    return;
  }

  try {
    await carregarCidade(await buscarCidade(cidadeLimpa));
  } catch (erro) {
    console.error("Erro ao localizar cidade:", erro);
    alert("Não foi possível encontrar os dados dessa cidade.");
  }
}

async function pesquisarPorLocalizacao(localizacao: City): Promise<void> {
  await carregarCidade(localizacao);
}

inputCidade.addEventListener("keydown", (evento) => {
  if (evento.key === "Enter") {
    pesquisarCidade(inputCidade.value);
  }
});

function favoritarCidadeAtual(): void {
  if (!climaAtual) {
    alert("Busque uma cidade primeiro.");
    return;
  }

  adicionarAosFavoritos(climaAtual, pesquisarPorLocalizacao);

  alert("Cidade adicionada aos favoritos!");
}

btnFavorito.addEventListener("click", favoritarCidadeAtual);
btnAdicionarFavorito.addEventListener("click", favoritarCidadeAtual);

function aplicarTemaClaro(ativo: boolean): void {
  document.body.classList.toggle("tema-claro", ativo);
  btnTema.setAttribute("aria-pressed", String(ativo));
  btnTema.setAttribute("aria-label", ativo ? "Ativar tema escuro" : "Ativar tema claro");
  localStorage.setItem("tema", ativo ? "claro" : "escuro");
}

btnTema.addEventListener("click", () => {
  aplicarTemaClaro(!document.body.classList.contains("tema-claro"));
});

btnExpandirMapa.addEventListener("click", () => {
  const expandido = cardMapa.classList.toggle("card-mapa-expandido");

  btnExpandirMapa.setAttribute("aria-expanded", String(expandido));
  btnExpandirMapa.setAttribute("aria-label", expandido ? "Reduzir mapa" : "Expandir mapa");
  btnExpandirMapa.textContent = expandido ? "⤡" : "⤢";

  window.setTimeout(() => mapa.invalidateSize(), 200);
});

btnLocalizacao.addEventListener("click", () => {
  if (!navigator.geolocation) {
    alert("A geolocalização não é suportada pelo seu navegador.");
    return;
  }
  navigator.geolocation.getCurrentPosition(
    async (posicao) => {
      const { latitude, longitude } = posicao.coords;

      try {
        const cidade = await buscarCidadePorCoordenadas(latitude, longitude);
        await pesquisarPorLocalizacao(cidade);
      } catch (erro) {
        console.error("Erro ao obter clima pela localização:", erro);

        alert("Não foi possível obter o clima da sua localização.");
      }
    },
    (erro) => {
      console.error("Erro de geolocalização:", erro);

      alert("Não foi possível obter sua localização.");
    },
  );
});

function iniciarAplicacao(): void {
  inicializarAbasPrevisao();
  aplicarTemaClaro(localStorage.getItem("tema") === "claro");
  renderizarFavoritos(pesquisarPorLocalizacao);
  renderizarHistorico(pesquisarCidade);
  mapa = initializeMap();
  void pesquisarCidade("São Paulo");
}

iniciarAplicacao();
