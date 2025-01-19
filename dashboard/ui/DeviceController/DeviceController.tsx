"use client";
import { HomeAssistantContext } from "@/context/HomeAssitantContext";
import { useContext, type ReactElement, type ReactNode } from "react";
import { Area } from "../Area/Area";

export function DeviceController(): ReactElement {
  const { areas } = useContext(HomeAssistantContext);

  return (
    <div>
      {areas.map((area) => (
        <Area {...area} key={area.name} />
      ))}
    </div>
  );
}
