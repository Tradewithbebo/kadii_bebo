import {
  Box,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  Input,
  SimpleGrid,
  Text,
  Button,
  InputRightElement,
  InputGroup,
  InputLeftElement,
  InputLeftAddon,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import { myStyles } from "../Sell/selectrix";
import NotificationBuy, { MarketRate } from "./NotificationBuy";
import { TbCurrencyNaira } from "react-icons/tb";

// Example network options
const networkOptions = [
  { value: "network1", label: "Network 1" },
  { value: "network2", label: "Network 2" },
];

// Validation schema using Yup

export default function SelectUSDT({
  setStep,
  isValid,
  errors,
  setFieldValue,
  dirty,
  touched,
  BUY,
  handleclick,
}: {
  setStep: any;
  isValid: any;
  errors: any;
  setFieldValue: any;
  dirty: any;
  touched: any;
  BUY: any;
  handleclick: any;
}) {
  const [Value, setValue] = useState("");
  //   const [Currency, setCurrency] = useState("naira");

  const handleValueChange = (
    selectedOption: any,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => void
  ) => {
    setFieldValue("asset", selectedOption ? selectedOption.value : "");
    setValue(selectedOption);
  };

  const handleProceed = () => {
    setStep((cur: number) => cur + 1);
  };

  return (
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

        <GridItem colSpan={1} mt={"40px"}>
          <FormControl isInvalid={!!errors.asset && touched.asset}>
            <FormLabel fontSize="16px" fontWeight="600">
              Select asset to buy
            </FormLabel>
            <Field
              as={Select}
              id="asset"
              name="asset"
              options={networkOptions}
              isSearchable
              placeholder="Select asset"
              value={Value}
              onChange={(selectedOption: any) => {
                handleValueChange(selectedOption, setFieldValue);
              }}
            />
            <FormErrorMessage>{errors.asset}</FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem mt={"18px"}>
          <MarketRate />
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
            <Button  onClick={handleclick}>
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
            onClick={handleProceed}
            type="button"
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
  );
}