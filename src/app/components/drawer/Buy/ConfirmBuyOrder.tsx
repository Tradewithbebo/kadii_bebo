import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  GridItem,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { ConfirmBuy, MarketRate } from "./NotificationBuy";
import {  Press } from "./generalformpage";

export default function ConfirmBuyOrder({
  Amount,
  conversion,
  currency,
  setStep,
  crypto,
  loading,sybl,nn
}: {
  Amount: any;
  conversion: any;
  currency: any;
  setStep: any;
  crypto: any;
  loading:any;
  sybl:any
  nn:any
}) {
  // const handleProceed = () => {
  //   setStep(4);
  // };
  return (
    <Box p={4}>
      <SimpleGrid columns={1}>
        <GridItem colSpan={1}>
          <Text fontWeight="600" fontSize="25px">
            Confirm buy order
          </Text>
        </GridItem>
        <GridItem colSpan={1} mt={"18px"}>
          <Text fontWeight="600" fontSize="15px" color="#666666">
            Confirm amount of {sybl} you want to buy
          </Text>
        </GridItem>

        <GridItem mt={"40px"}>
          <ConfirmBuy
            Amount={Amount}
            conversion={conversion}
            currency={currency}
            crypto={crypto}
            nn={nn}
          />
        </GridItem>
        <GridItem colSpan={1} mt={"28px"}>
          {/* <Press loading={loading}/> */}
        </GridItem>
      </SimpleGrid>
    </Box>
  );
}
