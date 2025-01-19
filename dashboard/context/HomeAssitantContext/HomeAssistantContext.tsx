import { ReactNode, createContext, useEffect, useState } from "react";
import { connect } from "./connect";
import { AreaType } from "@/types/area";
import { DeviceActionKind, useDeviceReducer } from "./useDeviceReducer";

const HomeAssistantContext = createContext<{ areas: AreaType[] }>({
  areas: [],
});

const HomeAssistantContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { state, dispatch } = useDeviceReducer();

  // Create a more robust state and integrate useSWR to handle the data part of it. When pressing light, then update the reducer with something, then have the same updateEntities function to call the same reducer.

  useEffect(() => {
    connect((state) =>
      dispatch({ type: DeviceActionKind.SET_DEVICES, payload: state }),
    );

    return () => {};
  }, []);

  return (
    <HomeAssistantContext.Provider value={{ areas: state.areas }}>
      {children}
    </HomeAssistantContext.Provider>
  );
};

export { HomeAssistantContext, HomeAssistantContextProvider };
