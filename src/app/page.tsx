'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NavbarTwo from "./navbar/navbarTwo";
import HomePageBody from "./components/homePageBody";
import { CryptoProvider } from "./components/drawer/Buy/usecontextbuy";
import { Fade } from "react-awesome-reveal";

export default function Home() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Ensure client-side rendering only
  }, []);
  
  useEffect(() => {
    if (isMounted) {
      try {
        const auth = localStorage.getItem("stk-apk");
        if (!auth) {
          router.replace("/createAccount/Login");
        }
      } catch (error) {
        console.error("Error accessing localStorage:", error);
      }
    }
  }, [isMounted, router]);

  // useEffect(() => {
  //   if (isAuthenticated === false) {
  //     router.replace("/createAccount/Login");
  //   }
  //   // if (isAuthenticated === null) {
    //   router.replace("/createAccount/Login");
    // }
  // }, [isAuthenticated, router]);



 

  // if (isAuthenticated === false) {
  //   return null; // The useEffect will handle redirection
  // }

  return (
    <>
      <NavbarTwo />
      
        <Fade direction="up" triggerOnce>  <HomePageBody /></Fade>
      
      {/* </CryptoProvider> */}
    </>
  );
}