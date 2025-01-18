import { DeviceToggle } from "@/components/DeviceToggle/DeviceToggle";
import { DeviceToggleWrapper } from "@/components/DeviceToggle/DeviceToggleWrapper";
import { toggleLight } from "./lib/toggleLight";
import { useContext } from "react";
import { HomeAssistantContext } from "@/context/HomeAssitantContext";
import { Entity } from "@/types/entity";

export const Lights = ({ lights }: { lights: Entity[] }) => {
  return (
    <div>
      <DeviceToggleWrapper>
        {entities &&
          entities
            .filter(({ id }) => id.startsWith("light"))
            .map((entity) => (
              <DeviceToggle
                key={entity.id}
                onClick={() => toggleLight(entity.id)}
                isPressed={entity.state === "on"}
                name={entity.name}
              />
            ))}
      </DeviceToggleWrapper>
    </div>
  );
};
