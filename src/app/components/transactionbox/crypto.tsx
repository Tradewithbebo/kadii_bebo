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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsChevronDown, BsExclamationCircle } from "react-icons/bs";
import { TbCurrencyNaira } from "react-icons/tb";
import { MenuItems } from "./menuitem";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {ButtonForBuy, ButtonForsell} from "./ButtonForBuy";
import InputReceiverDetails from "../drawer/Buy/inputReceiverDetails";
import GeneralFormPage from "../drawer/Buy/generalformpage";
import { AxiosGet } from "@/app/axios/axios";

export function SellCrypto() {
  const [selectedCrypto, setSelectedCrypto] = useState("BTC");
  const [selectedimage, setselectedimage] = useState("/image/crypto.png");
  const [BTCrate, setBTCRate] = useState("");
  const [rate, setRate] = useState('');
 
  const handleCryptoSelect = (crypto: string,image:any,rates:any) => {
    setSelectedCrypto(crypto);
    setselectedimage (image)
    setRate(rates)// Update the selected crypto in state
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [networkOptions, setNetworkOptions] = useState<NetworkOption[]>([]);
  
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  
  const url = 'wallet/assets';
  type NetworkOption = {
    title: string;
    current_price:any
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
        console.log(res.data); 
     
        const btcData = res.data.find((crypto: any) => crypto.name === "Bitcoin");
      
      if (btcData) {
        setRate(btcData.current_price); // Set the current price of Bitcoin
      }
    
        setNetworkOptions(res.data);

        setLoading(false);
        setErrorMessage(''); // Clear error message on success
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
    const fetchData = async () => {
      const success = await getnetwork();
      if (!success) {
        setTimeout(fetchData, 2000); // Retry after 2 seconds if failed
      }
    };

    fetchData(); // Initial call
  }, []);

  return (
    <SimpleGrid
      px={["10px", "19px", "119px"]}
      w={["335px", "335px", "668px"]}
      spacingY={["10px", "10px", "20px"]}
      columns={[1, 1, 3]}
    >
      <GridItem colSpan={[1, 3]} textAlign={"center"} mb={["10px", "16px"]}>
        <Box>
          <Text fontWeight={"600"} fontSize={["14px", "16px", "18px"]}>
            Sell crypto
          </Text>
        </Box>
      </GridItem>

      <GridItem
        colSpan={[1, 3]}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box>
          <Divider width={["100px", "150px", "200px"]} />
        </Box>
      </GridItem>

      {/* second part */}
      <GridItem colSpan={1} mt={["15px", "32px"]} w={"full"}>
        <HStack>
          <Box>
            <Text
              fontWeight={"600"}
              fontSize={["11px", "16px"]}
              color={"#808080"}
            >
              Crypto:
            </Text>
          </Box>

          <Menu>
            <MenuButton w={"100%"}>
              <HStack gap={"16px"} px={"16px"} bg={"#F8F8F8"}>
                <HStack gap={"8px"}>
                  <Box mt={"5px"} mb={"5px"} width={"20px"} height={"20px"}>
                    <Image src={selectedimage} alt="Bebo" />
                  </Box>
                  <Box>
                    <Text
                      fontWeight={"600"}
                      fontSize={["11px", "16px"]}
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
            </MenuButton>

            <MenuList>
  {networkOptions.map((item) => (
    <MenuItem
      key={item.title}
      minH="10px"
      onClick={() => handleCryptoSelect(item.name,item.image,item.current_price)}
    >
      {item.image && (
        <Image
          boxSize="20px"
          borderRadius="full"
          src={item.image}
          alt={item.title}
          mr="12px"
        />
      )}
      <Text>{item.name}</Text>
    </MenuItem>
  ))}
</MenuList>

          </Menu>
        </HStack>
      </GridItem>
      <GridItem
        colSpan={1}
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
          />
        </Box>
      </GridItem>
      <GridItem colSpan={1} mt={["15px", "32px"]} mb={["40px", "0px"]}>
        <HStack
          gap={["20px", "10px"]}
          justifyContent={["flex-start", "flex-end"]}
        >
          <Box>
            <Text
              fontWeight={"600"}
              fontSize={["11px", "16px"]}
              color={"#808080"}
            >
              Rate:
            </Text>
          </Box>
          <HStack bg={"#F8F8F8"} px={"16px"}>
            <Box>
              <TbCurrencyNaira size={"14px"} />
            </Box>
            <Box mt={"9px"} mb={"9px"}>
              <Text fontWeight={"600"} fontSize={["11px", "16px"]}>
                {rate}
              </Text>
            </Box>
          </HStack>
        </HStack>
      </GridItem>

      {/* third part */}
      <GridItem colSpan={[1, 3]} display={{ base: "none", md: "block" }}>
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
      <GridItem w={"full"} colSpan={[1, 3]}>
        <ButtonForsell onOpen={onOpen} />
      </GridItem>
    </SimpleGrid>
  );
}

