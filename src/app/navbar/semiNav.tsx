import { Box, Center, Divider, Grid, GridItem, Text, Image } from "@chakra-ui/react";
import React from "react";

export default function SemiNav({
  Sell,
  Buy,
  handleToggleBuy,
  handleTogglesell,
}: {
  Sell: any;
  Buy: any;
  handleToggleBuy: any;
  handleTogglesell: any;
}) {
  return (
    <Box>
      <Box pt={"10px"} pb={"16px"}>
        <Divider />
      </Box>
      <Center>
        <Grid
          templateColumns="repeat(2, 1fr)"
          gap={2}
          height={"35px"}
          width={"244px"}
          bg={"#F0F0F0"}
          rounded={"6px"}
          px={"5px"}
        >
          <GridItem
            as={Box}
            cursor={"pointer"}
            onClick={handleToggleBuy}
            bg={Buy ? "#DADADA" : "transparent"}
            rounded={"3px"}
            p={"5px"}
            py={"3px"}
            pl={"12px"}
            display={"flex"}
            alignItems={"center"}
            gap={"4px"}
          >
            <Box height="18px" width="18px">
              <Image src="/image/send.png" alt="Bebo" />
            </Box>
            <Text
              fontWeight={"600"}
              fontSize={{ base: '10px', lg: "15px", md: "12px" }}
              color={Buy ? "#021D17" : "#666666"}
            >
              Sell crypto
            </Text>
          </GridItem>

          <GridItem
            as={Box}
            cursor={"pointer"}
            onClick={handleTogglesell}
            bg={Sell ? "#DADADA" : "transparent"}
            rounded={"3px"}
            p={"5px"}
            py={"3px"}
            display={"flex"}
            alignItems={"center"}
            gap={"4px"}
          >
            <Box height="18px" width="18px">
              <Image src="/image/Buy.png" alt="Bebo" />
            </Box>
            <Text
              fontWeight={"600"}
              fontSize={{ base: '10px', lg: "15px", md: "12px" }}
              color={Sell ? "#021D17" : "#666666"}
            >
              Buy crypto
            </Text>
          </GridItem>
        </Grid>
      </Center>
      <Box pt={"16px"}>
        <Divider />
      </Box>
    </Box>
  );
}
