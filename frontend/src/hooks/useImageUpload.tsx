import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ImageUploadAPI } from "../api/ImageUploadAPI";
import { UseImageUploadOptions } from "../utils/types";

export function useImageUpload({ onImageUploaded }: UseImageUploadOptions) {
  const { isPending, mutate: uploadImage } = useMutation({
    mutationFn: (FormData: FormData) => ImageUploadAPI(FormData),

    onSuccess: (data) => {
      console.log(data);
      if (data) {
        toast.success("Image Uploaded Successfully!");
        onImageUploaded(data.secure_url);
      } else {
        toast.success("Image Uploaded Unsuccessfully!");
      }
    },

    onError: (data) => {
      console.log(data);
      toast.error(data.message);
      toast.dismiss();
    },
  });

  return { isPending, uploadImage };
}
