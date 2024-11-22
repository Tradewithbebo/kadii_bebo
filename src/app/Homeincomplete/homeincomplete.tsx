'use client'

import React, { useEffect, useState } from 'react'
import NavbarTwo from '../navbar/navbarTwo'
import HomePageBody from '../incompleteKyc/HomepageForIncompletekyc'
import { useRouter } from 'next/navigation'
import { Fade } from 'react-awesome-reveal'
import Footer from '../navbar/footer'
import { Box } from '@chakra-ui/react'
export default function Homeincoplete() {

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
  
  if (!isMounted) return null; // Prevent rendering on server-side
  return (
    <><NavbarTwo/>
<Fade direction="up" triggerOnce><HomePageBody/></Fade> <Box
        display={{ base: "block", md: "none" }}
        position="fixed"
        bottom="0"
        width="100%"
        zIndex="10"
        bg="white"
        boxShadow="md"
        justifyContent={'center'}
        w={'full'}
      >
        <Footer />
      </Box></>
  )
}


// 'use client'

// import React, { useEffect } from 'react';
// import NavbarTwo from '../navbar/navbarTwo';
// import HomePageBody from '../incompleteKyc/HomepageForIncompletekyc';
// import { useRouter } from 'next/navigation';

// export default function Page() {
//   const router = useRouter();

//   useEffect(() => {
//     // Only run the code in the browser (including mobile browsers)
//     if (typeof window !== 'undefined') {
//       const auth = localStorage.getItem("stk-apk");
//       if (!auth) {
//         router.replace("/createAccount/Login");
//       }
//     }
//   }, [router]);

//   return (
//     <>
//       {/* Navbar and body should be mobile-friendly if styled properly */}
//       <NavbarTwo />
//       <HomePageBody />
//     </>
//   );
// }
