
import { Flex, Box } from "@chakra-ui/react";
import React from "react";
import Navbar from "./navbar/navbar";
import Sidebar from "./sidebar/sidebar";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Flex flexDirection={'column'}>
      <Box position="sticky" top={'0px'}  left="0" width="100%" zIndex="1000" bg="white" >
        <Navbar/>
      </Box>
      <Box>
        <Flex w={'full'}>
       <Box flex={'1'}>
       <Sidebar />
       </Box>
        <Box flex={'4'} pl={'45px'} pt={'33px'} pr={'54px'}>{children} 

        </Box>
        </Flex>
      </Box>
    </Flex>
  );
}