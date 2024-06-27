import {
  Box,
  Center,
  GridItem,
  HStack,
  SimpleGrid,
  Text,
  VStack,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsExclamationCircle } from "react-icons/bs";
import { SlArrowRight } from "react-icons/sl";
//   import ModalKyc from "./modalKyc";
export default function NotificationBuy() {
  // const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box cursor={"pointer"}>
        <SimpleGrid
          w={"auto"}
          bg={"#FEF6E7"}
          p={"16px"}
          rounded={"10px"}
          border={"solid #FEF6E7"}
          boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1) "
          mb={"12px"}
          // ml={'-45px'}
        >
          <Center>
            <GridItem colSpan={[1, 3]}>
              <Box>
                <HStack gap={"10px"}>
                  <Box
                    width={"35px"}
                    height={"35px"}
                    bg={"#FBE2B7"}
                    p={"4px"}
                    rounded={"50%"}
                  >
                    <Box
                      width={"28px"}
                      height={"28px"}
                      bg={"#FEF6E7"}
                      p={"4px"}
                      rounded={"50%"}
                    >
                      <Box>
                        {" "}
                        <BsExclamationCircle size={"20px"} />
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection={"column"}
                    ml={"10px"}
                    gap={"12px"}
                  >
                    <HStack>
                      <Text
                        fontWeight={"500"}
                        fontSize={"12px"}
                        color={"#808080"}
                      >
                        Please endeavour to double check and paste the correct
                        wallet address and network as crypto sent to the wrong
                        address cannot be recovered
                      </Text>
                    </HStack>
                  </Box>
                </HStack>
              </Box>
            </GridItem>
          </Center>
        </SimpleGrid>
      </Box>
    </>
  );
}
export function MarketRate() {
  // const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box>
        <SimpleGrid
          w={"auto"}
          bg={"#E7F6EC"}
          p={"16px"}
          rounded={"10px"}
          rowGap={"16px"}
          // border={"solid #FEF6E7"}
          boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1) "
          mb={"12px"}
          // ml={'-45px'}
        >
          <GridItem colSpan={[1, 3]} display={"flex"} justifyContent={"center"}>
            <Text fontWeight={"600"} fontSize={"16px"} color={"#0CBF94"}>
              USDT current market rate
            </Text>
          </GridItem>
          <GridItem colSpan={[1, 3]} display={"flex"} justifyContent={"center"}>
            <Text fontWeight={"600"} fontSize={"16px"}>
              ₦ 100,000
            </Text>
          </GridItem>
        </SimpleGrid>
      </Box>
    </>
  );
}
export function ConfirmBuy() {
  // const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box>
        <SimpleGrid
          w={"auto"}
          bg={"#F8F8F8"}
          p={"16px"}
          rounded={"10px"}
          rowGap={"16px"}
          // border={"solid #FEF6E7"}
          boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1) "
          mb={"12px"}
          // ml={'-45px'}
        >
          <GridItem colSpan={[1, 3]} display={"flex"} justifyContent={"center"}>
            <Text fontWeight={"600"} fontSize={"24px"} color={"#021D17"}>
            ₦ 1,000,000
            </Text>
          </GridItem>
          <GridItem colSpan={[1, 3]} display={"flex"} justifyContent={"center"}>
            <Text fontWeight={"600"} fontSize={"16px"} color="#666666">
            You will receive 10.00 worth of USDT
            </Text>
          </GridItem>
        </SimpleGrid>
      </Box>
    </>
  );
}
