import { z } from "zod";
import type { Weather, City, Forecast, ForecastItem } from "../types/weather";

const CidadeSchema = z.object({
  lat: z.number().describe("Latitude"),
  lon: z.number().describe("Longitude"),
});

const DadosClimaBrutoSchema = z.object({
  name: z.string().describe("Nome da cidade"),
  sys: z.object({
    country: z.string().describe("Código do país"),
    sunrise: z.number().describe("Unix timestamp do nascer do sol"),
    sunset: z.number().describe("Unix timestamp do pôr do sol"),
  }),
  coord: CidadeSchema,
  main: z.object({
    temp: z.number().min(-60).max(60).describe("Temperatura em Celsius"),
    feels_like: z.number().describe("Sensação térmica"),
    humidity: z.number().min(0).max(100).describe("Umidade em %"),
    pressure: z.number().describe("Pressão em hPa"),
  }),
  weather: z
    .array(
      z.object({
        description: z.string().describe("Descrição do clima"),
        icon: z.string().describe("Código do ícone"),
      }),
    )
    .min(1)
    .describe("Array de condições climáticas"),
  wind: z.object({
    speed: z.number().min(0).describe("Velocidade do vento em m/s"),
    deg: z.number().optional().describe("Direção do vento em graus"),
  }),
  visibility: z.number().optional().describe("Visibilidade em metros"),
  timezone: z.number().describe("Deslocamento do fuso horário em segundos"),
});

export function validarDadosClima(dados: unknown): Weather {
  try {
    const validado = DadosClimaBrutoSchema.parse(dados);

    return {
      temperature: validado.main.temp,
      feels_like: validado.main.feels_like,
      description: validado.weather[0].description,
      icon: validado.weather[0].icon,
      humidity: validado.main.humidity,
      pressure: validado.main.pressure,
      windSpeed: validado.wind.speed,
      windDirection: validado.wind.deg ?? 0,
      visibility: validado.visibility ?? 10000,
      sunrise: validado.sys.sunrise,
      sunset: validado.sys.sunset,
      timezone: validado.timezone,
      city: {
        name: validado.name,
        country: validado.sys.country,
        latitude: validado.coord.lat,
        longitude: validado.coord.lon,
      },
    };
  } catch (erro) {
    if (erro instanceof z.ZodError) {
      const erros_msg = erro.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("; ");
      throw new Error(`Validação de dados falhou: ${erros_msg}`);
    }
    throw erro;
  }
}

const PrevisaoItemBrutoSchema = z.object({
  dt: z.number().describe("Unix timestamp"),
  main: z.object({
    temp: z.number().min(-60).max(60).describe("Temperatura"),
    temp_min: z.number().min(-60).max(60).describe("Temperatura mínima"),
    temp_max: z.number().min(-60).max(60).describe("Temperatura máxima"),
  }),
  weather: z
    .array(
      z.object({
        icon: z.string().describe("Código do ícone"),
      }),
    )
    .min(1),
});

const DadosPrevisaoBrutoSchema = z.object({
  list: z.array(PrevisaoItemBrutoSchema).describe("Array de itens de previsão"),
  city: z.object({
    timezone: z.number().describe("Deslocamento do fuso horário em segundos"),
  }),
});

export function validarDadosPrevisao(dados: unknown): Forecast {
  try {
    const validado = DadosPrevisaoBrutoSchema.parse(dados);

    const paraDataLocal = (timestamp: number): string =>
      new Date((timestamp + validado.city.timezone) * 1000).toISOString();

    const hourly: ForecastItem[] = validado.list.map((item) => ({
      datetime: paraDataLocal(item.dt),
      temperature: item.main.temp,
      tempMin: item.main.temp_min,
      tempMax: item.main.temp_max,
      icon: item.weather[0].icon,
    }));

    const previsaoPorDia: Record<string, typeof validado.list> = {};

    validado.list.forEach((item) => {
      const data = paraDataLocal(item.dt).split("T")[0];

      if (!previsaoPorDia[data]) {
        previsaoPorDia[data] = [];
      }

      previsaoPorDia[data].push(item);
    });

    const daily: ForecastItem[] = Object.entries(previsaoPorDia).map(([data, itens]) => {
      const temperaturas = itens.map((item) => item.main.temp);
      const tempMin = Math.min(...temperaturas);
      const tempMax = Math.max(...temperaturas);

      const itemPrincipal = itens[Math.floor(itens.length / 2)];

      return {
        datetime: data,
        temperature: itemPrincipal.main.temp,
        tempMin,
        tempMax,
        icon: itemPrincipal.weather[0].icon,
      };
    });

    return {
      hourly,
      daily,
    };
  } catch (erro) {
    if (erro instanceof z.ZodError) {
      const erros_msg = erro.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("; ");
      throw new Error(`Validação de previsão falhou: ${erros_msg}`);
    }
    throw erro;
  }
}
