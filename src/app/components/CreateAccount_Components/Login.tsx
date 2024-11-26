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
} from "@chakra-ui/react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google"; // Import GoogleLogin
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { AxiosPost } from "@/app/axios/axios";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

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
            localStorage.removeItem("email");
            localStorage.setItem("email", values.email);
            router.push("/createAccount/verifyMail");
          } else {
            localStorage.setItem("stk-apk", JSON.stringify({ authToken: res.data.accessToken }));
            const kycs = res.data.user.kycStatus;

            if (kycs !== "APPROVED") {
              router.push("/HomeincompleteKyc");
            } else {
              router.push("/");
            }
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

  // Google OAuth handlers
const handleGoogleAuthSuccess = async (credentialResponse: any) => {
  console.log("Google Login Success", credentialResponse);
  try {
    const res = await AxiosPost("auth/google/callback", { token: credentialResponse.credential });
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
const VITE_APP_GOOGLE_OAUTH_CLIENT_ID="366772287562-p2i9tr851aerrl89u9an2s6k9mofa5s0.apps.googleusercontent.com"

  return (
    <GoogleOAuthProvider clientId={VITE_APP_GOOGLE_OAUTH_CLIENT_ID}>
      <Box w={"full"}>
        <Center pb={["80px", "203px"]}>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isValid, dirty }) => (
              <Form>
                <SimpleGrid columns={2} rowGap={"24px"} w={["auto", "400px"]}>
                  <GridItem colSpan={2} mb={"16px"}>
                    <Box>
                      <Text fontSize={["32px", "40px"]} fontWeight={"600"}>
                        Login
                      </Text>
                    </Box>
                    <Box>
                      <Text fontSize={"14px"} fontWeight={"600"} color={"#666666"}>
                        Login or Create an Account to continue transacting
                      </Text>
                    </Box>
                  </GridItem>
                  {/* Google Login Button */}
                  <GridItem colSpan={2} w="full" display="flex" justifyContent="center">
  <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    w='fit-content'
    px={['4px','4px','2px']}
    h={['50px','50px','44px']}
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
                    <Text textAlign={"center"} fontSize={"14px"} fontWeight={"500"} color={"#B3B3B3"} my={"4px"}>
                      OR
                    </Text>
                  </GridItem>
                  {/* Form Fields */}
                  <GridItem colSpan={2}>
                    <FormControl isInvalid={!!errors.email && touched.email}>
                      <Box display="flex" alignItems="center">
                        <FormLabel fontSize={"16px"} fontWeight={"600"}>
                          Email
                        </FormLabel>
                      </Box>
                      <Field as={Input} type="email" name="email" placeholder="Email address" h={['50px','50px','44px']} />
                      <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={2}>
                    <FormControl isInvalid={!!errors.password && touched.password}>
                      <FormLabel fontSize={"16px"} fontWeight={"600"}>
                        Password
                      </FormLabel>
                      <InputGroup>
                        <Field
                          as={Input}
                          type={show ? "text" : "password"}
                          name="password"
                          placeholder="Enter your password"
                          h={['50px','50px','44px']}
                        />
                        <InputRightElement width="4.5rem">
                          <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? <FaRegEyeSlash /> : <IoEyeOutline />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>{errors.password}</FormErrorMessage>
                      <Link href="/createAccount/EntermailForgotpass">
                        <FormHelperText textAlign={"right"} color={"#0CBF94"} fontSize={"14px"} fontWeight={"600"} cursor={"pointer"}>
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
                      h={['50px','50px','44px']}
                    >
                      Sign in
                    </Button>
                    {errorMessage && (
                      <Text color="red.500" fontSize="sm" fontWeight="400">
                        {errorMessage}
                      </Text>
                    )}
                    <Link href={"/createAccount/createAccount"}>
                      <Text textAlign={"left"} fontSize={"14px"} mt={"16px"} fontWeight={"600"} cursor={"pointer"}>
                        Don’t have an account? <span style={{ color: "#0CBF94" }}>Create account</span>
                      </Text>
                    </Link>
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
