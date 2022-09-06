import React from "react";
import Link from "next/link";
import { IoPersonOutline } from "react-icons/io";
import { BsPerson } from "react-icons/bs";
import { FaSignInAlt } from "react-icons/fa";
import { HiOutlineLogout, HiOutlineLogin, HiOutlineSearch } from "react-icons/hi";

function Sidebar({ currentUser, logOutHandler }) {
  return (
    <aside className="absolute top-16 right-8 w-64">
      <div className="  overflow-y-auto rounded-lg border border-lightDark border-opacity-10 bg-darkTeal py-4 px-3 text-grayColor dark:border-opacity-40 dark:bg-lightDark ">
        <ul className="space-y-2">
          {currentUser && (
            <>
              <Link href={`/user/${currentUser?.username}`}>
                <li className="flex items-center rounded-lg p-2 text-base font-normal  text-grayColor hover:bg-lightTealColor hover:text-darkColor">
                  <BsPerson />
                  <span className="ml-3">{currentUser?.username}</span>
                </li>
              </Link>
              <Link href={'/search'}>
                <li className="flex items-center rounded-lg p-2 text-base font-normal  text-grayColor hover:bg-lightTealColor hover:text-darkColor">
                  < HiOutlineSearch />
                  <span className="ml-3">Search</span>
                </li>
              </Link>
              <li
                onClick={logOutHandler}
                className="flex items-center rounded-lg p-2 text-base font-normal  text-grayColor  hover:bg-pinkColor"
              >
                <HiOutlineLogout />
                <span className="ml-3">Logout</span>
              </li>
            </>
          )}

          {!currentUser && (
            <>
              <Link href="/register">
                <li className="flex items-center rounded-lg p-2 text-base font-normal  text-grayColor hover:bg-lightTealColor hover:text-darkColor">
                  <FaSignInAlt />
                  <span className="ml-3">Register</span>
                </li>
              </Link>

              <Link href="/login">
                <li className="flex items-center rounded-lg p-2 text-base font-normal  text-grayColor hover:bg-lightTealColor hover:text-darkColor">
                  <HiOutlineLogin />
                  <span className="ml-3">Login</span>
                </li>
              </Link>
            </>
          )}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
