import { Box, HStack, Link, Text, VStack } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import React from "react";
import { settings } from "./Sidebaritems";

export default function Sidebar({settings}:{settings:any}) {
    const pathname = usePathname() == settings.path;
  return (
    <Box w={"full"} >
     
     <VStack w={'full'} gap={'16px'}>
        <Box w={'full'}>
<Text color={'#A1A1AA'} fontWeight={'500'} fontSize={'16px'}>{settings.title}</Text>
        </Box>
        <Link
        w={'full'}
      href={settings.path}
    //   mb="16px"
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
     <HStack gap={'13px'} w={'full'}>
        <Box>  {settings.icon} </Box>
        <Text color={'#3F3F46'} fontWeight={'500'} fontSize={'13px'}> {settings.subTitle} </Text>
      </HStack>
      </Link>
     </VStack>
    
    </Box>
  );
}
