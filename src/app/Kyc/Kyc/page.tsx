"use client";

import {
  Box,
  GridItem,
  SimpleGrid,
  VStack,
  Text,
  MenuList,
  MenuButton,
  MenuItem,
  Menu,
  HStack,
  Image,
  Button,
  Center,
  Link,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { Kyclist } from '../../components/transactionbox/menuitem';
import Nin from "../Nin/Nin";
import Bvn from "../Bvn/Bvn";

export default function Kkyc() {
  const [Kyc, setKyc] = useState('Choose verification type');
  const handleKycSelect = (Kyc: string) => {
    setKyc(Kyc); // Update the selected crypto in state
  };
const main='Choose verification type';


  return (
    <Box w={"full"}>
      <Center
        pb={
          Kyc === "Choose verification type" ? ["357px", "453px"] : ["px", "px"]
        }
      >
        <SimpleGrid columns={1} w={["335px", "400px"]}>
          <GridItem colSpan={1}>
            <Text fontWeight="600" fontSize="25px">
              Complete KYC
            </Text>
          </GridItem>
          <GridItem colSpan={1} mt={"10px"}>
            <Text fontWeight="600" fontSize={["15px", "15px"]} color="#666666">
              Complete KYC to be able to make transactions
            </Text>
          </GridItem>
          <GridItem colSpan={1} w={"full"} mt={["30px", "40px"]} mb={"28px"}>
            <Text fontWeight={"600"} fontSize={"16px"} mb={"8px"}>
              Verification type
            </Text>
            <Menu>
              <MenuButton w={"full"}>
                <HStack
                  justifyContent={"space-between"}
                  px={"14px"}
                  bg={"#F8F8F8"}
                  border={"1px solid #E6E6E6"}
                  rounded={"8px"}
                  py={"8px"}
                >
                  <Box>
                    <Text
                      fontWeight={"600"}
                      fontSize={"16px"}
                      color={
                        Kyc === "Choose verification type" ? "#B3B3B3" : "black"
                      }
                    >
                      {Kyc || main}
                    </Text>
                  </Box>
                  <Box>
                    <BsChevronDown size={"14px"} />
                  </Box>
                </HStack>
              </MenuButton>

              <MenuList>
                {Kyclist.map((Kyc) => (
                  <MenuItem
                    w={["300px", "400px"]}
                    mt={"-8px"}
                    key={Kyc.title}
                    minH="10px"
                    onClick={() => handleKycSelect(Kyc.title)}
                  >
                    <Text fontWeight={"600"} fontSize={"16px"}>
                      {Kyc.title}
                    </Text>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </GridItem>
          <GridItem colSpan={1}>
            {Kyc === " National ID (NIN)" ? (
              <Bvn />
            ) : Kyc === "Bank Verification Number (BVN)" ? (
              <Nin />
            ) : (
              ""
            )}
          </GridItem>
          <GridItem
            colSpan={1}
            mt={"34px"}
            textAlign={"center"}
            display={Kyc === "Choose verification type" ? "block" : "none"}
          >
            <Link
              w={"full"}
              fontWeight={"600"}
              fontSize={"16px"}
              color={"#0CBF94"}
            >
              Skip for later
            </Link>
          </GridItem>
        </SimpleGrid>
      </Center>
    </Box>
  );
}
