'use client'

// import LoginComponent from '@/app/components/CreateAccount_Components/Login'
import LoginComponent from '@/app/components/CreateAccount_Components/Login'
import { CryptoProvider } from '@/app/components/drawer/Buy/usecontextbuy'
import React from 'react'

export default function Login() {
  return (
    <CryptoProvider>
   <LoginComponent/>
 </CryptoProvider>
  
  )
}
