import React, { useState, useContext, useEffect } from "react";
const FollowerContext = React.createContext();
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

const FollowerProvider = ({ children }) => {
  //** ----------------------Utilities-------------------------*/
  const { mutate } = useSWRConfig();
  //** -----------------------------STATES-------------------------------- */

  //** ----------------------------Posts GET POST DELETE FUNCTIONS-------------------------- */

  const followUser = (username) => {
    Axios({
      method: "POST",
      url: `http://localhost:8080/${username}/follow`,
      withCredentials: true,
    })
      .then((res) => {
        // mutate(`http://localhost:8080/${username}/posts/`);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const unFollowUser = (username) => {
    Axios({
      method: "POST",
      url: `http://localhost:8080/${username}/unfollow`,
      withCredentials: true,
    })
      .then((res) => {
        // mutate(`http://localhost:8080/${username}/posts/`);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <FollowerContext.Provider value={{ followUser, unFollowUser }}>
      {children}
    </FollowerContext.Provider>
  );
};

// Custom hook for useContext
export const useFollowerContext = () => {
  return useContext(FollowerContext);
};

export { FollowerContext, FollowerProvider };
