"use client";
import { Link, Flex, HStack, Box,Text } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import React from "react";
import { settings } from './menuItems';

interface MenuItem {
  path: string;
  icon: React.ReactNode; // Assuming that 'icon' is a React node
  title: string;
}
export default function Menulink({ items }: { items: MenuItem }) {
  const pathname = usePathname() == items.path;
  return (
    <Link
      href={items.path}
      mb="16px"
      p={pathname ? "5px" : ""}
      display="Flex"
      // gap="10px"
      rounded={pathname ? "5px" : ""}
      alignItems="center"
      _hover={{
        p:'5px',
        bg: "#0CBF94",
        rounded:'5px',
        transform: "scale(1.1)",
      }}
      //  transition='transform 0.5s  ease,background-color 0.7s ease'
      bg={pathname ? "#0CBF94" : ""}
    >
      <HStack gap={'13px'}>
        <Box>  {items.icon} </Box>
        <Text color={'#3F3F46'} fontWeight={'500'} fontSize={'13px'}> {items.title} </Text>
      </HStack>
    </Link>
  );
}
export  function Menulinkdasboard({ items }: { items: MenuItem }) {
  const pathname = usePathname() == items.path;
  return (
    <Link
      href={items.path}
      mb="16px"
      display="Flex"
      gap="10px"
      p={pathname ? "5px" : ""}
      rounded={pathname ? "5px" : ""}
      alignItems="center"
      _hover={{
        p:'5px',
        bg: "#0CBF94",
        rounded:'5px',
        transform: "scale(1.1)",
      }}
      //  transition='transform 0.5s  ease,background-color 0.7s ease'
      bg={pathname ? "#0CBF94" : ""}
    >
      <HStack gap={'13px'}>
        <Box>  {items.icon} </Box>
        <Text color={'#3F3F46'} fontWeight={'500'} fontSize={'13px'}> {items.title} </Text>
      </HStack>
    </Link>
  );
}
export  function Settings({ items }: { items: MenuItem }) {
  const pathname = usePathname() == items.path;
  return (
    <Link
      href={items.path}
      mb="16px"
      p={pathname ? "5px" : ""}
      rounded={pathname ? "5px" : ""}
      display="Flex"
      // gap="10px"
      alignItems="center"
      _hover={{
        p:'5px',
        bg: "#0CBF94",
        rounded:'5px',
        transform: "scale(1.1)",
      }}
      //  transition='transform 0.5s  ease,background-color 0.7s ease'
      bg={pathname ? "#0CBF94" : ""}
    >
      <HStack gap={'13px'}>
        <Box>  {items.icon} </Box>
        <Text color={'#3F3F46'} fontWeight={'500'} fontSize={'13px'}> {items.title} </Text>
      </HStack>
    </Link>
  );
}
