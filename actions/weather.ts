const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function getWeather(city: string) {
  try {
    console.log('Fetching weather for:', city);
    console.log('Using API key:', API_KEY?.slice(0, 4) + '...');
    
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&APPID=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Weather API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      throw new Error(`Weather data fetch failed: ${response.statusText}`);
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
    throw error;
  }
}