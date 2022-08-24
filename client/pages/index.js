import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
let count = 1;
export default function Home() {
  useEffect(()=>{
    count++
    console.log(count);
  },[])
  return (
    <div>
      <h1>todoView</h1>
    </div>
  );
}
