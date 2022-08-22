import Link from "next/link";
import React from "react";

function Login() {
  return (
    <div className="mx-auto mt-20 flex max-w-5xl items-center justify-center dark:text-whiteColor">
      <div class="w-full max-w-sm rounded-lg border border-lightTealColor bg-whiteColor p-4 shadow-md dark:border-darkColor dark:bg-darkColor sm:p-6 md:p-8">
        <form class="space-y-6" action="#">
          <h5 class="text-xl font-medium text-darkColor dark:text-whiteColor">
            Sign in now!
          </h5>
          <div>
            <label
              for="username"
              className="mb-2 block text-sm font-medium text-darkColor dark:text-whiteColor"
            >
              Your username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="bg-gray-50 border-gray-300 block  w-full rounded-lg border p-2.5 text-sm text-darkColor"
              placeholder="Ex:mukhtaar123"
              required
            />
          </div>

          <div>
            <label
              for="password"
              className="mb-2 block text-sm font-medium text-darkColor dark:text-whiteColor"
            >
              Your password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border-gray-300 block  w-full rounded-lg border p-2.5 text-sm text-darkColor"
              required
            />
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
