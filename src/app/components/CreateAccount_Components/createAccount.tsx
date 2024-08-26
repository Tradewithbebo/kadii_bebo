"use client";

import React from "react";
import { Box, Center, SimpleGrid, GridItem, Text, Button, Input, FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Link from "next/link";

const CreateAccountSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export default function CreateAccount({ setStep, setEmail }:{setStep:any, setEmail:any}) {
  const handleProceed = (values:any) => {
    setEmail(values.email);
    setStep(2);
  };

  return (
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
                    <Text fontSize={"14px"} fontWeight={"600"} color={"#666666"}>
                      Create an account to get started
                    </Text>
                  </Box>
                </GridItem>
                <GridItem colSpan={2}>
                  <Button w={"full"} fontSize={["16px", "16px"]} fontWeight={"600"}   h={['50px','50px','44px']}>
                    <FcGoogle size={"22px"} /> &nbsp;&nbsp;Continue with Google
                  </Button>
                </GridItem>
                <GridItem colSpan={2}>
                  <Text textAlign={"center"} fontSize={"14px"} fontWeight={"500"} color={"#B3B3B3"} my={"4px"}>
                    OR
                  </Text>
                </GridItem>
                <GridItem colSpan={2}>
                  <FormControl isInvalid={!!errors.email && touched.email}>
                    <FormLabel fontSize={"16px"} fontWeight={"600"}>
                      Email
                    </FormLabel>
                    <Field  as={Input} type="email" name="email" placeholder="Email address"   h={['50px','50px','44px']} />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2} mt={"4px"}>
                  <Button   h={['50px','50px','44px']} type="submit" bg="#0CBF94" fontSize={"16px"} isDisabled={!isValid || !dirty}fontWeight={"600"} w={"100%"} color={"#021D17"}>
                    Continue
                  </Button>
                 <Link href={"/createAccount/Login"}> <Text textAlign={"left"} fontSize={"14px"} mt={"16px"} fontWeight={"600"} cursor={"pointer"}>
                    Already have an account? <span style={{ color: "#0CBF94" }}> Login</span>{" "}
                  </Text></Link>
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
  );
}
