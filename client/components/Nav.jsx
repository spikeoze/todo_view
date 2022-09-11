import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  HiMoon,
  HiMenu,
  HiOutlinePlus,
  HiOutlinePlusCircle,
} from "react-icons/hi";
import { FaLightbulb } from "react-icons/fa";
import { useAuthenticationContext } from "../context/authenticationContext";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";

function Nav({ darkTheme, setDarkTheme, openMenu, setOpenMenu }) {
  const colorMode = () => {
    setDarkTheme(!darkTheme);
  };
  const { currentUser, logOutHandler } = useAuthenticationContext();

  const { events } = useRouter();

  useEffect(() => {
    const close = () => {
      setOpenMenu(false);
    };
    events.on("routeChangeStart", close);
    return () => {
      // unsubscribe to event on unmount to prevent memory leak
      events.off("routeChangeStart", close);
    };
  }, [events, setOpenMenu]);

  return (
    <div className="sticky top-0 z-50  bg-whiteColor py-3 shadow dark:shadow-sm dark:bg-darkColor dark:shadow-darkerTeal p-5  ">
      <div className="mx-auto  max-w-5xl  text-lightDark dark:text-grayColor">
        <div className="flex items-center justify-between md:hidden">
          <div className="flex items-center space-x-5">
            <Link href={"/"}>
              <h1 className="text-lg font-bold text-darkTeal dark:text-lightTealColor ">
                Todo View
              </h1>
            </Link>
            {darkTheme ? (
              <FaLightbulb
                onClick={colorMode}
                className="text-xl text-darkTeal dark:text-lightTealColor"
              />
            ) : (
              <HiMoon
                onClick={colorMode}
                className="text-xl text-darkTeal dark:text-lightTealColor"
              />
            )}
          </div>

          {openMenu && (
            <Sidebar currentUser={currentUser} logOutHandler={logOutHandler} />
          )}

          <HiMenu
            id="MENU"
            onClick={() => setOpenMenu(!openMenu)}
            className="text-2xl text-darkTeal dark:text-lightTealColor "
          />
        </div>

        <div className="hidden items-center  justify-between md:flex ">
          <div className="flex items-center space-x-5">
            <Link href={"/"}>
              <h1 className="text-2xl font-bold text-darkTeal dark:text-lightTealColor ">
                Todo View
              </h1>
            </Link>
            {darkTheme ? (
              <FaLightbulb
                onClick={colorMode}
                className="text-xl text-darkTeal dark:text-lightTealColor"
              />
            ) : (
              <HiMoon
                onClick={colorMode}
                className="text-xl text-darkTeal dark:text-lightTealColor"
              />
            )}
          </div>
          <div className="flex items-center space-x-10 ">
            {!currentUser ? (
              <>
                <NavLink link={"register"} name="register" />
                <NavLink link={"login"} name="login" />
              </>
            ) : (
              <>
                <Link href={`/create`}>
                  <p className="text-2xl font-semibold">
                    <HiOutlinePlusCircle />
                  </p>
                </Link>
                <Link href={`/user/${currentUser?.username}`}>
                  <p className="font-semibold">@{currentUser?.username}</p>
                </Link>
                <p
                  onClick={logOutHandler}
                  className="rounded-md bg-pinkColor py-1 px-2 text-lg text-grayColor shadow "
                >
                  Logout
                </p>
              </>
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
