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
import { TransmitSqaure2 } from "iconsax-react";
import TrxDetails from "./modalBYId";
import IfNotransaction from "./IfNotransaction";
import Contact_Us from "../components/Settings_Components/Contact_Us";

// import NavbarTwo from "../navbar/navbarTwo";
// import Footer from "../navbar/footer";
// import Edithprofile_Drawer from "../components/Settings_Components/Edithprofile_Drawer";

export default function Transactions() {
  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return { bg: "#C7EED5", color: "#2F7F37" };
      case "pending":
        return { bg: "#FCF2C1", color: "#B59803" };
      case "failed":
        return { bg: "#FF48341A", color: "#FF4834" };
      default:
        return { bg: "transparent", color: "#000000" };
    }
  };

  interface Transaction {
    [key: string]: any;
  }
  // <div>
  // <button onClick={handlePreviousPage} disabled={pages === 1}>
  //   Previous
  // </button>
  // <span>
  //   Page {pages} of {totalPages}
  // </span>
  // <button onClick={handleNextPage} disabled={pages === totalPages}>
  //   Next
  // </button>
  // </div>

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state
  function formatDate(dateString: any) {
    const date = new Date(dateString);

    // Get month names and suffix for the day
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    // Determine the day suffix
    const daySuffix = (day: any) => {
      if (day === 1 || day === 21 || day === 31) return "st";
      if (day === 2 || day === 22) return "nd";
      if (day === 3 || day === 23) return "rd";
      return "th";
    };

    // Format time in 12-hour format with AM/PM
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12; // Convert to 12-hour format, making '0' show as '12'

    return `${month} ${day}${daySuffix(
      day
    )}, ${year} at ${hours}:${minutes}${ampm}`;
  }
  function formatToNaira(amount: any) {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  }

  // const TransactionsComponent = () => {
  const [pages, setPages] = useState<number>(1);

  const [userDetails, setUserDetails] = useState<Transaction[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [transactionId, setTransactionId] = useState(null);
  const {
    isOpen: isopenContact,
    onOpen: onopenContact,
    onClose: oncloseContact,
  } = useDisclosure();
  const url = `transactions/user?limit=10&page=${pages}`;

  const fetchUserDetails = async () => {
    try {
      const res = await AxiosGet(url);

      if (res.data) {
        console.log("userDetails", userDetails);
        setUserDetails(res.data.items);
        setTotalPages(res.data.meta.totalPages); // Set total pages from response meta
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [pages, totalPages]);

  const handleNextPage = () => {
    if (pages < totalPages) setPages(pages + 1);
  };

  const handlePreviousPage = () => {
    if (pages > 1) setPages(pages - 1);
  };
  const handleclick = (id: any) => {
    setTransactionId(id); // First, set the transactionId
    setLoading(true); // Set loading to true when the modal opens
    setIsMounted(true); // Set the mounted state if necessary
    onOpen(); // Open the modal

    // Set a timeout to stop loading after 2 seconds
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

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

                    {userDetails.length > 0 ? (
  <SimpleGrid
    pt="44px"
    px={["10px", "19px", "24px"]}
    w={["335px", "450px", "668px"]}
    spacingY="30px"
    columns={1}
    h={["60dvh", "65dvh"]}
    overflowY="auto"
  >
    {userDetails.map((Trx, index) => {
      const statusStyle = getStatusStyle(Trx.status);
      return (
        <Box
          key={Trx._id || index}
          w="full"
          onMouseEnter={() => setTransactionId(Trx._id)}
          onClick={() => handleclick(Trx._id)}
          cursor="pointer"
        >
          <HStack w="full" spacing={4}>
            <Box w={{ base: "10%", md: "5%" }}>
              <Center bg={statusStyle.bg} p="8px" rounded="50%">
                <TransmitSqaure2 size="16" color={statusStyle.color} />
              </Center>
            </Box>
            <HStack w={{ base: "90%", md: "95%" }}>
              <Box w="50%">
                <Text color="#021D17" fontSize={{ base: "14px", md: "16px" }} fontWeight="600">
                  {`${Trx.type.charAt(0).toUpperCase() + Trx.type.slice(1).toLowerCase()} Crypto`}
                </Text>
                <Text color="#808080" fontSize={{ base: "12px", md: "16px" }} fontWeight="400">
                  {formatDate(Trx.createdAt)}
                </Text>
              </Box>
              <VStack w="50%" >
               <Box width={'full'}  display={'flex'} justifyContent={'right'}> <Text textAlign="right" color="#021D17" fontSize={{ base: "14px", md: "16px" }} fontWeight="500">
                  {formatToNaira(Trx.amountNaira)}
                </Text></Box>
                <Box width={'full'}  display={'flex'} justifyContent={'right'}>
                 <Text  p="5px" fontSize="14px" fontWeight="400" w="fit-content" bg={statusStyle.bg} color={statusStyle.color} rounded="10px"> {Trx.status.toLowerCase()}</Text>
                </Box>
              </VStack>
            </HStack>
          </HStack>
        </Box>
      );
    })}

    <TrxDetails
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      TrxnId={transactionId}
      isMounted={isMounted}
      setIsMounted={setIsMounted}
      Loading={loading}
    />
  </SimpleGrid>
) : (
  <IfNotransaction />
)}

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
                      onClick={() => onopenContact()}
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
                  <Contact_Us isOpen={isopenContact} onClose={oncloseContact}/>
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
