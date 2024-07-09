"use client";
import React from "react";
import Sidebar from "../SettingsComponents/Sidebar";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { settings } from "../SettingsComponents/Sidebaritems";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HStack w={"full"}  mb={'38px'} >
        <Box>
          <Text fontWeight={"700"} fontSize={"24px"}>
            Settings
          </Text>
        </Box>
        <Box>
          <Text fontWeight={"600"} fontSize={"16px"} color={"#71717A"}>
            here is what’s happening today
          </Text>
        </Box>
      </HStack>
      <HStack w={"full"} gap={"70px"}  h={'full'}>
    
       <VStack flex={1}display={"flex"} h={'full'}>
          {" "}
          {settings.map((setting) => (
            <Sidebar settings={setting} key={setting.title} />
          ))}{" "}
        </VStack>


        <Box flex={5} pb={'170px'}  h={'full'}>
          {children}
        </Box>
      </HStack>
    </>
  );
}
