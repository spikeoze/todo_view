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
  const { mutate } = useSWRConfig();

  //** -----------------------------STATES-------------------------------- */
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  //** ----------------------------Posts GET POST DELETE FUNCTIONS-------------------------- */
  const { username } = router.query;
  // console.log(router.query);

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

  const deletePost = (username, id) => {
    Axios({
      method: "DELETE",
      url: `http://localhost:8080/${username}/posts/${id}`,
      withCredentials: true,
    })
      .then((res) => {
        mutate(`http://localhost:8080/${username}/posts`);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <PostingContext.Provider
      value={{
        title,
        setTitle,
        content,
        setContent,
        createPost,
        deletePost,
        // userPost,
      }}
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
