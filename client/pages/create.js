import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Tiptap from "../components/Tiptap";
import { useAuthenticationContext } from "../context/authenticationContext";

function Create() {
    const router = useRouter();
    const { currentUser } = useAuthenticationContext();


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
            className="dark:bg-darkColor block  w-full  rounded-lg border-2 border-lightDark p-2.5 text-lg text-darkColor dark:border-lightDark  dark:text-grayColor "
            placeholder="Title"
          />
          <Tiptap />

          <div className="flex md:justify-end">
            <button className="text-lg w-full md:w-fit rounded-md bg-darkColor px-5 py-2 hover:dark:bg-darkTeal hover:bg-lightDark  text-lightTealColor font-medium dark:bg-lightDark ">
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
