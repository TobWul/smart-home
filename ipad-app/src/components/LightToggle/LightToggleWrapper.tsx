import classes from "./LightToggle.module.scss";

type DeviceToggleWrapperProps = {
  children: React.ReactNode;
};

export const LightToggleWrapper = ({ children }: DeviceToggleWrapperProps) => {
  return <div className={classes.wrapper}>{children}</div>;
};
