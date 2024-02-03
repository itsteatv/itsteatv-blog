import { useCookies } from "react-cookie";
import { UserAuthAPIData } from "../utils/types";
import { url } from "../utils/url";
import toast from "react-hot-toast";

export const UserDataAPI = async (token: string): Promise<UserAuthAPIData> => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
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
