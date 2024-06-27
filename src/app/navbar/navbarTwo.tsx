import { Box, HStack, Text, Image, Flex } from "@chakra-ui/react";
import { AiOutlineSwap } from "react-icons/ai";
import { IoIosSettings } from "react-icons/io";
import { FaFolderMinus } from "react-icons/fa6";
import { FaBell } from "react-icons/fa6";
import React from "react";
import navItems from "./navitem";
import NavLink from "./navLink";

export default function NavbarTwo() {
  return (
   <Box  >
     <Flex px={["20px","72px"]}
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
   </Box>
  );
}
