'use client'

import React from 'react'
import Settings from '../components/Settings_Components/Settings'
import { CryptoProvider } from '../components/drawer/Buy/usecontextbuy'

export default function page() {
  return (
   <CryptoProvider>
        <Settings/>
       </CryptoProvider>
  )
}
