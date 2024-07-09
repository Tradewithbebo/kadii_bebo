
"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
  useToast,
  GridItem,
  SimpleGrid,
  Center,
  Text
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { AxiosPost } from "@/app/axios/axios";

const emailforgotpass = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is Required"),
});

export default function Emailforgotpass() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [initialEmail, setInitialEmail] = useState<string | null>(null);
  const toast = useToast();
  const url = "auth/forgot-password";


  const handlesubmitEmail = async (values: any) => {
    setLoading(true);
    try {
      const res = await AxiosPost(url, values);
      setLoading(false);
      if (res) {
        const successMessage = "Check your email for the code";
        localStorage.removeItem("email"); // Clear any existing email
        localStorage.setItem("email", values.email); // Store the new email
        router.push("/createAccount/ResetPassword");
        setSuccessMessage(successMessage);
        toast({
          title: "Success",
          description: successMessage,
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top-left",
        });
      }
    } catch (err: any) {
      setLoading(false);
      let message = "Check your network and try again.";
      if (err.response && err.response.data && err.response.data.message) {
        message = err.response.data.message;
      }
      setErrorMessage(message);
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <Box w={"full"}>
      <Center pb={["108px", "440px"]}>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={emailforgotpass}
        // enableReinitialize
        onSubmit={(values) => {
          handlesubmitEmail(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
          <SimpleGrid columns={2} rowGap={"24px"} w={["335px", "400px"]}>
          <GridItem colSpan={2} mb={"16px"}>
                  <Box>
                    <Text fontSize={["32px", "40px"]} fontWeight={"600"}>
                      Reset Password
                    </Text>
                  </Box>
                  <Box>
                    <Text
                      fontSize={"14px"}
                      fontWeight={"600"}
                      color={"#666666"}
                    >
                      Enter your Email  correctly
                    </Text>
                  </Box>
                </GridItem>
          <GridItem colSpan={2} mb={"16px"}>
          <FormLabel>Email</FormLabel>
              <FormControl isInvalid={!!errors.email && touched.email}>
                <Field
                  as={Input}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                //   variant="filled"
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
              </GridItem>
              <GridItem colSpan={2} mb={"16px"}>
              <Button
                // size={["sm","sm"]}
                type="submit"
                bg="#0CBF94"
                width={["40%","50%"]}
                isLoading={loading}

              >
                Continue
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
