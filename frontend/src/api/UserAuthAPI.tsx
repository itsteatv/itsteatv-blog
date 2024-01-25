import { url } from "../utils/url";
import { UserAuthAPIData } from "../utils/types";

export const UserAuthAPI = async (
  payload: UserAuthAPIData
): Promise<UserAuthAPIData> => {
  console.log(payload);
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(
    `${url}/${payload.type === "sign-up" ? "signup" : "signin"}`,
    requestOptions
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  console.log(response);
  console.log(data);

  return data;
};
