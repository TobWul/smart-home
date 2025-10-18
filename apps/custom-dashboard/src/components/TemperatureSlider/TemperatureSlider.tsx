import { type ReactElement } from 'react';
import classes from './TemperatureSlider.module.scss';
import { EntityName, useEntity, useService } from '@hakit/core';

export interface TemperatureControlProps {
  min?: number;
  max?: number;
  temperatureSensor: EntityName;
  targetTemperatureController: EntityName;
}

export function TemperatureSlider({
  min = 14,
  max = 24,
  temperatureSensor,
  targetTemperatureController,
}: TemperatureControlProps): ReactElement {
  const temperatureSensorEntity = useEntity(temperatureSensor);
  const targetTemperatureEntity = useEntity(targetTemperatureController);
  const inputNumberService = useService('input_number');

  const temperatureRange = [...new Array(max + 1 - min).keys()].map(index => min + index);

  const temperature = parseFloat(temperatureSensorEntity.state);
  const targetTemperature = parseFloat(targetTemperatureEntity.state);

  const setTargetTemperature = (newTemperature: number) => {
    inputNumberService.setValue({ target: targetTemperatureController, serviceData: { value: newTemperature } });
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.inputWrapper}>
        {setTargetTemperature && (
          <input
            type='range'
            onChange={e => setTargetTemperature(parseFloat(e.target.value))}
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
            left: `${((temperature - temperatureRange[0]) / (temperatureRange[temperatureRange.length - 1] - temperatureRange[0])) * 100}%`,
          }}
        />

        <div className={classes.numbers}>
          {temperatureRange.map(tempLabel => (
            <span key={tempLabel}>{tempLabel}</span>
          ))}
        </div>
        <div className={classes.markingWrapper}>
          {[...new Array((temperatureRange.length - 1) * 5 + 1).keys()].map((_, i) => (
            <span key={i} className={[classes.marking, i % 5 === 0 && classes.mainMarking].join(' ')}></span>
          ))}
        </div>
      </div>
    </div>
  );
}
