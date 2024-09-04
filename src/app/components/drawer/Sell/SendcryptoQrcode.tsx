import {
  Box,
  Button,
  GridItem,
  HStack,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { NotificationSell } from "./sellNotification";

export default function SendcryptoQrcode() {
  return (
    <Box p={4}>
      <SimpleGrid columns={2} rowGap={"28px"}>
        <GridItem colSpan={2}>
          <Text fontWeight="600" fontSize="25px">
          Send crypto
          </Text>
        </GridItem>
        <GridItem colSpan={2} mt={"-10px"}>
          <Text fontWeight="600" fontSize={["15px", "15px"]} color="#666666">
          Send your crypto to the wallet address below
          </Text>
        </GridItem>
        <GridItem colSpan={2} w={"full"}>
            <NotificationSell />
          </GridItem>
        <GridItem colSpan={2}>
          <Box
            mt={"8px"}
            w={"fit-content"}


            
            bg={"#E7F6EC"}
            p={"5px"}
            borderRadius={"5px"}
          ></Box>
        </GridItem>

        <GridItem colSpan={2}>
          <Button
            h={["50px", "50px", "44px"]}
            bg="#0CBF94"
            w={"full"}
            color={"#021D17"}
            fontSize={"16px"}
            fontWeight={"600"}
            type="submit"
            // isDisabled={!isValid}
          >
            I have sent crypto
          </Button>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
}
