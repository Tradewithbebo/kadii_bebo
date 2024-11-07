"use client";

import React, { useEffect, useState } from "react";
import {
  Text,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  SimpleGrid,
  GridItem,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
  VStack,
  useToast,
  HStack,
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoCopyOutline, IoEyeOutline } from "react-icons/io5";
import { AxiosAuthPost, AxiosGet } from "@/app/axios/axios";
import Transaction from '../Admin/Dashboard/transaction/transaction';

interface trxdetails {
  isOpen: any;
  onOpen: any;
  onClose: any;
  TrxnId:any;
  isMounted:any;
  setIsMounted:any;
}
interface Transaction {
    [key: string]: any;
  }
export default function TrxDetails({ isOpen, onOpen, onClose,TrxnId,isMounted,setIsMounted }: trxdetails) {
  // const displayWalletAddress =
  // walletAddress.length > 5
  //   ? `${walletAddress.slice(0, 5)}...`
  //   : walletAddress;

  const handleCopy = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast({
          title: "Copied to clipboard.",
          description: `Copied: ${text}`,
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top-right",
        });
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };
  const [show, setShow] = useState(false);
  const [loading, setloading] = useState(false);
  const handleClick = () => setShow(!show);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const toast = useToast();
  const id=TrxnId
//   const url = `transactions/${id}`;
  console.log("id", id);
  const [Transaction, setTransaction] = useState<Transaction>();
  const fetchTransaction = async () => {
    try {
        const res = await AxiosGet(`transactions/${TrxnId}`);
        if (res) {
          setTransaction(res.data);
        }
      } catch (error) {
        console.error("Error fetching transaction:", error);
      }
  };



  useEffect(() => {
    // Set isMounted flag to true when component is mounted

    // Fetch transaction if mounted
    if (isMounted) {
      fetchTransaction();
    }

    // Cleanup function to reset the isMounted flag when component unmounts
    return () => setIsMounted(false);
  }, [isMounted]); // This effect will run once on mount and cleanup on unmount

//    const toDisplay = () => {
  //     const walletAddressDisplay =
  //       walletAddress.length > 5
  //         ? `${walletAddress.slice(0, 5)}...`
  //         : walletAddress;
  //     return {
  //       display: walletAddressDisplay,
  //       fullWalletAddress: walletAddress,
  //     };
  //   };
  //   const fromDisplay = () => {
  //     const walletAddressDisplay =
  //       walletAddress.length > 5
  //         ? `${walletAddress.slice(0, 5)}...`
  //         : walletAddress;
  //     return {
  //       display: walletAddressDisplay,
  //       fullWalletAddress: walletAddress,
  //     };
  //   };
  const TxIdDisplay = (Transaction:any) => {
    const transactionStr = Transaction?.toString(); // Convert to string
    const TransactionId =
    transactionStr?.length > 5 ? `${transactionStr?.slice(0, 5)}...` : transactionStr;
    return {
      display: TransactionId,
      fullWalletAddress: transactionStr,
    };
  };
  const formattedTx = TxIdDisplay(Transaction);
