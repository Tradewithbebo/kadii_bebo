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
  Spinner,
} from "@chakra-ui/react";
import { PiPencilSimpleLine } from "react-icons/pi";
import { CiLock } from "react-icons/ci";

import { BsBank, BsChevronDown } from "react-icons/bs";
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
import Edithprofile_Drawer from "./Edithprofile_Drawer";
import Footer from "@/app/navbar/footer";
import SettingsChangePassword from "./settingsChangePassword";
import Settingsupdatepin from "./settingsupdatepin";
import { AxiosGet } from "@/app/axios/axios";
import Banks from "./Banks";
// import NavbarTwo from "../navbar/navbarTwo";
// import Footer from "../navbar/footer";
// import Edithprofile_Drawer from "../components/Settings_Components/Edithprofile_Drawer";
interface user {
  firstName: any;
  lastName: any;
  email: any;
  username:any;
  image:any
}
export default function Settings() {
  const [loading, setLoading] = useState(true); 
  const {
    isOpen: isopenDelete,
    onOpen: onopenDelete,
    onClose: oncloseDelete,
  } = useDisclosure();
  const cancelRef = React.useRef(null);
  const handleDelete = () => {
    // Add your delete account logic here
    console.log("Account deleted");
    oncloseDelete();
  };
  const {
    isOpen: isopenBank,
    onOpen: onopenBank,
    onClose: oncloseBank,
  } = useDisclosure();
  const {
    isOpen: isopenEdith,
    onOpen: onopenEdith,
    onClose: oncloseEdith,
  } = useDisclosure();
  const {
    isOpen: isopenUpdatePassword,
    onOpen: onopenUpdatePassword,
    onClose: oncloseUpdatePassword,
  } = useDisclosure();
  const {
    isOpen: isopenUpdatePin,
    onOpen: onopenUpdatePin,
    onClose: oncloseUpdatePin,
  } = useDisclosure();
  const capitalizeFirstLetter = (name: any) => {
    if (!name) return ""; // Handle undefined or empty values
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const url = "auth/me";
  const [userDetails, setUserDetails] = useState<user>();
  const fetchUserDetails = async () => {
    try {
      const res = await AxiosGet("auth/me");
      if (res) {
        setUserDetails(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Stop loading after fetching data
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
          // w={'full'}
        >

{loading ? ( // Show spinner if loading
            <Center h="100vh">
              <Spinner size="xl" />
            </Center>
          ) : 
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
                    <Box pb={"38px"} pl={"24px"}>
                      <Text
                        fontWeight={"600"}
                        color={"#021D17"}
                        fontSize={"24px"}
                      >
                        Settings
                      </Text>
                    </Box>
                    {/* profile display */}
                    <SimpleGrid
                      px={["10px", "19px", "24px"]}
                      w={["335px", "450px", "668px"]}
                      spacingY={["10px", "10px", "20px"]}
                      columns={[1, 1, 3]}
                      pb={"15px"}

                      // maxHeight="400px"  // Set the maximum height
                      // overflowY="auto"   // Enable vertical scrolling
                    >
                      <GridItem w={"full"} colSpan={[1, 1, 3]}>
                        <SimpleGrid w={"full"} columns={[1, 1, 4]}>
                          <GridItem w={"full"} colSpan={[1, 1, 3]}>
                            <HStack w={"full"}>
                              <Image
                                borderRadius="full"
                                boxSize="65px"
                                src={userDetails?.image ??"https://img.icons8.com/office/50/gender-neutral-user.png"}
                                alt="Dan Abramov"
                                // flex={1}
                              />
                              {/* </Box> */}
                              <VStack w={"full"} display={"flex"}>
                                <Box w={"full"}>
                                  <Text
                                    fontSize={"20px"}
                                    fontWeight={"600"}
                                    color={"#021D17"}
                                  >
                                    {userDetails?.username
                                      ? userDetails.username.length > 12
                                        ? `${userDetails.username.slice(
                                            0,
                                            13
                                          )}...`
                                        : userDetails.username
                                      : userDetails?.firstName
                                      ? userDetails.firstName.length > 12
                                        ? `${capitalizeFirstLetter(
                                            userDetails.firstName
                                          ).slice(0, 13)}...`
                                        : capitalizeFirstLetter(
                                            userDetails.firstName
                                          )
                                      : ""}
                                  </Text>
                                </Box>
                                <Box w={"full"}>
                                  {" "}
                                  <Text
                                    fontSize={"16px"}
                                    fontWeight={"600"}
                                    color={"#808080"}
                                  >
                                    {userDetails?.email &&
                                    userDetails.email.length > 12
                                      ? `${userDetails.email.slice(0, 13)}...`
                                      : userDetails?.email}
                                  </Text>
                                </Box>
                              </VStack>
                            </HStack>
                          </GridItem>
                          <GridItem
                            w={"full"}
                            colSpan={[1, 1, 1]}
                            justifyContent={["start", "start", "end"]}
                            display={"flex"}
                            mt={["10px", "10px", "0px"]}
                            mb={["10px", "10px", "0px"]}
                          >
                            <Button
                              color={"#0CBF94"}
                              fontSize={"16px"}
                              fontWeight={"600px"}
                              onClick={() => onopenEdith()}
                            >
                              <PiPencilSimpleLine />
                              &nbsp; &nbsp; Edit profle
                            </Button>
                            <Edithprofile_Drawer
                              isOpen={isopenEdith}
                              onOpen={onopenEdith}
                              onClose={oncloseEdith}
                            />
                          </GridItem>
                        </SimpleGrid>
                      </GridItem>
                    </SimpleGrid>
                    <SimpleGrid
                      px={["10px", "19px", "24px"]}
                      w={["335px", "450px", "668px"]}
                      spacingY={["20px", "20px", "25px"]}
                      columns={[1, 1, 3]}
                      // maxHeight="400px" // Set the maximum height
                      overflowY="auto" // Enable vertical scrolling
                    >
                      {/* list */}
                      <GridItem w={"full"} colSpan={[1, 1, 3]}>
                        <Button
                          w={"full"}
                          py={"35px"}
                          onClick={() => onopenBank()}
                        >
                          <HStack w={"full"}>
                            <HStack w={"full"}>
                              <Box>
                                <BsBank color={"#0CBF94"} />
                              </Box>
                              <Box>
                                <Text
                                  color={"#000000"}
                                  fontSize={"16px"}
                                  fontWeight={"600px"}
                                >
                                  Bank details
                                </Text>
                              </Box>
                            </HStack>
                            <Box>
                              <IoIosArrowForward />
                            </Box>
                          </HStack>
                        </Button>
                        <Banks isOpen={isopenBank} onClose={oncloseBank} />
                      </GridItem>
                      {/* secondsettings */}
                      <GridItem w={"full"} colSpan={[1, 1, 3]}>
                        <Button
                          w={"full"}
                          py={"35px"}
                          onClick={() => onopenUpdatePassword()}
                        >
                          <HStack w={"full"}>
                            <HStack w={"full"}>
                              <Box>
                                <CiLock color={"#0CBF94"} size={"25px"} />
                              </Box>
                              <Box>
                                <Text
                                  color={"#000000"}
                                  fontSize={"16px"}
                                  fontWeight={"600px"}
                                >
                                  Update password
                                </Text>
                              </Box>
                            </HStack>
                            <Box>
                              <IoIosArrowForward />
                            </Box>
                          </HStack>
                        </Button>
                        <SettingsChangePassword
                          isOpen={isopenUpdatePassword}
                          onOpen={onopenUpdatePassword}
                          onClose={oncloseUpdatePassword}
                        ></SettingsChangePassword>
                      </GridItem>
                      {/* thirdsettings */}
                      <GridItem w={"full"} colSpan={[1, 1, 3]}>
                        <Button
                          w={"full"}
                          py={"35px"}
                          onClick={() => onopenUpdatePin()}
                        >
                          <HStack w={"full"}>
                            <HStack w={"full"}>
                              <Box>
                                <FaKey color={"#0CBF94"} size={"20px"} />
                              </Box>
                              <Box>
                                <Text
                                  color={"#000000"}
                                  fontSize={"16px"}
                                  fontWeight={"600px"}
                                >
                                  Update PIN
                                </Text>
                              </Box>
                            </HStack>
                            <Box>
                              <IoIosArrowForward />
                            </Box>
                          </HStack>
                        </Button>
                        <Settingsupdatepin
                          isOpen={isopenUpdatePin}
                          onOpen={oncloseUpdatePin}
                          onClose={oncloseUpdatePin}
                        />
                      </GridItem>
                      {/* fourthlistsettings */}
                      <GridItem w={"full"} colSpan={[1, 1, 3]}>
                        <Button w={"full"} py={"35px"}>
                          <HStack w={"full"}>
                            <HStack w={"full"}>
                              <Box>
                                <IoDocumentTextOutline
                                  color={"#0CBF94"}
                                  size={"25px"}
                                />
                              </Box>
                              <Box>
                                <Text
                                  color={"#000000"}
                                  fontSize={"16px"}
                                  fontWeight={"600px"}
                                >
                                  Terms and conditions
                                </Text>
                              </Box>
                            </HStack>
                            <Box>
                              <IoIosArrowForward />
                            </Box>
                          </HStack>
                        </Button>
                      </GridItem>
                      {/* fightlistsettings */}
                      <GridItem w={"full"} colSpan={[1, 1, 3]}>
                        <Button w={"full"} py={"35px"}>
                          <HStack w={"full"}>
                            <HStack w={"full"}>
                              <Box>
                                <IoDocumentTextOutline
                                  color={"#0CBF94"}
                                  size={"25px"}
                                />
                              </Box>
                              <Box>
                                <Text
                                  color={"#000000"}
                                  fontSize={"16px"}
                                  fontWeight={"600px"}
                                >
                                  Privacy policy
                                </Text>
                              </Box>
                            </HStack>
                            <Box>
                              <IoIosArrowForward />
                            </Box>
                          </HStack>
                        </Button>
                      </GridItem>
                      {/* sixtysettingslist */}
                      <GridItem w={"full"} colSpan={[1, 1, 3]}>
                        <Button w={"full"} py={"35px"} onClick={onopenDelete}>
                          <HStack w={"full"}>
                            <HStack w={"full"}>
                              <Box>
                                <MdDeleteOutline
                                  color={"#ef4444"}
                                  size={"30px"}
                                />
                              </Box>
                              <Box>
                                <Text
                                  color={"#000000"}
                                  fontSize={"16px"}
                                  fontWeight={"600"}
                                >
                                  Delete Account
                                </Text>
                              </Box>
                            </HStack>
                            <Box>
                              <IoIosArrowForward />
                            </Box>
                          </HStack>
                        </Button>
                      </GridItem>

                      {/* Alert Dialog for Deleting Account */}
                      <AlertDialog
                        isOpen={isopenDelete}
                        leastDestructiveRef={cancelRef}
                        onClose={oncloseDelete}
                        size={"sm"}
                        isCentered
                      >
                        <AlertDialogOverlay>
                          <AlertDialogContent>
                            <AlertDialogHeader fontSize="sm" fontWeight="bold">
                              Delete Account
                            </AlertDialogHeader>

                            <AlertDialogBody
                              w={"full"}
                              display={"flex"}
                              justifyContent={"center"}
                            >
                              <Text w={"70%"} textAlign={"center"}>
                                {" "}
                                Are you sure you want to delete your account?
                                This action cannot be reversed.
                              </Text>
                            </AlertDialogBody>

                            <AlertDialogFooter>
                              <Button ref={cancelRef} onClick={oncloseDelete}>
                                Cancel
                              </Button>
                              <Button
                                colorScheme="red"
                                onClick={handleDelete}
                                ml={3}
                              >
                                Delete
                              </Button>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialogOverlay>
                      </AlertDialog>
                    </SimpleGrid>
                  </Box>
                </Box>
              </Box>
              {/* bottom part */}
              <SimpleGrid column={1} w={["350px", "465px", "692px"]}>
                <GridItem colSpan={1} w={"full"} mb={["36px", "0px"]}>
                  <Button
                    bg={"#FFFFFF"}
                    w={"100%"}
                    py={"18px"}
                    boxShadow="xs"
                    h={"50px"}
                  >
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
          </Box>}
        </Box>
      </Box>
    </>
  );
}
