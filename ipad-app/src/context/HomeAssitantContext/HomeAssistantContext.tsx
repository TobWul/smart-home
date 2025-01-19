import { ReactNode, createContext, useEffect } from "react";
import { connect } from "./home-assistant-connect";
import { DeviceActionKind, useDeviceReducer } from "./useDeviceReducer";
import { HassEntities } from "home-assistant-js-websocket";

type ContextProps = {
  devices: HassEntities;
  loading: boolean;
  toggleLight: (id: string) => void;
  setTargetTemperature: (id: string, newTemp: number) => void;
};

const HomeAssistantContext = createContext<ContextProps>({
  devices: {},
  loading: false,
  toggleLight: () => {},
  setTargetTemperature: () => {},
});

const HomeAssistantContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { state, dispatch } = useDeviceReducer();

  // Subscribes to changes to Home Asssistant
  useEffect(() => {
    const loadDevices = async () => {
      dispatch({ type: DeviceActionKind.SET_LOADING, payload: true });
      const accessToken = await connect((state) =>
        dispatch({ type: DeviceActionKind.SET_DEVICES, payload: state }),
      );
      dispatch({
        type: DeviceActionKind.SET_ACCESS_TOKEN,
        payload: accessToken || "undefined",
      });
    };
    loadDevices();

    return () => {};
  }, []);

  const toggleLight: ContextProps["toggleLight"] = (id) => {
    dispatch({ type: DeviceActionKind.TOGGLE_LIGHT, payload: { id } });
  };

  const setTargetTemperature: ContextProps["setTargetTemperature"] = (
    id: string,
    newTemp: number,
  ) => {
    dispatch({
      type: DeviceActionKind.SET_TARGET_TEMPERATURE,
      payload: { id, temperature: newTemp },
    });
  };

  return (
    <HomeAssistantContext.Provider
      value={{ ...state, toggleLight, setTargetTemperature }}
    >
      {children}
    </HomeAssistantContext.Provider>
  );
};

export { HomeAssistantContext, HomeAssistantContextProvider };
