'use client'

import { Box, HStack, Link,Text, VStack} from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import React from 'react'
import navItems from './navitem';
import { AiOutlineSwap } from 'react-icons/ai';
 

interface navitem {
    path: string;
    icon:  React.ReactNode; 
    title: string;
  }
export default function NavLink({ items }: { items: navitem }) {
    const pathname = usePathname() == items.path;
  return (
    <Link href={items.path} display={{ base: 'none', md: 'block' }}
    _hover={{
        // bg: pathname?"":'#099137',
        transform: "scale(1.1)",
        paddingRight:"10px",
        paddingLeft:"5px",
        borderRadius:'5px'
      }}
      //bg={pathname ? "#099137" : ""}
      >
    <HStack gap={"8px"}>
    <Box>
      {items.icon}
    </Box>
    <Text  fontSize={"18px"} fontWeight={"600"} color={pathname ? "#099137" :"#999999"}>
      {items.title}
    </Text>
  </HStack>
    </Link>
  )
}



interface navitem {
    path: string;
    icon:  React.ReactNode; 
    title: string;
  }
export function NavLinkMobile({ items }: { items: navitem }) {
    const pathname = usePathname() == items.path;
  return (
    <Link href={items.path} 
    _hover={{
        // bg: pathname?"":'#099137',
        transform: "scale(1.1)",
        paddingRight:"10px",
        paddingLeft:"5px",
        borderRadius:'5px'
      }}
      //bg={pathname ? "#099137" : ""}
      >
    <VStack gap={''}>
    <Box>
      {items.icon}
    </Box>
    <Text  fontSize={"16px"} fontWeight={"600"} color={pathname ? "#099137" :"#999999"}>
      {items.title}
    </Text>
  </VStack>
    </Link>
  )
}
