import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { UserDataAPI } from "../api/UserDataAPI";

export function useUserData() {
  const [cookies] = useCookies(["access_token"]);
  const token = cookies.access_token;

  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => UserDataAPI(token),
  });

  return { isLoading, user };
}
