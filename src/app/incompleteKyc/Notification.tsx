import {
  Box,
  Center,
  GridItem,
  HStack,
  SimpleGrid,
  Text,
  VStack,
  useDisclosure
} from "@chakra-ui/react";
import React from "react";
import { BsExclamationCircle } from "react-icons/bs";
import { SlArrowRight } from "react-icons/sl";
import ModalKyc from "./modalKyc";

export default function Notification() {
  const { isOpen: isOpentwo, onOpen: onOpentwo, onClose: onClosetwo } = useDisclosure();

  return (
    <>
      <Box  onClick={onOpentwo} cursor={'pointer'}>
        <SimpleGrid
         w={["auto","400px"]}
         bg={"#FEF6E7"}
         p={"16px"}
         rounded={"10px"}
         border={"1px"}
         // bgColor={}
         borderColor={"#FBE2B7"}
         // boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1) "
         mb={"12px"}
         // ml={'-45px'}}
        >
          <Center>
            <GridItem colSpan={[1, 3]} >
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
                        <BsExclamationCircle size={"20px"} />
                      </Box>
                    </Box>
                  </Box>
                  <Box display="flex" flexDirection={"column"} ml={"10px"} gap={"12px"}>
                    <Box>
                      <Text fontWeight={"600"} fontSize={"14px"} color={"#021D17"}>
                        Complete your KYC
                      </Text>
                    </Box>
                    <HStack>
                      <Text fontWeight={"500"} fontSize={"12px"} color={"#808080"}>
                        To make transactions you need to have successfully completed your KYC.
                      </Text>
                      <SlArrowRight size={"12px"} />
                    </HStack>
                  </Box>
                </HStack>
              </Box>
            </GridItem>
          </Center>
        </SimpleGrid>
        <Box>
          <ModalKyc isOpentwo={isOpentwo} onClosetwo={onClosetwo} />
        </Box>
      </Box>
    </>
  );
}
