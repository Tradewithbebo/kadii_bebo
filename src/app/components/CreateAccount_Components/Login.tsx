"use client";

import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
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
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { AxiosPost } from "@/app/axios/axios";
import Link from "next/link";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Password is required"),
});

export default function LoginComponent() {
  const toast = useToast();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const url = "auth/login";
  const [kyc, setKyc] = useState<string | null>(null);
  const handleSubmit = async (values: any) => {
    if (values) {
      setLoading(true);
      
      try {
        const res = await AxiosPost(url, values);
        setLoading(false);
        if (res) {
          const { emailVerified } = res.data.user;

          if (!emailVerified) {
            localStorage.removeItem("email"); // Clear any existing email
            localStorage.setItem("email", values.email); // Store the new email
            router.push("/createAccount/verifyMail");
          } else {
            localStorage.setItem(
              "stk-apk",
              JSON.stringify({ authToken: res.data.accessToken })
            );
            const kycs = res.data.user.kycStatus;
            // console.log('kyc',kyc)
           
            if( kycs==='NOT-STARTED'){router.push('/HomeincompleteKyc')}
            else{  router.push("/");}
     
          }
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
      <Center pb={["80px", "203px"]}>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isValid, dirty }) => (
            <Form>
              <SimpleGrid columns={2} rowGap={"24px"} w={["335px", "400px"]}>
                <GridItem colSpan={2} mb={"16px"}>
                  <Box>
                    <Text
                      fontSize={["32px", "40px"]}
                      fontWeight={"600"}
                      color={""}
                    >
                      Login
                    </Text>
                  </Box>
                  <Box>
                    <Text
                      fontSize={"14px"}
                      fontWeight={"600"}
                      color={"#666666"}
                    >
                      Login to continue transacting
                    </Text>
                  </Box>
                </GridItem>
                <GridItem colSpan={2}>
                  <Button
                    w={"full"}
                    fontSize={["16px", "16px"]}
                    fontWeight={"600"}
                  >
                    <FcGoogle size={"22px"} /> &nbsp;&nbsp;Continue with google
                  </Button>
                </GridItem>
                <GridItem colSpan={2}>
                  <Text
                    textAlign={"center"}
                    fontSize={"14px"}
                    fontWeight={"500"}
                    color={"#B3B3B3"}
                    my={"4px"}
                  >
                    OR
                  </Text>
                </GridItem>
                <GridItem colSpan={2}>
                  <FormControl isInvalid={!!errors.email && touched.email}>
                    <Box display="flex" alignItems="center">
                      <FormLabel fontSize={"16px"} fontWeight={"600"}>
                        Email
                      </FormLabel>
                    </Box>
                    <Field
                      as={Input}
                      type="email"
                      name="email"
                      placeholder="Email address"
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                  <FormControl
                    isInvalid={!!errors.password && touched.password}
                  >
                    <FormLabel fontSize={"16px"} fontWeight={"600"}>
                      Password
                    </FormLabel>
                    <InputGroup>
                      <Field
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
                    <Link href="/createAccount/EntermailForgotpass">
                      <FormHelperText
                        textAlign={"right"}
                        color={"#0CBF94"}
                        fontSize={"14px"}
                        fontWeight={"600"}
                        cursor={"pointer"}
                      >
                        Forgot password
                      </FormHelperText>
                    </Link>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2} mt={"4px"}>
                  <Button
                    isLoading={loading}
                    type="submit"
                    bg="#0CBF94"
                    fontSize={"16px"}
                    fontWeight={"600"}
                    w={"100%"}
                    color={"#021D17"}
                    isDisabled={!isValid || !dirty}
                  >
                    Sign in
                  </Button>
                  {errorMessage && (
                    <Text
                      color="red.500"
                      // ml={2}
                      fontSize="sm"
                      fontWeight="400"
                    >
                      {errorMessage}
                    </Text>
                  )}
                  <Link href={"/createAccount/createAccount"}>
                    <Text
                      textAlign={"left"}
                      fontSize={"14px"}
                      mt={"16px"}
                      fontWeight={"600"}
                      cursor={"pointer"}
                    >
                      Don’t have an account?{" "}
                      <span style={{ color: "#0CBF94" }}>Create account</span>
                    </Text>
                  </Link>
                </GridItem>
              </SimpleGrid>
            </Form>
          )}
        </Formik>
      </Center>
      {/* <Button
        onClick={() => {
          localStorage.removeItem("stk-apk");
          router.push("/createAccount/Login");
        }}
      >
        Logout
      </Button> */}
    </Box>
  );
}
