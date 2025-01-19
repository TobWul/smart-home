import classes from "./LightToggle.module.scss";
import { clsx } from "clsx";
import { useMemo } from "react";

type DeviceToggleProps = {
  name: string;
  onClick: () => void;
  isPressed: boolean;
};

export const LightToggle = ({
  name,
  onClick,
  isPressed,
}: DeviceToggleProps) => {
  const icon = useMemo(() => {
    if (isPressed) {
      return "light-on";
    }
    return "light-off";
  }, [isPressed]);

  return (
    <button
      className={clsx(classes.button, isPressed && classes.pressed)}
      onClick={onClick}
      title={name}
    >
      <img src={`/device-icons/${icon}.svg`} alt="" />
    </button>
  );
};
