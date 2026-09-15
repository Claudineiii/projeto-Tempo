export const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

if (!API_KEY) {
  throw new Error(
    "A chave da API do OpenWeather não está definida. Por favor, configure a variável de ambiente VITE_OPENWEATHER_API_KEY no arquivo .env.local",
  );
}
