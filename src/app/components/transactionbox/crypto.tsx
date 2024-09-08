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
  Fade,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsChevronDown, BsExclamationCircle } from "react-icons/bs";
import { TbCurrencyNaira } from "react-icons/tb";
import { MenuItems } from "./menuitem";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { ButtonForBuy, ButtonForsell } from "./ButtonForBuy";
import InputReceiverDetails from "../drawer/Buy/inputReceiverDetails";
import GeneralFormPage from "../drawer/Buy/generalformpage";
import { AxiosGet } from "@/app/axios/axios";
import Generalsell from "../drawer/Sell/Generalsell";
import { useCryptoContext } from "../drawer/Buy/usecontextbuy";

export function SellCrypto() {
  const [selectedCrypto, setSelectedCrypto] = useState("");
  const [selectedimage, setselectedimage] = useState("/image/crypto.png");
  const [BTCrate, setBTCRate] = useState("");
  const [rate, setRate] = useState("");

  const handleCryptoSelect = (crypto: string, image: any, rates: any) => {
    setSelectedCrypto(crypto);
    setselectedimage(image);
    setRate(
      new Intl.NumberFormat("en-NG", {
        // style: 'currency',
        // currency: 'NGN',
      }).format(rates)
    ); // Update the selected crypto in state
    onClose();
  };

  const { onOpen } = useDisclosure();
  const [networkOptions, setNetworkOptions] = useState<NetworkOption[]>([]);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    isOpen: sellisopen,
    onOpen: sellonopen,
    onClose: Sellonclose,
  } = useDisclosure();
  const { isOpen: opentwo, onToggle: toggle, onClose } = useDisclosure();

  const url = "wallet/assets";
  type NetworkOption = {
    title: string;
    current_price: any;
    name: string;
    // menu: JSX.Element;
    image?: string; // Optional if you have an image property
  };

  const getnetwork = async () => {
    setLoading(true);
    try {
      const res = await AxiosGet(url);
      setLoading(false);
      if (res) {
        // console.log(res.data);

        const btcData = res.data.find(
          (crypto: any) => crypto.name === "Bitcoin"
        );

        if (btcData) {
          setRate(
            new Intl.NumberFormat("en-NG", {
              // style: 'currency',
              // currency: 'NGN',
            }).format(btcData.current_price)
          ); // Set the current price of Bitcoin
          setSelectedCrypto("Bitcoin");
        }

        setNetworkOptions(res.data);

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

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined = undefined; // Typing timeoutId as NodeJS.Timeout
    const fetchData = async () => {
      const success = await getnetwork();
      if (!success) {
        setTimeout(fetchData, 2000); // Retry after 2 seconds if failed
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
    <SimpleGrid
      px={["10px", "19px", "119px"]}
      w={["335px", "450px", "668px"]}
      spacingY={["5px", "5px", "20px"]}
      columns={[1, 1, 3]}
    >
      <Generalsell
        isOpen={sellisopen}
        onClose={Sellonclose}
        onOpen={sellonopen}
      />
      <GridItem colSpan={[1, 1, 3]} textAlign={"center"} mb={["10px", "16px"]}>
        <Box>
          <Text fontWeight={"600"} fontSize={["16px", "16px", "18px"]}>
            Sell crypto
          </Text>
        </Box>
      </GridItem>

      <GridItem
        colSpan={[1, 1, 3]}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box>
          <Divider width={["100px", "150px", "200px"]} />
        </Box>
      </GridItem>

      {/* second part */}
      <GridItem colSpan={[1, 1, 1]} mt={["15px", "32px"]} w={"full"}>
        <HStack>
          <Box>
            <Text fontSize={"16px"} fontWeight={"600"} color={"#808080"}>
              Crypto:
            </Text>
          </Box>

          <Box w={"100%"}>
            <Button w={"100%"} onClick={toggle} bg={"#F8F8F8"} h={"50px"}>
              <HStack w={"full"} justifyContent={"space-between"}>
                <HStack gap={"8px"}>
                  <Box mt={"5px"} mb={"5px"} width={"20px"} height={"20px"}>
                    {loading ? (
                      <Spinner />
                    ) : (
                      <Image src={selectedimage} alt="Crypto" />
                    )}
                  </Box>
                  <Box>
                    <Text
                      fontSize={"16px"}
                      fontWeight={"600"}
                      mt={"10px"}
                      mb={"10px"}
                    >
                      {selectedCrypto}
                    </Text>
                  </Box>
                </HStack>
                <Box ml={["60px", "120px", "0px"]}>
                  <BsChevronDown size={"14px"} />
                </Box>
              </HStack>
            </Button>

            <Fade in={opentwo}>
              <VStack
                mt="4"
                bg="white"
                rounded="md"
                shadow="md"
                w={["250px", "300px", "xs"]}
                zIndex={1000}
                position="absolute"
                spacing={0}
              >
                {networkOptions.map((item) => (
                  <Box
                    key={item.name}
                    w="100%"
                    px="16px"
                    py="8px"
                    cursor="pointer"
                    _hover={{ bg: "gray.100" }}
                    onClick={() =>
                      handleCryptoSelect(
                        item.name,
                        item.image,
                        item.current_price
                      )
                    }
                  >
                    <HStack w="100%">
                      {item.image && (
                        <Image
                          boxSize="20px"
                          borderRadius="full"
                          src={item.image}
                          alt={item.name}
                          mr="12px"
                        />
                      )}
                      <Text>{item.name}</Text>
                    </HStack>
                  </Box>
                ))}
              </VStack>
            </Fade>
          </Box>
        </HStack>
      </GridItem>
      {/* <GridItem
        colSpan={[1, 1,]}
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
            size={"xl"}
          />
        </Box>
      </GridItem> */}
      <GridItem
        colSpan={[1, 1, 2]}
        mt={["15px", "15px", "32px"]}
        mb={["40px", "40px", "0px"]}
        // overflow={'hidden'}
      >
        <HStack
          gap={["20px", "10px"]}
          justifyContent={["flex-start", "flex-start", "flex-end"]}
        >
          <Divider
            display={{ base: "none", md: "block" }}
            orientation="vertical"
            h={"50px"}
            mr={"24px"}
            ml={"24px"}
            color={"#F0F0F0"}
            size={"xl"}
          />
          <Box>
            <Text fontSize={"16px"} fontWeight={"600"} color={"#808080"}>
              Rate:
            </Text>
          </Box>
          <Button bg={"#F8F8F8"} h={"50px"}>
            <HStack w={"full"}>
              <Box>
                <TbCurrencyNaira size={"20px"} />
              </Box>
              <Box mt={"9px"} mb={"9px"} w={"full"}>
                {loading ? (
                  <Spinner />
                ) : (
                  <Text fontSize={"16px"} fontWeight={"600"}>
                    {rate}
                  </Text>
                )}
              </Box>
            </HStack>
          </Button>
        </HStack>
      </GridItem>

      {/* third part */}
      <GridItem colSpan={[1, 1, 3]} display={{ base: "none", md: "block" }}>
        <Box
          mb={["20px", "40px"]}
          mt={["20px", "40px"]}
          bg={"#F8F8F8"}
          p={["12px", "16px"]}
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
                  <BsExclamationCircle size={"20px"} />
                </Box>
              </Box>
            </Box>
            <Box>
              <Text
                fontWeight={"500"}
                fontSize={["12px", "14px"]}
                color={"#808080"}
              >
                To sell your crypto, click on the green button below to generate
                a wallet address to send your crypto.
              </Text>
            </Box>
          </HStack>
        </Box>
      </GridItem>

      {/* fourth part */}
      <GridItem w={"full"} colSpan={[1, 1, 3]}>
        <ButtonForsell onOpen={sellonopen} />
      </GridItem>
    </SimpleGrid>
  );
}

export function BuyCrypto() {
  const {
    setmenucurrent_price,
    setmenuimage,
    setmenusymbol,
    setmenuname,
    menucurrent_price,
    menuimage,
    menusymbol,
    menuname,
  } = useCryptoContext();

  const [selectedCrypto, setSelectedCrypto] = useState("");
  const { isOpen: opentwo, onToggle: toggle, onClose: close } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedimage, setselectedimage] = useState("/image/crypto.png");
  const [BTCrate, setBTCRate] = useState("");
  const [rate, setRate] = useState("");
  const [networkOptions, setNetworkOptions] = useState<NetworkOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCryptoSelect = (crypto: string, image: any, rates: any,symbol:any) => {
    setSelectedCrypto(crypto);
    setselectedimage(image);
    setRate(
      new Intl.NumberFormat("en-NG", {
        // style: 'currency',
        // currency: 'NGN',
      }).format(rates)
    ); // Set the current price of Bitcoin// Update the selected crypto in state
    setmenucurrent_price(rates);
    setmenuimage(image);
    setmenusymbol(symbol);
    setmenuname(crypto);
    close();
  };
  // const { isOpen, onOpen, onClose } = useDisclosure();
 

  const url = "wallet/assets";
  type NetworkOption = {
    title: string;
    current_price: any;
    name: string;
    symbol:any;
    // menu: JSX.Element;
    image?: string; // Optional if you have an image property
  };

  const getnetwork = async () => {
    setLoading(true);
    try {
      const res = await AxiosGet(url);
      setLoading(false);
      if (res) {
        // console.log(res.data);

        const btcData = res.data.find(
          (crypto: any) => crypto.name === "Bitcoin"
        );

        if (btcData) {
          setRate(
            new Intl.NumberFormat("en-NG", {
              // style: 'currency',
              // currency: 'NGN',
            }).format(btcData.current_price)
          ); // Set the current price of Bitcoin
          setSelectedCrypto("Bitcoin");
        }

        setNetworkOptions(res.data);

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
  const [isSuccess, setIsSuccess] = useState(false); // Track success status

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;
  
    const fetchData = async () => {
      const success = await getnetwork();
      if (success) {
        setIsSuccess(true); // Mark success as true if data is fetched successfully
      } else {
        timeoutId = setTimeout(fetchData, 2000); // Retry after 2 seconds if failed
      }
    };
  
    // Fetch data only if success has not been achieved
    if (!isSuccess) {
      fetchData(); // Initial call to fetch data
    }
  
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId); // Clear timeout on unmount
      }
    };
    // Empty dependency array ensures it only runs on component mount
  }, [isSuccess]); // Remove `isSuccess` from dependency array// Add isSuccess as a dependency
  return (
    <>
      <SimpleGrid
        px={["10px", "19px", "119px"]}
        w={["335px", "450px", "668px"]}
        columns={[1, 1, 3]}
        spacingY={["5px", "5px", "20px"]}
      >
        <GridItem
          colSpan={[1, 1, 3]}
          textAlign={"center"}
          mb={["10px", "16px"]}
        >
          <Box>
            <Text fontWeight={"600"} fontSize={["16px", "16px", "18px"]}>
              Buy crypto
            </Text>
          </Box>
        </GridItem>
        <GridItem
          colSpan={[1, 1, 3]}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box>
            <Divider width={["100px", "150px", "200px"]} />
          </Box>
        </GridItem>

        {/* second part */}
        <GridItem colSpan={[1, 1, 1]} mt={["15px", "32px"]} w={"full"}>
          <HStack>
            <Box>
              <Text fontSize={"16px"} fontWeight={"600"} color={"#808080"}>
                Crypto:
              </Text>
            </Box>

            <Box w={"100%"}>
              <Button w={"100%"} onClick={toggle} bg={"#F8F8F8"} h={"50px"}>
                <HStack w={"full"} justifyContent={"space-between"}>
                  <HStack gap={"8px"}>
                    <Box mt={"5px"} mb={"5px"} width={"20px"} height={"20px"}>
                      {loading ? (
                        <Spinner />
                      ) : (
                        <Image src={selectedimage} alt="Crypto" />
                      )}
                    </Box>
                    <Box>
                      <Text
                        fontSize={"16px"}
                        fontWeight={"600"}
                        mt={"10px"}
                        mb={"10px"}
                      >
                        {selectedCrypto}
                      </Text>
                    </Box>
                  </HStack>
                  <Box ml={["60px", "120px", "0px"]}>
                    <BsChevronDown size={"14px"} />
                  </Box>
                </HStack>
              </Button>

              <Fade in={opentwo}>
                <VStack
                  mt="4"
                  bg="white"
                  rounded="md"
                  shadow="md"
                  w={["250px", "300px", "xs"]}
                  zIndex={1000}
                  position="absolute"
                  spacing={0}
                >
                  {networkOptions.map((item) => (
                    <Box
                      key={item.name}
                      w="100%"
                      px="16px"
                      py="8px"
                      cursor="pointer"
                      _hover={{ bg: "gray.100" }}
                      onClick={() =>
                        handleCryptoSelect(
                          item.name,
                          item.image,
                          item.current_price,
                          item.symbol,
                        )
                      }
                    >
                      <HStack w="100%">
                        {item.image && (
                          <Image
                            boxSize="20px"
                            borderRadius="full"
                            src={item.image}
                            alt={item.name}
                            mr="12px"
                          />
                        )}
                        <Text>{item.name}</Text>
                      </HStack>
                    </Box>
                  ))}
                </VStack>
              </Fade>
            </Box>
          </HStack>
        </GridItem>
        {/* <GridItem
        colSpan={[1, 1,]}
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
            size={"xl"}
          />
        </Box>
      </GridItem> */}
        <GridItem
          colSpan={[1, 1, 2]}
          mt={["15px", "15px", "32px"]}
          mb={["40px", "40px", "0px"]}
          // overflow={'hidden'}
        >
          <HStack
            gap={["20px", "10px"]}
            justifyContent={["flex-start", "flex-start", "flex-end"]}
          >
            <Divider
              display={{ base: "none", md: "block" }}
              orientation="vertical"
              h={"50px"}
              mr={"24px"}
              ml={"24px"}
              color={"#F0F0F0"}
              size={"xl"}
            />
            <Box>
              <Text fontSize={"16px"} fontWeight={"600"} color={"#808080"}>
                Rate:
              </Text>
            </Box>
            <Button bg={"#F8F8F8"} h={"50px"}>
              <HStack w={"full"}>
                <Box>
                  <TbCurrencyNaira size={"20px"} />
                </Box>
                <Box mt={"9px"} mb={"9px"} w={"full"}>
                  {loading ? (
                    <Spinner />
                  ) : (
                    <Text fontSize={"16px"} fontWeight={"600"}>
                      {rate}
                    </Text>
                  )}
                </Box>
              </HStack>
            </Button>
          </HStack>
        </GridItem>

        {/* third part */}
        <GridItem colSpan={[1, 1, 3]} display={{ base: "none", md: "block" }}>
          <Box
            mb={["20px", "40px"]}
            mt={["20px", "40px"]}
            bg={"#F8F8F8"}
            p={["12px", "16px"]}
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
                    <BsExclamationCircle size={"20px"} />
                  </Box>
                </Box>
              </Box>
              <Box>
                <Text
                  fontWeight={"500"}
                  fontSize={["12px", "14px"]}
                  color={"#808080"}
                >
                  To sell your crypto, click on the green button below to
                  generate a wallet address to send your crypto.
                </Text>
              </Box>
            </HStack>
          </Box>
        </GridItem>
        {/* fourth part */}
        <GridItem w={"full"} colSpan={[1, 1, 3]}>
          <ButtonForBuy onOpen={onOpen} />
        </GridItem>
      </SimpleGrid>
      <GeneralFormPage isOpen={isOpen} onClose={onClose} />
    </>
  );
}
