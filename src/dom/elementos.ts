function selecionarElemento<T extends HTMLElement>(id: string): T {
  const elemento = document.getElementById(id);

  if (!elemento) {
    throw new Error(`Elemento com id "${id}" não foi encontrado no DOM.`);
  }

  return elemento as T;
}

export const inputCidade = selecionarElemento<HTMLInputElement>("input-cidade");

export const btnLocalizacao = selecionarElemento<HTMLButtonElement>("btn-localizacao");

export const btnFavorito = selecionarElemento<HTMLButtonElement>("btn-favorito");

export const btnTema = selecionarElemento<HTMLButtonElement>("btn-tema");

export const btnAdicionarFavorito = selecionarElemento<HTMLButtonElement>("btn-add-favorito");

export const btnExpandirMapa = selecionarElemento<HTMLButtonElement>("btn-expandir-mapa");

function selecionarCardMapa(): HTMLDivElement {
  const card = selecionarElemento<HTMLDivElement>("mapa-radar").closest<HTMLDivElement>(".card-mapa");

  if (!card) {
    throw new Error("Container do mapa não foi encontrado no DOM.");
  }

  return card;
}

export const cardMapa = selecionarCardMapa();

export const nomeCidade = selecionarElemento<HTMLHeadingElement>("nome-cidade");

export const condicaoClima = selecionarElemento<HTMLSpanElement>("condicao-clima");

export const temperaturaAtual = selecionarElemento<HTMLSpanElement>("temperatura-atual");

export const sensacaoTermica = selecionarElemento<HTMLElement>("sensacao-termica");

export const umidade = selecionarElemento<HTMLSpanElement>("umidade");

export const vento = selecionarElemento<HTMLSpanElement>("vento");

export const pressao = selecionarElemento<HTMLSpanElement>("pressao");

export const visibilidade = selecionarElemento<HTMLSpanElement>("visibilidade");

export const nascerSol = selecionarElemento<HTMLElement>("nascer-sol");

export const porSol = selecionarElemento<HTMLElement>("por-sol");

export const imgIconeClima = selecionarElemento<HTMLImageElement>("img-icone-clima");

export const listaPrevisaoHoraria = selecionarElemento<HTMLDivElement>("lista-previsao-horaria");

export const listaPrevisaoDiaria = selecionarElemento<HTMLDivElement>("lista-previsao-diaria");

export const abaHoraria = selecionarElemento<HTMLButtonElement>("aba-horaria");

export const abaDiaria = selecionarElemento<HTMLButtonElement>("aba-diaria");

export const listaFavoritos = selecionarElemento<HTMLDivElement>("lista-favoritos");
