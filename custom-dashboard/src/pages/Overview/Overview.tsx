import { useAreas } from '@hakit/core';
import { Area } from '../../components/Area/Area';

export const Overview = () => {
  const areas = useAreas();

  return (
    <div>
      {areas.map(area => (
        <Area area={area} />
      ))}
    </div>
  );
};
