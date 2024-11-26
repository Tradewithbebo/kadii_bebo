"use client";
import { Box, Flex, Image } from "@chakra-ui/react";
import React, { useState } from "react";
import Navbar from "../navbar/navbar";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState(1);
  const pathname = usePathname();
  
  return (
    <Flex 
      w="100%" 
      flexDirection={{ base: "column", md: "row" }} // Stack on small screens, row on medium and up
      overflow="hidden"
    >
      {/* Left Section: Navbar and Children */}
      <Box
        flex={{ base: "none", md: 1 }} // Take up 100% on base, 50% on md and above
        px={{ base: 4, md: 8 }} 
        py={4}
      >
        {pathname === "/createAccount/createAccount" ||
        pathname === "/createAccount/createPin" ||
        pathname === "/createAccount/verifyMail" ||
        pathname === "/createAccount/ResetPassword" ||
        pathname === '/createAccount/ResetPassword' ? (
          ""
        ) : (
          <Navbar setStep={setStep} />
        )}
        {children}
      </Box>

      {/* Right Section: Image */}
      <Box 
        flex={{ base: "none", md: 1 }} // Take up 100% on base, 50% on md and above
        display={{ base: "none", md: "block" }} 
        height="auto"
      >
        <Box maxWidth="100%" height="100%">
          <Image 
            src="/image/frame.png" 
            alt="Bebo" 
            objectFit="cover" 
            width="100%" 
            height="100%"
          />
        </Box>
      </Box>
    </Flex>
  );
}
