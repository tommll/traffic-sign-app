
export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
  dt: number;
}

export interface ForecastDay {
  dt: number;
  temp: {
    min: number;
    max: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

export interface ForecastData {
  city: string;
  country: string;
  list: ForecastDay[];
}

export async function fetchWeather(city: string, apiKey: string): Promise<WeatherData> {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      city: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      dt: data.dt,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}

export async function fetchForecast(city: string, apiKey: string): Promise<ForecastDay[]> {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error(`Forecast API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Process the 5-day forecast (every 24 hours)
    const dailyData: { [key: string]: ForecastDay } = {};
    
    data.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000).toISOString().split('T')[0];
      
      if (!dailyData[date]) {
        dailyData[date] = {
          dt: item.dt,
          temp: {
            min: item.main.temp_min,
            max: item.main.temp_max,
          },
          weather: [{
            description: item.weather[0].description,
            icon: item.weather[0].icon,
          }],
        };
      } else {
        // Update min/max temperatures if needed
        if (item.main.temp_min < dailyData[date].temp.min) {
          dailyData[date].temp.min = item.main.temp_min;
        }
        if (item.main.temp_max > dailyData[date].temp.max) {
          dailyData[date].temp.max = item.main.temp_max;
        }
      }
    });
    
    // Convert to array and take only the next 5 days
    return Object.values(dailyData).slice(0, 5);
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    throw error;
  }
}
