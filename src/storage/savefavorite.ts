import type { Favorite } from "../types/weather";

export function salvarFavoritos(
  cidade: Pick<Favorite, "name" | "country" | "latitude" | "longitude">,
  clima: {
    icon: string;
    description: string;
    temperature: number;
    feels_like: number;
  },
): Favorite[] {
  try {
    const favoritosSalvos = localStorage.getItem("favoritos");

    const listaFavoritos: Favorite[] = favoritosSalvos ? JSON.parse(favoritosSalvos) : [];

    const novoFavorito: Favorite = {
      ...cidade,
      icon: clima.icon,
      description: clima.description,
      temperature: clima.temperature,
      feels_like: clima.feels_like,
      addedAt: Date.now(),
    };

    const listaAtualizada = [
      ...listaFavoritos.filter((item) => item.name !== cidade.name || item.country !== cidade.country),
      novoFavorito,
    ];

    localStorage.setItem("favoritos", JSON.stringify(listaAtualizada));

    return listaAtualizada;
  } catch (erro) {
    console.error("Erro ao salvar favoritos:", erro);
    return [];
  }
}
