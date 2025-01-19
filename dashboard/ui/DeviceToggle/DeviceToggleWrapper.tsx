import classes from "./DeviceToggle.module.scss";

type DeviceToggleWrapperProps = {
  children: React.ReactNode;
};

export const DeviceToggleWrapper = ({ children }: DeviceToggleWrapperProps) => {
  return <div className={classes.wrapper}>{children}</div>;
};
