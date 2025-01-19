import useSWR from "swr";
import { fetcher } from "./fetcher";
import { RawWeatherData, WeatherData } from "../types/weather";
import { useMemo } from "react";

type Result = {
  type: "Feature";
  properties: { timeseries: RawWeatherData[] };
};

const filterNext6Days = (observation: RawWeatherData): boolean => {
  const targetTime = "T12:00";
  return observation.time.includes(targetTime);
};

export const useWeatherApi = (): {
  weather: WeatherData[];
  error: object;
  isLoading: boolean;
} => {
  const options = {
    position: {
      lat: 60.396452,
      lon: 5.313159,
    },
    days: 7,
  };

  const { data, error, isLoading } = useSWR<Result>(
    `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${options.position.lat}&lon=${options.position.lon}`,
    fetcher,
  );

  const weatherData = useMemo(() => {
    if (isLoading || !data) return [];
    return data.properties.timeseries
      .filter(filterNext6Days)
      .slice(0, options.days)
      .map((observation): WeatherData => {
        return {
          time: observation.time,
          precipitation_amount:
            observation.data.next_6_hours?.details.precipitation_amount,
          temperature: observation.data.instant.details.air_temperature,
          weatherIcon: observation.data.next_12_hours.summary.symbol_code,
        };
      });
  }, [data]);

  return { weather: weatherData, error, isLoading };
};
