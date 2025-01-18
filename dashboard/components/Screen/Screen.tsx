import { WeatherWidget } from "@/app/weather-widget/WeatherWidget";
import classes from "./Screen.module.scss";
import { getWeather } from "@/app/weather-widget/lib/getWeather";

export async function Screen() {
  const weather = await getWeather();
  return (
    <div className={classes.screen}>
      <div className={classes.today}>
        <h2>
          {new Date().toLocaleDateString("no-nb", {
            day: "2-digit",
            weekday: "long",
            month: "long",
          })}
        </h2>
        <span>
          {new Date().toLocaleTimeString("no-nb", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>

      <WeatherWidget weather={weather} />
    </div>
  );
}
