import { type ReactElement } from "react";
import { AreaType } from "@/types/area";
import { DeviceToggle, DeviceToggleWrapper } from "../DeviceToggle";
import classes from "./Area.module.scss";
import { TemperatureSlider } from "../TemperatureSlider/TemperatureSlider";
import { setTargetTemperature } from "../TemperatureSlider/setTargetTemperature";
import {
  DeviceActionKind,
  useDeviceReducer,
} from "@/context/HomeAssitantContext/useDeviceReducer";

export function Area({
  name,
  temperatureSensor,
  targetTemperature,
  lights,
}: AreaType): ReactElement {
  const { dispatch } = useDeviceReducer();
  return (
    <div className={classes.wrapper}>
      <h3 className={classes.title}>{name}</h3>
      {temperatureSensor && (
        <TemperatureSlider
          temperature={parseFloat(temperatureSensor.state)}
          targetTemperature={parseFloat(targetTemperature?.state || "")}
          setTargetTemperature={(newTemp) =>
            setTargetTemperature(targetTemperature?.id, newTemp)
          }
        />
      )}
      <DeviceToggleWrapper>
        {lights.map((light) => (
          <DeviceToggle
            name={light.name}
            onClick={() =>
              dispatch({
                type: DeviceActionKind.TOGGLE_LIGHT,
                payload: {
                  id: light.id,
                  area: name,
                },
              })
            }
            isPressed={light.state === "on"}
            key={light.id}
          />
        ))}
      </DeviceToggleWrapper>
    </div>
  );
}
