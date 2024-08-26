"use client";

import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  Center,
  Input,
  SimpleGrid,
  GridItem,
  Button,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { AxiosPost } from "@/app/axios/axios";

const PersonalDetailsSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function PersonalDetails({ email,setStep }: { email: any,setStep:any }) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const url = "auth/register";
  const toast = useToast();

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
    <Box w={"full"}>
      <Center pb={["108px", "168px"]}>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            password: "",
            confirmPassword: "",
            email: email,
          }}
          validationSchema={PersonalDetailsSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isValid, dirty }) => (
            <Form>
              <SimpleGrid columns={2} rowGap={"24px"} w={["335px", "400px"]}>
                <GridItem colSpan={2} mb={"16px"}>
                  <Box>
                    <Text fontSize={["32px", "40px"]} fontWeight={"600"}>
                      Personal details
                    </Text>
                  </Box>
                  <Box>
                    <Text
                      fontSize={"14px"}
                      fontWeight={"600"}
                      color={"#666666"}
                    >
                      Enter your personal details correctly
                    </Text>
                  </Box>
                </GridItem>
                <GridItem colSpan={2}>
                  <FormControl
                    isInvalid={!!errors.firstName && touched.firstName}
                  >
                    <FormLabel fontSize={"16px"} fontWeight={"600"}>
                      First name
                    </FormLabel>
                    <Field
                      h={['50px','50px','44px']}
                      as={Input}
                      type="text"
                      name="firstName"
                      placeholder="Enter your first name"
                    />
                    <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                  <FormControl
                    isInvalid={!!errors.lastName && touched.lastName}
                  >
                    <FormLabel fontSize={"16px"} fontWeight={"600"}>
                      Last name
                    </FormLabel>
                    <Field
                      h={['50px','50px','44px']}
                      as={Input}
                      type="text"
                      name="lastName"
                      placeholder="Enter your last name"
                    />
                    <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                  <FormControl
                    isInvalid={!!errors.password && touched.password}
                  >
                    <FormLabel fontSize={"16px"} fontWeight={"600"}>
                      Create password
                    </FormLabel>
                    <InputGroup>
                      <Field
                        h={['50px','50px','44px']}
                        as={Input}
                        type={show ? "text" : "password"}
                        name="password"
                        placeholder="Enter your password"
                      />
                      <InputRightElement width="4.5rem">
                        <Button
                          h="1.75rem"
                          size="sm"
                          onClick={handleClick}
                          bg={"transparent"}
                          _hover={{ background: "transparent" }}
                        >
                          {show ? <FaRegEyeSlash /> : <IoEyeOutline />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                  <FormControl
                    isInvalid={
                      !!errors.confirmPassword && touched.confirmPassword
                    }
                  >
                    <FormLabel fontSize={"16px"} fontWeight={"600"}>
                      Confirm password
                    </FormLabel>
                    <InputGroup>
                      <Field
                        h={['50px','50px','44px']}
                        as={Input}
                        type={show ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm your password"
                      />
                      <InputRightElement width="4.5rem">
                        <Button
                          h="1.75rem"
                          size="sm"
                          onClick={handleClick}
                          bg={"transparent"}
                          _hover={{ background: "transparent" }}
                        >
                          {show ? <FaRegEyeSlash /> : <IoEyeOutline />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.confirmPassword}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                  {errorMessage === "Email already exists" ? (
                    <Text
                      color="red.500"
                      // ml={2}
                      cursor={'pointer'}
                      fontSize="sm"
                      fontWeight="400"
                      onClick={()=>setStep(1)}
                    >
                      {"Email already exists click to change Email"}
                    </Text>
                  ) : (
                    <Text
                      color="red.500"
                      // ml={2}
                      fontSize="sm"
                      fontWeight="400"
                    >
                      {errorMessage}
                    </Text>
                  )}
                </GridItem>
                <GridItem colSpan={2} mt={"4px"}>
                  <Button
                    h={['50px','50px','44px']}
                    type="submit"
                    bg="#0CBF94"
                    fontSize={"16px"}
                    fontWeight={"600"}
                    w={"100%"}
                    color={"#021D17"}
                    isDisabled={!isValid || !dirty}
                  >
                     {loading ? <Spinner /> : "Continue"}
                  </Button>
                </GridItem>
              </SimpleGrid>
            </Form>
          )}
        </Formik>
      </Center>
    </Box>
  );
}
