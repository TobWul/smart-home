import { useContext } from "react";
import { HomeAssistantContext } from "../../context/HomeAssitantContext";
import { TemperatureSlider } from "../TemperatureSlider/TemperatureSlider";
import { LightToggle, LightToggleWrapper } from "../LightToggle";
import classes from "./DeviceController.module.scss";
import { rooms } from "./rooms";

export const DeviceController = () => {
  const { devices, loading, toggleLight, setTargetTemperature } =
    useContext(HomeAssistantContext);
  console.log(
    devices["sensor.stue_sensor_temperature_temperature"]?.state,
    devices["input_number.comfort_temperature"]?.state,
  );

  if (loading) return "loading...";

  if (Object.values(devices).length === 0) return "Error loading devices... ";

  return (
    <div>
      {rooms.map((room) => (
        <div className={classes.room}>
          <h2>{room.name}</h2>
          {room.temperatureSensor && room.targetTemperature && (
            <TemperatureSlider
              temperature={parseFloat(devices[room.temperatureSensor].state)}
              targetTemperature={parseFloat(
                devices[room.targetTemperature].state,
              )}
              setTargetTemperature={(temp) =>
                setTargetTemperature(room.targetTemperature, temp)
              }
            />
          )}
          <LightToggleWrapper>
            {room.lights.map((light) => (
              <LightToggle
                name={light}
                onClick={() => toggleLight(light)}
                isPressed={devices[light]?.state === "on"}
              />
            ))}
          </LightToggleWrapper>
        </div>
      ))}
    </div>
  );
};
