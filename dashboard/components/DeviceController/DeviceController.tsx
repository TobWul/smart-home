"use client";
import { HomeAssistantContextProvider } from "@/context/HomeAssitantContext";
import { type ReactElement, type ReactNode } from "react";
import { AreaList } from "../Area/AreaList";

export function DeviceController(): ReactElement {
  return (
    <HomeAssistantContextProvider>
      <AreaList />
    </HomeAssistantContextProvider>
  );
}
