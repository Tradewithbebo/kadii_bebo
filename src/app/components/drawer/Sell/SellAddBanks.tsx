"use client";
import {
  Box,
  Button,
  Divider,
  GridItem,
  HStack,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import { AxiosGet } from "@/app/axios/axios";
import { useCryptoContext } from "../Buy/usecontextbuy";

interface Bank {
  accountName: string;
  accountNumber: string;
  bankName: string;
  _id: string;
}

export default function SellAddBank({ Setstep }: { Setstep: any }) {
  const {
    userId,
    setaccountName,
    setbankName,
    setaccountNumber,
    setaccountid,
  } = useCryptoContext();

  const [loading3, setLoading3] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [existingBank, setExistingBank] = useState<Bank[]>([]);
  const [showAll, setShowAll] = useState(false);

  const url = `banks/accounts/${userId}`;

  const getDetails = async () => {
    setLoading3(true);
    try {
      const res = await AxiosGet(url);
      if (res) {
        setExistingBank(res.data);
      }
    } catch (err: any) {
      let message = "Check your Network and try again.";
      if (err.response && err.response.data && err.response.data.message) {
        message = err.response.data.message;
      }
      setErrorMessage(message);
    } finally {
      setLoading3(false);
    }
  };

  useEffect(() => {
    getDetails();
  }, []); // Ensure useEffect runs only once on mount

  const banksToDisplay = showAll ? existingBank : existingBank.slice(0, 2);

  if (loading3) {
    return (
      <Box width="full" height="100vh" display="flex" justifyContent="center" alignItems="center">
        <HStack>
          <Spinner size="lg" />
          <Text fontSize="16px" fontWeight="600" ml={3}>
            Getting your banks
          </Text>
        </HStack>
      </Box>
    );
  }
  

  return (
    <Box p={4}>
      <SimpleGrid columns={1} w="full">
        <GridItem colSpan={1}>
          <Text fontWeight="600" fontSize="25px">
            Select bank account
          </Text>
        </GridItem>
        <GridItem colSpan={1} mt="10px">
          <Text fontWeight="600" fontSize={["11px", "15px"]} color="#666666">
            Add your preferred bank for instant payout
          </Text>
        </GridItem>
        <GridItem colSpan={1} mt="18px">
     {banksToDisplay.map((bank) => (
  <SimpleGrid
    key={bank._id}
    onClick={() => {
      setaccountName(bank.accountName);
      setbankName(bank.bankName);
      setaccountNumber(bank.accountNumber);
      setaccountid(bank._id);
      Setstep(2);
    }}
    mb="8px"
    columns={6}
    w="full"
    gap="40px"
    p="16px"
    border="1px"
    bgColor="#f3f4f6"
    borderColor="#e5e7eb"
    borderRadius="10px"
    cursor="pointer"
    _hover={{
      bg: "#E7F6EC",
      borderColor: "#0CBF94",
    }}
  >
    <GridItem colSpan={6} display="flex" justifyContent="start">
      <Text fontWeight="600" fontSize="16px" isTruncated>
        {bank.accountName}
      </Text>
    </GridItem>
    <GridItem colSpan={4} display="flex" alignItems="center" w={'full'}>
      <Box flexGrow={0} flexShrink={0} overflow="hidden">
        <Text fontWeight="400" fontSize="14px" isTruncated>
          {bank.accountNumber}
        </Text>
      </Box>
      <Box px={'4px'}>
        <Divider
        // justifyContent={'center'} display={'flex'} w={'full'}
        orientation="vertical"
        height="20px"  // Define height to make the divider visible
        borderColor="#d4d4d8"  // Use borderColor instead of color
        borderWidth="1px"
        />
      </Box>
      <Box flexGrow={0} minWidth="100px" flexShrink={0} overflow="hidden">
        <Text fontWeight="400" fontSize="14px" isTruncated>
        {bank.bankName.length > 15 ? `${bank.bankName.slice(0, 15)}...` : bank.bankName}
        </Text>
      </Box>
    </GridItem>
  </SimpleGrid>
))}


          {existingBank.length > 2 && (
            <Button
              onClick={() => setShowAll(!showAll)}
              mt={4}
              bg="#0CBF94"
              w="full"
            >
              {showAll ? "Show Less" : "Show all my banks"}
            </Button>
          )}
        </GridItem>
        <GridItem colSpan={1} mt="30px">
          <Button
            width="full"
            color="#0CBF94"
            fontSize="16px"
            fontWeight="600"
            onClick={() => Setstep(10)}
            h={["50px", "50px", "44px"]}
          >
            <FaPlus /> &nbsp; &nbsp;Add bank
          </Button>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
}
