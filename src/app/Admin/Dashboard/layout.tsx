'use client'
import { Flex, Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Navbar from "./navbar/navbar";
import Sidebar from "./sidebar/sidebar";
import { redirect, useRouter } from "next/navigation";
export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
   
  useEffect(() => {
    const auth = localStorage.getItem("stk-apk");
    if (!auth) {
      router.replace("/Admin/Login");
    }
  }, [router]);
  return (
    <Flex flexDirection={'column'}>
      <Box position="sticky" top={'0px'}  left="0" width="100%" zIndex="1000" bg="white" >
        <Navbar/>
      </Box>
      <Box>
        <Flex w={'full'} height={'auto'}>
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