
import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import ApiKeyForm from "@/components/weather/ApiKeyForm";
import CitySearch from "@/components/weather/CitySearch";
import CurrentWeather from "@/components/weather/CurrentWeather";
import ForecastWeather from "@/components/weather/ForecastWeather";
import WeatherBackground from "@/components/weather/WeatherBackground";
import { fetchWeather, fetchForecast, WeatherData, ForecastDay } from "@/utils/weatherApi";
import { saveRecentCity } from "@/utils/storage";

const Index = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [city, setCity] = useState<string>("");
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchWeatherData = useCallback(async (cityToFetch: string) => {
    if (!apiKey) {
      toast.error("Please set your API key first");
      return;
    }

    setIsLoading(true);
    try {
      // Fetch current weather
      const weatherData = await fetchWeather(cityToFetch, apiKey);
      setCurrentWeather(weatherData);
      
      // Fetch forecast
      const forecastData = await fetchForecast(cityToFetch, apiKey);
      setForecast(forecastData);
      
      // Save to recent cities
      saveRecentCity(cityToFetch);
      
      // Update current city
      setCity(cityToFetch);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      toast.error("Failed to fetch weather data. Please check the city name and try again.");
    } finally {
      setIsLoading(false);
    }
  }, [apiKey]);

  const handleCitySelect = (selectedCity: string) => {
    fetchWeatherData(selectedCity);
  };

  const handleApiKeySet = (key: string) => {
    setApiKey(key);
  };

  return (
    <WeatherBackground weatherCondition={currentWeather?.icon}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-white drop-shadow-md">
          Weather Dashboard
        </h1>

        {!apiKey ? (
          <div className="max-w-md mx-auto">
            <ApiKeyForm onApiKeySet={handleApiKeySet} />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-end">
              <button 
                onClick={() => setApiKey(null)}
                className="text-sm text-white/80 hover:text-white underline"
              >
                Change API Key
              </button>
            </div>
            
            <CitySearch onCitySelect={handleCitySelect} isLoading={isLoading} />
            
            <div className="grid grid-cols-1 gap-6">
              <CurrentWeather data={currentWeather} isLoading={isLoading} />
              <ForecastWeather forecast={forecast} isLoading={isLoading} />
            </div>
          </div>
        )}
      </div>
    </WeatherBackground>
  );
};

export default Index;
