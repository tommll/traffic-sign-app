const API_KEY_STORAGE_KEY = 'weather-app-api-key';
const RECENT_CITIES_STORAGE_KEY = 'weather-app-recent-cities';

export function saveApiKey(apiKey: string): void {
  localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
}

export function getApiKey(): string | null {
  return localStorage.getItem(API_KEY_STORAGE_KEY);
}

export function saveRecentCity(city: string): void {
  const recentCities = getRecentCities();
  
  // Add city to the beginning if it's not already there
  if (!recentCities.includes(city)) {
    recentCities.unshift(city);
    
    // Keep only the 5 most recent cities
    const updatedCities = recentCities.slice(0, 5);
    localStorage.setItem(RECENT_CITIES_STORAGE_KEY, JSON.stringify(updatedCities));
  } else {
    // Move the city to the beginning
    const filteredCities = recentCities.filter(c => c !== city);
    filteredCities.unshift(city);
    localStorage.setItem(RECENT_CITIES_STORAGE_KEY, JSON.stringify(filteredCities));
  }
}

export function getRecentCities(): string[] {
  const cities = localStorage.getItem(RECENT_CITIES_STORAGE_KEY);
  return cities ? JSON.parse(cities) : [];
}
