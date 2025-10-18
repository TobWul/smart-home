export type RawWeatherData = {
  time: string; // ISO 8601 format date string
  data: {
    instant: {
      details: {
        air_pressure_at_sea_level: number; // in hPa
        air_temperature: number; // in degrees Celsius
        cloud_area_fraction: number; // in percentage
        relative_humidity: number; // in percentage
        wind_from_direction: number; // in degrees
        wind_speed: number; // in meters per second
      };
    };
    next_12_hours: {
      summary: {
        symbol_code: string; // e.g., "lightrain"
      };
      details: Record<string, unknown>; // Empty object in the provided example
    };
    next_1_hours: {
      summary: {
        symbol_code: string; // e.g., "rain"
      };
      details: {
        precipitation_amount: number; // in mm
      };
    };
    next_6_hours: {
      summary: {
        symbol_code: string; // e.g., "rain"
      };
      details: {
        precipitation_amount: number; // in mm
      };
    };
  };
};

export type WeatherData = {
  time: string;
  weatherIcon: string;
  temperature: number;
  precipitation_amount: number;
};
