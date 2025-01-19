"use client";
import React from "react";
import styles from "./home.module.scss";
import { Screen } from "@/ui/Screen";
import { DeviceController } from "@/ui/DeviceController";
import { HomeAssistantContextProvider } from "@/context/HomeAssitantContext";

export default function Home() {
  return (
    <div className={styles.page}>
      <Screen />
      <HomeAssistantContextProvider>
        <DeviceController />
      </HomeAssistantContextProvider>
    </div>
  );
}
