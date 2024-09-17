'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import React from 'react';
import NavbarTwo from "./navbar/navbarTwo";
import HomePageBody from "./components/homePageBody";
import { CryptoProvider } from "./components/drawer/Buy/usecontextbuy";

export default function Home() {
   const router = useRouter();

  //  useEffect(() => {
  //    const auth = localStorage.getItem("stk-apk");
  //    const timestamp = localStorage.getItem("token-timestamp");

  //    if (!auth || !timestamp) {
  //      // Redirect to login if token or timestamp is missing
  //      router.replace("/createAccount/Login");
  //    } else {
  //      // Check if 24 hours have passed since the token was stored
  //      const isTokenExpired = checkIf24HoursPassed(timestamp);
       
  //      if (isTokenExpired) {
  //        localStorage.removeItem("stk-apk"); // Remove expired token
  //        localStorage.removeItem("token-timestamp"); // Remove timestamp
  //        router.replace("/createAccount/Login"); // Redirect to login
  //      }
  //    }
  //  }, [router]);

  //  // Helper function to check if 24 hours have passed
  //  const checkIf24HoursPassed = (timestamp:any) => {
  //    const currentTime = Date.now(); // Current time in milliseconds
  //    const timeDifference = currentTime - parseInt(timestamp);
  //    const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  //    return timeDifference > twentyFourHours; // Returns true if 24 hours have passed
  //  }
// eslint-disable-next-line react-hooks/rules-of-hooks
// const router = useRouter();
// eslint-disable-next-line react-hooks/rules-of-hooks
useEffect(() => {
  const auth = localStorage.getItem("stk-apk");
  if (!auth) {
    router.replace("/createAccount/Login");
  }
}, [router]);
   return (
     <>
       <NavbarTwo />
       <CryptoProvider>
         <HomePageBody />
       </CryptoProvider>
     </>
   );
}
