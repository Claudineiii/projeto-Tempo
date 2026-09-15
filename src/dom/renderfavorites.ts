import type { City, Favorite, Weather } from "../types/weather";

import { carregarFavoritos } from "../storage/loadfavorites";
import { salvarFavoritos } from "../storage/savefavorite";

import { converterTemperatura } from "../utils/convertTemp";

import { obterURLIconeClima, DESCRICOES_ICONES } from "../utils/iconWeather";

import { listaFavoritos } from "../dom/elementos";

function criarCardFavorito(favorito: Favorite, aoSelecionarCidade: (cidade: City) => Promise<void>): HTMLElement {
  const div = document.createElement("div");

  div.className = "card-favorito";
  div.setAttribute("role", "button");
  div.tabIndex = 0;
  div.setAttribute("aria-label", `Ver clima de ${favorito.name}, ${favorito.country}`);

  const urlIcone = obterURLIconeClima(favorito.icon);

  const descricao = favorito.description || DESCRICOES_ICONES[favorito.icon] || "Clima";

  const info = document.createElement("div");
  info.className = "favorito-info";
  const nome = document.createElement("strong");
  nome.textContent = favorito.name;
  const condicao = document.createElement("small");
  condicao.textContent = descricao;
  info.append(nome, condicao);

  const temperatura = document.createElement("span");
  temperatura.className = "favorito-temp";
  const icone = document.createElement("img");
  icone.src = urlIcone;
  icone.alt = descricao;
  icone.width = 20;
  icone.height = 20;
  temperatura.append(icone, document.createTextNode(converterTemperatura(favorito.temperature, "C")));

  const remover = document.createElement("button");
  remover.className = "btn-remover-favorito";
  remover.type = "button";
  remover.textContent = "×";
  remover.setAttribute("aria-label", `Remover ${favorito.name} dos favoritos`);
  remover.addEventListener("click", (evento) => {
    evento.stopPropagation();
    removerFavorito(favorito.name, favorito.country, aoSelecionarCidade);
  });

  div.append(info, temperatura, remover);

  div.addEventListener("click", async () => {
    try {
      await aoSelecionarCidade(favorito);
    } catch (erro) {
      console.error("Erro ao carregar favorito:", erro);
    }
  });

  div.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter" || evento.key === " ") {
      evento.preventDefault();
      div.click();
    }
  });

  return div;
}

export function renderizarFavoritos(aoSelecionarCidade: (cidade: City) => Promise<void>): void {
  const favoritos = carregarFavoritos();

  listaFavoritos.innerHTML = "";

  if (favoritos.length === 0) {
    const mensagem = document.createElement("p");

    mensagem.textContent = "Nenhum favorito adicionado";

    mensagem.style.color = "#888";
    mensagem.style.textAlign = "center";

    listaFavoritos.appendChild(mensagem);

    return;
  }

  favoritos.forEach((favorito) => {
    const card = criarCardFavorito(favorito, aoSelecionarCidade);

    listaFavoritos.appendChild(card);
  });
}

export function adicionarAosFavoritos(clima: Weather, aoSelecionarCidade: (cidade: City) => Promise<void>): void {
  try {
    salvarFavoritos(
      {
        name: clima.city.name,
        country: clima.city.country,
        latitude: clima.city.latitude,
        longitude: clima.city.longitude,
      },
      {
        icon: clima.icon,
        description: clima.description,
        temperature: clima.temperature,
        feels_like: clima.feels_like,
      },
    );

    renderizarFavoritos(aoSelecionarCidade);
  } catch (erro) {
    console.error("Erro ao adicionar favorito:", erro);
  }
}

export function removerFavorito(
  nomeCidade: string,
  pais: string,
  aoSelecionarCidade: (cidade: City) => Promise<void>,
): void {
  try {
    const favoritos = carregarFavoritos();

    const atualizado = favoritos.filter((favorito) => favorito.name !== nomeCidade || favorito.country !== pais);

    localStorage.setItem("favoritos", JSON.stringify(atualizado));

    renderizarFavoritos(aoSelecionarCidade);
  } catch (erro) {
    console.error("Erro ao remover favorito:", erro);
  }
}
