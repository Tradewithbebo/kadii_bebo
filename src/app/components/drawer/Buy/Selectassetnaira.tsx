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
import { TbCurrencyNaira } from "react-icons/tb";

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
  Name,setCurrentprice
}: {
  setStep: any;
  BUY: any;
  handleclick: any;
  setasset: any;
  setnaira: any;
  Name: any;
  setCurrentprice:any
}) {
  const [Value, setValue] = useState(null);

  // const handleValueChange = (selectedOption: any, setFieldValue: any) => {
  //   setFieldValue("asset", selectedOption ? selectedOption.value : "");
  //   setValue(selectedOption);
  // };

  const handleProceed = (values:any) => {
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
                  Select asset
                </Text>
              </GridItem>
              <GridItem colSpan={1} mt={"18px"}>
                <Text fontWeight="600" fontSize="15px" color="#666666">
                  Select an asset you want to buy
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
                <FormControl isInvalid={!!errors.naira && touched.naira}>
                  <FormLabel fontSize="16px" fontWeight="600">
                    Total amount
                  </FormLabel>
                  <InputGroup>
                    <InputLeftAddon>{<TbCurrencyNaira size={""} />}</InputLeftAddon>
                    <Field
                      as={Input}
                      type="text"
                      id={"naira"}
                      name={"naira"}
                      placeholder={"₦ 50,000.00"}
                      style={{
                        borderLeft: "none",
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                      }}
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors.naira}</FormErrorMessage>
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
