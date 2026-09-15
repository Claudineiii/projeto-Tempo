import type { City, Weather } from "../types/weather";
import { API_KEY } from "./config";
import { validarDadosClima } from "./validators";

export async function buscarClima(localizacao: City): Promise<Weather> {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${localizacao.latitude}&lon=${localizacao.longitude}&appid=${API_KEY}&units=metric&lang=pt_br`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
    }

    const dados = await response.json();

    return validarDadosClima(dados);
  } catch (erro) {
    if (erro instanceof Error) {
      throw new Error(`Falha ao buscar clima para "${localizacao.name}": ${erro.message}`);
    }
    throw erro;
  }
}
