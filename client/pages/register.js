import React from "react";
import { useForm } from "react-hook-form";
import { useAuthenticationContext } from "../context/authenticationContext";

function Register() {
  const {
    currentUser,
    registerHandler,
    registerUsername,
    setRegisterUsername,
    registerPassword,
    setRegisterPassword,
    registerEmail,
    setRegisterEmail,
    inputValidation,
    emailValidation,
    handleSubmit,
    errors,
  } = useAuthenticationContext();

  return (
    <div className="mx-auto mt-20 flex max-w-5xl items-center justify-center dark:text-whiteColor">
      <div className="w-full max-w-sm rounded-lg border border-lightDark border-opacity-10 bg-whiteColor p-4 shadow-lg dark:border-opacity-40 dark:bg-darkColor sm:p-6 md:p-8">
        <form
          className="space-y-6"
          onSubmit={handleSubmit((e) => {
            registerHandler();
          })}
        >
          <h5 className="text-xl font-medium text-darkColor dark:text-whiteColor mb-2">
            Register a new account
          </h5>
          <span className="text-md font-light text-pinkColor">
            {errors.badRequest?.message}
          </span>
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-darkColor dark:text-whiteColor"
            >
              Username
            </label>
            <input
              autoComplete="off"
              type="text"
              name="username"
              id="username"
              {...inputValidation("username")}
              value={registerUsername}
              onChange={(e) => setRegisterUsername(e.target.value)}
              className="bg-gray-50 block  w-full  rounded-lg border border-lightDark border-opacity-30 p-2.5 text-sm text-darkColor  dark:bg-lightDark dark:text-grayColor "
              placeholder="Ex:mukhtaar123"
            />
            <span className="text-sm font-light text-pinkColor">
              {errors.username?.message}
            </span>
          </div>
          <div>
            <label
              htmlFor="email"
              className="text-gray-900 dark:text-gray-300 mb-2 block text-sm font-medium"
            >
              Email
            </label>
            <input
              autoComplete="no"
              type="text"
              name="email"
              {...emailValidation()}
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
              id="email"
              className="bg-gray-50 block  w-full  rounded-lg border border-lightDark border-opacity-30 p-2.5 text-sm text-darkColor  dark:bg-lightDark dark:text-grayColor "
              placeholder="name@company.com"
            />
            <span className="text-sm font-light text-pinkColor">
              {errors.email?.message}
            </span>
          </div>
          <div>
            <label
              htmlFor="password"
              className="dark:text-gray-300 mb-2 block text-sm font-medium text-darkColor"
            >
              Password
            </label>
            <input
              autoComplete="off"
              type="password"
              name="password"
              id="password"
              {...inputValidation("password")}
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-gray-50 block  w-full  rounded-lg border border-lightDark border-opacity-30 p-2.5 text-sm text-darkColor  dark:bg-lightDark dark:text-grayColor "
            />
            <span className="text-sm font-light text-pinkColor">
              {errors.password?.message}
            </span>
          </div>
          <button
            type="submit"
            className="text-white w-full rounded-lg bg-lightTealColor px-5 py-2.5  text-center text-sm font-medium text-lightDark hover:bg-tealColor focus:outline-none focus:ring-4 dark:bg-tealColor"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
