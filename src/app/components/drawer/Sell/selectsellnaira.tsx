import {
    Box,
    FormControl,
    FormLabel,
    GridItem,
    Input,
    SimpleGrid,
    Text,
    Button,
    InputGroup,
    InputRightAddon,
    HStack,
    Image,
    useToast,
  } from "@chakra-ui/react";
  import React, { useEffect, useState } from "react";
  import { Formik, Field, Form } from "formik";
  import * as Yup from "yup";
  import { AxiosGet } from "@/app/axios/axios";
  import { useCryptoContext } from "../Buy/usecontextbuy";
  
  // Validation schema
  const validationSchema = Yup.object().shape({
    naira: Yup.number()
      .typeError("Total amount must be a number")
      .required("Total amount is required"),
  });
  
  export default function Selectnaira({
    setStep,
    handleclick,
  }: {
    setStep: any;
    handleclick: any;
  }) {
    const toast = useToast();
    const {
      setblockchain,
      sellRate,
      setsellRate,
      sellimage,
      setsellimage,
      sellsymbol,
      setsellsymbol,
      sellConversion,
      setsellConversion,
      selectedsellNetwork,
      setSelectedsellNetwork,
      blockchain,
      sellvalunaira,
      setsellvaluenaira,
      
    } = useCryptoContext();
  
    const url = "wallet/assets"; // API URL
    const [errorMessage, setErrorMessage] = useState("");
  
    // Function to update the conversion value
    const updateConversion = (nairaValue: number) => {
      const currentPrice = parseFloat(sellRate); // Fetching current price
  
      if (currentPrice > 0 && nairaValue > 0) {
        const value = nairaValue / currentPrice;
        const formattedValue = parseFloat(value.toFixed(13)); // Converting to 13 decimals
        setsellConversion(formattedValue); // Set conversion value
      }
    };
  
  
    const getUpdatedPrice = async (networkName: string, retryCount: number = 0): Promise<void> => {
      const maxRetries = 10; 
      const retryInterval = 2000; 
      try {
        const res = await AxiosGet(url);
        if (res) {
          const updatedNetwork = res.data.find(
            (network: any) => network.name === networkName
          );
          if (updatedNetwork && selectedsellNetwork) {
            // Check if the price has changed
            if (
              updatedNetwork.current_price !== selectedsellNetwork.current_price
            ) {
              // Show toast if price has changed
              toast({
                title: "Rate Updated",
                description: `${selectedsellNetwork.name}'s rate is now ${updatedNetwork.current_price}`,
                status: "info",
                duration: 5000,
                isClosable: true,
              });
    
              // Update sell rate and selected network price
              setsellRate(updatedNetwork.current_price);
              setSelectedsellNetwork((prevNetwork: any) => ({
                ...prevNetwork!,
                current_price: updatedNetwork.current_price,
              }));
            }
            return; // Exit after successful update
          }
        }
      } catch (err: any) {
        console.log("Error updating price:", err);
        setErrorMessage("Failed to update rate. Please try again.");
      }
    
      // Retry logic
      // if (retryCount < maxRetries) {
      //   setTimeout(() => getUpdatedPrice(networkName, retryCount + 1), retryInterval);
      // }
    };
  
    // Setting up the interval to refresh the rate every 40 seconds
    useEffect(() => {
      if (selectedsellNetwork && selectedsellNetwork.name !== null) {
        const interval = setInterval(() => {
          getUpdatedPrice(selectedsellNetwork.name);
        }, 6000);
  
        return () => clearInterval(interval); // Cleanup the interval
      }
    }, [selectedsellNetwork]);
  
    // Proceed function for the form submission
    const handleProceed = (values: any) => {
      setsellvaluenaira(values.naira)
      setStep(5);
    };
  
    return (
      <Formik
        initialValues={{
          naira: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleProceed}
      >
        {({ errors, touched, setFieldValue, isValid, dirty }) => (
          <Form>
            <Box p={4}>
              <SimpleGrid columns={1}>
                {/* Display Selected Asset */}
                <GridItem colSpan={1}>
                  <Text fontWeight="600" fontSize="25px">
                    Selected asset
                  </Text>
                </GridItem>
                <GridItem colSpan={1} mt={"18px"}>
                  <Text fontWeight="600" fontSize="15px" color="#666666">
                  Select amount of asset you want to buy
                  </Text>
                </GridItem>
                <GridItem colSpan={1} mb={"28px"} mt={"18px"}>
                  <FormLabel fontSize="16px" fontWeight="600">
                    My Rate
                  </FormLabel>
                  <InputGroup>
                    <Field
                     style={{
                      borderRight: "none",
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                    }}
                      as={Input}
                      h={["50px", "50px", "44px"]}
                      type="text"
                      placeholder={sellRate}
                      color="grey"
                      borderColor={"#cbd5e1"}
                      value={new Intl.NumberFormat("en-NG", {
                      // style: 'currency',
                      // currency: 'NGN',
                    }).format(sellRate)}
                      readOnly
                    />
                    <InputRightAddon h={["50px", "50px", "44px"]}>
                      <HStack>
                        <Image
                          boxSize="25px"
                          objectFit="cover"
                          src={sellimage}
                          alt="crypto"
                        />
                        <Text fontWeight={"600"} fontSize={"16px"}>
                          {sellsymbol.toUpperCase()}
                        </Text>
                      </HStack>
                    </InputRightAddon>
                  </InputGroup>
                  <Text
                    fontSize={"10px"}
                    fontWeight={"500"}
                    color={"grey"}
                    mt={"10px"}
                    mb={"5px"}
                  >
                    Generic Market Rate
                  </Text>
                  <Box
                    w={"fit-content"}
                    bg={"#E7F6EC"}
                    p={"3px"}
                    borderRadius={"5px"}
                  >
                    <Text fontSize={"12px"} fontWeight={"600"}>
                      1 {blockchain} = {sellRate} Naira
                    </Text>
                  </Box>
                </GridItem>
  
                {/* Input for total Naira amount */}
                <GridItem colSpan={1} mb={"28px"}>
                  <FormControl isInvalid={!!errors.naira && touched.naira}>
                    <FormLabel fontSize="16px" fontWeight="600">
                      Total amount of {blockchain} I want to Sell in Naira
                    </FormLabel>
                    <InputGroup>
                      <Field
                       style={{
                        borderRight: "none",
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      }}
                        name="naira"
                        as={Input}
                        h={["50px", "50px", "44px"]}
                        type="text"
                        placeholder={"₦ 50,000.00"}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          let inputValue = e.target.value.replace(/,/g, "");
                          if (!inputValue) {
                            setFieldValue("naira", "");
                            setsellConversion("");
                            return;
                          }
                          if (!/^\d*$/.test(inputValue)) return;
                          if (inputValue.length > 10) {
                            inputValue = inputValue.slice(0, 10);
                          }
                          const nairaValue = parseFloat(inputValue);
                          setFieldValue("naira", nairaValue);
                          
                          
                          updateConversion(nairaValue);
                        }}
                      />
                      <InputRightAddon h={["50px", "50px", "44px"]}>
                        <HStack>
                          <img
                            src=" https://flagcdn.com/48x36/ng.png"
                            width="18"
                            height="14"
                            alt="Nigeria"
                          />
                          <Text fontWeight={"600"} fontSize={"16px"}>
                            NGN
                          </Text>
                        </HStack>
                      </InputRightAddon>
                    </InputGroup>
                  </FormControl>
                </GridItem>
  
                {/* Display Conversion Value */}
                <GridItem colSpan={1} mb={"28px"}>
                  <FormLabel fontSize="16px" fontWeight="600">
                    Amount of {blockchain} you will send
                  </FormLabel>
                  <Field
                    placeholder="converted value"
                    disabled
                    as={Input}
                    h={["50px", "50px", "44px"]}
                    type="text"
                    value={sellConversion}
                    borderColor={"#cbd5e1"}
                  />
                </GridItem>
                <GridItem
                cursor={"pointer"}
                mt={""}
                mb={""}
                display={"flex"}
                justifyContent={"right"}
              >
                <Button onClick={handleclick}>
                  <Text fontWeight={"600"} fontSize={"16px"} color={"#0CBF94"}>
                    {'sell in crypto'}
                  </Text>
                </Button>
              </GridItem>
                {/* Submit Button */}
                <GridItem colSpan={1} mt={"30px"}>
                  <Button
                    type="submit"
                    w={"full"}
                    bg={isValid ? "#0CBF94" : "gray.400"}
                    fontSize={"16px"}
                    fontWeight={"600"}
                    color={isValid ? "#021D17" : "gray.600"}
                    isDisabled={!isValid || !dirty}
                    _hover={{
                      bg: isValid ? "#0CBF94" : "gray.400",
                    }}
                    h={["50px", "50px", "44px"]}
                  >
                    Swap
                  </Button>
                </GridItem>
              </SimpleGrid>
            </Box>
          </Form>
        )}
      </Formik>
    );
  }
  