//   function formatToNaira(amount: any) {
//     return new Intl.NumberFormat("en-NG", {
//       style: "currency",
//       currency: "NGN",
//     }).format(amount);
//   }
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

  const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
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

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      size={["xs", "xs", "sm"]}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <VStack w={"full"}>
            <Box w={"full"}>
              <Text>Transaction details</Text>
            </Box>
            <Box w={"full"}>
              <Text fontSize={"16px"} fontWeight={"600"} color={"#666666"}>
                Details for your transactions
              </Text>
            </Box>
          </VStack>
        </DrawerHeader>

       <DrawerBody >
        
          <Box w={"full"}>
            <Text fontSize={"18px"} fontWeight={"600"}>
            {Transaction?.type.charAt(0).toUpperCase() +
                Transaction?.type.slice(1).toLowerCase() +
              " Crypto"}
            </Text>
          </Box>

          <SimpleGrid columns={2} pt={"34px"} gap={"40px"}>
            <GridItem colSpan={1}>
              <Text fontSize={"16px"} fontWeight={"600"}>
                Status
              </Text>
            </GridItem>
            <GridItem
              colSpan={1}
              w={"full"}
              justifyContent={"flex-end"}
              display={"flex"}
            >
              <Box
                 p={"5px"}
                 fontSize={"14px"}
                 fontWeight={"400"}
                 w={"fit-content"}
                 bg={getStatusStyle(Transaction?.status).bg}
                 color={getStatusStyle(Transaction?.status).color}
                 rounded={"10px"}

              >
                {Transaction?.status.toLowerCase()}
              </Box>
            </GridItem>
            <GridItem colSpan={1}>
              <Text fontSize={"16px"} fontWeight={"600"}>
                NGN
              </Text>
            </GridItem>
           
            <GridItem
              colSpan={1}
              w={"full"}
              justifyContent={"flex-end"}
              display={"flex"}
            >
              <Text fontSize={"16px"} fontWeight={"400"}>
              {formatToNaira(Transaction?.amountNaira)}
              </Text>
            </GridItem>
            <GridItem colSpan={1}>
              <Text fontSize={"16px"} fontWeight={"600"}>
                Time
              </Text>
            </GridItem>
            <GridItem
              colSpan={1}
              w={"full"}
              justifyContent={"flex-end"}
              display={"flex"}
            >
              <Text fontSize={"16px"} fontWeight={"400"} color={"#808080"}>
              {formatDate(Transaction?.createdAt)}
              </Text>
            </GridItem>
            
            <GridItem colSpan={1}>
              <Text fontSize="16px" fontWeight="600">
                {Transaction?.type === "BUY" ? "Tx Wallet address" : "Tx Account"}
              </Text>
            </GridItem>
            <GridItem
              colSpan={1}
              w={"full"}
              justifyContent={"flex-end"}
              display={"flex"}
            >
              <HStack>
                <Text
                  fontSize={"16px"}
                  fontWeight={"400"}
                  color={"#808080"}
                  cursor={"pointer"}
                >
                  {Transaction?.type === "BUY" ? Transaction?.walletAddress.slice(0, 12)+"....":Transaction?.accountNumber}
                </Text>
                <Box
                  onClick={() => handleCopy("0xy832bjbfbfvxtyuv...")}
                  cursor={"pointer"}
                >
                  <IoCopyOutline color="#0CBF94" />
                </Box>
              </HStack>
            </GridItem>
            <GridItem colSpan={1}>
              <Text fontSize={"16px"} fontWeight={"600"}>
               Tx Account
              </Text>
            </GridItem>
            <GridItem
              colSpan={1}
              w={"full"}
              justifyContent={"flex-end"}
              display={"flex"}
            >
              <HStack>
                <Text
                  fontSize={"16px"}
                  fontWeight={"400"}
                  color={"#808080"}
                  cursor={"pointer"}
                >
                  0xy832bjbfbfvxt...
                </Text>
                <Box
                  onClick={() => handleCopy("0xy832bjbfbfvxtyuv...")}
                  cursor={"pointer"}
                >
                  <IoCopyOutline color="#0CBF94" />
                </Box>
              </HStack>
            </GridItem>
            <GridItem colSpan={1}>
              <Text fontSize={"16px"} fontWeight={"600"}>
                TxID
              </Text>
            </GridItem>
            <GridItem
              colSpan={1}
              w={"full"}
              justifyContent={"flex-end"}
              display={"flex"}
            >
              <HStack>
                <Text
                  fontSize={"16px"}
                  fontWeight={"400"}
                  color={"#808080"}
                  cursor={"pointer"}
                >
                  {Transaction?._id.slice(0, 14)}....
                </Text>
                <Box
                  onClick={() => handleCopy(Transaction?._id)}
                  cursor={"pointer"}
                >
                  <IoCopyOutline color="#0CBF94" />
                </Box>
              </HStack>
            </GridItem>
          </SimpleGrid>
       

        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
