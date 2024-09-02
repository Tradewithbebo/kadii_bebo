'use client'

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
  HStack,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import SellAddBank from "./SellAddBanks";
import AddBank from "./addBank";
import { IoIosArrowBack } from "react-icons/io";
import SelectAsset from "./SelectAsset";
import SendcryptoQrcode from "./SendcryptoQrcode";

export default function Generalsell({
    isOpen,
    onClose,
    onOpen
  }: {
    isOpen: any;
    onClose: any;
    onOpen:any;
  }) {
  const [step, setStep] = useState(4);
//   const { onOpen } = useDisclosure();
const Backward = () => {
    setStep((cur: number) => cur - 1);}
  return (
    <Box>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"sm"}>
        <DrawerOverlay />
        <DrawerContent>
          <HStack>
            <Box
              cursor={"pointer"}
              onClick={Backward}
              position={"absolute"}
              mt={["45px", "40px"]}
              ml={["15px", "10px"]}
              display={step === 1 ? "none" : "block"}
            >
              <IoIosArrowBack size={"20px"} />
            </Box>
            <DrawerCloseButton />
          </HStack>
          <DrawerBody>
            {/* // eslint-disable-next-line react/no-children-prop */}
            {step === 1 ? (
              <SellAddBank Setstep={setStep} />
            ) : step === 2 ? (
              <AddBank setStep={setStep} />
            ) : step === 3 ? (
              <SelectAsset />
            ) :step===4?(
              <SendcryptoQrcode/>
            ):("")}
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
