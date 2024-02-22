import { useState } from "react";
import { Navigate } from "react-router-dom";
import { createContext } from "react";
import BlogEditor from "../ui/BlogEditor";
import PublishForm from "../ui/PublishForm";
import { Blog, EditorContextType } from "../utils/types";

const blogPost: Blog = {
  title: "",
  banner: "",
  content: [],
  tags: [],
  desc: "",
  author: { personal_info: {} },
};

export const EditorContext = createContext<EditorContextType>(
  {} as EditorContextType
);

function Editor() {
  const [blog, setBlog] = useState(blogPost);
  const [editorState, setEditorState] = useState("editor");

  const token = localStorage.getItem("access_token");

  return (
    <EditorContext.Provider
      value={{ blog, setBlog, editorState, setEditorState }}
    >
      <div>
        {token === null ? (
          <Navigate replace to="signin" />
        ) : (
          <h1>{editorState === "editor" ? <BlogEditor /> : <PublishForm />}</h1>
        )}
      </div>
    </EditorContext.Provider>
  );
}

export default Editor;
