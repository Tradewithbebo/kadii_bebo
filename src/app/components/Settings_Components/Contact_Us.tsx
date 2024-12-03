/* eslint-disable react/no-unescaped-entities */
'use client'

import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  VStack,
  Text,
  useDisclosure,
  useToast,
  Spinner,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Divider,
  GridItem,
  SimpleGrid,
} from '@chakra-ui/react'
import { useCryptoContext } from '../drawer/Buy/usecontextbuy'
import { AxiosDelete, AxiosGet } from '@/app/axios/axios'

interface policy{
  isOpen:any,
  onClose :any
}

export default function Contact_Us({ isOpen, onClose }: policy) {
  
  return (
    <>
     <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={["xs", "xs", "sm"]}>
  <DrawerOverlay />
  <DrawerContent>
    <DrawerCloseButton />
    <DrawerHeader>Our Contact </DrawerHeader>
    <DrawerBody>
     <Accordion items={termsAndPrivacyPolicy}/>
              
    </DrawerBody>
    <DrawerFooter>
      <Button variant="outline" mr={3} onClick={onClose}>
        Close
      </Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>


  </> )}




import { Collapse } from "@chakra-ui/react";

export const Accordion = ({ items }: { items: any }) => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const toggleItem = (item: number) => {
    setOpenItem((prevItem) => (prevItem === item ? null : item));
  };

  return (
    <VStack w="full" spacing={4}>
      {items.map((item: any, index: number) => (
        <Box key={index} w="full" borderBottom="1px solid" borderColor="gray.200">
          <Button
            w="full"
            textAlign="left"
            py={4}
            px={2}
            fontSize="lg"
            fontWeight="medium"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            bg="transparent"
            _hover={{ bg: "gray.50" }}
            onClick={() => toggleItem(index)}
          >
            {item.title}
            <Text>{openItem === index ? "−" : "+"}</Text>
          </Button>
          <Collapse in={openItem === index} animateOpacity>
            <Box px={4} py={2} fontSize="sm">
              {item.content}
            </Box>
          </Collapse>
        </Box>
      ))}
    </VStack>
  );
};

const termsAndPrivacyPolicy = [
  
  {
    title: "Contact Us",
    content: (
      <div>
        <p>
          For questions or support, email us at <a href="mailto:info@tradewithbebo.com">info@tradewithbebo.com</a>.
        </p>
      </div>
    ),
  },
];
