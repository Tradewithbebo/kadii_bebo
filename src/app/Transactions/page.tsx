'use client'

import React, { useEffect, useState } from 'react'
import Transactions from '../TransactiontionComponents/Transactions'
import { useRouter } from 'next/navigation';

export default function page() {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isMounted, setIsMounted] = useState(false);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setIsMounted(true); // Ensure client-side rendering only
  }, []);
  
  // eslint-disable-next-line react-hooks/rules-of-hooks
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
  return (
    <div><Transactions/></div>
  )
}
