import { ReactElement } from "react";
import classes from "./WeatherWidget.module.scss";
import { WeatherData } from "../../types/weather";

export function WeatherWidget({
  weather,
}: {
  weather: WeatherData[];
}): ReactElement {
  return (
    <div className={classes.wrapper}>
      {weather.map((hourlyForecast) => (
        <div className={classes.forecast} key={hourlyForecast.time}>
          <img
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
