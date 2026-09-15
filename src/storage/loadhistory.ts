import type { SearchHistoryItem } from "../types/weather";

export function carregarHistorico(): SearchHistoryItem[] {
  try {
    const dados = localStorage.getItem("historico");

    if (!dados) {
      return [];
    }

    const historico: SearchHistoryItem[] = JSON.parse(dados);

    if (!Array.isArray(historico)) {
      return [];
    }

    return historico;
  } catch (erro) {
    console.error("Erro ao carregar histórico:", erro);
    return [];
  }
}
