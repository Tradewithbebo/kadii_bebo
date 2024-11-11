// app/providers.tsx
'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { CryptoProvider } from './components/drawer/Buy/usecontextbuy'

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider><CryptoProvider>{children}</CryptoProvider></ChakraProvider>
}