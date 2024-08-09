import { AxiosGet } from "@/app/axios/axios";
import {
  Box,
  Center,
  GridItem,
  HStack,
  SimpleGrid,
  Text,
  VStack,
  Button,
  useDisclosure,
  Image,
  Spinner,
  FormControl,
  Input,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { Formik, Field, Form, useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import { BsExclamationCircle } from "react-icons/bs";
import { SlArrowRight } from "react-icons/sl";
//   import ModalKyc from "./modalKyc";
export default function NotificationBuy() {
  return (
    <>
      <Box cursor={"pointer"}>
        <SimpleGrid
          w={"auto"}
          bg={"#FEF6E7"}
          p={"16px"}
          rounded={"10px"}
          border={"1px"}
          borderColor={"#FBE2B7"}
          // boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1) "
          mb={"12px"}
          // ml={'-45px'}
        >
          <Center>
            <GridItem colSpan={[1, 3]}>
              <Box>
                <HStack gap={"10px"}>
                  <Box
                    width={"35px"}
                    height={"35px"}
                    bg={"#FBE2B7"}
                    p={"4px"}
                    rounded={"50%"}
                  >
                    <Box
                      width={"28px"}
                      height={"28px"}
                      bg={"#FEF6E7"}
                      p={"4px"}
                      rounded={"50%"}
                    >
                      <Box>
                        {" "}
                        <BsExclamationCircle size={"20px"} />
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection={"column"}
                    ml={"10px"}
                    gap={"12px"}
                  >
                    <HStack>
                      <Text
                        fontWeight={"500"}
                        fontSize={"12px"}
                        color={"#808080"}
                      >
                        Please endeavour to double check and paste the correct
                        wallet address and network as crypto sent to the wrong
                        address cannot be recovered
                      </Text>
                    </HStack>
                  </Box>
                </HStack>
              </Box>
            </GridItem>
          </Center>
        </SimpleGrid>
      </Box>
    </>
  );
}
export function MarketRate({
  Name,
  setCurrentprice,
}: {
  Name: any;
  setCurrentprice: any;
}) {
  // const { isOpen, onOpen, onClose } = useDisclosure()
  type NetworkData = {
    name: any;
    image: any;
    current_price: any;
    // Add other properties if needed
  };

  const [netValue, setNetValue] = useState<NetworkData[]>([]);
  const [networkOptions, setNetworkOptions] = useState([]);
  // const [currentprice, setCurrentprice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  // const { isOpen, onOpen, onClose } = useDisclosure()
  const url = "wallet/assets";

  // useEffect(() => {
  //   getnetwork()
  //   const interval = setInterval(getnetwork, 2000); // Retry every 5 seconds
  //   return () => clearInterval(interval); // Clear interval on unmount
  // }, []);
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
        // setLoading(false)
        setNetValue(res.data);
        setErrorMessage(""); // Clear error message on success
        return true; // Indicate success
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

  // useEffect(() => {
  //   const hiddenButton = document.getElementById("hiddenSubmitButton");
  //   if (hiddenButton) hiddenButton.click();

  // }, []);

  return (
    <>
      <Box>
        <SimpleGrid
          w={"auto"}
          bg={"#E7F6EC"}
          // pt={"16px"}
          p={"16px"}
          rounded={"10px"}
          // rowGap={"16px"}
          // border={"solid #FEF6E7"}
          // boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1) "
          mb={"12px"}
          // ml={'-45px'}
        >
          <GridItem colSpan={[1, 3]} display={"flex"} justifyContent={"center"}>
            <Text fontWeight={"600"} fontSize={"16px"} color={"#0CBF94"}>
              {Name} current market rate
            </Text>
          </GridItem>
          <GridItem colSpan={[1, 3]} display={"flex"} w={"full"}>
            {loading ? (
              <Box w={"full"} justifyContent={"center"} display={"flex"}>
                {" "}
                <Spinner color="grey" />
              </Box>
            ) : errorMessage ? (
              <Box w={"full"} justifyContent={"center"} display={"flex"}>
                <Text color={"#D42620"}>
                  Current live rate not available network issues
                </Text>
              </Box>
            ) : (
              <Box w={"full"}>
                {netValue.map(
                  (item) =>
                    item.name === Name && (
                      <HStack
                        key={item.name == Name ? item.name : ""}
                        display={"flex"}
                        // justifyContent={"space-between"}
                        w={"full"}
                        gap={"20px"}
                      >
                        <HStack>
                          {item.name == Name ? (
                            <Image
                              boxSize="20px"
                              objectFit="cover"
                              src={item.name == Name ? item.image : ""}
                              alt="Dan Abramov"
                            />
                          ) : (
                            ""
                          )}
                          <Text fontWeight={"600"} fontSize={"16px"}>
                            {item.name == Name ? item.name : ""}{" "}
                          </Text>
                        </HStack>
                        {item.name == Name ? (
                          <Box
                            display={"flex"}
                            justifyContent={"end"}
                            w={"full"}
                          >
                            <Button
                              fontWeight={"600"}
                              fontSize={"16px"}
                              rounded={"20px"}
                              bg={"#e5e7eb"}
                              size={"sm"}
                            >
                              {item.name == Name ? item.current_price : ""}
                            </Button>
                          </Box>
                        ) : (
                          ""
                        )}
                      </HStack>
                    )
                )}
              </Box>
            )}
          </GridItem>
        </SimpleGrid>
      </Box>
    </>
  );
}
export function ConfirmBuy({
  Amount,
  conversion,
  currency,
  crypto,
  nn
}: {
  Amount: any;
  conversion: any;
  currency: any;
  crypto: any;
  nn:any
}) {
  // const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box>
        <SimpleGrid
          w={"auto"}
          bg={"#F8F8F8"}
          p={"16px"}
          rounded={"10px"}
          rowGap={"16px"}
          border={"1px"}
          borderColor="gray.200"
          // boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1) "
          mb={"12px"}
          // ml={'-45px'}
        >
          <GridItem colSpan={[1, 3]} display={"flex"} justifyContent={"center"}>
            <Text fontWeight={"600"} fontSize={"24px"} color={"#021D17"}>
              {currency} {Amount}
            </Text>
          </GridItem>
          <GridItem colSpan={[1, 3]} display={"flex"} justifyContent={"center"}>
          {nn? <Text fontWeight={"600"} fontSize={['12px',"16px"]} color="#666666">
              You will receive {conversion} worth of
              <span
                style={{
                  justifyContent: "center",
                  display: "flex",
                  width: "full",
                }}
              >
                {" "}
                {crypto}
              </span>
            </Text> :<Text fontWeight={"600"} fontSize={['12px',"16px"]} color="#666666">
              You will pay {conversion} naira for
              <span
                style={{
                  justifyContent: "center",
                  display: "flex",
                  width: "full",
                }}
              >
              {Amount} {crypto}
              </span>
            </Text> }
          </GridItem>
        </SimpleGrid>
      </Box>
    </>
  );
}
export function ConfirmBuy2({
  Amount,
  conversion,
  currency,
  crypto,
}: {
  Amount: any;
  conversion: any;
  currency: any;
  crypto: any;
}) {
  // const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box>
        <SimpleGrid
          w={"auto"}
          bg={"#F8F8F8"}
          p={"16px"}
          rounded={"10px"}
          rowGap={"16px"}
          border={"1px"}
          borderColor="gray.200"
          // boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1) "
          mb={"12px"}
          // ml={'-45px'}
        >
          <GridItem colSpan={[1, 3]} display={"flex"} justifyContent={"center"}>
            <Text fontWeight={"600"} fontSize={"24px"} color={"#021D17"}>
              {currency} {Amount}
            </Text>
          </GridItem>
          <GridItem colSpan={[1, 3]} display={"flex"} justifyContent={"center"}>
            <Text fontWeight={"600"} fontSize={"16px"} color="#666666">
              You will receive {conversion} worth of{" "}
              <span
                style={{
                  justifyContent: "center",
                  display: "flex",
                  width: "full",
                }}
              >
                {" "}
                {crypto}
              </span>
            </Text>
          </GridItem>
        </SimpleGrid>
      </Box>
    </>
  );
}
export function ConfirmBuyAlert() {
  // const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box cursor={"pointer"}>
        <SimpleGrid
          w={"auto"}
          bg={"#FEF6E7"}
          p={"16px"}
          rounded={"10px"}
          border={"1px"}
          // bgColor={}
          borderColor={"#FBE2B7"}
          // boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1) "
          mb={"12px"}
          // ml={'-45px'}
        >
          <Center>
            <GridItem colSpan={[1, 3]}>
              <Box>
                <HStack gap={"10px"}>
                  <Box
                    width={"35px"}
                    height={"35px"}
                    bg={"#FBE2B7"}
                    p={"4px"}
                    rounded={"50%"}
                  >
                    <Box
                      width={"28px"}
                      height={"28px"}
                      bg={"#FEF6E7"}
                      p={"4px"}
                      rounded={"50%"}
                    >
                      <Box>
                        {" "}
                        <BsExclamationCircle size={"20px"} />
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection={"column"}
                    ml={"10px"}
                    gap={"12px"}
                  >
                    <HStack>
                      <Text
                        fontWeight={"500"}
                        fontSize={"12px"}
                        color={"#808080"}
                      >
                        For security reasons, only use your own account to
                        transfer funds. Payment made from accounts not matching
                        your verified KYC name will not be accepted
                      </Text>
                    </HStack>
                  </Box>
                </HStack>
              </Box>
            </GridItem>
          </Center>
        </SimpleGrid>
      </Box>
    </>
  );
}
