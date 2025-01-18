import React from "react";
import styles from "./home.module.scss";
import { Screen } from "@/components/Screen";
import { DeviceController } from "@/components/DeviceController";

export default async function Home() {
  return (
    <div className={styles.page}>
      <Screen />
      <DeviceController />
    </div>
  );
}
