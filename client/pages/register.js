import React from "react";

function Register() {
  return (
    <div className="mx-auto mt-20 flex max-w-5xl items-center justify-center dark:text-whiteColor">
      <div className="w-full max-w-sm rounded-lg border border-lightTealColor bg-whiteColor p-4 shadow-md dark:border-darkColor dark:bg-darkColor sm:p-6 md:p-8">
        <form className="space-y-6" action="#">
          <h5 className="text-xl font-medium text-darkColor dark:text-whiteColor">
            Register a new account
          </h5>
          <div>
            <label
              for="username"
              className="mb-2 block text-sm font-medium text-darkColor dark:text-whiteColor"
            >
              Username
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
              for="email"
              className="text-gray-900 dark:text-gray-300 mb-2 block text-sm font-medium"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border-gray-300 block  w-full rounded-lg border p-2.5 text-sm text-darkColor"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label
              for="password"
              className="dark:text-gray-300 mb-2 block text-sm font-medium text-darkColor"
            >
              Password
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
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