export function BuyCrypto() {
  const [selectedCrypto, setSelectedCrypto] = useState("BTC");
  // const handleCryptoSelect = (crypto: string) => {
  //   setSelectedCrypto(crypto); // Update the selected crypto in state
  // };
  const { isOpen, onOpen, onClose } = useDisclosure();
 const [selectedimage, setselectedimage] = useState("/image/crypto.png");
  const [BTCrate, setBTCRate] = useState("");
  const [rate, setRate] = useState('');
 
  const handleCryptoSelect = (crypto: string,image:any,rates:any) => {
    setSelectedCrypto(crypto);
    setselectedimage (image)
    setRate(rates)// Update the selected crypto in state
  };
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [networkOptions, setNetworkOptions] = useState<NetworkOption[]>([]);
  
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  
  const url = 'wallet/assets';
  type NetworkOption = {
    title: string;
    current_price:any
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
        console.log(res.data); 
     
        const btcData = res.data.find((crypto: any) => crypto.name === "Bitcoin");
      
      if (btcData) {
        setRate(btcData.current_price); // Set the current price of Bitcoin
      }
    
        setNetworkOptions(res.data);

        setLoading(false);
        setErrorMessage(''); // Clear error message on success
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
    const fetchData = async () => {
      const success = await getnetwork();
      if (!success) {
        setTimeout(fetchData, 2000); // Retry after 2 seconds if failed
      }
    };

    fetchData(); // Initial call
  }, []);
  return (
    <>
      <SimpleGrid
        px={["10px", "19px", "119px"]}
        w={["335px", "335px", "668px"]}
        columns={[1, 1, 3]}
        spacingY={["10px", "10px", "20px"]}
      >
        <GridItem colSpan={[1, 3]} textAlign={"center"} mb={["10px", "16px"]}>
          <Box>
            <Text fontWeight={"600"} fontSize={["14px", "16px"]}>
              Buy crypto
            </Text>
          </Box>
        </GridItem>
        <GridItem
          colSpan={[1, 3]}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box>
            <Divider width={["150px", "200px"]} />
          </Box>
        </GridItem>

        {/* second part */}
        <GridItem colSpan={1} mt={["15px", "32px"]} w={"full"}>
          <HStack>
            <Box>
              <Text
                fontWeight={"600"}
                fontSize={["11px", "16px"]}
                color={"#808080"}
              >
                Crypto:
              </Text>
            </Box>

            <Menu>
              <MenuButton w={"100%"}>
                <HStack gap={"16px"} px={"16px"} bg={"#F8F8F8"}>
                  <HStack gap={"8px"}>
                    <Box mt={"5px"} mb={"5px"} width={"20px"} height={"20px"}>
                    <Image src={selectedimage} alt="Bebo" />
                    </Box>
                    <Box>
                      <Text
                        fontWeight={"600"}
                        fontSize={["11px", "16px"]}
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
              </MenuButton>

              <MenuList>
              {networkOptions.map((item) => (
    <MenuItem
      key={item.title}
      minH="10px"
      onClick={() => handleCryptoSelect(item.name,item.image,item.current_price)}
    >
      {item.image && (
        <Image
          boxSize="20px"
          borderRadius="full"
          src={item.image}
          alt={item.title}
          mr="12px"
        />
      )}
      <Text>{item.name}</Text>
    </MenuItem>
  ))}
              </MenuList>
            </Menu>
          </HStack>
        </GridItem>
        <GridItem
          colSpan={1}
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
            />
          </Box>
        </GridItem>
        <GridItem colSpan={1} mt={["15px", "32px"]} mb={["40px", "0px"]}>
          <HStack
            gap={["20px", "10px"]}
            justifyContent={["flex-start", "flex-end"]}
          >
            <Box>
              <Text
                fontWeight={"600"}
                fontSize={["11px", "16px"]}
                color={"#808080"}
              >
                Rate:
              </Text>
            </Box>
            <HStack bg={"#F8F8F8"} px={"16px"}>
              <Box>
                <TbCurrencyNaira size={"14px"} />
              </Box>
              <Box mt={"9px"} mb={"9px"}>
                <Text fontWeight={"600"} fontSize={["11px", "16px"]}>
                {rate}
                </Text>
              </Box>
            </HStack>
          </HStack>
        </GridItem>

        {/* third part */}
        <GridItem colSpan={[1, 3]} display={{ base: "none", md: "block" }}>
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
                    {" "}
                    <BsExclamationCircle size={"20px"} />
                  </Box>
                </Box>
              </Box>
              <Box>
                <Text fontWeight={"500"} fontSize={["12px", "14px"]} color={"#808080"}>
                  To buy crypto, click on the green button below to generate a
                  bank account to transfer funds to.
                </Text>
              </Box>
            </HStack>
          </Box>
        </GridItem>

        {/* fourth part */}
        <GridItem w={"full"} colSpan={[1, 3]}>
          <ButtonForBuy onOpen={onOpen} />
        </GridItem>
      </SimpleGrid>
      <GeneralFormPage isOpen={isOpen} onClose={onClose} />
    </>
  );
}
