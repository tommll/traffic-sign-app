
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudSun, Sun, CloudRain } from "lucide-react";
import { ForecastDay } from "@/utils/weatherApi";

interface ForecastWeatherProps {
  forecast: ForecastDay[] | null;
  isLoading: boolean;
}

const ForecastWeather = ({ forecast, isLoading }: ForecastWeatherProps) => {
  if (isLoading) {
    return (
      <Card className="w-full bg-white/80 backdrop-blur-sm shadow-lg animate-pulse">
        <CardHeader>
          <div className="h-6 bg-gray-300 rounded w-1/4"></div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!forecast || forecast.length === 0) {
    return (
      <Card className="w-full bg-white/80 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle>5-Day Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 py-4">
            <p>No forecast data available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getWeatherIcon = (iconCode: string, size = 32) => {
    if (iconCode.includes("01") || iconCode.includes("02")) {
      return <Sun size={size} className="text-weather-sunny" />;
    } else if (iconCode.includes("03") || iconCode.includes("04")) {
      return <CloudSun size={size} className="text-weather-cloudy" />;
    } else if (
      iconCode.includes("09") || 
      iconCode.includes("10") || 
      iconCode.includes("11")
    ) {
      return <CloudRain size={size} className="text-weather-rainy" />;
    } else {
      return <CloudSun size={size} className="text-weather-cloudy" />;
    }
  };

  // Format date from unix timestamp
  const formatDay = (dt: number) => {
    const date = new Date(dt * 1000);
    return date.toLocaleDateString(undefined, { weekday: "short" });
  };

  return (
    <Card className="w-full bg-white/80 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle>5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {forecast.map((day, index) => (
            <div key={index} className="p-3 bg-white rounded-lg shadow-sm flex flex-col items-center">
              <p className="font-medium">{formatDay(day.dt)}</p>
              <div className="my-2">
                {getWeatherIcon(day.weather[0].icon)}
              </div>
              <p className="capitalize text-sm text-gray-500">{day.weather[0].description}</p>
              <div className="flex gap-2 mt-2">
                <span className="font-medium">{Math.round(day.temp.max)}°</span>
                <span className="text-gray-500">{Math.round(day.temp.min)}°</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ForecastWeather;
