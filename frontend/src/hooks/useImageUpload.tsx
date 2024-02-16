import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ImageUploadAPI } from "../api/ImageUploadAPI";

export function useImageUpload() {
  const { isPending, mutate: uploadImage } = useMutation({
    mutationFn: (FormData: FormData) => ImageUploadAPI(FormData),

    onSuccess: (data) => {
      console.log(data);
      if (data) {
        toast.success("Image Uploaded Successfully!");
      } else {
        toast.success("Image Uploaded Unsuccessfully!");
      }
    },

    onError: (data) => {
      console.log(data);
      toast.error(data.message);
    },
  });

  return { isPending, uploadImage };
}
