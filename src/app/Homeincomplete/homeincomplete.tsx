'use client'

import React, { useEffect } from 'react'
import NavbarTwo from '../navbar/navbarTwo'
import HomePageBody from '../incompleteKyc/HomepageForIncompletekyc'
import { useRouter } from 'next/navigation'
export default function Homeincoplete() {

  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("stk-apk");
    if (!auth) {
      router.replace("/createAccount/Login");
    }
  }, [router]);
  return (
    <><NavbarTwo/>
<HomePageBody/></>
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
