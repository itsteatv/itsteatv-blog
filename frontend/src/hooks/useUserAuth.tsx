import { useMutation } from "@tanstack/react-query";
import { UserAuthAPI } from "../api/UserAuthAPI";
import { UserAuthAPIData } from "../utils/types";
import toast from "react-hot-toast";

export function useUserAuth() {
  const { isPending, mutate: userAuth } = useMutation({
    mutationFn: (payload: UserAuthAPIData) => UserAuthAPI(payload),

    onSuccess: (data) => {
      console.log(data);
      if (data && data.signup) {
        // It's a sign-up response
        toast.success("Successfully signed up!");
      } else {
        // It's a sign-in response
        toast.success("Successfully signed in!");
      }
    },

    onError: (data) => {
      console.log(data);
      toast.error(data.message);
    },
  });

  return { isPending, userAuth };
}
