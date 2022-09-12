import React, { useState, useContext, useEffect } from "react";
const CommentContext = React.createContext();
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

const CommentProvider = ({ children }) => {
  //** ----------------------Utilities-------------------------*/
  const router = useRouter();
  const { mutate } = useSWRConfig();

  //** -----------------------------STATES-------------------------------- */
  const [comment, setComment] = useState("");

  //** ----------------------------Posts GET POST DELETE FUNCTIONS-------------------------- */

  const createComment = (id, username) => {
    console.log(id, username);
    Axios({
      method: "POST",
      url: `http://localhost:8080/post/${id}/comment`,
      data: {
        text: comment,
      },
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        mutate(`http://localhost:8080/post/${id}/comment`);
        mutate(`http://localhost:8080/${username}/posts/${id}`);
        setComment("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <CommentContext.Provider value={{ comment, setComment, createComment }}>
      {children}
    </CommentContext.Provider>
  );
};

// Custom hook for useContext
export const useCommentContext = () => {
  return useContext(CommentContext);
};

export { CommentContext, CommentProvider };
