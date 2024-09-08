import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  Input,
  SimpleGrid,
  Text,
  Button,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  HStack,
  Image
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Formik, Field, Form, FieldProps } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import NotificationBuy, { MarketRate } from "./NotificationBuy";
import { TbCurrencyNaira } from "react-icons/tb";
import { AxiosGet } from "@/app/axios/axios";
import { useCryptoContext } from "./usecontextbuy";

// Example network options
const networkOptions = [
  { value: "network1", label: "Network 1" },
  { value: "network2", label: "Network 2" },
];

const validationSchema = Yup.object().shape({
  // asset: Yup.string().required("Asset is required"),
  naira: Yup.number()
    .typeError("Total amount must be a number")
    .required("Total amount is required"),
});

export default function Selectnaira({
  setStep,
  BUY,
  handleclick,
  setasset,
  setnaira,
  Name,
  setCurrentprice,
  asset,
  rate,
  imgsybl,
  sybl
}: {
  setStep: any;
  BUY: any;
  handleclick: any;
  setasset: any;
  setnaira: any;
  Name: any;
  setCurrentprice: any;
  asset:any,
  rate:any,
  imgsybl:any,
  sybl:any
}) {
  const {
    Conversion,
        setConversion,
        setConversion2,
        Conversion2,
  } = useCryptoContext();
  const [Value, setValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [networkOptions, setNetworkOptions] = useState([]);
  const url = "wallet/assets";
  const [errorMessage, setErrorMessage] = useState("");
  const updateNetworkOptions = (nairaValue: number) => {
    const currentPrice = parseFloat(rate); // Assuming 'rate' is the current price

    if ( currentPrice > 0 && nairaValue > 0) {
      const value = nairaValue / currentPrice;
      const formattedValue = parseFloat(value.toFixed(13));
      setConversion(formattedValue);
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
  const getnetwork = async () => {
    setLoading(true);
    try {
      const res = await AxiosGet(url);
      setLoading(false);
      if (res) {
        console.log(res.data);
        // setLoading(false)
        setNetworkOptions(res.data);
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

  // const handleValueChange = (selectedOption: any, setFieldValue: any) => {
  //   setFieldValue("asset", selectedOption ? selectedOption.value : "");
  //   setValue(selectedOption);
  // };

  const handleProceed = (values: any) => {
    setasset(values.asset);
    setnaira(values.naira);
    setStep(3);
  };

  return (
    <Formik
      initialValues={{
        // asset: "",
        naira: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleProceed}
    >
      {({ errors, touched, setFieldValue, isValid, dirty }) => (
        <Form>
          <Box p={4}>
            <SimpleGrid columns={1}>
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

              <GridItem mt={"18px"} display={"none"}>
                <MarketRate Name={Name} setCurrentprice={setCurrentprice} />
              </GridItem>
              <GridItem colSpan={1} mb={"28px"} mt={"18px"}>
                {/* <FormControl isInvalid={!!errors.naira && touched.naira}> */}
                <FormLabel fontSize="16px" fontWeight="600">
                  My Rate
                </FormLabel>
                <InputGroup>
                  <Field
                    // variant='unstyled'
                    as={Input}
                    disabled
                    h={["50px", "50px", "44px"]}
                    type="text"
                    id={"rate"}
                    name={"rate"}
                    placeholder={rate}
                    color="black"
                    _placeholder={{ color: "black.700" }}
                    borderColor={"#cbd5e1"}
                    value={rate}
                    style={{
                      borderRight: "none",
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                    }}
                  />
                  <InputRightAddon h={["50px", "50px", "44px"]}>
                    <HStack>
                      <Image
                        boxSize="25px"
                        objectFit="cover"
                        src={imgsybl}
                        // width="18"
                        // height="14"
                        alt="bebo"
                      ></Image>
                      <Text fontWeight={"600"} fontSize={"16px"}>
                        {" "}
                        {sybl.toUpperCase()}
                      </Text>
                    </HStack>
                  </InputRightAddon>
                </InputGroup>
                {/* <FormErrorMessage>{errors.naira}</FormErrorMessage> */}
                {/* </FormControl> */}
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
                    1 {Name} = {rate} Naira
                  </Text>
                </Box>
              </GridItem>
              <GridItem colSpan={1} mb={"28px"}>
                <FormControl isInvalid={!!errors.naira && touched.naira}>
                  <FormLabel fontSize="16px" fontWeight="600">
                    Total amount of {asset} i want to buy in naira
                  </FormLabel>
                  <InputGroup>
                    <Field
                      as={Input}
                      h={["50px", "50px", "44px"]}
                      type="text"
                      id={"naira"}
                      name={"naira"}
                      placeholder={"₦ 50,000.00"}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        let inputValue = e.target.value.replace(/,/g, "");

                        // If the input is empty, set "naira" to an empty string or 0 to avoid NaN
                        if (!inputValue) {
                          setFieldValue("naira", "");
                          setConversion("");
                          return;
                        }
                        if (!/^\d*$/.test(inputValue)) {
                          return;
                        }
                    
                        if (inputValue && inputValue.length > 10) {
                          inputValue = inputValue.slice(0, 10); // Limit the input to 10 digits
                        }
                        const nairaValue = parseFloat(inputValue);

                        setFieldValue("naira", nairaValue);
                        updateNetworkOptions(nairaValue);
                      }}
                      style={{
                        borderRight: "none",
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      }}
                    />
                    <InputRightAddon h={["50px", "50px", "44px"]}>
                      <HStack>
                        <img
                          src=" https://flagcdn.com/48x36/ng.png"
                          width="18"
                          height="14"
                          alt="Nigeria"
                        ></img>
                        <Text fontWeight={"600"} fontSize={"16px"}>
                          NGN
                        </Text>
                      </HStack>
                    </InputRightAddon>
                  </InputGroup>
                  <FormErrorMessage>{errors.naira}</FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={1} mb={"28px"}>
                {/* <FormControl isInvalid={!!errors.naira && touched.naira}> */}
                <FormLabel fontSize="16px" fontWeight="600">
                  Amount of {Name} you will get
                </FormLabel>
                <Field
                placeholder='converted value'
                 disabled
                  as={Input}
                  h={["50px", "50px", "44px"]}
                  type="text"
                  value={Conversion}
                  borderColor={"#cbd5e1"}
                />

                {/* </FormControl> */}
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
                    {BUY}
                  </Text>
                </Button>
              </GridItem>
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
