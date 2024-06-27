'use client'

import { Box, HStack, Text, Image, Flex, GridItem, Center, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import { AiOutlineSwap } from "react-icons/ai";
import { IoIosSettings } from "react-icons/io";
import { FaFolderMinus } from "react-icons/fa6";
import { FaBell } from "react-icons/fa6";
import React from "react";
import navItems from "./navitem";
import NavLink from "./navLink";
import { SlArrowRight } from "react-icons/sl";
import { BsExclamationCircle } from "react-icons/bs";
import ModalKyc from "../incompleteKyc/modalKyc";

export default function NavbarTwo_nokyc() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
   <Box  >
     <Flex  px={["20px","72px"]}
     pt={['30px','28px']}
     pb={['30px','24px']}
    justifyContent={'space-between'}>
      <Box>
        <HStack gap={"72px"}>
          <HStack gap={"5px"}>
            <Image
              height="18px"
              width="15px"
              objectFit="cover"
              src="/image/greenlogo.png"
              alt="Bebo"
            />
            <Box height="15px" width="46px">
              <Image src="/image/Bebogreen.png" alt="Bebo" />
            </Box>
          </HStack>

          <HStack gap={"40px"}>
            {navItems.map((item) => (
              <NavLink  key={item.title} items={item} />
            ))}
          </HStack>
        </HStack>
      </Box>
      <Box>
        <HStack gap={'16px'} >
            <Box>
            <Image
    boxSize={['35px','30px']}
    rounded={'50%'}
    objectFit='cover'
    src='https://bit.ly/dan-abramov'
    alt='Dan Abramov'
  />  
            </Box>
            <Box display={{ base: 'none', md: 'block' }} >
            <FaBell size={"18px"}/>
            </Box>
            <Box display={{ base: 'block', md: 'none' }}  >
            <FaBell size={"25px"}/>
            </Box>
        </HStack>
      </Box>
    </Flex>
    <SimpleGrid display={{ base:"block", md:"none" }} 
    onClick={onOpen}
      w={"380px"}
      bg={"#FEF6E7"}
      py={"16px"}
      rounded={"10px"}
      border={"solid #FEF6E7"}
      boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1) "
      mb={'12px'}
      // ml={'-45px'}
    >
      <Center>
        <GridItem colSpan={[1, 3]} display={{ base: "block", md: "none" }}>
          <Box>
            <HStack gap={"10px"}>
              <Box
                width={"35px"}
                height={"35px"}
                bg={"#FBE2B7"}
                p={"4px"}
                rounded={"50%"}
              >
                <Box
                  width={"28px"}
                  height={"28px"}
                  bg={"#FEF6E7"}
                  p={"4px"}
                  rounded={"50%"}
                >
                  <Box>
                    {" "}
                    <BsExclamationCircle size={"20px"} />
                  </Box>
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection={"column"}
                ml={"10px"}
                gap={"12px"}
              >
                <Box>
                  <Text fontWeight={"600"} fontSize={"14px"} color={"#021D17"}>
                    Complete your KYC
                  </Text>
                </Box>
                <HStack>
                  <Text fontWeight={"500"} fontSize={"12px"} color={"#808080"}>
                    To make transactions you need to have successfully completed
                    your KYC.
                  </Text>
                  <SlArrowRight size={"12px"} />
                </HStack>
              </Box>
            </HStack>
          </Box>
        </GridItem>
      </Center>
    </SimpleGrid>
    <Box > <ModalKyc isOpen={isOpen} onClose={onClose}/></Box>
   </Box>
   
  );
}
