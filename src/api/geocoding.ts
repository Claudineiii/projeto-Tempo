import type { City } from "../types/weather";
import { API_KEY } from "./config";

export async function buscarCidade(cidade: string): Promise<City> {
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cidade)}&limit=1&appid=${API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
  }

  const dados = await response.json();
  const resultado = dados[0];

  if (!resultado) {
    throw new Error("Cidade não encontrada");
  }
  return {
    name: resultado.name,
    country: resultado.country,
    latitude: resultado.lat,
    longitude: resultado.lon,
  };
}

export async function buscarCidadePorCoordenadas(latitude: number, longitude: number): Promise<City> {
  const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `nao foi possível buscar a cidade para as coordenadas fornecidas: ${response.status} - ${response.statusText} `,
    );
  }

  const dados = await response.json();

  if (!dados || dados.length === 0) {
    throw new Error("Cidade não encontrada para as coordenadas fornecidas");
  }

  const resultado = dados[0];

  return {
    name: resultado.name,
    country: resultado.country,
    latitude: resultado.lat,
    longitude: resultado.lon,
  };
}
