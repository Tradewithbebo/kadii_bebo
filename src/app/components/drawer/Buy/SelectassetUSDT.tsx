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
  HStack,
  Image,
  InputRightAddon,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Formik, Field, Form, FieldProps } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import NotificationBuy, { MarketRate } from "./NotificationBuy";
import { useCryptoContext } from "./usecontextbuy";

// Example network options
const networkOptions = [
  { value: "network1", label: "Network 1" },
  { value: "network2", label: "Network 2" },
];

const validationSchema = Yup.object().shape({
  // asset: Yup.string().required("Asset is required"),
  USDT: Yup.number()
    .typeError("Total amount must be a number")
    .required("Total amount is required"),
});

export default function SelectUSDT({
  setStep,
  BUY,
  handleclick,
  setasset,
  setUSDT,
  Name,
  setCurrentprice,
  sybl,
  imgsybl,
  rate,
  asset
}: {
  setStep: any;
  BUY: any;
  handleclick: any;
  setasset: any;
  setUSDT: any;
  Name:any;
  setCurrentprice:any;
  sybl:any,
  imgsybl:any,
  rate:any,
  asset:any
}) {
  const {
    Conversion,
        setConversion,
        setConversion2,
        Conversion2,
  } = useCryptoContext();
  const [Value, setValue] = useState(null);
  const updateNetworkOptions = (USDT: number) => {
    const currentPrice = parseFloat(rate); // Assuming 'rate' is the current price

    if ( currentPrice > 0 && USDT > 0) {
      const value = USDT * currentPrice;
      const formattedValue = parseFloat(value.toFixed(20));
      setConversion2(formattedValue);
    }
  };


  const handleProceed = (values:any) => {
    // setasset(values.asset);
    setUSDT(values.USDT);
    
    setStep(3);
  };
  

  // const handleProceed = (isValid: boolean, dirty: boolean) => {
  //   if (isValid && dirty) {
  //     setStep((cur: number) => cur + 1);
  //   }
  // };

  return (
    <Formik
      initialValues={{
        // asset: "",
        USDT: "",
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
                  Select asset
                </Text>
              </GridItem>
              <GridItem colSpan={1} mt={"18px"}>
                <Text fontWeight="600" fontSize="15px" color="#666666">
                Select amount of asset you want to buy
                </Text>
              </GridItem>

              {/* <GridItem colSpan={1} mt={"40px"}>
                <FormControl isInvalid={!!errors.asset && touched.asset}>
                  <FormLabel fontSize="16px" fontWeight="600">
                    Select asset to buy
                  </FormLabel>
                  <Field name="asset">
                    {({ field }: FieldProps) => (
                      <Select
                        {...field}
                        id="asset"
                        options={networkOptions}
                        isSearchable
                        placeholder="Select asset"
                        value={Value}
                        onChange={(selectedOption: any) => {
                          handleValueChange(selectedOption, setFieldValue);
                        }}
                      />
                    )}
                  </Field>
                  <FormErrorMessage>{errors.asset}</FormErrorMessage>
                </FormControl>
              </GridItem> */}
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
                <FormControl isInvalid={!!errors.USDT && touched.USDT}>
                  <FormLabel fontSize="16px" fontWeight="600">
                  Total amount of {asset} i want to buy in naira
                  </FormLabel>
                  <InputGroup>
                    <Field
                      h={["50px", "50px", "44px"]}
                      as={Input}
                      type="text"
                      id={"USDT"}
                      name={"USDT"}
                      placeholder={"10.00"}
                      style={{
                        borderRight: "none",
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      }}
                    
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        let inputValue = e.target.value;
                
                        // Remove any non-numeric characters except for the decimal point
                        inputValue = inputValue.replace(/[^0-9.]/g, '');
                
                        // Ensure only one decimal point is allowed
                        const parts = inputValue.split('.');
                        if (parts.length > 2) {
                          inputValue = parts[0] + '.' + parts.slice(1).join('');
                        }
                
                        // Limit the total length of input to 10 characters (including the decimal point)
                        if (inputValue.length > 10) {
                          inputValue = inputValue.slice(0, 10);
                        }
                
                        // If input starts with a decimal point, prepend a zero
                        if (inputValue.startsWith('.')) {
                          inputValue = '0' + inputValue;
                        }
                
                        // Update the Formik field and any other state
                        setFieldValue("USDT", inputValue);
                        const USDT = parseFloat(inputValue);
                        setConversion2(inputValue); // Ensure this is the correct state update
                        updateNetworkOptions(USDT);
                      
                      }}/>
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
                  <FormErrorMessage>{errors.USDT}</FormErrorMessage>
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
                  value={
                  Conversion2}
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
                  h={["50px", "50px", "44px"]}
                  bg={isValid ? "#0CBF94" : "gray.400"}
                  fontSize={"16px"}
                  fontWeight={"600"}
                  color={isValid ? "#021D17" : "gray.600"}
                  isDisabled={!isValid || !dirty}
                
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
