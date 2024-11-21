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

  useEffect(() => {
    Kyccheck()
  }, []);
  
  useEffect(() => {
  
      try {
        const auth = localStorage.getItem("stk-apk");
        if (!auth) {
          router.replace("/createAccount/Login");
        }
      } catch (error) {
        console.error("Error accessing localStorage:", error);
      }
    
  }, []);
 const  url='auth/me'
  const Kyccheck = async () => {
      
      try {
        const res = await AxiosGet(url);
      
        if (res) {
         
            const kycs = res.data.user.kycStatus;
            // console.log('kyc',kyc)
           
            if (
              kycs !== "APPROVED"
            
            ) {
              router.push("/HomeincompleteKyc");
            } else {
              router.push("/");
            }
     
          }
        
      } catch (err: any) {
        
        let message = "Check your Network and try again.";
        if (err.response && err.response.data && err.response.data.message) {
          message = err.response.data.message;
        
       
      }
    }
  };

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