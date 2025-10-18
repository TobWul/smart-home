import { EntityName, useEntity } from '@hakit/core';
import classes from './Toggle.module.scss';
import { clsx } from 'clsx';
import { useMemo } from 'react';

type DeviceToggleProps = {
  id: string;
  type: 'light' | 'switch';
  name?: string;
};

export const Toggle = ({ name, id, type }: DeviceToggleProps) => {
  const entity = useEntity(id as EntityName);

  const isPressed = useMemo(() => entity.state === 'on', [entity]);
  const icon = useMemo(() => (isPressed ? `${type}-on` : `${type}-off`), [isPressed]);

  const toggle = () => {
    // @ts-ignore
    entity.service.toggle();
  };

  return (
    <button className={clsx(classes.button, isPressed && classes.pressed)} onClick={toggle} title={name}>
      <img src={`device-icons/${icon}.svg`} alt='' />
    </button>
  );
};
