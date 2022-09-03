import React, { useState, useContext, useEffect } from "react";
const UserPostContext = React.createContext();
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

const UserPostProvider = ({ children }) => {
  //** ----------------------Utilities-------------------------*/
  const router = useRouter();
  const { mutate } = useSWRConfig();

  //** -----------------------------STATES-------------------------------- */

  //** ----------------------------Posts GET POST DELETE FUNCTIONS-------------------------- */

  return (
    <UserPostContext.Provider value={{}}>{children}</UserPostContext.Provider>
  );
};

// Custom hook for useContext

export const useUserPostContext = () => {
  return useContext(UserPostContext);
};

export { UserPostContext, UserPostProvider };
