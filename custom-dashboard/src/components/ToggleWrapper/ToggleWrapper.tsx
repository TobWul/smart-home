import classes from './ToggleWrapper.module.scss';

type DeviceToggleWrapperProps = {
  children: React.ReactNode;
};

export const ToggleWrapper = ({ children }: DeviceToggleWrapperProps) => {
  return <div className={classes.wrapper}>{children}</div>;
};
