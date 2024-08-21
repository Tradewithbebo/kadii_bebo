"use client";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
  useDisclosure,
  ChakraProvider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  SimpleGrid,
  GridItem,
  FormControl,
  FormLabel,
  VStack,
  Box,
  Text,
  Image,
  FormErrorMessage,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import { Formik, Form, Field, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { myStyles } from "./selectrix";
import bankName from "./listBanks";
import Select from "react-select";
import { NotificationSell } from "./sellNotification";
import { IoIosArrowForward } from "react-icons/io";
import { CiLock } from "react-icons/ci";
import { AxiosGet } from "@/app/axios/axios";
interface Network {
  image: any;
  symbol: any;
  name: any;
}
export default function SelectAsset() {
  const [message, setmessage] = useState("");
  const [Value, setValue] = useState("");
  //   const [Value, setValue] = useState(null);
  const [NetValue, setNetValue] = useState<Network[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const url = "wallet/assets";
  useEffect(() => {
    const fetchData = async () => {
      const success = await getnetwork();
      if (!success) {
        setTimeout(fetchData, 2000); // Retry after 2 seconds if failed
      }
    };

    fetchData(); // Initial call
  }, []);

  const getnetwork = async () => {
    setLoading(true);
    try {
      const res = await AxiosGet(url);
      setLoading(false);
      if (res) {
        console.log(res.data);
        setNetValue(res.data);
        setLoading(false);
        setErrorMessage(""); // Clear error message on success
        return true;
      }
    } catch (err: any) {
      setLoading(false);
      let message = "Check your Network and try again.";
      if (err.response && err.response.data && err.response.data.message) {
        message = err.response.data.message;
      }
      setErrorMessage(message);
    }
  };

  return (
    <>
      <Box p={4}>
        <SimpleGrid column={2} rowGap={"18px"}>
          <GridItem colSpan={2}>
            <Text fontWeight="600" fontSize="25px">
              Select asset
            </Text>
          </GridItem>
          <GridItem colSpan={2} mt={"-10px"}>
            <Text fontWeight="600" fontSize={["11px", "15px"]} color="#666666">
              Select any crypto assets to deposit and instantly convert to cash
            </Text>
          </GridItem>
          <GridItem colSpan={2} w={"full"}>
            <NotificationSell />
          </GridItem>
          {loading ? (
            <GridItem
              colSpan={2}
              display={"flex"}
              justifyContent={"center"}
              w={"full"}
            >
              <Spinner />
            </GridItem>
          ) : (
            NetValue.map((network, index) => (
              <GridItem colSpan={2} w={"full"} key={index}>
                <Button
                  w={"full"}
                  py={"35px"}
                  //   onClick={() => onopenUpdatePassword()}
                >
                  <HStack w={"full"}>
                    <HStack w={"full"}>
                      <Box>
                        <Image
                          boxSize="20px"
                          objectFit="cover"
                          src={network.image}
                          alt={network.symbol}
                        />
                      </Box>
                      <Box>
                        <Text
                          color={"#000000"}
                          fontSize={"16px"}
                          fontWeight={"600px"}
                        >
                          {network.name}
                        </Text>
                      </Box>
                    </HStack>
                    <Box>
                      <IoIosArrowForward />
                    </Box>
                  </HStack>
                </Button>
              </GridItem>
            ))
          )}

          <GridItem colSpan={2}></GridItem>
          <GridItem colSpan={2}></GridItem>
        </SimpleGrid>
      </Box>
    </>
  );
}
