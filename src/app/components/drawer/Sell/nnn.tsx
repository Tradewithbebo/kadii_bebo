"use client";

import {
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  FormHelperText,
  SimpleGrid,
  GridItem,
  Button,
  Textarea,
  Center,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
// import ListOfOptions from "./listOfOptions";
import { useFormState } from "react-dom";
// import { useForm } from "react-hook-form";
import { Formik, Form, Field, useFormik } from "formik";
// import { useToasts } from 'react-toast-notifications';
import Select from "react-select";
import bankName from "./listBanks";
import { myStyles } from "./selectrix";
export default function Add() {
   const  [message,setmessage]=useState('')
  const [Value, setValue] = useState('');
  const handleValueChange = (Value: any, values: any) => {
    values.Bank = Value
    console.log(Value);
    setValue(Value);
  };
  

  const initialValues = {
    Bank: "",
    accountnumber: "",
    accountname: "",
  };
  return (
    <Container
      bg={"#182237"}
      p={"20px"}
      borderRadius={"10px"}
      marginTop={"20px"}
      w={"100%"}
    >
      <Formik
        initialValues={initialValues}
        // validationSchema={addUserSchema}
        onSubmit={async (values, actions) => {
        
          actions.resetForm();
         
        }}
      >
        {({ handleSubmit, errors, touched, values, handleChange, isValid }) => (
          <form onSubmit={handleSubmit}>
            <SimpleGrid
              columns={1}
              // justifyContent={"center"}
              rowGap="3"
              columnGap="4"
              w={"100%"}
            >
              <GridItem colSpan={1}>
                <FormControl isInvalid={!!errors.accountnumber && touched.accountnumber}>
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
              <GridItem colSpan={1}>
                <FormControl isInvalid={!!errors.accountname && touched.accountname}>
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
              <GridItem colSpan={1}>
                <FormControl  isInvalid={!!errors.Bank && touched.Bank}>
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
                    styles={myStyles}
                  />
                 {errors.Bank && touched.Bank && <FormErrorMessage color={"Crimson"}>{errors.Bank}</FormErrorMessage>}
                </FormControl>
              </GridItem>
              
              <GridItem colSpan={1}>
                <Button
                  type="submit"
                  padding={"30px"}
                  backgroundColor={!isValid ? "grey" : "teal"}
                  color={"white"}
                  border={"none"}
                  borderRadius={"5px"}
                  cursor={!isValid ? "not-allowed" : "pointer"}
                  width={"100%"}
                //   isDisabled={!isValid}
                >
                  submit
                </Button>
              </GridItem>
            </SimpleGrid>
          </form>
        )}
      </Formik>
    </Container>
  );
}
