import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useAuthenticationContext } from "../context/authenticationContext";
// import Footer from "./Footer";
import Nav from "./Nav";

function Layout({ children }) {
  const [darkTheme, setDarkTheme] = useState(false);

  const [openMenu, setOpenMenu] = useState(false);

  const ref = useRef(0);

  const handleClick = (e) => {
    if (e.target.id !== "MENU") {
      setOpenMenu(false);
    }
  };

  return (
    <div className={darkTheme ? "dark" : "bg-red-300"}>
      <div className="flex min-h-screen flex-col justify-between bg-whiteColor transition-all dark:bg-darkColor">
        <Nav
          darkTheme={darkTheme}
          setDarkTheme={setDarkTheme}
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
        />
        <main className="relative mb-auto p-5" ref={ref} onClick={handleClick}>
          {children}
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default Layout;
