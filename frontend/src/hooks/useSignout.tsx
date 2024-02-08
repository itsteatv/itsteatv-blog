import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: signout, isPending } = useMutation({
    mutationFn: async () => {
      localStorage.removeItem("access_token");
    },
    onSuccess: () => {
      queryClient.removeQueries();
      toast.success("You've been signed out successfully"),
        navigate("/signin", { replace: true });
    },

    onError: (error) => {
      console.error(error);
      toast.error("signout failed");
    },
  });

  return { signout, isPending };
}
