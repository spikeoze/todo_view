import React, { useState, useContext, useEffect } from "react";
const LikesContext = React.createContext();
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

const LikesProvider = ({ children }) => {
  //** ----------------------Utilities-------------------------*/
  const { mutate } = useSWRConfig();
  //** -----------------------------STATES-------------------------------- */

  //** ----------------------------Posts GET POST DELETE FUNCTIONS-------------------------- */

  const likePost = (postID) => {
    Axios({
      method: "POST",
      url: `http://localhost:8080/post/${postID}/likes`,
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const unLikePost = (postID) => {
    Axios({
      method: "DELETE",
      url: `http://localhost:8080/post/${postID}/likes`,
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <LikesContext.Provider value={{ likePost, unLikePost }}>
      {children}
    </LikesContext.Provider>
  );
};

// Custom hook for useContext
export const useLikesContext = () => {
  return useContext(LikesContext);
};

export { LikesContext, LikesProvider };
