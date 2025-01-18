import { useState, type ReactElement } from "react";
import { AreaType } from "@/types/area";
import { DeviceToggle, DeviceToggleWrapper } from "../DeviceToggle";
import { toggleLight } from "@/app/light-widget/lib/toggleLight";
import { TemperatureControl } from "../TemperatureControl/TemperatureControl";
import classes from "./Area.module.scss";
import { setTargetTemperature } from "../TemperatureControl/setTargetTemperature";

export function Area({
  name,
  temperatureSensor,
  targetTemperature,
  lights,
  heaters,
}: AreaType): ReactElement {
  const [temp, setTemp] = useState(19);
  return (
    <div className={classes.wrapper}>
      <h3 className={classes.title}>{name}</h3>
      {temperatureSensor && (
        <TemperatureControl
          temperature={parseFloat(temperatureSensor.state)}
          targetTemperature={parseFloat(targetTemperature?.state)}
          setTargetTemperature={(newTemp) =>
            setTargetTemperature(targetTemperature.id, newTemp)
          }
        />
      )}
      <DeviceToggleWrapper>
        {lights.map((light) => (
          <DeviceToggle
            name={light.name}
            onClick={() => toggleLight(light.id)}
            isPressed={light.state === "on"}
            key={light.id}
          />
        ))}
      </DeviceToggleWrapper>
    </div>
  );
}
