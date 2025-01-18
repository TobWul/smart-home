import { Entity } from "./entity";

export type AreaType = {
  name: string;
  temperatureSensor?: Entity;
  targetTemperature?: Entity;
  heaters: Entity[];
  lights: Entity[];
};
