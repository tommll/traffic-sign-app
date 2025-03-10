
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { WeatherData } from "@/utils/weatherApi";
import { CloudSun, Sun, CloudRain, Thermometer, Wind, Droplets, MapPin } from "lucide-react";

interface CurrentWeatherProps {
  data: WeatherData | null;
  isLoading: boolean;
}

const CurrentWeather = ({ data, isLoading }: CurrentWeatherProps) => {
  if (isLoading) {
    return (
      <Card className="w-full bg-white/80 backdrop-blur-sm shadow-lg animate-pulse">
        <CardHeader className="pb-2">
          <div className="h-7 bg-gray-300 rounded w-1/3 mb-2"></div>
          <div className="h-5 bg-gray-200 rounded w-1/4"></div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <div className="h-20 w-20 bg-gray-300 rounded-full mb-4"></div>
            <div className="h-12 bg-gray-300 rounded w-1/3 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="grid grid-cols-3 gap-4 w-full">
              <div className="h-16 bg-gray-200 rounded"></div>
              <div className="h-16 bg-gray-200 rounded"></div>
              <div className="h-16 bg-gray-200 rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="w-full bg-white/80 backdrop-blur-sm shadow-lg">
        <CardContent className="pt-6">
          <div className="text-center text-gray-500">
            <CloudSun size={64} className="mx-auto mb-4 text-gray-400" />
            <p className="text-lg">No weather data available</p>
            <p className="text-sm">Search for a city to view weather information</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getWeatherIcon = (iconCode: string) => {
    if (iconCode.includes("01") || iconCode.includes("02")) {
      return <Sun size={64} className="text-weather-sunny" />;
    } else if (iconCode.includes("03") || iconCode.includes("04")) {
      return <CloudSun size={64} className="text-weather-cloudy" />;
    } else if (
      iconCode.includes("09") || 
      iconCode.includes("10") || 
      iconCode.includes("11")
    ) {
      return <CloudRain size={64} className="text-weather-rainy" />;
    } else {
      return <CloudSun size={64} className="text-weather-cloudy" />;
    }
  };

  // Format date from unix timestamp
  const formattedDate = new Date(data.dt * 1000).toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
  return (
    <Card className="w-full bg-white/80 backdrop-blur-sm shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl flex items-center gap-2">
              <MapPin size={20} />
              {data.city}, {data.country}
            </CardTitle>
            <p className="text-sm text-gray-500">{formattedDate}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="mb-2">{getWeatherIcon(data.icon)}</div>
          <h2 className="text-4xl font-bold mb-1">{Math.round(data.temperature)}°C</h2>
          <p className="text-lg capitalize mb-4">{data.description}</p>
          
          <Separator className="my-4" />
          
          <div className="grid grid-cols-3 gap-4 w-full">
            <div className="flex flex-col items-center">
              <Thermometer size={20} className="mb-1 text-gray-600" />
              <p className="text-sm text-gray-500">Feels Like</p>
              <p className="font-medium">{Math.round(data.feelsLike)}°C</p>
            </div>
            <div className="flex flex-col items-center">
              <Droplets size={20} className="mb-1 text-blue-500" />
              <p className="text-sm text-gray-500">Humidity</p>
              <p className="font-medium">{data.humidity}%</p>
            </div>
            <div className="flex flex-col items-center">
              <Wind size={20} className="mb-1 text-gray-600" />
              <p className="text-sm text-gray-500">Wind</p>
              <p className="font-medium">{data.windSpeed} m/s</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;
