import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { UserDataAPI } from "../api/UserDataAPI";

export function useUserData() {
  const token = Cookies.get("access_token");
  console.log(token);

  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => UserDataAPI(token),
  });

  return { isLoading, user };
}
