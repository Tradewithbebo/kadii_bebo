"use client";

import React, { useState } from "react";
import {
  Box,
  Center,
  SimpleGrid,
  GridItem,
  Text,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { AxiosPost } from "@/app/axios/axios";
import { useRouter } from "next/navigation";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const CreateAccountSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export default function CreateAccount({
  setStep,
  setEmail,
}: {
  setStep: any;
  setEmail: any;
}) {
  const toast = useToast();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const url = "auth/login";
  const [kyc, setKyc] = useState<string | null>(null);
  const handleProceed = (values: any) => {
    setEmail(values.email);
    setStep(2);
  };

  // Google OAuth handlers
  const handleGoogleAuthSuccess = async (credentialResponse: any) => {
    console.log("Google Login Success", credentialResponse);
    try {
      const res = await AxiosPost("auth/google/callback", {
        token: credentialResponse.credential,
      });
      // Handle the response if needed
      console.log("Google login successful, response:", res);
    } catch (err) {
      console.error("Google Registration Error:", err);
      toast({
        title: "Error",
        description: "Google login failed.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const handleGoogleAuthError = () => {
    toast({
      title: "Error",
      description: "Google login failed.",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "bottom-left",
    });
  };
  const VITE_APP_GOOGLE_OAUTH_CLIENT_ID =
    "366772287562-p2i9tr851aerrl89u9an2s6k9mofa5s0.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={VITE_APP_GOOGLE_OAUTH_CLIENT_ID}>
      <Box w={"full"}>
        <Center pb={["44px", "150px"]}>
          <Formik
            initialValues={{ email: "" }}
            validationSchema={CreateAccountSchema}
            onSubmit={handleProceed}
          >
            {({ errors, touched, isValid, dirty }) => (
              <Form>
                <SimpleGrid columns={2} rowGap={"24px"} w={["335px", "400px"]}>
                  <GridItem colSpan={2} mb={"16px"}>
                    <Box>
                      <Text fontSize={["32px", "40px"]} fontWeight={"600"}>
                        Create an account
                      </Text>
                    </Box>
                    <Box>
                      <Text
                        fontSize={"14px"}
                        fontWeight={"600"}
                        color={"#666666"}
                      >
                        Create an account to get started
                      </Text>
                    </Box>
                  </GridItem>
                  <GridItem
                    colSpan={2}
                    w="full"
                    display="flex"
                    justifyContent="center"
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      w="fit-content"
                      px={["4px", "4px", "2px"]}
                      h={["50px", "50px", "44px"]}
                      border="1px solid"
                      borderColor="#ddd"
                      borderRadius="8px"
                      cursor="pointer"
                    >
                      <GoogleLogin
                        text="continue_with"
                        onSuccess={handleGoogleAuthSuccess}
                        onError={handleGoogleAuthError}
                        useOneTap
                        shape="rectangular"
                      />
                    </Box>
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
                      <FormLabel fontSize={"16px"} fontWeight={"600"}>
                        Email
                      </FormLabel>
                      <Field
                        as={Input}
                        type="email"
                        name="email"
                        placeholder="Email address"
                        h={["50px", "50px", "44px"]}
                      />
                      <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={2} mt={"4px"}>
                    <Button
                      h={["50px", "50px", "44px"]}
                      type="submit"
                      bg="#0CBF94"
                      fontSize={"16px"}
                      isDisabled={!isValid || !dirty}
                      fontWeight={"600"}
                      w={"100%"}
                      color={"#021D17"}
                    >
                      Continue
                    </Button>
                    <Link href={"/createAccount/Login"}>
                      {" "}
                      <Text
                        textAlign={"left"}
                        fontSize={"14px"}
                        mt={"16px"}
                        fontWeight={"600"}
                        cursor={"pointer"}
                      >
                        Already have an account?{" "}
                        <span style={{ color: "#0CBF94" }}> Login</span>{" "}
                      </Text>
                    </Link>
                  </GridItem>
                  <GridItem colSpan={2} mt={["63px", "134px"]}>
                    <Text fontSize={"12px"} fontWeight={"600"}>
                      By continuing, you agree to our{" "}
                      <span style={{ color: "#0CBF94", cursor: "pointer" }}>
                        Privacy Policy{" "}
                      </span>{" "}
                      and{" "}
                      <span style={{ color: "#0CBF94", cursor: "pointer" }}>
                        Terms & Conditions
                      </span>{" "}
                    </Text>
                  </GridItem>
                </SimpleGrid>
              </Form>
            )}
          </Formik>
        </Center>
      </Box>
    </GoogleOAuthProvider>
  );
}
