import { HomeAssistantContext } from "@/context/HomeAssitantContext";
import { useContext, type ReactElement, type ReactNode } from "react";
import { Area } from "./Area";

export function AreaList(): ReactElement {
  const { areas } = useContext(HomeAssistantContext);
  return (
    <div>
      {areas.map((area) => (
        <Area {...area} key={area.name} />
      ))}
    </div>
  );
}
