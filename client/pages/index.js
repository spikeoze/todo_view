import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthenticationContext } from "../context/authenticationContext";
export default function Home() {
  const { currentUser } = useAuthenticationContext();
  return (
    <div>
      <h1>todoView</h1>
    </div>
  );
}
