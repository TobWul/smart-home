import { HOME_ASSISTANT_URL } from "@/app/api/home-assistant/utils";

export const getLightStatus = async () => {
  const result = await fetch("http://localhost:3000/api/home-assistant/light");

  const response = await result.json();
  return response;
};
