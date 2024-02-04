import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { UserAuthAPI } from "../api/UserAuthAPI";
import { UserAuthAPIData } from "../utils/types";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export function useUserAuth() {
  const navigate = useNavigate();

  const { isPending, mutate: userAuth } = useMutation({
    mutationFn: (payload: UserAuthAPIData) => UserAuthAPI(payload),

    onSuccess: (data) => {
      console.log(data);
      if (data && data.signup) {
        toast.success("Successfully signed up!");
      } else {
        toast.success("Successfully signed in!");

        const access_token = data.access_token;
        Cookies.set("access_token", access_token, {
          expires: 15,
          secure: true,
        });

        navigate("/home");
      }
    },

    onError: (data) => {
      console.log(data);
      toast.error(data.message);
    },
  });

  return { isPending, userAuth };
}
