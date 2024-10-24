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
import React, { useState } from "react";
import { NotificationSell } from "./sellNotification";
import { IoCopyOutline } from "react-icons/io5";
import { useCryptoContext } from "../Buy/usecontextbuy";
import { AxiosAuthPost } from "@/app/axios/axios";

export default function SendcryptoQrcode({ setstep }: { setstep: any }) {
  const {
    accountid,
    sellvalueusdt,
    sellConversion2,
    sellsymbol,
    Address,
    setAddress,
    sellWetrade,
    settransactionid,
  } = useCryptoContext();

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
  const url = "transactions/create";
  const values = {
    amountNaira: Number(sellConversion2),
    amountBlockchain: Number(sellvalueusdt),
    blockchain: sellsymbol,
    address: Address,
    bank: String(accountid),
    transactionType: "SELL",
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
            settransactionid(Id);
            setstep(6);
          } else {
            throw new Error("Checkout URL not found in response.");
          }
        }
      } catch (err: any) {
        setLoading(false);
        let message = "Check your Network and try again.";
        if (err.response?.data?.message) {
          message = err.response.data.message;
        }
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

  return (
    <Box p={[2, 4, 6]} w={"full"} maxW={"1200px"} mx={"auto"}>
      <SimpleGrid columns={[1, 1, 2]} rowGap={"28px"}>
        <GridItem colSpan={2}>
          <Text fontWeight="600" fontSize={["20px", "25px"]}>
            Send crypto
          </Text>
        </GridItem>

        <GridItem colSpan={2} mt={"-10px"}>
          <Text fontWeight="600" fontSize={["14px", "16px"]} color="#666666">
            Send your crypto to the wallet address below
          </Text>
        </GridItem>

        <GridItem colSpan={2} w={"full"}>
          <NotificationSell />
        </GridItem>

        <GridItem colSpan={2} w={"full"} bg={"#F8F8F8"} p={["10px", "16px"]}>
          <Text fontWeight="600" fontSize={["14px", "16px"]} mb={"50px"}>
            Send only {sellWetrade} to the wallet address below:
          </Text>

          <Text fontWeight="600" fontSize={["13px", "15px"]} color="#808080" mb={"8px"}>
            Wallet address
          </Text>

          <Box display={sellWetrade === "not available" ? "none" : "block"}>
            <HStack w={"full"} flexDir={"row"} justifyContent="space-between">
              <Text>{truncateWallet(Wallet)}</Text>
              <Button
                bg={"#E7F6EC"}
                onClick={() => handleCopy(Wallet)}
                fontSize={["12px", "14px"]}
              >
                <IoCopyOutline /> Copy
              </Button>
            </HStack>
          </Box>
        </GridItem>

        <GridItem colSpan={2} display={sellWetrade === "not available" ? "none" : "block"}>
          <Text textAlign={"center"} py={"32px"}>
            OR
          </Text>
        </GridItem>

        <GridItem
          colSpan={2}
          display={sellWetrade === "not available" ? "none" : "block"}
          w={"full"}
          bg={"#F8F8F8"}
          p={["10px", "16px"]}
        >
          <Text fontWeight={"600"} fontSize={["14px", "16px"]} mb={"16px"} textAlign={"center"}>
            Scan the QR code below
          </Text>
          <Box display={"flex"} justifyContent={"center"}>
            <Image src="./image/qr.svg" alt="QR code" w={["150px", "200px"]} />
          </Box>
        </GridItem>

        <GridItem colSpan={2}>
          <Button
            h={["50px", "50px", "44px"]}
            bg="#0CBF94"
            w={"full"}
            color={"#021D17"}
            fontSize={["14px", "16px"]}
            fontWeight={"600"}
            type="submit"
            isDisabled={sellWetrade === "not available"}
            onClick={() => handleSubmit(values)}
            isLoading={loading}
          >
            I have sent crypto
          </Button>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
}
