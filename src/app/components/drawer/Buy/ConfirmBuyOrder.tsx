import { Box, Button, FormControl, FormErrorMessage, GridItem, SimpleGrid,Text } from '@chakra-ui/react';
import React from 'react'
import { ConfirmBuy, MarketRate } from './NotificationBuy';

export default function ConfirmBuyOrder({setStep}:{setStep:any}) {
    const handleProceed = () => {
        setStep((cur: number) => cur + 1);
      };
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
        Confirm amount of USDT you want to buy
        </Text>
      </GridItem>

      <GridItem mt={"40px"}>
        <ConfirmBuy />
      </GridItem>
      <GridItem colSpan={1} mt={"28px"}>
        <Button
          onClick={handleProceed}
          type="button"
          w={"full"}
          bg={"#0CBF94"}
          fontSize={"16px"}
          fontWeight={"600"}
          color={ "#021D17"}
          
        //   _hover={{
        //     bg:  "gray.400",
        //   }}
        >
          Proceed to buy USDT
        </Button>
      </GridItem>
    </SimpleGrid>
  </Box>
  )
}
