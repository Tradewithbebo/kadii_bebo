'use client'

import ConfirmPin from '@/app/components/CreateAccount_Components/ConfirmPin';
import CreatePin from '@/app/components/CreateAccount_Components/CreatePin'
import Navbar from '@/app/navbar/navbar';
import { Box, Center } from '@chakra-ui/react';
import React, { useState } from 'react'

export default function Createpin() {
  const [step, setStep] = useState(1);
    const [password, setPassword] = useState("");
    
    return (
      <Box w={"full"}>
        <Navbar setStep={setStep} />
        <Center>
          {step === 1 && <CreatePin setStep={setStep} setPassword={setPassword} />}
          {step === 2 && <ConfirmPin password={password} setStep={setStep} />}
        </Center>
      </Box>
    );
  }
