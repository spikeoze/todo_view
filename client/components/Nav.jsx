import React from "react";
import Link from "next/link";
import { FiMoon } from "react-icons/fi";
import { HiOutlineLightBulb } from "react-icons/hi";

function Nav() {
  return (
    <div>
      <div className="mx-auto mt-2 flex max-w-5xl items-center justify-between dark:text-whiteColor">
        <div className="text-3xl tracking-wide text-tealColor font-bold">
          <h1>Todo View</h1>
        </div>

        <div className="justify-between items-center space-x-10 text-xl hidden sm:flex ">
          <NavLink link={"register"} name="register" />
          <NavLink link={"login"} name="login" />
          <div className="cursor-pointer bg-pinkColor py-2 px-2 capitalize text-whiteColor rounded-md ">
            <p>logout</p>
          </div>
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
