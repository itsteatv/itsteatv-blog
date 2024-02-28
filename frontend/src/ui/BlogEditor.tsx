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
import { editorTools } from "../utils/editorTools";
import EditorJS from "@editorjs/editorjs";

function BlogEditor() {
  const [imageUrl, setImageUrl] = useState("");
  const { blog, setBlog, textEditor, setTextEditor, setEditorState } =
    useContext(EditorContext);
  const { title, banner, content, tags, desc } = blog;

  console.log(imageUrl);
  console.log(blog);

  useEffect(() => {
    setTextEditor(
      new EditorJS({
        holder: "texteditor",
        placeholder: "let's make some awesome content",
        tools: editorTools,
      })
    );
  }, [setTextEditor]);

  const handlePublishEvent = function () {
    if (!banner.length) {
      return toast.error("Upload your blog banner!");
    }

    if (!title.length) {
      return toast.error("Blog title should not be empty!");
    }

    if (textEditor.isReady) {
      textEditor
        .save()
        .then((data: { time: number; blocks: any[]; version: string }) => {
          console.log(data);
          if (data.blocks.length) {
            setBlog({ ...blog, content: data });
            setEditorState("publish");
          } else {
            toast.error(
              "Before publishing your post you must write something!"
            );
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

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
                  onClick={handlePublishEvent}
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
              className="flex flex-col items-start mx-14 >=990px:mx-20"
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
