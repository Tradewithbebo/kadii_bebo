'use client'

import Enterverification from '@/app/components/CreateAccount_Components/Enterverification'
import Resetaccount from '@/app/components/CreateAccount_Components/ResetPassword';
// import Resetaccount from '@/app/components/CreateAccount_Components/Resetaccount'
import Navbar from '@/app/navbar/navbar';
import { Box, Center } from '@chakra-ui/react';
import React, { useState } from 'react'

export default function ResetPassword() {
  const [step, setStep] = useState(1);
  const [Pin, setPin] = useState("");
  return (
 
  
  <Box w={"full"}>
  <Navbar setStep={setStep}/>
  <Center>
    {step === 1 && <Enterverification setStep={setStep}setPin={setPin}/>}
    {step === 2 && <Resetaccount Pin={Pin} />}
  </Center>
</Box>
  )}
