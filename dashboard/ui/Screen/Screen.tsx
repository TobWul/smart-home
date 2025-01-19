import { WeatherWidget } from "@/app/weather-widget/WeatherWidget";
import classes from "./Screen.module.scss";
import { getWeather } from "@/app/weather-widget/lib/getWeather";
import { Clock } from "../Clock";

export async function Screen() {
  const weather = await getWeather();

  return (
    <div className={classes.screen}>
      <Clock />
      <WeatherWidget weather={weather} />
    </div>
  );
}
