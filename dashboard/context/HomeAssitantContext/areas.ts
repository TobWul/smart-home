import { Entity } from "@/types/entity";

export const areasDefinition = [
  {
    name: "Stue",
    temperatureSensor: "sensor.stue_sensor_temperature_temperature",
    heaters: ["light.skrivebordslampe"],
    targetTemperature: "input_number.comfort_temperature",
    lights: [
      "light.skrivebordslampe",
      "light.hue_flourish_table_1",
      "light.hue_color_lamp_3",
      "light.hue_color_lamp_2",
    ],
  },
  {
    name: "Kjøkken",
    temperatureSensor: undefined,
    targetTemperature: undefined,
    heaters: [],
    lights: [
      "light.kjokken_light_1_light_3",
      "light.kjokken_light_2_light",
      "light.kjokken_light_3_light_2",
    ],
  },
  {
    name: "Gang",
    temperatureSensor: undefined,
    targetTemperature: undefined,
    heaters: [],
    lights: ["light.color_temperature_light_1"],
  },
  {
    name: "Soverom",
    temperatureSensor: "sensor.soverom_sensor_temperature_temperature_2",
    targetTemperature: undefined,
    heaters: undefined,
    lights: ["light.hue_go_2", "light.hue_go_1"],
  },
  {
    name: "Bad",
    temperatureSensor: undefined,
    targetTemperature: undefined,
    heaters: [],
    lights: [
      "light.color_temperature_light_1_4",
      "light.color_temperature_light_1_3",
    ],
  },
];
