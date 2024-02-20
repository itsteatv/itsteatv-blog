import { Link } from "react-router-dom";
import ItsteatvLogo from "./ItsteatvLogo";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import Skeleton from "./Skeleton";
import { CloudinaryContext, Image } from "cloudinary-react";
import { useImageUpload } from "../hooks/useImageUpload";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function BlogEditor() {
  const [imageUrl, setImageUrl] = useState("");
  console.log(imageUrl);

  const handleImageUpload = (uploadedImageUrl: string) => {
    setImageUrl(uploadedImageUrl);
    toast.dismiss();
  };

  const { isPending, uploadImage } = useImageUpload({
    onImageUploaded: handleImageUpload,
  });

  useEffect(() => {
    const storedImageUrl = localStorage.getItem("imageUrl");
    if (storedImageUrl) {
      setImageUrl(storedImageUrl);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("imageUrl", imageUrl);
  }, [imageUrl]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);

    const uploadPromise = uploadImage(formData);
    toast.loading("Uploading image...");

    try {
      await uploadPromise;
    } catch (error) {
      toast.error("Failed to upload image");
    }
  };

  return (
    <CloudinaryContext cloudName={import.meta.env.VITE_CLOUD_NAME}>
      {" "}
      <>
        <div className="flex items-center font-SometypeMono">
          {/* START HEADER */}
          <Navbar>
            <NavbarBrand>
              <Link to="..">
                <ItsteatvLogo />
              </Link>
              <p className="hidden sm:flex">New Blog</p>
            </NavbarBrand>
            <NavbarContent justify="end">
              <NavbarItem className="flex gap-2">
                <Button
                  color="success"
                  variant="solid"
                  radius="full"
                  className="text-white"
                >
                  Publish
                </Button>
                <Button color="default" variant="light" radius="full">
                  Save Draft
                </Button>
              </NavbarItem>
            </NavbarContent>
          </Navbar>
          {/* END HEADER */}
        </div>
        <section>
          {/* START EDITOR */}
          <div className=">=960px:overflow-hidden">
            {/* START BLOG BANNER */}
            <div className="flex items-center justify-center my-10 w-full">
              {/* Use label and input for file upload */}
              <label htmlFor="file-upload">
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                {isPending ? (
                  <Skeleton />
                ) : (
                  <>
                    {imageUrl ? (
                      <Image
                        publicId={imageUrl}
                        width="960"
                        className=">=950px:rounded-2xl"
                      />
                    ) : (
                      <img
                        src="https://placehold.co/960x400/EEE/31343C?font=source-sans-pro&text=Blog%20Banner"
                        alt="Blog Banner"
                        className="lg:rounded-2xl"
                      />
                    )}
                  </>
                )}
              </label>
            </div>
            {/* END BLOG BANNER */}
          </div>
        </section>
      </>
    </CloudinaryContext>
  );
}

export default BlogEditor;
