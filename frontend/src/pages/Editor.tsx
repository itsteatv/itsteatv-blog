import { useState } from "react";
import { Navigate } from "react-router-dom";

function Editor() {
  const [editorState, setEditorState] = useState("editor");

  const token = localStorage.getItem("access_token");

  return (
    <div className="flex items-center justify-center min-h-screen font-SometypeMono font-bold">
      {token === null ? (
        <Navigate replace to="signin" />
      ) : (
        <h1>{editorState === "editor" ? "Blog Editor" : "Publish Form"}</h1>
      )}
    </div>
  );
}

export default Editor;
