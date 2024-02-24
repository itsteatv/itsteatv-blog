import { Link } from "react-router-dom";
import ItsteatvLogo from "./ItsteatvLogo";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Textarea,
} from "@nextui-org/react";
import Skeleton from "./Skeleton";
import { CloudinaryContext, Image } from "cloudinary-react";
import { useImageUpload } from "../hooks/useImageUpload";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { EditorContext } from "../pages/Editor";
import EditorJS from "@editorjs/editorjs";

function BlogEditor() {
  const [imageUrl, setImageUrl] = useState("");
  const { blog, setBlog } = useContext(EditorContext);
  const { title, banner, content, tags, desc } = blog;

  console.log(imageUrl);
  console.log(blog);

  useEffect(() => {
    const editor = new EditorJS({
      holder: "texteditor",
      placeholder: "let's make some awesome content",
    });

    return () => {
      editor.destroy;
    };
  }, []);

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
      setBlog((prevBlog) => ({
        ...prevBlog,
        banner: storedImageUrl,
      }));
    }
  }, [setBlog]);

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

  const handleTitleKeyDown = function (
    event: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const handleTitleChange = function (
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const newTitle = event.target.value;
    setBlog((prevBlog) => ({
      ...prevBlog,
      title: newTitle,
    }));
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
              <p className="hidden sm:flex">
                {title.length ? title : "New Blog"}
              </p>
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
        <section className="flex items-center justify-center">
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
                        className=">=970px:rounded-2xl"
                      />
                    ) : (
                      <img
                        src="https://placehold.co/960x400/EEE/31343C?font=source-sans-pro&text=Blog%20Banner"
                        alt="Blog Banner"
                        className=">=970px:rounded-2xl"
                      />
                    )}
                  </>
                )}
              </label>
            </div>
            {/* END BLOG BANNER */}

            {/* START BLOG TITLE */}
            <div className="flex items-center justify-center my-10 w-full">
              <Textarea
                variant="underlined"
                label="Blog Title"
                labelPlacement="inside"
                placeholder="Enter your blog title"
                className="max-w-[960px] w-full >=990px:mx-4"
                onKeyDown={handleTitleKeyDown}
                onChange={handleTitleChange}
              />
            </div>
            {/* END BLOG TITLE */}

            {/* START TEXT EDITOR */}
            <div
              className="flex flex-col items-start mx-5 >=990px:mx-10"
              id="texteditor"
            ></div>
            {/* END TEXT EDITOR */}
          </div>
        </section>
      </>
    </CloudinaryContext>
  );
}

export default BlogEditor;
