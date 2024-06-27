import { Box, VStack, Text, Flex, Image, SimpleGrid, GridItem } from "@chakra-ui/react";
import React from "react";

export default function GeneralDisplay() {
  return (
   <Box w={'full'} bg={"#F5F5F5"} h={'full'}>
     <SimpleGrid
    column={1}
    //   bg={"#F5F5F5"}
      pt={"89px"}
      pl={"65px"}
      pb={'117x'}
  
      width={"full"}
    //   height={"full"}
      backgroundSize="cover" // Ensures the image covers the entire box
      backgroundPosition="center" // Centers the image within the box
      backgroundRepeat="no-repeat"
      overflow={"hidden"}
    >
      <GridItem colSpan={1}  pl={['9px','40px']}>
            <Text color={"#000000"} fontWeight={"600"} fontSize={"24px"}>
              Crypto to cash
            </Text>
          </GridItem>
          <GridItem colSpan={1} pl={['10px','40px']} mb={'42px'}>
            <Text color={"#4D4D4D"} fontWeight={"500"} fontSize={"16px"}>
              Bebo Inc is a cryptocurrency-to-fiat swap platform designed to
              facilitate secure and user-friendly<br></br> conversion of various
              cryptocurrencies to local fiat currencies and vice versa,
              including Bitcoin to <br></br>Naira (NGN), Ethereum to Naira, and
              binance coin(BNB) to Naira, USDT to Naira and many more
            </Text>
          </GridItem>
          <GridItem w={'full'}>
          <Image src="/image/Home page.png" alt="Bebo" />
     
        </GridItem>
      </SimpleGrid>
   </Box>
  );
}
