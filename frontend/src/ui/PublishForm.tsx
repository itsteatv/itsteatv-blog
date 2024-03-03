import { useContext, useState, useEffect } from "react";
import { EditorContext } from "../pages/Editor";
import { GoX } from "react-icons/go";
import { Image, Input, Textarea } from "@nextui-org/react";
import Skeleton from "./Skeleton";

function PublishForm() {
  const { blog, setBlog, textEditor, setTextEditor, setEditorState } =
    useContext(EditorContext);
  const { title, banner, content, tags, desc } = blog;

  const maxDescLength = 150;

  console.log(content.blocks);
  console.log(banner);

  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsPending(false);
    }, 2000);
  }, []);

  const handleCloseEvent = function () {
    setEditorState("editor");
  };

  const handleBlogTitleChange = function (
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setBlog({ ...blog, title: e.target.value });
  };

  const handleBlogDescChange = function (
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const newDesc = e.target.value.slice(0, maxDescLength);
    setBlog({ ...blog, desc: newDesc });
  };

  return (
    <section>
      <div className="flex items-end justify-end">
        <GoX
          onClick={handleCloseEvent}
          className="mt-4 mr-4 cursor-pointer"
          size={30}
        />
      </div>
      {/* BANNER IMAGE */}
      <div className="flex items-center justify-center w-full overflow-hidden">
        <div className="mt-4 ">
          {isPending ? (
            <Skeleton />
          ) : (
            <>
              {banner ? (
                <Image
                  src={banner}
                  width="960"
                  className=">=970px:rounded-2xl rounded-none"
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
        </div>
      </div>
      {/* TITLE */}
      <div className="flex items-center justify-center my-10 w-full">
        <Input
          onChange={handleBlogTitleChange}
          defaultValue={title}
          type="text"
          variant="faded"
          label="Blog Title"
          labelPlacement="inside"
          placeholder="Enter your blog title"
          className="max-w-[960px] w-full >=990px:mx-4"
        />
      </div>
      {/* DESCRIPTION */}
      <div className="flex items-center justify-center my-10 w-full">
        <Textarea
          onChange={handleBlogDescChange}
          defaultValue={desc}
          variant="faded"
          label="Blog Description"
          endContent={
            <p className="text-sm text-gray-400 italic">
              {desc.length}/{maxDescLength}
            </p>
          }
          placeholder="Enter your blog description"
          className="max-w-[960px] w-full >=990px:mx-4"
          maxLength={maxDescLength}
        />
      </div>
      {/* CONTENT */}
      <p>
        {content.blocks.map((c) => {
          return (
            <div>
              <p>{c.type}</p>
            </div>
          );
        })}
      </p>
      {/* TAGS */}
      <p>{tags}</p>
    </section>
  );
}

export default PublishForm;
