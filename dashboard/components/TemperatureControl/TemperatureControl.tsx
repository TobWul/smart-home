import { type ReactElement, type ReactNode } from "react";
import classes from "./TemperatureControl.module.scss";

export interface TemperatureControlProps {
  min?: number;
  max?: number;
  temperature: number;
  targetTemperature: number;
  setTargetTemperature?: (desiredTemperature: number) => void;
}

export function TemperatureControl({
  min = 15,
  max = 24,
  temperature,
  targetTemperature,
  setTargetTemperature,
}: TemperatureControlProps): ReactElement {
  const temperatureRange = [...new Array(max + 1 - min).keys()].map(
    (index) => min + index,
  );

  console.log(targetTemperature);

  return (
    <div className={classes.wrapper}>
      <div className={classes.inputWrapper}>
        {setTargetTemperature && (
          <input
            type="range"
            onChange={(e) => setTargetTemperature(parseFloat(e.target.value))}
            value={targetTemperature}
            className={classes.rangeInput}
            min={min}
            max={max}
            step={0.1}
          />
        )}
        <div
          className={classes.currentTemperature}
          style={{
            left:
              // f(18) = 0;
              // f(25) = 1;
              // f(22) = (22 - 18) / (25 - 18)
              `${
                ((temperature - temperatureRange[0]) /
                  (temperatureRange[temperatureRange.length - 1] -
                    temperatureRange[0])) *
                100
              }%`,
          }}
        />

        <div className={classes.numbers}>
          {temperatureRange.map((tempLabel) => (
            <span key={tempLabel}>{tempLabel}</span>
          ))}
        </div>
        <div className={classes.markingWrapper}>
          {[...new Array((temperatureRange.length - 1) * 5 + 1).keys()].map(
            (_, i) => (
              <span
                key={i}
                className={[
                  classes.marking,
                  i % 5 === 0 && classes.mainMarking,
                ].join(" ")}
              ></span>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
