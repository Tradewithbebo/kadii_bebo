import { Box, Center, Divider, HStack, Text, Image } from "@chakra-ui/react";
import React, { useState } from "react";
import { IoIosSettings } from "react-icons/io";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

export default function SemiNav({
  Sell,
  Buy,
  handleToggleBuy,
  handleTogglesell,
}: {
  Sell: any;
  Buy: any;
  handleToggleBuy: any;
  handleTogglesell: any;
}) {
  return (
    <Box>
      <Box pt={"10px"} pb={"16px"}>
        {" "}
        <Divider />
      </Box>
      <Center>
        <HStack
          //   gap={"8px"}
          justifyContent={"space-between"}
          height={"35px"}
          width={"244px"}
          bg={"#F0F0F0"}
          rounded={"6px"}
          px={"5px"}
        >
          <HStack
            cursor={"pointer"}
            onClick={handleToggleBuy}
            bg={Buy ? "#DADADA" : "transparent"}
            rounded={"3px"}
            p={"5px"}
            py={"3px"}
            pl={"12px"}
            width={"117px"}
            gap={"4px"}
          >
            <Box height="18px" width="18px">
              <Image src="/image/send.png" alt="Bebo" />
            </Box>
            <Text
              fontWeight={"600"}
              fontSize={{base:'10px',lg:"15px",md:"12px"}}
              color={Buy ? "#021D17" : "#666666"}
            >
              Sell crypto
            </Text>
          </HStack>

          <HStack
            cursor={"pointer"}
            onClick={handleTogglesell}
            bg={Sell ? "#DADADA" : "transparent"}
            rounded={"3px"}
            p={"5px"}
            py={"3px"}
            pl={""}
            width={"117px"}
            gap={"4px"}
          >
            <Box height="18px" width="18px">
              <Image src="/image/Buy.png" alt="Bebo" />
            </Box>
            <Text
              fontWeight={"600"}
              fontSize={{base:'10px',lg:"15px",md:"12px"}}
              color={Sell ? "#021D17" : "#666666"}
            >
              Buy crypto
            </Text>
          </HStack>
        </HStack>
      </Center>
      <Box pt={"16px"}>
        {" "}
        <Divider />
      </Box>
    </Box>
  );
}
{
  /* <Box bg={isBuy ? 'transparent' : '#DADADA'} rounded={'6px'} p={'5px'}>
<Text fontWeight={isBuy ? 'normal' : 'bold'}>Sell Crypto</Text> {/* Conditional styling */
}
// </Box> */}
