import { useContext } from "react";
import { EditorContext } from "../pages/Editor";
import { GoX } from "react-icons/go";

function PublishForm() {
  const { blog, setBlog, textEditor, setTextEditor, setEditorState } =
    useContext(EditorContext);
  const { title, banner, content, tags, desc } = blog;

  const handleCloseEvent = function () {
    setEditorState("editor");
  };

  console.log(title, banner, content, tags, desc);

  return (
    <div className="">
      <div className="flex items-end justify-end">
        <GoX
          onClick={handleCloseEvent}
          className="mt-4 mr-4 cursor-pointer"
          size={30}
        />
      </div>
    </div>
  );
}

export default PublishForm;
