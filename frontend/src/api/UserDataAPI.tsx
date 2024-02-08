import { url } from "../utils/url";
import toast from "react-hot-toast";
import { UserData } from "../utils/types";

export const UserDataAPI = async (token: string | null): Promise<UserData> => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include" as RequestCredentials,
    withCredntials: true,
  };

  const response = await fetch(`${url}/user`, requestOptions);
  const data = await response.json();

  if (!response.ok) {
    toast.error("Failed to fetch user data");
    throw new Error("Failed to fetch user data");
  }

  console.log(data);
  console.log(response);

  return data;
};
