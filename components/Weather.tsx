'use client';

import Image from 'next/image';

type WeatherProps = {
  error?: string;
  location?: string;
  country?: string;
  temperature?: number;
  feels_like?: number;
  humidity?: number;
  weather?: string;
  description?: string;
  icon?: string;
  wind?: {
    speed: number;
    deg: number;
  };
};

export const Weather = ({ error, ...props }: WeatherProps) => {
  if (error) {
    return (
      <div className="rounded-lg bg-destructive/10 border border-destructive p-4 my-4">
        <p className="text-destructive font-medium">❌ {error}</p>
      </div>
    );
  }

  if (!props.location) {
    return null;
  }

  const { 
    location, 
    country, 
    temperature, 
    feels_like, 
    humidity, 
    weather, 
    description, 
    icon,
    wind 
  } = props;

  return (
    <div className="rounded-lg bg-card border border-border p-4 my-4">
      <h2 className="text-lg font-semibold mb-2 text-foreground">Current Weather for {location}, {country}</h2>
      <div className="flex items-center gap-4">
        <Image width={64} height={64} src={icon || ''} alt={weather || ''} className="w-16 h-16" />
        <div>
          <div className="text-3xl text-foreground">{temperature}°C</div>
          <div className="text-muted-foreground">Feels like {feels_like}°C</div>
        </div>
        <div className="flex flex-col ml-auto">
          <div className="text-foreground">{weather}</div>
          <div className="text-sm text-muted-foreground capitalize">{description}</div>
          <div className="text-sm text-muted-foreground">Humidity: {humidity}%</div>
          <div className="text-sm text-muted-foreground">Wind: {wind?.speed} m/s</div>
        </div>
      </div>
    </div>
  );
}; 