export const toggleLight = async (entityId: string) => {
  await fetch(`http://homeassistant.local:8123/api/services/light/toggle`, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_HOME_ASSISTANT_TOKEN}`,
    },
    body: JSON.stringify({
      entity_id: entityId,
    }),
  });
};
