import { useEditor, EditorContent } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Paraparph from "@tiptap/extension-paragraph";

import {
  FaBold,
  FaItalic,
  FaListOl,
  FaListUl,
  FaStrikethrough,
  FaHeading,
} from "react-icons/fa";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Inspire Others",
      }),
      Heading.configure({
        levels: [2, 3],
        HTMLAttributes: {
          class: "leading-3 dark:text-grayColor",
        },
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "max-w-3xl h-96 md:h-80 text-lg overflow-y-auto h-auto p-5  leading-4 focus:outline-none  dark:text-grayColor prose",
      },
    },
  });

  if (!editor) {
    return <h1>Loading...</h1>;
  }

  const content = editor.getHTML();

  console.log(content);

  return (
    <div className="md:text-md max-w-3xl rounded-md border-2  border-lightDark dark:border-lightDark">
      <div className="flex space-x-5 overflow-x-auto bg-grayColor px-2 py-3 text-xl dark:bg-lightDark">
        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={
            editor?.isActive("bold")
              ? "rounded-md border  bg-darkColor p-1 text-whiteColor dark:bg-grayColor dark:text-darkColor"
              : " rounded-md border p-1 text-darkColor dark:border-grayColor dark:text-grayColor  "
          }
        >
          <FaBold />
        </button>

        <button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={
            editor?.isActive("italic")
              ? "rounded-md border  bg-darkColor p-1 text-whiteColor dark:bg-grayColor dark:text-darkColor"
              : " rounded-md border p-1 text-darkColor dark:border-grayColor dark:text-grayColor "
          }
        >
          <FaItalic />
        </button>

        <button
          onClick={() => editor?.chain().focus().toggleStrike().run()}
          className={
            editor?.isActive("strike")
              ? "rounded-md border  bg-darkColor p-1 text-whiteColor dark:bg-grayColor dark:text-darkColor"
              : " rounded-md border p-1 text-darkColor dark:border-grayColor dark:text-grayColor  "
          }
        >
          <FaStrikethrough />
        </button>
        <p className="mx-0.5">|</p>

        <button
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor?.isActive("heading")
              ? "rounded-md border   bg-darkColor p-1 text-whiteColor dark:bg-grayColor dark:text-darkColor"
              : " rounded-md border  p-1 text-darkColor dark:border-grayColor dark:text-grayColor  "
          }
        >
          <FaHeading />
        </button>

        <p className="mx-0.5">|</p>

        <button
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
        >
          <FaListUl />
        </button>

        <button
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        >
          <FaListOl />
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
