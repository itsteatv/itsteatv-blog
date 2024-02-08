import { useQuery } from "@tanstack/react-query";
import { UserDataAPI } from "../api/UserDataAPI";

export function useUserData() {
  const token = localStorage.getItem("access_token");
  console.log(token);

  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => UserDataAPI(token),
  });

  return { isLoading, user };
}
