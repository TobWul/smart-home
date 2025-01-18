export const toggleLight = async (entityId: string) => {
  fetch(`api/home-assistant/light`, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({
      entityId,
    }),
  });
};
