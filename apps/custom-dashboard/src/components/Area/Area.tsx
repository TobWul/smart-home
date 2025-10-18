import { useMemo } from 'react';
import classes from './Area.module.scss';
import { Area as AreaType, EntityName } from '@hakit/core';
import { TemperatureSlider } from '../TemperatureSlider/TemperatureSlider';
import { ToggleWrapper } from '../ToggleWrapper';
import { Toggle } from '../Toggle';

export const Area = ({ area }: { area: AreaType }) => {
  const temperatureSensor = useMemo(() => {
    return area.entities.find(entity => {
      if (entity.attributes.device_class === 'temperature') return true;
      return false;
    });
  }, [area]);

  const desiredTemperatureHelper = useMemo(() => {
    return area.entities.find(entity => entity.entity_id.includes('input_number'));
  }, [area]);

  const lights = useMemo(() => {
    return area.entities.filter(entity => 'color_temp' in entity.attributes);
  }, [area]);

  const switches = useMemo(() => {
    return area.entities.filter(entity => {
      return entity.entity_id.startsWith('switch') && 'state' in entity && !entity.entity_id.includes('automation');
    });
  }, [area]);

  return (
    <div className={classes.area} key={area.area_id}>
      <h2>{area.name}</h2>
      {temperatureSensor && desiredTemperatureHelper && (
        <TemperatureSlider
          temperatureSensor={temperatureSensor.entity_id as EntityName}
          targetTemperatureController={desiredTemperatureHelper.entity_id as EntityName}
        />
      )}
      <div className={classes.buttons}>
        {lights && (
          <ToggleWrapper>
            {lights.map(light => (
              <Toggle type='light' name={light.attributes.friendly_name} key={light.entity_id} id={light.entity_id} />
            ))}
          </ToggleWrapper>
        )}
        {switches.length > 0 && (
          <ToggleWrapper>
            {switches.map(entity => (
              <Toggle type='switch' name={entity.attributes.friendly_name} key={entity.entity_id} id={entity.entity_id} />
            ))}
          </ToggleWrapper>
        )}
      </div>
    </div>
  );
};
