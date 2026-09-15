import type { City, SearchHistoryItem } from "../types/weather";

export function salvarHistorico(city: City): SearchHistoryItem[] {
  try {
    const historicoSalvo = localStorage.getItem("historico");

    const historico: SearchHistoryItem[] = historicoSalvo ? JSON.parse(historicoSalvo) : [];

    const novaPesquisa: SearchHistoryItem = {
      name: city.name,
      city,
      searchedAt: Date.now(),
    };

    const historicoSemCidadeAtual = historico.filter(
      (item) => item.city.name !== city.name || item.city.country !== city.country,
    );
    const historicoAtualizado = [novaPesquisa, ...historicoSemCidadeAtual];

    localStorage.setItem("historico", JSON.stringify(historicoAtualizado));

    return historicoAtualizado;
  } catch {
    return [];
  }
}
