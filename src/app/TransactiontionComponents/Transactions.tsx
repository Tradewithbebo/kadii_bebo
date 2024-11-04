"use client";
import {
  Box,
  Center,
  Divider,
  VStack,
  Text,
  HStack,
  Button,
  Image,
  SimpleGrid,
  GridItem,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { PiPencilSimpleLine } from "react-icons/pi";
import { CiLock } from "react-icons/ci";

import { BsBank, BsBoxArrowUpRight, BsChevronDown } from "react-icons/bs";
import { TbCurrencyNaira } from "react-icons/tb";
import { BsExclamationCircle } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
// import { BuyCrypto, SellCrypto } from "../incompleteKyc/crypto_two";
import { IoIosArrowForward } from "react-icons/io";
import { FaKey } from "react-icons/fa6";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import NavbarTwo from "@/app/navbar/navbarTwo";
import { AxiosGet } from "../axios/axios";
import Footer from "../navbar/footer";
import IfNotransaction from "./IfNotransaction";
import { TransmitSqaure2 } from "iconsax-react";

// import NavbarTwo from "../navbar/navbarTwo";
// import Footer from "../navbar/footer";
// import Edithprofile_Drawer from "../components/Settings_Components/Edithprofile_Drawer";
interface user {
  firstName: any;
  lastName: any;
  email: any;
}
export default function Transactions() {
  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "Success":
        return { bg: "#C7EED5", color: "#2F7F37" };
      case "Pending":
        return { bg: "#FCF2C1", color: "#B59803" };
      case "Failed":
        return { bg: "#FF48341A", color: "#FF4834" };
      default:
        return { bg: "transparent", color: "#000000" };
    }
  };
  const url = "auth/me";
  const [userDetails, setUserDetails] = useState<user>();
  const fetchUserDetails = async () => {
    try {
      const res = await AxiosGet(url);
      if (res) {
        setUserDetails(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUserDetails();
  });
  return (
    <>
      <Box w={"full"} position="fixed" top="0" zIndex="1000" bg={"#fafafa"}>
        <NavbarTwo />
      </Box>

      <Box p={"10px"} height="" w={"full"}>
        <Box
          //   w="1409px"
          overflow={"hidden"}
          h="full"
          display="flex"
          justifyContent="center"
          alignItems="center"
          backgroundImage="/Image/bg.png" // Setting the background image
          backgroundSize="cover" // Ensures the image covers the entire box
          backgroundPosition="center" // Centers the image within the box
          backgroundRepeat="no-repeat" // Prevents the image from repeating
          pt={["100px", "100px", "100px"]}
          pb={["30px", "100px"]}
        >
          <Box
            w={"full"}
            height={"full"}
            justifyContent={"center"}
            display={"flex"}
          >
            <VStack>
              <Box
                bg={"#F8F8F8"}
                padding={"7px"}
                rounded={"16px"}
                border={"1px"}
                borderColor={"#EDEDED"}
              >
                <Box
                  bg={"#F2F2F2"}
                  padding={"7px"}
                  rounded={"12px"}
                  border={"1px"}
                  borderColor={"#F2F2F2"}
                >
                  <Box
                    bg={"#FFFFFF"}
                    rounded={"8px"}
                    border={"1px"}
                    borderColor={"#FFFFFF"}
                    // px={["50px", "107px"]}
                    pb={"51px"}
                    pt={"40px"}
                    // px={"24px"}
                  >
                    <Box pl={"24px"}>
                      <Text
                        fontWeight={"600"}
                        color={"#021D17"}
                        fontSize={"24px"}
                      >
                        Transactions
                      </Text>
                    </Box>

                    <SimpleGrid
                      pt={"44px"}
                      px={["10px", "19px", "24px"]}
                      w={["335px", "450px", "668px"]}
                      spacingY={["20px", "20px", "20px"]}
                      columns={1}
                      // h={["60dvh", "65dvh"]}
                      // maxHeight="400px" // Set the maximum height
                      overflowY="auto" // Enable vertical scrolling
                    >
                      <Box w="full">
                        <HStack w="full" spacing={4}>
                          <Box w={{ base: "10%", md: "5%" }}>
                            <Box bg="blue" p="8px" rounded="50%">
                            <TransmitSqaure2 size="16" color="#FF8A65"/>
                            </Box>
                          </Box>
                          <HStack
                            w={{ base: "90%", md: "95%" }}
                            justifyContent="space-between"
                          >
                            <Box w="50%">
                              <VStack w="full" align="start">
                                <Box w="full">
                                  <Text
                                    color="#021D17"
                                    fontSize={{ base: "14px", md: "16px" }}
                                    fontWeight="600"
                                  >
                                    Sell crypto
                                  </Text>
                                </Box>
                                <Box w="full">
                                  <Text
                                    color="#808080"
                                    fontSize={{ base: "12px", md: "16px" }}
                                    fontWeight="400"
                                  >
                                    Jan 20th, 2024 at 10:00am
                                  </Text>
                                </Box>
                              </VStack>
                            </Box>
                            <Box w="50%">
                              <VStack w="full" align="end">
                                <Box w="full" textAlign="right">
                                  <Text
                                    color="#021D17"
                                    fontSize={{ base: "14px", md: "16px" }}
                                    fontWeight="500"
                                  >
                                    ₦100,000,000.00
                                  </Text>
                                </Box>
                                <Box w="full" textAlign="right">
                                  <Text
                                   fontStyle="italic"
                                    fontWeight="300"
                                    fontSize={{ base: "13px", md: "14px" }}
                                    color={'green'}
                                  >
                                    Success
                                  </Text>
                                </Box>
                              </VStack>
                            </Box>
                          </HStack>
                        </HStack>
                      </Box>
                      <Box w="full">
                        <HStack w="full" spacing={4}>
                          <Box w={{ base: "10%", md: "5%" }}>
                            <Box bg="blue" p="8px" rounded="50%">
                            <TransmitSqaure2 size="16" color="#FF8A65"/>
                            </Box>
                          </Box>
                          <HStack
                            w={{ base: "90%", md: "95%" }}
                            justifyContent="space-between"
                          >
                            <Box w="50%">
                              <VStack w="full" align="start">
                                <Box w="full">
                                  <Text
                                    color="#021D17"
                                    fontSize={{ base: "14px", md: "16px" }}
                                    fontWeight="600"
                                  >
                                    Sell crypto
                                  </Text>
                                </Box>
                                <Box w="full">
                                  <Text
                                    color="#808080"
                                    fontSize={{ base: "12px", md: "16px" }}
                                    fontWeight="400"
                                  >
                                    Jan 20th, 2024 at 10:00am
                                  </Text>
                                </Box>
                              </VStack>
                            </Box>
                            <Box w="50%">
                              <VStack w="full" align="end">
                                <Box w="full" textAlign="right">
                                  <Text
                                    color="#021D17"
                                    fontSize={{ base: "14px", md: "16px" }}
                                    fontWeight="500"
                                  >
                                    ₦100,000,000.00
                                  </Text>
                                </Box>
                                <Box w="full" textAlign="right">
                                  <Text
                                   fontStyle="italic"
                                    fontWeight="300"
                                    fontSize={{ base: "12px", md: "14px" }}
                                    color={'green'}
                                  >
                                    Success
                                  </Text>
                                </Box>
                              </VStack>
                            </Box>
                          </HStack>
                        </HStack>
                      </Box>
                    
                      <Box></Box>
                      <Box></Box>
                      <Box></Box>
                    </SimpleGrid>
                    {/* <IfNotransaction/> */}
                  </Box>
                </Box>
              </Box>
              {/* bottom part */}
              <SimpleGrid column={1} w={["350px", "465px", "692px"]}>
                <GridItem colSpan={1} w={"full"} mb={["36px", "0px"]}>
                  <Button bg={"#FFFFFF"} w={"100%"} py={"18px"} boxShadow="xs">
                    <Text
                      color={"#021D17"}
                      fontWeight={"600"}
                      fontSize={"16px"}
                    >
                      Need help? &nbsp;
                    </Text>
                    <Text
                      color={"#0CBF94"}
                      fontWeight={"600"}
                      fontSize={"16px"}
                    >
                      Contact support
                    </Text>
                  </Button>
                </GridItem>
              </SimpleGrid>
              <Box
                display={{ base: "block", md: "none" }}
                position="fixed"
                bottom="0"
                width="100%"
                zIndex="10"
                bg="white"
                boxShadow="md"
                justifyContent={"center"}
                w={"full"}
              >
                <Footer />
              </Box>
            </VStack>
          </Box>
        </Box>
      </Box>
    </>
  );
}
