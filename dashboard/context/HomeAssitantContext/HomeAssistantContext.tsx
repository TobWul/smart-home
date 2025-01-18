import { ReactNode, createContext, useEffect, useState } from "react";
import { connect } from "./connect";
import { Entity } from "@/types/entity";
import { HassEntities } from "home-assistant-js-websocket";
import { areasDefinition } from "./areas";
import { AreaType } from "@/types/area";

const HomeAssistantContext = createContext<{ areas: AreaType[] }>({
  areas: [],
});

const HomeAssistantContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [areas, setAreas] = useState<AreaType[]>([]);

  useEffect(() => {
    const updateEntities = (state: HassEntities) => {
      console.log(state, "Something changed");

      const entities: Entity[] = Object.values(state).map((entity) => ({
        id: entity.entity_id,
        state: entity.state,
        name: entity.attributes.friendly_name,
      }));

      setAreas(
        areasDefinition.map((area) => ({
          ...area,
          temperatureSensor: entities.find(
            (entity) => entity.id === area.temperatureSensor,
          ),
          targetTemperature: entities.find(
            (entity) => entity.id === area.targetTemperature,
          ),
          lights: entities.filter((entity) => area.lights.includes(entity.id)),
          heaters: entities.filter((entity) =>
            area.heaters?.includes(entity.id),
          ),
        })),
      );
    };

    connect(updateEntities);

    return () => {};
  }, []);

  return (
    <HomeAssistantContext.Provider value={{ areas }}>
      {children}
    </HomeAssistantContext.Provider>
  );
};

export { HomeAssistantContext, HomeAssistantContextProvider };
