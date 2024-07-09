'use client'
import Veryfymail from "@/app/components/CreateAccount_Components/VerifyMail";
import VerifyMail from "@/app/components/CreateAccount_Components/VerifyMail";
import Navbar from "@/app/navbar/navbar";
import {
  Box,
  Center,
  FormControl,
  FormLabel,
  GridItem,
  HStack,
  Input,
  Link,
  PinInput,
  PinInputField,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";

export default function Verifymail() {
  const [step, setStep] = useState(1);
  return (
   <>
    <Navbar setStep={setStep}/>
    <Veryfymail/>
    </>
   
  );
}
