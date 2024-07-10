"use client";
import { AxiosPost } from "@/app/axios/axios";
import { Button, Input, useToast, VStack } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";

export default function Resendmailforgotpass() {
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialEmail, setInitialEmail] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const toast = useToast();
  const url = "auth/forgot-password";
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setInitialEmail(storedEmail);
    }
  }, []);
  const handleclick = async (values: any) => {
    setLoading(true);
    try {
      const res = await AxiosPost(url, values);
      setLoading(false);
      if (res) {
        const successMessage = "Check your email for the code";
        // localStorage.removeItem("email"); // Clear any existing email
        // localStorage.setItem("email", values.email); // Store the new email
        // router.push("/createAccount/ResetPassword");
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
        // validationSchema={ResendMailSchema}
        enableReinitialize
        onSubmit={(values) => {
          handleclick(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <VStack spacing={4} align="flex-start">
              <Field
                as={Input}
                id="email"
                name="email"
                type="hidden"
                variant="filled"
              />
              <Button
                // size={["sm","sm"]}
                type="submit"
                bg="transpirent"
                width={["40%", "50%"]}
                variant={["unstyled","unstyled"]}
                // isLoading={loading}
                _hover={{ bg: "" }}
                mt={"16px"}
                fontSize={["13px", "14px"]}
                fontWeight={"600"}
              >
                Didn’t get code?{" "}
                <span style={{ color: "#0CBF94", marginLeft: "3px" }}>
                  Resend
                </span>
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </>
  );
}
