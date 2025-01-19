import { WeatherWidget } from "../WeatherWidget";
import classes from "./Screen.module.scss";
import { Clock } from "../Clock";
import { useWeatherApi } from "../../api/useWeatherApi";

export function Screen() {
  const { weather } = useWeatherApi();
  return (
    <div className={classes.screen}>
      <Clock />
      <WeatherWidget weather={weather} />
    </div>
  );
}
