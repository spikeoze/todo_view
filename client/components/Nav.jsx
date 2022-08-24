import React from "react";
import Link from "next/link";
import { FiMoon } from "react-icons/fi";
import { HiOutlineLightBulb } from "react-icons/hi";
import { useAuthenticationContext } from "../context/authenticationContext";

function Nav() {
  const { currentUser, logOutHandler } = useAuthenticationContext();
  return (
    <div>
      <div className="mx-auto mt-2 flex max-w-5xl items-center justify-between dark:text-whiteColor">
        <div className="text-3xl font-bold tracking-wide text-tealColor">
          <h1>Todo View</h1>
        </div>
        <div className="hidden items-center justify-between space-x-10 text-xl sm:flex ">
          {!currentUser && (
            <>
              <NavLink link={"register"} name="register" />
              <NavLink link={"login"} name="login" />
            </>
          )}
          {currentUser && (
            <>
              <p className="text-md font-semibold text-lightTealColor">
                {currentUser.username}
              </p>
              <div
                className="cursor-pointer rounded-md bg-pinkColor py-2 px-2 capitalize text-whiteColor "
                onClick={logOutHandler}
              >
                <p>logout</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function NavLink({ link, name }) {
  return (
    <Link href={`/${link}`}>
      <div className="cursor-pointer capitalize text-darkColor hover:opacity-50">
        <p>{name}</p>
      </div>
    </Link>
  );
}

export default Nav;
