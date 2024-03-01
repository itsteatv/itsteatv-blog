import { useState } from "react";
import { Navigate } from "react-router-dom";
import { createContext } from "react";
import BlogEditor from "../ui/BlogEditor";
import PublishForm from "../ui/PublishForm";
import { Blog, EditorContextType } from "../utils/types";
import { OutputData } from "@editorjs/editorjs";

const initialContent: OutputData = {
  blocks: [],
  time: 0,
  version: "2.29.0",
};

const blogPost: Blog = {
  title: "",
  banner: "",
  content: initialContent,
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
  const [textEditor, setTextEditor] = useState({ isReady: false });

  const token = localStorage.getItem("access_token");

  return (
    <EditorContext.Provider
      value={{
        blog,
        setBlog,
        editorState,
        setEditorState,
        setTextEditor,
        textEditor,
      }}
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
