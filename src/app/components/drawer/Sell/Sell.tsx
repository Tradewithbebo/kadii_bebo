"use client";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
  useDisclosure,
  ChakraProvider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  Box,
  Text
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa6";

import React from "react";

export default function Sell({
  isOpen,
  onClose,
}: {
  isOpen: any;
  onClose: any;
}) {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const btnRef = React.useRef()

  return (
    <>
      
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        //   finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>

          <VStack gap={'18px'}>
        <Box > <Text fontSize={"28px"} fontWeight={"600"} mr={'18px'} >
            Select bank account
          </Text></Box>
          <Box><Text color={"#666666"} fontSize={"18px"} fontWeight={"600"}>
            Add your preferred bank for instant payout
          </Text></Box>
         </VStack>

          </DrawerHeader>
        
          <DrawerBody>
            <VStack gap={"28px"}>
              <Box width={"full"}>
                <Button
                  width={"full"}
                  color={"#0CBF94"}
                  fontSize={"16px"}
                  fontWeight={"600"}
                >
                  <FaPlus /> &nbsp; &nbsp;Add bank
                </Button>
              </Box>
              <Box width={"full"}>
                <Button width={"full"} color={'#B3B3B3'}>Continue</Button>
              </Box>
            </VStack>
          </DrawerBody>
          <DrawerBody></DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
