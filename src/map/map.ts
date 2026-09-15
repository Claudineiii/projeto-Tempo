import L from "leaflet";
import type { Weather } from "../types/weather";
import "leaflet/dist/leaflet.css";

export function initializeMap(weather?: Weather): L.Map {
  const latitude = -23.55052;
  const longitude = -46.633308;

  const mapa = L.map("mapa-radar").setView([latitude, longitude], 10);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mapa);

  return mapa;
}

export function updateMapLocation(mapa: L.Map, weather: Weather): void {
  const { latitude, longitude } = weather.city;
  mapa.setView([latitude, longitude], 10);
}
