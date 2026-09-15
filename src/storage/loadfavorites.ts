import type { Favorite } from "../types/weather";

export function carregarFavoritos(): Favorite[] {
  try {
    const dados = localStorage.getItem("favoritos");

    if (!dados) {
      return [];
    }

    const favoritos: Favorite[] = JSON.parse(dados);

    if (!Array.isArray(favoritos)) {
      return [];
    }

    return favoritos;
  } catch (erro) {
    console.error("Erro ao carregar favoritos:", erro);

    return [];
  }
}
