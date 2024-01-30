import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { UserAuthAPI } from "../api/UserAuthAPI";
import { UserAuthAPIData } from "../utils/types";
// import Cookies from "js-cookie";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export function useUserAuth() {
  const [cookies, setCookies] = useCookies(["access_token"]);

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
        setCookies("access_token", access_token, {
          path: "/",
          maxAge: 15 * 24 * 60 * 60 * 1000,
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
