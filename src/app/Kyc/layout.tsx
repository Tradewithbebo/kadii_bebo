'use client'

import { Box, VStack, HStack,Image } from "@chakra-ui/react";
import React, { useState } from "react";
// import GeneralDisplay from "./generalDisplay";
import Navbar from "../navbar/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState(1);
  return (
   <>
    <HStack  w={'100%'} overflow={'hidden'}>
    <Box w={['100%','50%']}>
    <Navbar setStep={setStep}/>
     {children}
     </Box>
     <Box w={'50%'} display={{ base: 'none', md: 'block' }} >
     <Box  height='900px'
    width='690px'>
  <Image objectFit='cover' src='/image/frame.png'
    alt='Bebo' />
</Box>
     </Box>
    </HStack> 
    </>
  );
}

