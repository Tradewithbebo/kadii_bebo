"use client";

import React, { useState } from "react";
import { Box, Center, Text } from "@chakra-ui/react";
import CreateAccount from "@/app/components/CreateAccount_Components/createAccount";
import PersonalDetails from "@/app/components/CreateAccount_Components/personalDetails";
import Navbar from "@/app/navbar/navbar";
// import CreateAccount from "./CreateAccount";
// import PersonalDetails from "./PersonalDetails";

export default function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [step, setStep] = useState(1);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [email, setEmail] = useState("");

  return (
    <Box w={"full"}>
      <Navbar setStep={setStep}/>
      <Center>
        {step === 1 && <CreateAccount setStep={setStep} setEmail={setEmail} />}
        {step === 2 && <PersonalDetails email={email} setStep={setStep} />}
      </Center>
    </Box>
  );
}
