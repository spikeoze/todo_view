import React, { useState, useContext, useEffect } from "react";
const AuthenticationContext = React.createContext();
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

const AuthenticationProvider = ({ children }) => {
  //** ----------------------Utilities-------------------------*/
  const router = useRouter();
  const { data, error } = useSWR(
    "http://localhost:8080/user/currentUser",
    fetcher
  );
  const { mutate } = useSWRConfig();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm();

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    setError: setError2,
    clearErrors,
    formState: { errors: errorsLogin },
  } = useForm();

  //** -----------------------------STATES-------------------------------- */
  const [currentUser, setCurrentUser] = useState(null);
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  //** ----------------------------FETCHING FUNCTIONS-------------------------- */

  // set user if data from swr changes
  useEffect(() => {
    setCurrentUser(data);
  }, [data]);

  // register handler
  const registerHandler = () => {
    Axios({
      method: "POST",
      data: {
        username: registerUsername,
        email: registerEmail,
        password: registerPassword,
      },
      withCredentials: true,
      url: "http://localhost:8080/user/register",
    })
      .then((res) => {
        // setCurrentUser(data);
        mutate("http://localhost:8080/user/currentUser");
        router.push("/");
        console.log(res);
      })
      .catch((err) => {
        setError("badRequest", {
          type: "custom",
          message: err.response.data,
        });

        console.log(err);
      });
  };

  // Login handler
  const loginHandler = () => {
    Axios.post(
      "http://localhost:8080/user/login",

      {
        username: loginUsername,
        password: loginPassword,
      },

      {
        withCredentials: true,
      }
    )
      .then((res) => {
        mutate("http://localhost:8080/user/currentUser");
        router.push("/");
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response.data);
        setError2("loginError", {
          type: "custom",
          message: err.response.data.message,
        });
      });
  };

  // Login form validation

  const loginValidation = (inputName) => {
    return {
      ...registerLogin(inputName, {
        required: `${inputName} is required`,
      }),
    };
  };

  // username and password register form validation
  const inputValidation = (inputName) => {
    return {
      ...register(inputName, {
        required: `${inputName} is required`,
        minLength: {
          value: 4,
          message: "must be 4 characters or more",
        },
      }),
    };
  };

  // register form email validation with a pattern
  const emailValidation = () => {
    return {
      ...register("email", {
        required: "email is required",
        pattern: {
          value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
          message: "invalid email",
        },
      }),
    };
  };

  // login out handler

  const logOutHandler = () => {
    Axios.get("http://localhost:8080/user/logout", {
      withCredentials: true,
    })
      .then((res) => {
        mutate("http://localhost:8080/user/currentUser");
        router.push("/login");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <AuthenticationContext.Provider
      value={{
        currentUser,
        registerHandler,
        loginHandler,
        registerUsername,
        setRegisterUsername,
        registerPassword,
        setRegisterPassword,
        registerEmail,
        setRegisterEmail,
        loginUsername,
        setLoginUsername,
        loginPassword,
        setLoginPassword,
        inputValidation,
        emailValidation,
        handleSubmit,
        errors,
        handleSubmitLogin,
        errorsLogin,
        loginValidation,
        logOutHandler,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

// Custom hook for useContextk

export const useAuthenticationContext = () => {
  return useContext(AuthenticationContext);
};

export { AuthenticationContext, AuthenticationProvider };
