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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import { myStyles } from "../Sell/selectrix";
import NotificationBuy from "./NotificationBuy";

// Example network options
const networkOptions = [
  { value: "network1", label: "Network 1" },
  { value: "network2", label: "Network 2" },
];

// Validation schema using Yup

export default function InputReceiverDetails({
  setStep,
  isValid,
  errors,
  setFieldValue,
  dirty,
  touched,
}: {
  setStep: any;
  isValid: any;
  errors: any;
  setFieldValue: any;
  dirty: any;
  touched: any;
}) {
  const [Value, setValue] = useState("");

  const handleValueChange = (
    selectedOption: any,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => void
  ) => {
    setFieldValue("Network", selectedOption ? selectedOption.value : "");
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
            Input receiver details
          </Text>
        </GridItem>
        <GridItem colSpan={1} mt={"18px"}>
          <Text fontWeight="600" fontSize="15px" color="#666666">
            Input details of where you want your crypto sent to
          </Text>
        </GridItem>
        <GridItem colSpan={1} mt={"18px"}>
          <NotificationBuy />
        </GridItem>
        <GridItem colSpan={1} mb={"28px"}>
          <FormControl isInvalid={!!errors.Network && touched.Network}>
            <FormLabel fontSize="16px" fontWeight="600">
              Network
            </FormLabel>
            <Field
              as={Select}
              id="Network"
              name="Network"
              options={networkOptions}
              isSearchable
              placeholder="Select Network"
              value={Value}
              onChange={(selectedOption: any) => {
                handleValueChange(selectedOption, setFieldValue);
              }}
            />
            <FormErrorMessage>{errors.Network}</FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem colSpan={1} mt={"30"}>
          <GridItem colSpan={1} mb={"28px"}>
            <FormControl
              isInvalid={!!errors.Walletaddress && touched.Walletaddress}
            >
              <FormLabel fontSize="16px" fontWeight="600">
                Wallet address
              </FormLabel>
              <Field
                as={Input}
                type="text"
                name="Walletaddress"
                placeholder="Enter wallet address"
              />
              <FormErrorMessage>{errors.Walletaddress}</FormErrorMessage>
            </FormControl>
          </GridItem>

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
