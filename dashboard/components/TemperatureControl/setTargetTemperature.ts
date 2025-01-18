export const setTargetTemperature = async (
  entityId: number,
  targetTemperature: number,
) => {
  fetch(`api/home-assistant/heat/set-target-temperature`, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({ entityId, targetTemperature }),
  });
};
