'use client'
import {
    Box,
    Center,
    Divider,
    VStack,
    Text,
    HStack,
    Button,
    Image,
    SimpleGrid,
    GridItem,
  } from "@chakra-ui/react";
  
  import { BsChevronDown } from "react-icons/bs";
  import { TbCurrencyNaira } from "react-icons/tb";
  import { BsExclamationCircle } from "react-icons/bs";
  import React, { useState } from "react";
  import { ChevronDownIcon } from "@chakra-ui/icons";
import { BuyCrypto, SellCrypto } from "../incompleteKyc/crypto_two";
  

export default function page() {
  return (
    <>
    <Box p={"10px"} height="full" w={"full"}>
    <Box
      //   w="1409px"
      overflow={"hidden"}
      h="full"
      display="flex"
      justifyContent="center"
      alignItems="center"
      backgroundImage="/Image/bg.png" // Setting the background image
      backgroundSize="cover" // Ensures the image covers the entire box
      backgroundPosition="center" // Centers the image within the box
      backgroundRepeat="no-repeat" // Prevents the image from repeating
      pt={"40px"}
      pb={["30px","205px"]}
    >
      <Center>
        <VStack>
          <Box
            bg={"#F8F8F8"}
            padding={"7px"}
            rounded={"16px"}
            border={"1px"}
            borderColor={"#EDEDED"}
          >
            <Box
              bg={"#F2F2F2"}
              padding={"7px"}
              rounded={"12px"}
              border={"1px"}
              borderColor={"#F2F2F2"}
            >
              <Box
            
                bg={"#FFFFFF"}
                rounded={"8px"}
                border={"1px"}
                borderColor={"#FFFFFF"}
                // px={["50px", "107px"]}
                pb={"51px"}
                pt={"40px"}
              >
               { 
                <BuyCrypto />}
              </Box>
            </Box>
          </Box>
          {/* bottom part */}
          <SimpleGrid column={1}
          w={['360px','692px']}
           >
          <GridItem colSpan={1} w={'full'} mb={['36px','0px']}>
            <Button
              bg={"#FFFFFF"}
              w={'100%'}
              py={"18px"}
              boxShadow="xs"
            >
              <Text color={"#021D17"} fontWeight={"600"} fontSize={"16px"}>
                Need help? &nbsp;
              </Text>
              <Text color={"#0CBF94"} fontWeight={"600"} fontSize={"16px"}>
                Contact support
              </Text>
            </Button>
          </GridItem>
          </SimpleGrid>
          <Box
    display={{ base: "block", md: "none" }}
    position="fixed"
    bottom="0"
    width="100%"
    zIndex="10"
    bg="white"
    boxShadow="md"
    justifyContent={'center'}
    w={'full'}
  >
  </Box>
        </VStack>
      </Center>
    </Box>
  </Box>
</>
  )
}
