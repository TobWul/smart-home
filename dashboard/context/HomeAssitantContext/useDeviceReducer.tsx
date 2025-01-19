import { Device } from "@/types/device";
import { HassEntities } from "home-assistant-js-websocket";
import { useReducer } from "react";
import { areasDefinition } from "./areas";
import { toggleLight } from "@/app/light-widget/lib/toggleLight";

// An enum with all the types of actions to use in our reducer
export enum DeviceActionKind {
  SET_TARGET_TEMPERATURE = "SET_TARGET_TEMPERATURE",
  TOGGLE_LIGHT = "TOGGLE_LIGHT",
  SET_DEVICES = "SET_DEVICES",
}

// An interface for our actions
type DeviceAction =
  | {
      type: DeviceActionKind.SET_TARGET_TEMPERATURE;
      payload: {
        id: string;
        area: string;
        temperature: number;
      };
    }
  | {
      type: DeviceActionKind.TOGGLE_LIGHT;
      payload: {
        id: string;
        area: string;
      };
    }
  | {
      type: DeviceActionKind.SET_DEVICES;
      payload: HassEntities;
    };

// An interface for our state
type DeviceState = {
  areas: Device[];
};

export const useDeviceReducer = () => {
  const initialState: DeviceState = {
    areas: [],
  };

  const reducer = (state: DeviceState, action: DeviceAction) => {
    switch (action.type) {
      case DeviceActionKind.TOGGLE_LIGHT: {
        toggleLight(action.payload.id);
        const areaWithUpdatedLight = state.areas;
        return {
          ...state,
        };
      }
      case DeviceActionKind.SET_DEVICES: {
        console.log("Set devices");

        const entities: Device[] = Object.values(action.payload).map(
          (entity) => ({
            id: entity.entity_id,
            state: entity.state,
            name: entity.attributes.friendly_name || "undefined",
          }),
        );

        return {
          ...state,
          areas: areasDefinition.map((area) => ({
            ...area,
            temperatureSensor: entities.find(
              (entity) => entity.id === area.temperatureSensor,
            ),
            targetTemperature: entities.find(
              (entity) => entity.id === area.targetTemperature,
            ),
            lights: entities.filter((entity) =>
              area.lights.includes(entity.id),
            ),
          })),
        };
      }
      default: {
        return state;
      }
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return { state, dispatch };
};
