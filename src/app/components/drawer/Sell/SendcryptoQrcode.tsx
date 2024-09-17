import {
  Box,
  Button,
  GridItem,
  HStack,
  SimpleGrid,
  Text,
  useToast,
  Image,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { NotificationSell } from "./sellNotification";
import { color } from "framer-motion";
import { IoCopyOutline } from "react-icons/io5";
// import { HStack } from '@chakra-ui/react';
import { useCryptoContext } from "../Buy/usecontextbuy";
import { AxiosAuthPost } from "@/app/axios/axios";

export default function SendcryptoQrcode({ setstep }: { setstep: any }) {
  const {
    userId,
    setUserId,
    setaccountName,
    setbankName,
    setaccountNumber,
    setblockchain,
    accountid,
    setaccountid,
    blockchain,
    sellvalueusdt,
    Conversion2,
    Address,
    setAddress,
    sellConversion2,
    sellsymbol,
            transactionId,
        settransactionid,
  } = useCryptoContext();
  const { sellWetrade, setsellWetrade } = useCryptoContext();
  const toast = useToast();
  const [Wallet, setWallet] = useState(Address);
  const truncateWallet = (wallet: string) => {
    return wallet.length > 25 ? `${wallet.slice(0, 25)}...` : wallet;
  };

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
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // const router = useRouter();
  
  const url = "transactions/create";
  const values = {
    amountNaira: Number(sellConversion2),
    amountBlockchain: Number(sellvalueusdt),
    blockchain: sellsymbol,
    address: Address,
    bank: String(accountid),
    transactionType: "sell",
  };

  const handleSubmit = async (values: any) => {
    if (values) {
      setLoading(true);
      try {
        const res = await AxiosAuthPost(url, values);
        setLoading(false);
        if (res && res.data) {
          const Id = res.data._id;
        
          if (Id) {
            settransactionid(Id)
            setstep(6);//
       
        } else {
          throw new Error("Checkout URL not found in response.");
        }
        }
      } catch (err: any) {
        setLoading(false);
        let message = "Check your Network and try again.";
        if (err.response && err.response.data && err.response.data.message) {
          message = err.response.data.message;
        }
        setErrorMessage(message);
        toast({
          title: "Error",
          description: message,
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    }
  };

  const [errorMessage2, setErrorMessage2] = useState("");
  // const [transactionId, settransactionid] = useState("");
  const [loading2, setLoading2] = useState(false);
  
 
  return (
    <Box p={4}>
      <SimpleGrid columns={2} rowGap={"28px"}>
        <GridItem colSpan={2}>
          <Text fontWeight="600" fontSize="25px">
            Send crypto
          </Text>
        </GridItem>
        <GridItem colSpan={2} mt={"-10px"}>
          <Text fontWeight="600" fontSize={"16px"} color="#666666">
            Send your crypto to the wallet address below
          </Text>
        </GridItem>
        <GridItem colSpan={2} w={"full"}>
          <NotificationSell />
        </GridItem>
        <GridItem colSpan={2} w={"full"} bg={"#F8F8F8"} p={"16px"}>
          {sellWetrade === "not available" ? (
            <Text fontWeight={"600"} fontSize={"16px"} mb={"50px"}>
              Wallet address {sellWetrade} :
            </Text>
          ) : (
            <Text fontWeight={"600"} fontSize={"16px"} mb={"50px"}>
              Send only {sellWetrade} to the wallet address below :
            </Text>
          )}
          <Text
            fontWeight="600"
            fontSize={["15px", "15px"]}
            color="#808080"
            mb={"8px"}
          >
            Wallet address
          </Text>
          <Box display={sellWetrade === "not available" ? "none" : "block"}>
            <HStack w={"full"} flexDir={"row"}>
              <Box>{truncateWallet(Wallet)}</Box>
              <Box>
                <Button
                  bg={"#E7F6EC"}
                  onClick={() => {
                    handleCopy(Wallet);
                  }}
                >
                  <IoCopyOutline /> Copy
                </Button>
              </Box>
            </HStack>
          </Box>
        </GridItem>
        <GridItem
          colSpan={2}
          w={"full"}
          display={sellWetrade === "not available" ? "none" : "block"}
        >
          <Text textAlign={"center"} py={"32px"}>
            OR
          </Text>
        </GridItem>
        <GridItem
          display={sellWetrade === "not available" ? "none" : "block"}
          colSpan={2}
          w={"full"}
          bg={"#F8F8F8"}
          p={"16px"}
          // display={"flex"}
          justifyContent={"center"}
          flexDir={"column"}
        >
          <Text
            fontWeight={"600"}
            fontSize={"16px"}
            mb={"16px"}
            textAlign={"center"}
          >
            Scan the QR code below
          </Text>
          <Box display={"flex"} justifyContent={"center"}>
            <Image src="./image/qr.svg" alt="bebo" />
          </Box>
        </GridItem>
        <GridItem colSpan={2}>
          <Button
            h={["50px", "50px", "44px"]}
            bg="#0CBF94"
            w={"full"}
            color={"#021D17"}
            fontSize={"16px"}
            fontWeight={"600"}
            type="submit"
            isDisabled={sellWetrade === "not available"}
            onClick={() => {
              
              handleSubmit(values);
            }}
            isLoading={loading}
          >
            I have sent crypto
          </Button>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
}
