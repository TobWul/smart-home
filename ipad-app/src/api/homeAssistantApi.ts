export const homeAssistantApi = async (
  endpoint: string,
  body: object,
  acessToken: string,
) => {
  await fetch(`http://homeassistant.local:8123/api/${endpoint}`, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
      Authorization: `Bearer ${acessToken}`,
    },
    body: JSON.stringify(body),
  });
};
