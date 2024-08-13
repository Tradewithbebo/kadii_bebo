
'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import React from 'react'
import NavbarTwo from "./navbar/navbarTwo";
import HomePageBody from "./components/homePageBody";


export default function Home() {
   
   const router = useRouter();

   useEffect(() => {
     const auth = localStorage.getItem("stk-apk");
     if (!auth) {
       router.replace("/createAccount/Login");
     }
   }, [router]);
  return (
   
<>

<NavbarTwo/>
<HomePageBody/>
</>
  
  );
}
