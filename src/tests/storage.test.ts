import { salvarFavoritos } from "../storage/savefavorite";
import { carregarFavoritos } from "../storage/loadfavorites";
import { salvarHistorico } from "../storage/savehistory";
import type { City } from "../types/weather";
import { beforeEach, describe, expect, it } from "vitest";

const cidade: City = {
  name: "Campinas",
  country: "BR",
  latitude: -22.9056,
  longitude: -47.0608,
};

describe("Storage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("deve salvar e carregar favoritos", () => {
    const favoritos = salvarFavoritos(cidade, {
      icon: "01d",
      description: "céu limpo",
      temperature: 22,
      feels_like: 23,
    });

    expect(favoritos).toHaveLength(1);
    expect(favoritos[0].name).toBe("Campinas");

    const favoritosCarregados = carregarFavoritos();

    expect(favoritosCarregados).toHaveLength(1);
    expect(favoritosCarregados[0].name).toBe("Campinas");
  });

  it("deve salvar uma pesquisa no histórico", () => {
    const historico = salvarHistorico(cidade);

    expect(historico).toHaveLength(1);
    expect(historico[0].name).toBe("Campinas");
    expect(historico[0].name).toBe("Campinas");
  });

  it("deve colocar a pesquisa mais recente no início do histórico", () => {
    const primeiraCidade: City = {
      name: "Campinas",
      country: "BR",
      latitude: -22.9056,
      longitude: -47.0608,
    };

    const segundaCidade: City = {
      name: "São Paulo",
      country: "BR",
      latitude: -23.5505,
      longitude: -46.6333,
    };

    salvarHistorico(primeiraCidade);
    const historico = salvarHistorico(segundaCidade);

    expect(historico).toHaveLength(2);

    expect(historico[0].name).toBe("São Paulo");
    expect(historico[1].name).toBe("Campinas");
  });

  it("não deve duplicar uma cidade já presente no histórico", () => {
    salvarHistorico(cidade);
    const historico = salvarHistorico(cidade);

    expect(historico).toHaveLength(1);
    expect(historico[0].name).toBe("Campinas");
  });

  it("deve manter favoritos com mesmo nome em países diferentes", () => {
    salvarFavoritos(cidade, { icon: "01d", description: "céu limpo", temperature: 22, feels_like: 23 });
    salvarFavoritos(
      { name: "Campinas", country: "US", latitude: 39.7, longitude: -105 },
      { icon: "02d", description: "nublado", temperature: 18, feels_like: 17 },
    );

    expect(carregarFavoritos()).toHaveLength(2);
  });
});
