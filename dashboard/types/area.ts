import { Device } from "./device";

export type AreaType = {
  name: string;
  temperatureSensor?: Device;
  targetTemperature?: Device;
  heaters: Device[];
  lights: Device[];
};
