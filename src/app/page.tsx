'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NavbarTwo from "./navbar/navbarTwo";
import HomePageBody from "./components/homePageBody";
import { CryptoProvider } from "./components/drawer/Buy/usecontextbuy";
import { Fade } from "react-awesome-reveal";
import { AxiosGet } from "./axios/axios";

export default function Home() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  // useEffect(() => {
 
  // }, []);
  
  // Authentication and KYC check function
  const Kyccheck = async () => {
    const url = 'auth/me';

    try {
      const res = await AxiosGet(url);

      if (res && res.data) {
        const kycs = res.data.kycStatus;
        console.log('kycs', kycs);

        if (kycs !== "APPROVED") {
          router.push("/HomeincompleteKyc");
        } else {
          router.push("/");
        }
      } else {
        console.error("Failed to fetch KYC status");
      }
    } catch (err: any) {
      let message = "Check your Network and try again.";
      if (err.response && err.response.data && err.response.data.message) {
        message = err.response.data.message;
      }
      console.error(message);
    }
  };

  useEffect(() => {
   
    try {
      const auth = localStorage.getItem("stk-apk");
      if (!auth) {
        router.replace("/createAccount/Login");
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
    Kyccheck()
  
}, []);
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
      
        <Fade direction="up" triggerOnce> <CryptoProvider> <HomePageBody /></CryptoProvider></Fade>
      
      {/* </CryptoProvider> */}
    </>
  );
}