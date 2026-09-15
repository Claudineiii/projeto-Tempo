import { describe, expect, it } from "vitest";
import { validarDadosPrevisao } from "../api/validators";

describe("validarDadosPrevisao", () => {
  it("usa o fuso horário da cidade para agrupar e exibir a previsão", () => {
    const timestamp = Date.UTC(2026, 0, 1, 1, 0, 0) / 1000;
    const previsao = validarDadosPrevisao({
      city: { timezone: -3 * 60 * 60 },
      list: [
        {
          dt: timestamp,
          main: { temp: 20, temp_min: 18, temp_max: 22 },
          weather: [{ icon: "01d" }],
        },
      ],
    });

    expect(previsao.hourly[0].datetime).toBe("2025-12-31T22:00:00.000Z");
    expect(previsao.daily[0].datetime).toBe("2025-12-31");
  });
});
