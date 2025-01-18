export const POST = async (req: Request) => {
  const { entityId, targetTemperature } = await req.json();
  const response = await fetch(
    `http://homeassistant.local:8123/api/states/${entityId}`,
    {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_HOME_ASSISTANT_TOKEN}`,
      },
      body: JSON.stringify({
        state: targetTemperature,
      }),
    },
  );

  const result = await response.json();
  console.log(result);

  return Response.json("Success");
};
