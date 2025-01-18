import { ReactElement } from "react";
import classes from "./WeatherWidget.module.scss";
import { WeatherData } from "@/types/weather";
import Image from "next/image";

export function WeatherWidget({
  weather,
}: {
  weather: WeatherData[];
}): ReactElement {
  return (
    <div className={classes.wrapper}>
      {weather.map((hourlyForecast) => (
        <div className={classes.forecast} key={hourlyForecast.time}>
          <Image
            src={`/weather-icons/${hourlyForecast.weatherIcon}.svg`}
            width={32}
            height={32}
            alt={hourlyForecast.weatherIcon}
            className={classes.weatherIcon}
          />
          <p>{Math.round(hourlyForecast.temperature)} °C</p>
          <p className={classes.date}>
            {new Date(hourlyForecast.time).toLocaleDateString("no-nb", {
              weekday: "short",
            })}
          </p>
        </div>
      ))}
    </div>
  );
}
