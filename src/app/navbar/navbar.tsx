"use client";
import { Box, Image, HStack, Text, Link } from "@chakra-ui/react";
import { useRouter, usePathname } from "next/navigation";
import React from "react";
import { SlArrowLeft } from "react-icons/sl";

export default function Navbar({ setStep }: { setStep: any }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default link behavior
    if (
      pathname === "/createAccount/createAccount" ||
      pathname === "/createAccount/createPin" ||
      pathname === "/createAccount/ResetPassword"
    ) {
      setStep(1);
    } else {
      router.back();
    }
  };

  return (
    <>
      {/* Desktop Navbar */}
      <Box
        display={{ base: "none", md: "block" }}
        py={{ base: "40px", md: "60px" }}
        // px={{ base: "20px", md: "70px" }}
        width="full"
      >
        <HStack justifyContent="space-between" width="100%">
          <Link
            href="#"
            onClick={handleBackClick}
            display={
              pathname === "/createAccount/SuccesS" ? "none" : "block"
            }
          >
            <Box>
              <HStack gap="1px">
                <Box>
                  <SlArrowLeft size={12} />
                </Box>
                <Text fontWeight="600" fontSize="14px">
                  Back
                </Text>
              </HStack>
            </Box>
          </Link>
          <HStack gap="5px">
            <Image
              height="15px"
              width="12px"
              objectFit="cover"
              src="/image/logo.png"
              alt="Bebo"
            />
            <Box height="13px" width="39px">
              <Image src="/image/Bebo.png" alt="Bebo" />
            </Box>
          </HStack>
        </HStack>
      </Box>

      {/* Mobile Navbar */}
      <Box
        display={{ base: "block", md: "none" }}
        pt="31px"
        pb="32px"
        px="22px"
        width="full"
      >
        <HStack justifyContent="space-between">
          <Box>
            <Link
              href="#"
              onClick={handleBackClick}
              display={
                pathname === "/createAccount/SuccesS" ||
                pathname === "/createAccount/createAccount" ||
                pathname === "/createAccount/Login" ||
                pathname === "/createAccount/ResetPassword"
                  ? "none"
                  : "block"
              }
            >
              <SlArrowLeft size={12} />
            </Link>
          </Box>
          <HStack>
            <Image
              height="15px"
              width="12px"
              objectFit="cover"
              src="/image/logo.png"
              alt="Bebo"
            />
            <Box height="13px" width="39px">
              <Image src="/image/Bebo.png" alt="Bebo" />
            </Box>
          </HStack>
        </HStack>
      </Box>
    </>
  );
}
