import { RawWeatherData, WeatherData } from "@/types/weather";

const filterNext6Days = (observation: RawWeatherData): boolean => {
  const targetTime = "T06:00";
  return observation.time.includes(targetTime);
};

export const getWeather = async () => {
  const options = {
    position: {
      lat: 60.396452,
      lon: 5.313159,
    },
    forecastWindow: "next_12_hours",
    days: 7,
  };
  const result = await fetch(
    `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${options.position.lat}&lon=${options.position.lon}`,
    {
      method: "GET",
    },
  );

  const response: {
    type: "Feature";
    properties: { timeseries: RawWeatherData[] };
  } = await result.json();

  const weatherData = response.properties.timeseries
    .filter(filterNext6Days)
    .slice(0, options.days)
    .map(
      (observation): WeatherData => ({
        time: observation.time,
        precipitation_amount:
          observation.data[options.forecastWindow]?.next_6_hours?.details
            .precipitation_amount,
        temperature: observation.data.instant.details.air_temperature,
        weatherIcon:
          observation.data[options.forecastWindow]?.summary.symbol_code,
      }),
    );

  console.log(weatherData);

  return weatherData;
};
