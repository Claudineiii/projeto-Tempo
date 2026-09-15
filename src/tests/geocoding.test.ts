import { afterEach, describe, expect, it, vi } from "vitest";
import { buscarCidade, buscarCidadePorCoordenadas } from "../api/geocoding";

afterEach(() => vi.unstubAllGlobals());

describe("geocoding", () => {
  it("deve encontrar uma cidade pelas coordenadas", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify([{ name: "Pindamonhangaba", country: "BR", lat: -22.81, lon: -45.19 }]), { status: 200 }),
      ),
    );

    const cidade = await buscarCidadePorCoordenadas(-22.8134, -45.1974);

    expect(cidade).toBeDefined();
    expect(cidade.name).toBeTruthy();
    expect(cidade.country).toBe("BR");
    expect(cidade.latitude).toBeTypeOf("number");
    expect(cidade.longitude).toBeTypeOf("number");
  });

  it("deve codificar uma cidade sem depender da API real", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify([{ name: "São Paulo", country: "BR", lat: -23.55, lon: -46.63 }]), { status: 200 }),
      ),
    );

    await expect(buscarCidade("São Paulo")).resolves.toMatchObject({ name: "São Paulo", country: "BR" });
  });
});
