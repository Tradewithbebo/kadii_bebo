"use client";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
  useDisclosure,
  ChakraProvider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  SimpleGrid,
  GridItem,
  FormControl,
  FormLabel,
  VStack,
  Box,
  Text,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Formik, Form, Field, useFormik } from "formik";
import React, { useState } from "react";
import { myStyles } from "./selectrix";
import bankName from "./listBanks";
import Select from "react-select";

export default function AddBank() {
  const [message, setmessage] = useState("");
  const [Value, setValue] = useState("");
  const handleValueChange = (Value: any, values: any) => {
    values.Bank = Value;
    console.log(Value);
    setValue(Value);
  };

  const initialValues = {
    Bank: "",
    accountnumber: "",
    accountname: "",
  };

  return (
    <>
      {/* <Button  colorScheme='teal' onClick={sellOnopen}>
          Open
        </Button> */}
      <Formik
        initialValues={initialValues}
        // validationSchema={addUserSchema}
        onSubmit={async (values, actions) => {
          actions.resetForm();
        }}
      >
        {({ handleSubmit, errors, touched, values, handleChange, isValid }) => (
          <form onSubmit={handleSubmit}>
            <Box p={4}>
              <SimpleGrid column={2} rowGap={"28px"}>
                <GridItem colSpan={2}>
                  <Text fontWeight="600" fontSize="25px">
                    Add bank details
                  </Text>
                </GridItem>
                <GridItem colSpan={2} mt={"-10px"}>
                  <Text
                    fontWeight="600"
                    fontSize={["11px", "15px"]}
                    color="#666666"
                  >
                    Add your preferred bank for instant payout
                  </Text>
                </GridItem>
                <GridItem colSpan={2}>
                  <FormControl isInvalid={!!errors.Bank && touched.Bank}>
                    <Field
                      as={Select} // Use Select from 'react-select'
                      id="Bank"
                      name="Bank"
                      options={bankName.Banks}
                      isSearchable
                      placeholder="Select bank"
                      value={Value}
                      onChange={(selectedOption: any) => {
                        handleValueChange(selectedOption, values);
                        handleChange("Bank");
                      }}
                      // styles={myStyles}
                    />
                    {errors.Bank && touched.Bank && (
                      <FormErrorMessage color={"Crimson"}>
                        {errors.Bank}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                  <FormControl
                    isInvalid={!!errors.accountnumber && touched.accountnumber}
                  >
                    <FormLabel fontSize={"16px"} fontWeight={"600"}>
                      Account number
                    </FormLabel>
                    <Field
                      as={Input}
                      id="accountnumber"
                      type="text"
                      placeholder="Enter account number"
                      name="accountnumber"
                    />

                    <FormErrorMessage color={"Crimson"}>
                      {errors.accountnumber}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                  <FormControl
                    isInvalid={!!errors.accountname && touched.accountname}
                  >
                    <FormLabel fontSize={"16px"} fontWeight={"600"}>
                      Account name
                    </FormLabel>
                    <Field
                      as={Input}
                      id="accountname"
                      type="text"
                      placeholder="Enter account name"
                      name="accountname"
                    />
                    <FormErrorMessage color={"Crimson"}>
                      {errors.accountname}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                  <Button
                    bg="#0CBF94"
                    w={"full"}
                    color={"#021D17"}
                    fontSize={"16px"}
                    fontWeight={"600"}
                  >
                    Save bank account
                  </Button>
                </GridItem>
              </SimpleGrid>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
}
