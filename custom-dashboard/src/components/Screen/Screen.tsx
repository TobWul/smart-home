import classes from './Screen.module.scss';
import { Clock } from '../Clock';
import { WeatherWidget } from '../WeatherWidget';

export function Screen() {
  return (
    <div className={classes.screen}>
      <Clock />
      <WeatherWidget />
    </div>
  );
}
