"use client";
import {
  Box,
  Button,
  GridItem,
  HStack,
  Image,
  SimpleGrid,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { AxiosGet } from "@/app/axios/axios";
import { useCryptoContext } from "../Buy/usecontextbuy";
import { NotificationSell } from "./sellNotification";

interface Network {
  image: any;
  symbol: any;
  name: any;
  current_price: any;
}

export default function SelectAsset({ setStep }: { setStep: any }) {
  const {
    setblockchain,
    setsellRate,
    setsellimage,
    setsellsymbol,
   
  
  } = useCryptoContext();

  const [NetValue, setNetValue] = useState<Network[]>([]);
  const [Loadingaset, setLoadingaset] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const url = "wallet/assets";

  // Fetch the available networks
  const getnetwork = async (): Promise<boolean> => {
    setLoadingaset(true);
    try {
      const res = await AxiosGet(url);
      setLoadingaset(false);
      if (res) {
        console.log("Networks fetched:", res.data); // Log fetched networks
        setNetValue(res.data);
        setErrorMessage("");
        return true; // Return true on success
      } else {
        return false; // Return false if no response or empty data
      }
    } catch (err: any) {
      setLoadingaset(false);
      let message = "Check your Network and try again.";
      if (err.response && err.response.data && err.response.data.message) {
        message = err.response.data.message;
      }
      setErrorMessage(message);
      return false; // Return false on failure
    }
  };
  
  
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined = undefined; // Typing timeoutId as NodeJS.Timeout
    const fetchData = async () => {
      const success = await getnetwork();
      if (!success) {
        timeoutId = setTimeout(fetchData, 2000); // Retry after 2 seconds if failed
      }
    };
  
    fetchData(); // Initial call
    return () => {
      // Cleanup function to clear the timeout if it was set
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);
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
        {Loadingaset ? (
          <GridItem
            colSpan={2}
            display={"flex"}
            justifyContent={"center"}
            w={"full"}
            height="50vh"
            // display="flex"
            // justifyContent="center"
            alignItems="center"
          >
          <HStack>
          <Spinner size="lg" />
          <Text fontSize="16px" fontWeight="600" ml={3}>
            Getting Assets
          </Text>
        </HStack>
          </GridItem>
        ) : (
          NetValue.map((network, index) => (
            <GridItem
              colSpan={2}
              w={"full"}
              key={index}
              onClick={() => {
                // console.log("Selected network:", network); // Log selected network
                setblockchain(network.name);
                setsellRate(network.current_price);
                setsellimage(network.image);
                setsellsymbol(network.symbol);
                // setSelectedSellNetwork(
                // {  image: network.image,
                //   symbol: network.symbol;
                //   name: network.name;
                //   current_price: any;}
                // ); // Set selected network for price updates
                setStep(3);
              }}
            >
              <Button w={"full"} py={"35px"}>
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
      </SimpleGrid>
    </Box>
  </>
);
}
