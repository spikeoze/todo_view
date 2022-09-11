import React, { useState, useContext, useEffect } from "react";
const PostingContext = React.createContext();
import useSWR, { useSWRConfig } from "swr";
import Axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

/* 
  Contains all authentication fetcher 
  For register form, username and password validation is separated from email
*/

//*TODO: Look into swr mutation function more, and find a better way to revalidate user data

const fetcher = (url) =>
  Axios.get(url, { withCredentials: true }).then((res) => res.data);

const PostingProvider = ({ children }) => {
  //** ----------------------Utilities-------------------------*/
  const router = useRouter();

  //** -----------------------------STATES-------------------------------- */
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  //** ----------------------------Posts GET POST DELETE FUNCTIONS-------------------------- */

  const createPost = (username) => {
    Axios({
      method: "POST",
      url: `http://localhost:8080/${username}/posts`,
      data: {
        title,
        content,
      },
      withCredentials: true,
    }).then((res) => {
      console.log(res);
    });
  };

  return (
    <PostingContext.Provider
      value={{ title, setTitle, content, setContent, createPost }}
    >
      {children}
    </PostingContext.Provider>
  );
};

// Custom hook for useContext

export const usePostingContext = () => {
  return useContext(PostingContext);
};

export { PostingContext, PostingProvider };
