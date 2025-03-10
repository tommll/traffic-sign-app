
import { useEffect, useState } from "react";

interface WeatherBackgroundProps {
  weatherCondition?: string; // Expecting the icon code from OpenWeatherMap
  children: React.ReactNode;
}

const WeatherBackground = ({ weatherCondition, children }: WeatherBackgroundProps) => {
  const [gradient, setGradient] = useState<string>(
    "bg-gradient-to-b from-blue-400 to-blue-100"
  );

  useEffect(() => {
    if (!weatherCondition) {
      // Default gradient for no weather data
      setGradient("bg-gradient-to-b from-blue-400 to-blue-100");
      return;
    }

    // Set gradient based on weather condition
    if (weatherCondition.includes("01") || weatherCondition.includes("02")) {
      // Clear or mostly clear sky
      setGradient("bg-gradient-to-b from-sky-400 to-blue-100");
    } else if (weatherCondition.includes("03") || weatherCondition.includes("04")) {
      // Cloudy
      setGradient("bg-gradient-to-b from-gray-400 to-gray-100");
    } else if (
      weatherCondition.includes("09") || 
      weatherCondition.includes("10") || 
      weatherCondition.includes("11")
    ) {
      // Rain or thunderstorm
      setGradient("bg-gradient-to-b from-gray-700 to-blue-300");
    } else if (weatherCondition.includes("13")) {
      // Snow
      setGradient("bg-gradient-to-b from-gray-200 to-white");
    } else if (weatherCondition.includes("50")) {
      // Mist/Fog
      setGradient("bg-gradient-to-b from-gray-300 to-gray-100");
    } else {
      // Default
      setGradient("bg-gradient-to-b from-blue-400 to-blue-100");
    }
  }, [weatherCondition]);

  return (
    <div className={`min-h-screen ${gradient} transition-colors duration-1000`}>
      {children}
    </div>
  );
};

export default WeatherBackground;
