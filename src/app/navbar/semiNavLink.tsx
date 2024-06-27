// 'use client'

// import { Box, HStack, Link,Text} from '@chakra-ui/react';
// import { usePathname } from 'next/navigation';
// import React, { useState } from 'react'
// import navItems from './navitem';
// import { AiOutlineSwap } from 'react-icons/ai';
 

// interface navitem {
//     path: string;
//     icon:  React.ReactNode; 
//     title: string;
//   }
// export default function SemiNavLink({ items }: { items: navitem }) {
//     const [Buy, setBuy] = useState(true);
//     const [Sell, setSell] = useState(false);
//     const handleTogglesell = () => {
//         setBuy(false); // Toggle between Sell and Buy
//       };
//       const handleToggleBuy = () => {
//         setSell(true); // Toggle between Sell and Buy
//       };
//     const pathname = usePathname() == items.path;
//   return (
//     <Box onClick={items.title==='Sell Crypto'?handleToggleBuy:handleTogglesell}
//     cursor="pointer"  >
//     <HStack gap={"8px"}  bg={Buy ? '#DADADA' : 'transparent'} rounded={'3px'} p={'5px'}  height={'29px'} width={'117px'} ml={pathname ? '3px':""} >
//     <Box>
//       {items.icon}
//     </Box>
//     <Text  fontSize={"16px"} fontWeight={"600"} >
//       {items.title}
//     </Text>
//   </HStack>
//     </Box>
//   )
// }
