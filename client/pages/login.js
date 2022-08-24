import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { useAuthenticationContext } from "../context/authenticationContext";

function Login() {
  const {
    loginUsername,
    setLoginUsername,
    loginPassword,
    setLoginPassword,
    loginHandler,
    handleSubmitLogin,
    errorsLogin,
    loginValidation,
  } = useAuthenticationContext();

  return (
    <div className="mx-auto mt-20 flex max-w-5xl items-center justify-center dark:text-whiteColor">
      <div className="w-full max-w-sm rounded-lg border border-lightTealColor bg-whiteColor p-4 shadow-md dark:border-darkColor dark:bg-darkColor sm:p-6 md:p-8">
        <form
          className="space-y-6"
          onSubmit={handleSubmitLogin(() => {
            loginHandler();
          })}
        >
          <h5 className="mb-2 text-xl font-medium text-darkColor dark:text-whiteColor">
            Log In
          </h5>
          <span className="text-md font-light text-pinkColor">
            {errorsLogin.loginError?.message}
          </span>
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-darkColor dark:text-whiteColor"
            >
              Your username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              {...loginValidation("username")}
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
              className="bg-gray-50 border-gray-300 block  w-full rounded-lg border p-2.5 text-sm text-darkColor"
              placeholder="Ex:mukhtaar123"
            />
            <span className="text-md font-light text-pinkColor">
              {errorsLogin.username?.message}
            </span>
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-darkColor dark:text-whiteColor"
            >
              Your password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              {...loginValidation("password")}
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-gray-50 border-gray-300 block  w-full rounded-lg border p-2.5 text-sm text-darkColor"
            />
            <span className="text-md font-light text-pinkColor">
              {errorsLogin.password?.message}
            </span>
          </div>
          <button
            type="submit"
            className="text-white w-full rounded-lg bg-lightTealColor px-5 py-2.5 text-center text-sm font-medium hover:bg-tealColor focus:outline-none focus:ring-4"
          >
            Login to your account
          </button>
          <div className="text-sm font-medium text-darkColor dark:text-whiteColor">
            Not registered?{" "}
            <Link href="/register">
              <span className="dark:text-LightTealColor cursor-pointer text-tealColor hover:underline">
                Create an account
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
