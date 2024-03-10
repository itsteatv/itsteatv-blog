import { useContext, useState, useEffect } from "react";
import { EditorContext } from "../pages/Editor";
import { GoX } from "react-icons/go";
import { Image, Input, Textarea } from "@nextui-org/react";
import Skeleton from "./Skeleton";
import Tag from "./Tag";
import toast from "react-hot-toast";

function PublishForm() {
  const { blog, setBlog, textEditor, setTextEditor, setEditorState } =
    useContext(EditorContext);
  const { title, banner, content, tags, desc } = blog;

  const [isPending, setIsPending] = useState(true);
  const [tagInputValue, setTagInputValue] = useState("");

  const maxDescLength = 150;
  const tagLimit = 5;
  const remainingTags = tagLimit - tags.length;

  console.log(tags);

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

  const handleDescKeyDown = function (
    event: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const handleTagsKeyDown = function (
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();

      const tag = tagInputValue.trim();

      if (tags.length < tagLimit) {
        if (!tag) {
          toast.error("Tag cannot be empty");
        } else if (!tags.includes(tag)) {
          setBlog({ ...blog, tags: [...tags, tag] });
        } else {
          toast.error("Tag already exists");
        }
      } else {
        toast.error(`You can only add ${tagLimit} tags`);
      }
      setTagInputValue("");

      console.log("tagInput" + tagInputValue);
    }
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
      <div className="flex items-center justify-center flex-col w-full overflow-hidden">
        <div>
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

        {/* TITLE PREVIEW */}
        <div className="my-10">
          <div className="flex items-center justify-center">
            {title ? (
              <p className="text-black font-SometypeMono text-lg uppercase">
                {title}
              </p>
            ) : (
              <p className="text-black font-SometypeMono text-lg uppercase">
                title
              </p>
            )}
          </div>
          {/* DESCRIPTION PREVIEW */}
          <div className="flex items-center justify-center">
            {desc ? (
              <p className="text-black font-SometypeMono text-lg">{desc}</p>
            ) : (
              <p className="text-black font-SometypeMono text-lg">
                Your blog description
              </p>
            )}
          </div>
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
          onKeyDown={handleDescKeyDown}
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
      {/* TAGS */}
      <div className="flex items-center justify-center my-10 w-full">
        <Input
          value={tagInputValue}
          onChange={(e) => setTagInputValue(e.target.value)}
          onKeyDown={handleTagsKeyDown}
          type="text"
          variant="faded"
          label={`Tags ${
            remainingTags > 0
              ? `(${remainingTags} ${remainingTags === 1 ? "tag" : "tags"} left)`
              : ""
          }`}
          labelPlacement="inside"
          placeholder="Enter you blog tags"
          className="max-w-[960px] w-full >=990px:mx-4"
          endContent={tags.map((tag, index) => (
            <Tag key={index} tag={tag} />
          ))}
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
    </section>
  );
}

export default PublishForm;
