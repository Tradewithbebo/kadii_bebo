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
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { AxiosPost } from "@/app/axios/axios";

const ResendMailSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

export default function ResendMail() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [initialEmail, setInitialEmail] = useState<string | null>(null);
  const toast = useToast();
  const url2 = "auth/resend-verify-code";

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setInitialEmail(storedEmail);
    }
  }, []);

  const handleresendcode = async (values: any) => {
    setLoading(true);
    try {
      const res = await AxiosPost(url2, values);
      setLoading(false);
      if (res) {
        const successMessage = "Check your email for the code";
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
    <>
      <Formik
        initialValues={{ email: initialEmail || "" }}
        validationSchema={ResendMailSchema}
        enableReinitialize
        onSubmit={(values) => {
          handleresendcode(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Box width={'full'} >
              <FormControl isInvalid={!!errors.email && touched.email}>
                <Field
                  as={Input}
                  id="email"
                  name="email"
                  type="hidden"
                  variant="filled"
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
              <Button
                // size={["sm","sm"]}
                type="submit"
                bg="transpirent"
                width={["40%", "50%"]}
                // isLoading={loading}
                variant={["unstyled","unstyled"]}
                // mt={"16px"}
                fontSize={["13px", "14px"]}
                fontWeight={"600"}
              >
                Didn’t get code?{" "}
                <span style={{ color: "#0CBF94", marginLeft: "3px" }}>
                  Resend
                </span>
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
}
