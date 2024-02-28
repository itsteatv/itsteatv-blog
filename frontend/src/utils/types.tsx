import { Dispatch, SetStateAction } from "react";
import EditorJS from "@editorjs/editorjs";

export interface UserAuthAPIData {
  fullname?: string;
  email: string;
  password: string;
  type: string;
}

export interface UserData {
  fullname: string;
  username: string;
  email: string;
  profile_img: string;
}

export interface UseImageUploadOptions {
  onImageUploaded: (url: string) => void;
}

export interface Blog {
  title: string;
  banner: string;
  content: any[]; //This any type will be updated later
  tags: string[];
  desc: string;
  author: { personal_info: any }; //This any type will be updated later
}

export interface EditorContextType {
  blog: Blog;
  setBlog: Dispatch<SetStateAction<Blog>>;
  editorState: string;
  setEditorState: Dispatch<SetStateAction<string>>;
  setTextEditor: Dispatch<SetStateAction<{ isReady: boolean }>> | EditorJS;
}
