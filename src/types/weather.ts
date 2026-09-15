export interface City {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface Weather {
  temperature: number;
  feels_like: number;
  description: string;
  icon: string;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDirection: number;
  visibility: number;
  sunrise: number;
  sunset: number;
  timezone: number;
  city: City;
}

export interface ForecastItem {
  datetime: string;
  temperature: number;
  tempMin: number;
  tempMax: number;
  icon: string;
}

export interface Forecast {
  hourly: ForecastItem[];
  daily: ForecastItem[];
}

export interface Favorite extends City {
  addedAt: number;
  icon: string;
  description: string;
  temperature: number;
  feels_like: number;
}

export interface SearchHistoryItem {
  name: string;
  city: City;
  searchedAt: number;
}
