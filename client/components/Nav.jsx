import React from "react";
import Link from "next/link";
import { HiMoon, HiMenu } from "react-icons/hi";
import { FaLightbulb } from "react-icons/fa";
import { useAuthenticationContext } from "../context/authenticationContext";

function Nav({ darkTheme, setDarkTheme }) {
  const colorMode = () => {
    setDarkTheme(!darkTheme);
  };
  const { currentUser, logOutHandler } = useAuthenticationContext();
  return (
    <div>
      <div className="mx-auto mt-2 max-w-5xl text-lightDark dark:text-grayColor">
        <div className="flex items-center justify-between md:hidden">
          <Link href={"/"}>
            <h1 className="text-lg font-bold text-darkTeal dark:text-lightTealColor ">
              Todo View
            </h1>
          </Link>

          <HiMenu className="text-2xl text-darkTeal dark:text-lightTealColor " />

          {darkTheme ? (
            <FaLightbulb
              onClick={colorMode}
              className="text-2xl text-darkTeal dark:text-lightTealColor"
            />
          ) : (
            <HiMoon
              onClick={colorMode}
              className="text-2xl text-darkTeal dark:text-lightTealColor"
            />
          )}
        </div>

        <div className="hidden items-center  justify-between md:flex ">
          <Link href={"/"}>
            <h1 className="text-2xl font-bold text-darkTeal dark:text-lightTealColor ">
              Todo View
            </h1>
          </Link>

          <div className="flex items-center space-x-10 ">
            {!currentUser ? (
              <>
                <NavLink link={"register"} name="register" />
                <NavLink link={"login"} name="login" />
              </>
            ) : (
              <>
                <Link href={`/user/${currentUser?.username}`}>
                  <p className="font-semibold">@{currentUser?.username}</p>
                </Link>
                <p
                  onClick={logOutHandler}
                  className="text-lg rounded-md bg-pinkColor py-1 px-2 text-grayColor shadow "
                >
                  Logout
                </p>
              </>
            )}
            {darkTheme ? (
              <FaLightbulb
                onClick={colorMode}
                className="text-2xl text-darkTeal dark:text-lightTealColor"
              />
            ) : (
              <HiMoon
                onClick={colorMode}
                className="text-2xl text-darkTeal dark:text-lightTealColor"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function NavLink({ link, name }) {
  return (
    <Link href={`/${link}`}>
      <div className="cursor-pointer text-lg capitalize text-darkColor hover:opacity-50 dark:text-grayColor">
        <p>{name}</p>
      </div>
    </Link>
  );
}

export default Nav;
