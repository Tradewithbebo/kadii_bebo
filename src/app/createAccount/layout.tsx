"use client";
import { Box, VStack, HStack, Image } from "@chakra-ui/react";
import React, { useState } from "react";
// import GeneralDisplay from "./generalDisplay";
import Navbar from "../navbar/navbar";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState(1);
  const pathname = usePathname();
  return (
    <>
      <HStack w={"100%"} overflow={"hidden"}>
        <Box w={["100%",'100%', "50%"]}>
          {pathname === "/createAccount/createAccount" ||
          pathname === "/createAccount/createPin" ||
          pathname === "/createAccount/verifyMail"
          ||
          pathname === "/createAccount/ResetPassword"
          ||pathname ==='/createAccount/ResetPassword'? (
            ""
          ) : (
            <Navbar setStep={setStep} />
          )}
          {children}
        </Box>
        <Box w={"50%"} display={{ base: "none", md: "block" }}>
          <Box height="auto" width="690px">
            <Image objectFit="cover" src="/image/frame.png" alt="Bebo" />
          </Box>
        </Box>
      </HStack>
    </>
  );
}
