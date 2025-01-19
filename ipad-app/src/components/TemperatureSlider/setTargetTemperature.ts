export const setTargetTemperature = async (
  entityId?: string,
  targetTemperature?: number,
) => {
  if (!entityId) return;

  fetch(`api/home-assistant/heat/set-target-temperature`, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({ entityId, targetTemperature }),
  });
};
