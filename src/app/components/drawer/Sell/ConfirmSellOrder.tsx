import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  GridItem,
  HStack,
  SimpleGrid,
  Text,
  Image
} from "@chakra-ui/react";
import React from "react";
import { ConfirmBuy, ConfirmSell } from "../Buy/NotificationBuy";
import { useCryptoContext } from "../Buy/usecontextbuy";
// import { ConfirmBuy, MarketRate } from "./NotificationBuy";
// import {  Press } from "./generalformpage";

export default function ConfirmsellOrder({ setStep }: { setStep: any }) {
  const {
    setblockchain,
    sellRate,
    setsellRate,
    sellimage,
    setsellimage,
    sellsymbol,
    setsellsymbol,
    sellConversion,
    sellConversion2,
    setsellConversion2,
    // selectedsellNetwork,
    // setSelectedsellNetwork,
    blockchain,
    sellvalunaira,
    setsellvaluenaira,
    sellvalueusdt,
    setsellvalueusdt,
  } = useCryptoContext();
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
            Confirm amount of {blockchain} you want to sell
          </Text>
        </GridItem>

        <GridItem mt={"40px"}>
          <SimpleGrid
            w={"auto"}
            bg={"#F8F8F8"}
            p={"16px"}
            rounded={"10px"}
            rowGap={"16px"}
            border={"1px"}
            borderColor="gray.200"
            mb={"12px"}
          >
            <GridItem
              colSpan={[1, 3]}
              display={"flex"}
              justifyContent={"center"}
              w={"full"}
            >
              <HStack h={"full"}>
                <Box>
                  <Text
                    fontWeight={"600"}
                    fontSize={"24px"}
                    color={"#021D17"}
                    textAlign={"center"}
                    w={"full"}
                  >
                    {sellvalueusdt}
                  </Text>
                </Box>
                <Box boxSize="25px">
                  <Image src={sellimage} alt="Dan Abramov" />
                </Box>
              </HStack>
            </GridItem>
            <GridItem
              colSpan={[1, 3]}
              display={"flex"}
              justifyContent={"center"}
              w={"full"}
            >
              <Text
                fontWeight={"600"}
                fontSize={["16px"]}
                color="#666666"
                textAlign={"center"}
                w={"full"}
              >
                You will send {sellvalueusdt} {blockchain} for <br></br>{" "}
                {new Intl.NumberFormat("en-NG", {}).format(
                  Number(sellConversion2)
                )}{" "}
                naira
              </Text>
            </GridItem>
          </SimpleGrid>
        </GridItem>
        <GridItem colSpan={1} mt={"28px"} w={"full"}>
          <Button
            w={"full"}
            h={["50px", "50px", "44px"]}
            bg={"#0CBF94"}
            onClick={() => setStep(5)}
          >
            Proceed
          </Button>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
}
