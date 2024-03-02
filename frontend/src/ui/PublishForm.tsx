import { useContext, useState, useEffect } from "react";
import { EditorContext } from "../pages/Editor";
import { GoX } from "react-icons/go";
import { Image } from "@nextui-org/react";
import Skeleton from "./Skeleton";

function PublishForm() {
  const { blog, setBlog, textEditor, setTextEditor, setEditorState } =
    useContext(EditorContext);
  const { title, banner, content, tags, desc } = blog;

  console.log(content.blocks);

  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsPending(false);
    }, 2000);
  }, []);

  const handleCloseEvent = function () {
    setEditorState("editor");
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
        </div>
      </div>
      {/* TITLE */}
      <p>{title}</p>
      {/* DESCRIPTION */}
      <p>{desc}</p>
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
