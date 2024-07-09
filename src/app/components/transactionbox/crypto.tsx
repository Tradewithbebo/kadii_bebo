"use client";

import {
  Box,
  HStack,
  SimpleGrid,
  VStack,
  Text,
  MenuButton,
  Menu,
  Image,
  Divider,
  MenuList,
  MenuItem,
  Button,
  GridItem,
  Center,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsChevronDown, BsExclamationCircle } from "react-icons/bs";
import { TbCurrencyNaira } from "react-icons/tb";
import { MenuItems } from "./menuitem";
import { ChevronDownIcon } from "@chakra-ui/icons";
import ButtonForBuy from "./ButtonForBuy";
import InputReceiverDetails from "../drawer/Buy/inputReceiverDetails";
import GeneralFormPage from "../drawer/Buy/generalformpage";

export function SellCrypto() {
  const [selectedCrypto, setSelectedCrypto] = useState("USDT");
  const handleCryptoSelect = (crypto: string) => {
    setSelectedCrypto(crypto); // Update the selected crypto in state
  };

  return (
    <SimpleGrid px={["19px", "119px"]} w={["335px", "668px"]} columns={[1, 3]}>
      <GridItem colSpan={[1, 3]} textAlign={"center"} mb={"16px"}>
        <Box>
          <Text fontWeight={"600"} fontSize={["16px", "16px"]}>
            Sell crypto
          </Text>
        </Box>
      </GridItem>
      <GridItem
        colSpan={[1, 3]}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box>
          <Divider width={"200px"} />
        </Box>
      </GridItem>
      {/* second part */}

      <GridItem colSpan={1} mt={["15px", "32px"]} w={"full"}>
        <HStack>
          <Box>
            <Text
              fontWeight={"600"}
              fontSize={["11px", "16px"]}
              color={"#808080"}
            >
              Crypto:
            </Text>
          </Box>

          <Menu>
            <MenuButton w={["100%"]}>
              <HStack gap={"16px"} px={"16px"} bg={"#F8F8F8"}>
                <HStack gap={"8px"}>
                  <Box mt={"5px"} mb={"5px"} width={"20px"} height={"20px"}>
                    <Image src="/image/crypto.png" alt="Bebo" />
                  </Box>
                  <Box>
                    <Text
                      fontWeight={"600"}
                      fontSize={["11px", "16px"]}
                      mt={"10px"}
                      mb={"10px"}
                    >
                      {selectedCrypto}
                    </Text>
                  </Box>
                </HStack>
                <Box ml={["120px", "0px"]}>
                  <BsChevronDown size={"14px"} />
                </Box>
              </HStack>
            </MenuButton>

            <MenuList>
              {MenuItems.map((item) => (
                <MenuItem
                  key={item.title}
                  minH="10px"
                  onClick={() => handleCryptoSelect(item.title)}
                >
                  {item.img}
                  <span>{item.title}</span>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </HStack>
      </GridItem>
      <GridItem
        colSpan={1}
        mt={["14px", "32px"]}
        display={{ base: "none", md: "block" }}
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          <Divider
            orientation="vertical"
            h={"50px"}
            mr={"24px"}
            ml={"24px"}
            color={"#F0F0F0"}
          />
        </Box>
      </GridItem>
      <GridItem colSpan={1} mt={["15px", "32px"]} mb={["40px", "0px"]}>
        <HStack
          gap={["20px", "10px"]}
          justifyContent={["flex-start", "flex-end"]}
        >
          <Box>
            <Text
              fontWeight={"600"}
              fontSize={["11px", "16px"]}
              color={"#808080"}
            >
              Rate:
            </Text>
          </Box>
          <HStack bg={"#F8F8F8"} px={"16px"}>
            <Box>
              <TbCurrencyNaira size={"14px"} />
            </Box>
            <Box mt={"9px"} mb={"9px"}>
              <Text fontWeight={"600"} fontSize={["11px", "16px"]}>
                1000
              </Text>
            </Box>
          </HStack>
        </HStack>
      </GridItem>

      {/* third part */}
      <GridItem colSpan={[1, 3]} display={{ base: "none", md: "block" }}>
        <Box mb={"40px"} mt={"40px"} bg={"#F8F8F8"} p={"16px"} rounded={"4px"}>
          <HStack>
            <Box
              width={"35px"}
              height={"35px"}
              bg={"#F2F2F2"}
              p={"4px"}
              rounded={"50%"}
            >
              <Box
                width={"28px"}
                height={"28px"}
                bg={"#FFFFFF"}
                p={"4px"}
                rounded={"50%"}
              >
                <Box>
                  {" "}
                  <BsExclamationCircle size={"20px"} />
                </Box>
              </Box>
            </Box>
            <Box>
              <Text fontWeight={"500"} fontSize={"14px"} color={"#808080"}>
                To sell your crypto. click on the green button below to generate
                a wallet address to send your crypto.
              </Text>
            </Box>
          </HStack>
        </Box>
      </GridItem>

      {/* fourt part */}
      <GridItem w={"full"} colSpan={[1, 3]}>
        <Button
          bg="#0CBF94"
          fontSize={"16px"}
          fontWeight={"600"}
          w={"100%"}
          color={"#021D17"}
        >
          Get wallet address
        </Button>
      </GridItem>
    </SimpleGrid>
  );
}

export function BuyCrypto() {
  const [selectedCrypto, setSelectedCrypto] = useState("USDT");
  const handleCryptoSelect = (crypto: string) => {
    setSelectedCrypto(crypto); // Update the selected crypto in state
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <SimpleGrid
        px={["19px", "119px"]}
        w={["335px", "668px"]}
        columns={[1, 3]}
      >
        <GridItem colSpan={[1, 3]} textAlign={"center"} mb={"16px"}>
          <Box>
            <Text fontWeight={"600"} fontSize={"16px"}>
              Buy crypto
            </Text>
          </Box>
        </GridItem>
        <GridItem
          colSpan={[1, 3]}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box>
            <Divider width={"200px"} />
          </Box>
        </GridItem>
        {/* second part */}

        <GridItem colSpan={1} mt={["15px", "32px"]} w={"full"}>
          <HStack>
            <Box>
              <Text
                fontWeight={"600"}
                fontSize={["11px", "16px"]}
                color={"#808080"}
              >
                Crypto:
              </Text>
            </Box>

            <Menu>
              <MenuButton w={"100%"}>
                <HStack gap={"16px"} px={"16px"} bg={"#F8F8F8"}>
                  <HStack gap={"8px"}>
                    <Box mt={"5px"} mb={"5px"} width={"20px"} height={"20px"}>
                      <Image src="/image/crypto.png" alt="Bebo" />
                    </Box>
                    <Box>
                      <Text
                        fontWeight={"600"}
                        fontSize={["11px", "16px"]}
                        mt={"10px"}
                        mb={"10px"}
                      >
                        {selectedCrypto}
                      </Text>
                    </Box>
                  </HStack>
                  <Box ml={["120px", "0px"]}>
                    <BsChevronDown size={"14px"} />
                  </Box>
                </HStack>
              </MenuButton>

              <MenuList>
                {MenuItems.map((item) => (
                  <MenuItem
                    key={item.title}
                    minH="10px"
                    onClick={() => handleCryptoSelect(item.title)}
                  >
                    {item.img}
                    <span>{item.title}</span>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </HStack>
        </GridItem>
        <GridItem
          colSpan={1}
          mt={["14px", "32px"]}
          display={{ base: "none", md: "block" }}
        >
          <Box display="flex" justifyContent="center" alignItems="center">
            <Divider
              orientation="vertical"
              h={"50px"}
              mr={"24px"}
              ml={"24px"}
              color={"#F0F0F0"}
            />
          </Box>
        </GridItem>
        <GridItem colSpan={1} mt={["15px", "32px"]} mb={["40px", "0px"]}>
          <HStack
            gap={["20px", "10px"]}
            justifyContent={["flex-start", "flex-end"]}
          >
            <Box>
              <Text
                fontWeight={"600"}
                fontSize={["11px", "16px"]}
                color={"#808080"}
              >
                Rate:
              </Text>
            </Box>
            <HStack bg={"#F8F8F8"} px={"16px"}>
              <Box>
                <TbCurrencyNaira size={"14px"} />
              </Box>
              <Box mt={"9px"} mb={"9px"}>
                <Text fontWeight={"600"} fontSize={["11px", "16px"]}>
                  1000
                </Text>
              </Box>
            </HStack>
          </HStack>
        </GridItem>

        {/* third part */}
        <GridItem colSpan={[1, 3]} display={{ base: "none", md: "block" }}>
          <Box
            mb={"40px"}
            mt={"40px"}
            bg={"#F8F8F8"}
            p={"16px"}
            rounded={"4px"}
          >
            <HStack>
              <Box
                width={"35px"}
                height={"35px"}
                bg={"#F2F2F2"}
                p={"4px"}
                rounded={"50%"}
              >
                <Box
                  width={"28px"}
                  height={"28px"}
                  bg={"#FFFFFF"}
                  p={"4px"}
                  rounded={"50%"}
                >
                  <Box>
                    {" "}
                    <BsExclamationCircle size={"20px"} />
                  </Box>
                </Box>
              </Box>
              <Box>
                <Text fontWeight={"500"} fontSize={"14px"} color={"#808080"}>
                  To buy crypto. click on the green button below to generate a
                  bank account to transfer funds to.
                </Text>
              </Box>
            </HStack>
          </Box>
        </GridItem>

        {/* fourt part */}
        <GridItem w={"full"} colSpan={[1, 3]}>
          <ButtonForBuy onOpen={onOpen} />
        </GridItem>
      </SimpleGrid>
      <GeneralFormPage isOpen={isOpen} onClose={onClose} />
    </>
  );
}
