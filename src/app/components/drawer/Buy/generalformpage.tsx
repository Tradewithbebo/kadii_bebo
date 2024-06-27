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
  HStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import { myStyles } from "../Sell/selectrix";
import NotificationBuy from "./NotificationBuy";
import InputReceiverDetails from "./inputReceiverDetails";
import Selectasset from "./Selectassetnaira";
import Selectassetnaira from "./Selectassetnaira";
import SelectassetUSDT from "./SelectassetUSDT";
// import Testing from './testing';
import { IoIosArrowBack } from "react-icons/io";
import ConfirmBuyOrder from "./ConfirmBuyOrder";

export default function GeneralFormPage({
  isOpen,
  onClose,
}: {
  isOpen: any;
  onClose: any;
}) {
  const [Value, setValue] = useState("");
  const [Currency, setCurrency] = useState(true);
  const handleclick = () => {
    {
      Currency ? setCurrency(false) : setCurrency(true);
    }
  };
  const Backward = () => {
    setStep((cur: number) => cur - 1);
  };

  // const handleValueChange = (selectedOption: any, setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void) => {
  //   setFieldValue("Network", selectedOption ? selectedOption.value : "");
  //   setValue(selectedOption);
  // };

  const initialValues = {
    Walletaddress: "",
    Network: "",
    // asset: '',
  };
  const initialValues2 = {
    asset: "",
    naira: "",
    USDT: "",
  };
  const initialValues3 = {
    asset: "",
  };
  const validationSchema = Yup.object().shape({
    Walletaddress: Yup.string().required("Wallet address is required"),
    Network: Yup.string().required("Network is required"),
  });
  const validationSchema2 = Yup.object().shape({
    asset: Yup.string().required("Wallet address is required"),
    naira: Yup.number().required("naira is required it cann't be a letter "),
    // USDT: Yup.string().required("USDT is required"),
  });
  const validationSchema3 = Yup.object().shape({
    asset: Yup.string().required("Wallet address is required"),
    // naira: Yup.string().required("naira is required"),
    USDT: Yup.number().required("USDT is required and it cann't be a letter"),
  });
  const [step, setStep] = useState(1);
  // const handleProceed = () => {
  //     setStep((cur: number) => cur + 1);
  //   };

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      size={["sm", "sm"]}
    >
      <DrawerOverlay />
      <DrawerContent>
        <HStack>
          <Box
            cursor={"pointer"}
            onClick={Backward}
            position={"absolute"}
            mt={["45px", "40px"]}
            ml={["15px", "10px"]}
            display={step === 1 ? "none" : "block"}
          >
            <IoIosArrowBack size={"20px"} />
          </Box>
          <DrawerCloseButton />
        </HStack>
        <Box p={4}>
          <Formik
            initialValues={
              step === 1
                ? initialValues
                : step === 2
                ? initialValues2
                : initialValues3
            }
            validationSchema={
              step === 1
                ? validationSchema
                : step === 2
                ? Currency
                  ? validationSchema2
                  : validationSchema3
                : ""
            }
            onSubmit={async (values, actions) => {
              console.log(values);
              actions.resetForm();
              setValue("");
            }}
          >
            {({
              errors,
              touched,
              handleSubmit,
              setFieldValue,
              isValid,
              dirty,
            }) => (
              <Form onSubmit={handleSubmit}>
                {step === 1 && (
                  <InputReceiverDetails
                    setStep={setStep}
                    isValid={isValid}
                    errors={errors}
                    setFieldValue={setFieldValue}
                    dirty={dirty}
                    touched={touched}
                  />
                )}
                {step === 2 &&
                  (Currency ? (
                    <Selectassetnaira
                      setStep={setStep}
                      isValid={isValid}
                      errors={errors}
                      setFieldValue={setFieldValue}
                      dirty={dirty}
                      touched={touched}
                      BUY={"Buy in naira"}
                      handleclick={handleclick}
                    />
                  ) : (
                    <SelectassetUSDT
                      setStep={setStep}
                      isValid={isValid}
                      errors={errors}
                      setFieldValue={setFieldValue}
                      dirty={dirty}
                      touched={touched}
                      BUY={"Buy in crypto"}
                      handleclick={handleclick}
                    />
                  )
                  )}
                  {step === 3 && <ConfirmBuyOrder setStep={setStep}/>}
              </Form>
            )}
          </Formik>
        </Box>
      </DrawerContent>
    </Drawer>
  );
}
