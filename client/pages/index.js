import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuthenticationContext } from "../context/authenticationContext";

export default function Home() {
  const { currentUser } = useAuthenticationContext();
  const router = useRouter();

  if (!currentUser) {
    return (
      <div className="mt-10 flex items-center justify-center text-xl">
        <p>Register or Login too see posts (:</p>
      </div>
    );
  } else {
    router.push("/posts");
  }
}
