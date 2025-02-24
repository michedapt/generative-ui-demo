const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function getWeather(city: string, country?: string) {
  try {
    const query = country ? `${city},${country}` : city;
    console.log('Fetching weather for:', query);
    console.log('Using API key:', API_KEY?.slice(0, 4) + '...');
    
    const response = await fetch(
      `${BASE_URL}/weather?q=${query}&APPID=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Weather API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      
      if (response.status === 404) {
        return {
          error: country 
            ? `Could not find weather data for "${city}, ${country}". Please check the city and country names.`
            : `Could not find weather data for "${city}". Try adding a country code (e.g., "US" or "UK").`
        };
      }
      
      return {
        error: `Weather data fetch failed: ${errorData.message || response.statusText}`
      };
    }

    const data = await response.json();
    console.log('Weather data received:', data);
    
    return {
      location: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      feels_like: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      weather: data.weather[0].main,
      description: data.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      wind: {
        speed: data.wind.speed,
        deg: data.wind.deg
      },
      clouds: data.clouds.all,
      visibility: data.visibility
    };
  } catch (error) {
    console.error('Error in getWeather:', error);
    return {
      error: 'An unexpected error occurred while fetching weather data.'
    };
  }
}