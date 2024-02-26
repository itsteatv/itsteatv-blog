// @ts-ignore
import Checklist from "@editorjs/checklist";
// @ts-ignore
import Embed from "@editorjs/embed";
// @ts-ignore
import Header from "@editorjs/header";
// @ts-ignore
import Image from "@editorjs/image";
// @ts-ignore
import Link from "@editorjs/link";
// @ts-ignore
import List from "@editorjs/list";
// @ts-ignore
import Quote from "@editorjs/quote";
// @ts-ignore
import Raw from "@editorjs/raw";
// @ts-ignore
import SimpleImage from "@editorjs/simple-image";

const uploadImageByUrl = function (e: React.ChangeEvent<HTMLInputElement>) {
  const link = new Promise((resolve, reject) => {
    try {
      resolve(e);
    } catch (error) {
      reject(error);
    }
  });

  return link.then((url) => {
    return {
      success: 1,
      file: { url },
    };
  });
};

export const editorTools = {
  checkList: Checklist,
  embed: Embed,
  header: {
    class: Header,
    config: {
      placeholder: "Type Heading...",
    },
  },
  image: {
    class: Image,
    config: {
      uploader: {
        uploadByUrl: uploadImageByUrl,
      },
    },
  },
  link: Link,
  list: {
    class: List,
    inlineToolbar: true,
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
  },
  raw: Raw,
  simpleImage: SimpleImage,
};
