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
import Selectnaira from "./selectsellnaira";
import SelectUSDT from "./selectsellusdt";
import { ConfirmSell } from "../Buy/NotificationBuy";
import ConfirmsellOrder from "./ConfirmSellOrder";
import { useCryptoContext } from "../Buy/usecontextbuy";
import SendMoney from "./SendMoney";
import SuccessBuy from "./success";

export default function Generalsell({
    isOpen,
    onClose,
    onOpen
  }: {
    isOpen: any;
    onClose: any;
    onOpen:any;
  }) {
//  const {setcurrency,currency} = useCryptoContext();

  const [step, setStep] = useState(1);
// const handleclick=()=>{
// setcurrency(!currency)
// }
const Backward = () => {
  step==10?setStep(1) : setStep((cur: number) => cur - 1);}
  return (
    <Box>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={() => {
          onClose(), step === 7 && setStep(1);
        }}
        size={"sm"}
      >
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
            <DrawerCloseButton
              onClick={() => {
                step === 7 && setStep(1);
              }}
            />
          </HStack>
          <DrawerBody>
            {/* // eslint-disable-next-line react/no-children-prop */}
            {step === 1 ? (
              <SellAddBank Setstep={setStep} />
            ) : step === 10 ? (
              <AddBank setStep={setStep} />
            ) : step === 2 ? (
              <SelectAsset setStep={setStep} />
            ) : step === 3 ? (
            
                <SelectUSDT setStep={setStep}  />
              )
             : step === 4 ? (
              <ConfirmsellOrder setStep={setStep} />
            ) : step === 5 ? (
              <SendcryptoQrcode setstep={setStep} />
            ) : step === 6 ? (
              <SendMoney setStep={setStep} />
            ) : step === 7 ? (
              <SuccessBuy />
            ) : (
              ""
            )}
          </DrawerBody>
          <DrawerFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={() => {
                onClose(), step === 7 && setStep(1);
              }}
            >
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
