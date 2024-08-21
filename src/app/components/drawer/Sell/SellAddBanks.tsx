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
  Text,
  GridItem,
  SimpleGrid,
  Divider,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa6";

import React, { ReactNode } from "react";

export default function SellAddBank({ Setstep}: { Setstep: any }) {
  const existingBank = [
    { name: "Ademola Lookman", account_number: "3088908714", Bank: "Gtb" },
    { name: "Ademola Lookman", account_number: "3088908714", Bank: "Gtb" },
    { name: "Ademola Lookman", account_number: "3088908714", Bank: "Gtb" },
    { name: "Ademola Lookman", account_number: "3088908714", Bank: "Gtb" },
    { name: "Ademola Lookman", account_number: "3088908714", Bank: "Gtb" },
    { name: "Ademola Lookman", account_number: "3088908714", Bank: "Gtb" },
  ];
  return (
    <Box p={4}>
      <SimpleGrid columns={1} w={"full"}>
        <GridItem colSpan={1}>
          <Text fontWeight="600" fontSize="25px">
            Select bank account
          </Text>
        </GridItem>
        <GridItem colSpan={1} mt={"px"}>
          <Text fontWeight="600" fontSize={["11px", "15px"]} color="#666666">
            Add your preferred bank for instant payout
          </Text>
        </GridItem>
        <GridItem
          colSpan={1}
          overflowY="scroll"
          maxH={'200px'}
          mt={"18px"}
          sx={{
            "::-webkit-scrollbar": { display: "none" },
            "-ms-overflow-style": "none", 
            "scrollbar-width": "none", 
          }}
        >
          <SimpleGrid
          onClick={()=>{
            Setstep(3)
          }}
          mb={'8px'}
            columns={6}
            w={"full"}
            gap={"40px"}
            p={"16px"}
            border={"1px"}
            bgColor={"#f3f4f6"}
            borderColor={"#e5e7eb"}
            borderRadius={"10px"}
            cursor={'pointer'}
          >
            <GridItem
              colSpan={6}
              display={"flex"}
              w={"full"}
              justifyContent={"start"}
            >
              <Text fontWeight={"600"} fontSize={"16px"}>
                Oshodi David
              </Text>
            </GridItem>
            <GridItem
              colSpan={1}
              display={"flex"}
              w={"full"}
              justifyContent={"start"}
            >
              <Text fontWeight={"400"} fontSize={"14px"}>
                0163478963
              </Text>
            </GridItem>
            <GridItem
              colSpan={1}
              display={"flex"}
              w={"full"}
              justifyContent={"end"}
              ml={"6px"}
            >
              <Divider
                orientation="vertical"
                color={"#d4d4d8"}
                variant={"solid"}
                border={"1px"}
              />
            </GridItem>
            <GridItem
              colSpan={1}
              display={"flex"}
              w={"full"}
              justifyContent={"end"}
            >
              <Text fontWeight={"400"} fontSize={"14px"}>
                GTbank
              </Text>
            </GridItem>
            
          </SimpleGrid>
          <SimpleGrid
            columns={6}
            w={"full"}
            gap={"40px"}
            p={"16px"}
            border={"1px"}
            bgColor={"#f3f4f6"}
            borderColor={"#e5e7eb"}
            borderRadius={"10px"}
          >
            <GridItem
              colSpan={6}
              display={"flex"}
              w={"full"}
              justifyContent={"start"}
            >
              <Text fontWeight={"600"} fontSize={"16px"}>
                Oshodi David
              </Text>
            </GridItem>
            <GridItem
              colSpan={1}
              display={"flex"}
              w={"full"}
              justifyContent={"start"}
            >
              <Text fontWeight={"400"} fontSize={"14px"}>
                0163478963
              </Text>
            </GridItem>
            <GridItem
              colSpan={1}
              display={"flex"}
              w={"full"}
              justifyContent={"end"}
              ml={"6px"}
            >
              <Divider
                orientation="vertical"
                color={"#d4d4d8"}
                variant={"solid"}
                border={"1px"}
              />
            </GridItem>
            <GridItem
              colSpan={1}
              display={"flex"}
              w={"full"}
              justifyContent={"end"}
            >
              <Text fontWeight={"400"} fontSize={"14px"}>
                GTbank
              </Text>
            </GridItem>
          </SimpleGrid>
        </GridItem>
        <GridItem colSpan={1} mt={"30"}>
          <Button
            width={"full"}
            color={"#0CBF94"}
            fontSize={"16px"}
            fontWeight={"600"}
            onClick={() => Setstep(2)}
          >
            <FaPlus /> &nbsp; &nbsp;Add bank
          </Button>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
}
