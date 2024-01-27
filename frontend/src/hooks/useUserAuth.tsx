import { useMutation } from "@tanstack/react-query";
import { UserAuthAPI } from "../api/UserAuthAPI";
import { UserAuthAPIData } from "../utils/types";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export function useUserAuth() {
  const { isPending, mutate: userAuth } = useMutation({
    mutationFn: (payload: UserAuthAPIData) => UserAuthAPI(payload),

    onSuccess: (data) => {
      console.log(data);
      if (data && data.signup) {
        toast.success("Successfully signed up!");
      } else {
        toast.success("Successfully signed in!");

        const access_token = data.access_token;
        Cookies.set("access_token", access_token);
      }
    },

    onError: (data) => {
      console.log(data);
      toast.error(data.message);
    },
  });

  return { isPending, userAuth };
}
