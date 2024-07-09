"use client";

import {
  Box,
  Button,
  Card,
  CardBody,
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Text,
  useToast,
  Image,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosPost } from "@/app/axios/axios";
import { FaRegEyeSlash } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import Select from "react-select";

export default function Page() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const url = "auth/register";
  const toast = useToast();
  const [Value, setValue] = useState("");
  const networkOptions = [
    { value: "SuperAdmin", label: "Super Admin" },
    { value: "Admin", label: "Admin" },
  ];
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

  const PersonalDetailsSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    oldpassword: Yup.string().required("old password is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
        "uppercase,lowercase,number,special character"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = async (values: any) => {
    if (values) {
      setLoading(true);
      try {
        const res = await AxiosPost(url, values);
        setLoading(false);
        if (res) {
          localStorage.removeItem("email"); // Clear any existing email
          localStorage.setItem("email", values.email); // Store the new email
          router.push("/createAccount/verifyMail");
        }
      } catch (err: any) {
        setLoading(false);
        let message = "Check your Network and try again.";
        if (err.response && err.response.data && err.response.data.message) {
          message = err.response.data.message;
        }
        setErrorMessage(message);
        toast({
          title: "Error",
          description: message,
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    }
  };

  return (
    <Box>
      <Card border="1px" borderColor="gray.200">
        <CardBody>
          <Formik
            initialValues={{
              firstName: "",
              oldpassword: "",
              password: "",
              confirmPassword: "",
              email: "",
            }}
            validationSchema={PersonalDetailsSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isValid, dirty, setFieldValue }) => (
              <Form>
                <SimpleGrid column={3} w={"full"} pb={"67px"}>
                  <GridItem colSpan={3} mb={"24px"}>
                    <Text fontSize={"16px"} fontWeight={"700"}>
                      Admin
                    </Text>
                    <Text
                      fontSize={"12px"}
                      fontWeight={"400"}
                      color={"#71717A"}
                    >
                      Add someone and give them a role
                    </Text>
                  </GridItem>

                  <GridItem colSpan={1} width={"90%"}>
                    <FormControl
                      isInvalid={!!errors.firstName && touched.firstName}
                    >
                      <Field
                        as={Input}
                        type="text"
                        name="fullName"
                        placeholder="Enter your fullName"
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={1} width={"100%"} mb={"40px"}>
                    <Field
                      as={Select}
                      id="Admin"
                      name="Admin"
                      options={networkOptions}
                      isSearchable
                      placeholder="Admin"
                      value={Value}
                      onChange={(selectedOption: any) => {
                        handleValueChange(selectedOption, setFieldValue);
                      }}
                    />
                  </GridItem>
                  <GridItem colSpan={1} width={"90%"} mb={"40px"} display={'flex'} justifyContent={'end'}>
                   <Button bg={'#0CBF94'}>
                   Add admin
                   </Button>
                  </GridItem>
                </SimpleGrid>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </Box>
  );
}
