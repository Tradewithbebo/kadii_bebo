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
          templateColumns={{ base: "repeat(2, 1fr)" }}
          gap={2}
          height={{ base: "auto", md: "35px" }}
          width={{ base: "100%", sm: "300px", md: "350px", lg: "400px" }}
          bg={"#F0F0F0"}
          rounded={"6px"}
          px={{ base: "10px", md: "5px" }}
          py={{ base: "10px", md: "0px" }}
        >
          <GridItem
            cursor={"pointer"}
            onClick={handleToggleBuy}
            bg={Buy ? "#DADADA" : "transparent"}
            rounded={"3px"}
            p={{ base: "10px", md: "5px" }}
            display={"flex"}
            alignItems={"center"}
            gap={"4px"}
            justifyContent={"center"}
          >
            <Box height="18px" width="18px">
              <Image src="/image/send.png" alt="Bebo" />
            </Box>
            <Text
              fontWeight={"600"}
              fontSize={{ base: "12px", lg: "15px" }}
              color={Buy ? "#021D17" : "#666666"}
            >
              Sell crypto
            </Text>
          </GridItem>

          <GridItem
            cursor={"pointer"}
            onClick={handleTogglesell}
            bg={Sell ? "#DADADA" : "transparent"}
            rounded={"3px"}
            p={{ base: "10px", md: "5px" }}
            display={"flex"}
            alignItems={"center"}
            gap={"4px"}
            justifyContent={"center"}
          >
            <Box height="18px" width="18px">
              <Image src="/image/Buy.png" alt="Bebo" />
            </Box>
            <Text
              fontWeight={"600"}
              fontSize={{ base: "12px", lg: "15px" }}
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
