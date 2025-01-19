import { HassEntities } from "home-assistant-js-websocket";
import { useReducer } from "react";
import { homeAssistantApi } from "../../api/homeAssistantApi.ts";

// An enum with all the types of actions to use in our reducer
export enum DeviceActionKind {
  SET_TARGET_TEMPERATURE = "SET_TARGET_TEMPERATURE",
  TOGGLE_LIGHT = "TOGGLE_LIGHT",
  SET_DEVICES = "SET_DEVICES",
  SET_LOADING = "SET_LOADING",
  SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN",
}

// An interface for our actions
type DeviceAction =
  | {
      type: DeviceActionKind.SET_TARGET_TEMPERATURE;
      payload: {
        id: string;
        temperature: number;
      };
    }
  | {
      type: DeviceActionKind.TOGGLE_LIGHT;
      payload: {
        id: string;
      };
    }
  | {
      type: DeviceActionKind.SET_LOADING;
      payload: boolean;
    }
  | {
      type: DeviceActionKind.SET_ACCESS_TOKEN;
      payload: string;
    }
  | {
      type: DeviceActionKind.SET_DEVICES;
      payload: HassEntities;
    };

// An interface for our state
type DeviceState = {
  devices: HassEntities;
  loading: boolean;
  accessToken: string;
};

export const useDeviceReducer = () => {
  const initialState: DeviceState = {
    devices: {},
    loading: false,
    accessToken: "undefined",
  };

  const reducer = (state: DeviceState, action: DeviceAction): DeviceState => {
    switch (action.type) {
      case DeviceActionKind.TOGGLE_LIGHT: {
        homeAssistantApi(
          "services/light/toggle",
          {
            entity_id: action.payload.id,
          },
          state.accessToken,
        );
        return {
          ...state,
        };
      }
      case DeviceActionKind.SET_LOADING: {
        return {
          ...state,
          loading: true,
        };
      }
      case DeviceActionKind.SET_ACCESS_TOKEN: {
        return {
          ...state,
          accessToken: action.payload,
        };
      }
      case DeviceActionKind.SET_TARGET_TEMPERATURE: {
        homeAssistantApi(
          `states/${action.payload.id}`,
          {
            state: action.payload.temperature,
          },
          state.accessToken,
        );
        return state;
      }
      case DeviceActionKind.SET_DEVICES: {
        return {
          ...state,
          devices: action.payload,
          loading: false,
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
