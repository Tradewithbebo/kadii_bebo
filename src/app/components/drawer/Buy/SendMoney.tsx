'use client'
import { Box, Button, GridItem, HStack, SimpleGrid, Text, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { ConfirmBuy, ConfirmBuyAlert } from "./NotificationBuy";
import { IoCopyOutline } from "react-icons/io5";

export default function SendMoney({ setStep }: { setStep: any }) {
  const handleProceed = () => {
    setStep(5);
  };
  const toast = useToast()
  const [ Wallet,setWallet]=useState('0xy83929ruhdi23uhbd92bf9g2bjbfbfvxtyuv...')

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast({
          title: "Copied to clipboard.",
          description: `Copied: ${text}`,
          status: "success",
          duration: 2000,
          isClosable: true,
          position: 'top-right',
        });
      })
      .catch(err => {
        console.error("Could not copy text: ", err);
      });
  };
  return (
    <Box p={4}>
      <SimpleGrid columns={1}>
        <GridItem colSpan={1}>
          <Text fontWeight="600" fontSize="25px">
            Send money
          </Text>
        </GridItem>
        <GridItem colSpan={1} mt={"18px"}>
          <Text fontWeight="600" fontSize="15px" color="#666666">
            Send funds to the account details below
          </Text>
        </GridItem>

        <GridItem mt={"40px"}>
          <ConfirmBuyAlert />
        </GridItem>
        <GridItem colSpan={1} mt={"28px"}>
          <SimpleGrid
            columns={2}
            bg={"#F8F8F8"}
            px={"16px"}
            py={"24px"}
            // boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1) "
            rounded={"10px"}
          >
             <GridItem colSpan={2} >
              <Text fontSize={"16px"} fontWeight={"600"} color={"#021D17"}>
              Send only ₦ 1,000,000 for 10.00 USDT to the account details below :
              </Text>
            </GridItem>
            <GridItem colSpan={1} mt={"45px"}>
              <Text fontSize={"16px"} fontWeight={"600"} color={"#808080"}>
                Account name
              </Text>
            </GridItem>
            <GridItem
              colSpan={1}
            //   mt={"28px"}
              width={"full"}
              justifyContent={"end"}
              display={"flex"}
              mt={"45px"}
            >
              <Text fontSize={"16px"} fontWeight={"600"} color={"#808080"}>
                Account number
              </Text>
            </GridItem>
            <GridItem colSpan={1} mt={"12px"}>
              <Text fontSize={"16px"} fontWeight={"600"} color={"#021D17"}>
                Bebo cryptocurrency limited (ltd)
              </Text>
            </GridItem>
            <GridItem
              colSpan={1}
              mt={"12px"}
              width={"full"}
              justifyContent={"end"}
              display={"flex"}
            >
              <Text fontSize={"16px"} fontWeight={"600"} color={"#021D17"}>
                0163568964
              </Text>
            </GridItem>
            <GridItem colSpan={2} mt={"28px"}>
              <Text fontSize={"16px"} fontWeight={"600"} color={"#808080"}>
                Bank Name
              </Text>
            </GridItem>
            <GridItem colSpan={2} mt={"12px"}>
              <Text fontSize={"16px"} fontWeight={"600"} color={"#021D17"}>
                GTbank
              </Text>
            </GridItem>
          </SimpleGrid>
        </GridItem>
       
        <GridItem colSpan={1} mt={"28px"}>
          <SimpleGrid
          overflow={'hidden'}
            columns={2}
            bg={"#F8F8F8"}
            px={"16px"}
            py={"24px"}
            // boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1) "
            rounded={"10px"}
          >
            
            <GridItem colSpan={2}>
              <Text fontSize={"16px"} fontWeight={"600"} color={"#021D17"}>
              Your wallet details :
              </Text>
            </GridItem>
            <GridItem
              colSpan={2}
            //   mt={"28px"}
              width={"full"}
              justifyContent={"start"}
              display={"flex"}
              mt={"45px"}
            >
              <Text fontSize={"16px"} fontWeight={"600"} color={"#808080"}>
              Wallet addresss
              </Text>
            </GridItem>
            <GridItem colSpan={2} mt={"12px"}>
             <HStack w={'full'} display={'flex'} gap={'zero'}>
                <Box>
                <Text fontSize={"16px"} fontWeight={"600"} color={"#021D17"}>
                {Wallet}
              </Text>
                </Box>
                <Box as="button"
                          onClick={() => handleCopy(Wallet)}><IoCopyOutline color="green"/></Box>
             </HStack>
            </GridItem>
           
            <GridItem colSpan={2} mt={"28px"}>
              <Text fontSize={"16px"} fontWeight={"600"} color={"#808080"}>
              Network
              </Text>
            </GridItem>
            <GridItem colSpan={2} mt={"12px"}>
              <Text fontSize={"16px"} fontWeight={"600"} color={"#021D17"}>
              TRC
              </Text>
            </GridItem>
          </SimpleGrid>
        </GridItem>

        <GridItem colSpan={1} mt={"28px"}>
          <Button
            onClick={handleProceed}
            type="button"
            w={"full"}
            bg={"#0CBF94"}
            fontSize={"16px"}
            fontWeight={"600"}
            color={"#021D17"}
          >
            I have paid
          </Button>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
}
