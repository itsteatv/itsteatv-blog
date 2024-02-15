import { useState } from "react";
import { Navigate } from "react-router-dom";
import BlogEditor from "../ui/BlogEditor";
import PublishForm from "../ui/PublishForm";

function Editor() {
  const [editorState, setEditorState] = useState("editor");

  const token = localStorage.getItem("access_token");

  return (
    <div>
      {token === null ? (
        <Navigate replace to="signin" />
      ) : (
        <h1>{editorState === "editor" ? <BlogEditor /> : <PublishForm />}</h1>
      )}
    </div>
  );
}

export default Editor;
