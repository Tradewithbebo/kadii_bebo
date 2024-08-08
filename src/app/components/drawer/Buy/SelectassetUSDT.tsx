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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Formik, Field, Form, FieldProps } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import NotificationBuy, { MarketRate } from "./NotificationBuy";

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
  setCurrentprice
}: {
  setStep: any;
  BUY: any;
  handleclick: any;
  setasset: any;
  setUSDT: any;
  Name:any;
  setCurrentprice:any
}) {
  const [Value, setValue] = useState(null);

  // const handleValueChange = (selectedOption: any, setFieldValue: any) => {
  //   setFieldValue("asset", selectedOption ? selectedOption.value : "");
  //   setValue(selectedOption);
  // };

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
                  Select the amount of asset you want to buy
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
              <GridItem mt={"18px"}>
                <MarketRate Name={Name} setCurrentprice={setCurrentprice} />
              </GridItem>
              <GridItem colSpan={1} mb={"28px"}>
                <FormControl isInvalid={!!errors.USDT && touched.USDT}>
                  <FormLabel fontSize="16px" fontWeight="600">
                    Total amount
                  </FormLabel>
                  <InputGroup>
                    <InputLeftAddon>USDT</InputLeftAddon>
                    <Field
                      as={Input}
                      type="text"
                      id={"USDT"}
                      name={"USDT"}
                      placeholder={"10.00"}
                      style={{
                        borderLeft: "none",
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                      }}
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors.USDT}</FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem
                cursor={"pointer"}
                mt={""}
                mb={""}
                display={"flex"}
                justifyContent={"right"}
              >
                <Button onClick={handleclick}>
                  <Text
                    fontWeight={"600"}
                    fontSize={"16px"}
                    color={"#0CBF94"}
                  >
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
                
                >
                  Continue
                </Button>
              </GridItem>
            </SimpleGrid>
          </Box>
        </Form>
      )}
    </Formik>
  );
}
