'use client'

import React, { useEffect } from 'react'
import NavbarTwo from '../navbar/navbarTwo'
import HomePageBody from '../incompleteKyc/HomepageForIncompletekyc'
import NavbarTwo_nokyc from '../navbar/navbarTwo_nokyc'
import { useRouter } from 'next/navigation'
// import { useRouter } from 'next/router';

export default function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  // eslint-disable-next-line react-hooks/rules-of-hooks
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
