import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Tiptap from "../components/Tiptap";
import { useAuthenticationContext } from "../context/authenticationContext";
import { usePostingContext } from "../context/postingContext";

function Create() {
  const router = useRouter();
  const { currentUser } = useAuthenticationContext();
  const { title, setTitle, content, setContent, createPost } =
    usePostingContext();

  // console.log(title, content, content?.length);

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    }
  }, []);

  return (
    <div className="mx-auto mt-10 max-w-5xl">
      <h1 className="border-b-2 border-lightDark py-2 text-xl md:text-2xl ">
        Create Post
      </h1>

      <div className="mt-10 flex flex-col items-start justify-between space-y-10 md:flex-row md:space-y-0 md:space-x-10 ">
        <div className="flex w-full flex-col space-y-5 ">
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full  rounded-lg  border-2 border-lightDark p-2.5 text-lg text-darkColor dark:border-lightDark dark:bg-darkColor  dark:text-grayColor "
            placeholder="Title"
          />
          <Tiptap setContent={setContent} />

          <div className="flex md:justify-end">
            <button
              onClick={() => createPost(currentUser?.username)}
              className="w-full rounded-md bg-darkColor px-5 py-2 text-lg font-medium text-lightTealColor hover:bg-lightDark  dark:bg-lightDark hover:dark:bg-darkTeal md:w-fit "
            >
              Post
            </button>
          </div>
        </div>
        <div className=" w-full overflow-y-auto rounded-lg  border-lightDark border-opacity-10 bg-darkColor py-4 px-3 text-grayColor dark:border-opacity-40 dark:bg-lightDark md:w-96 ">
          <ul className="list-disc space-y-2 divide-y">
            <li className="flex items-center p-2 text-base font-normal  text-grayColor">
              Be mindful of what you post
            </li>
            <li className="flex items-center p-2 text-base font-normal  text-grayColor">
              Respect other people
            </li>
            <li className="flex items-center p-2 text-base font-normal  text-grayColor">
              Inspired Others
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Create;
