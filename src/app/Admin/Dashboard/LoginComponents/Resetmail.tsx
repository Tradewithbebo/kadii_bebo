"use client";

import React, { useState } from "react";
import {
  Text,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
  ChakraProvider,
  extendTheme,
  Center,
  IconButton,
  InputRightElement,
  InputGroup,
  SimpleGrid,
  GridItem,
  Link,
  Spinner,
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#186B53",
        color: "white",
      },
    },
  },
});

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
//   password: Yup.string().required("Password is required"),
});

export default function Resetmail() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const initialValues = { email: "", password: "" };

  const handleSubmit = (values: any, actions: any) => {
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
  };
  return (
    <Box bg={"#186B53"}>
      {" "}
      <Center h="100vh">
     <VStack>
     <Box pb={'56px'}>
            <Text fontSize={'36px'} fontWeight={'800'} color={'#FFFFFF'}>
            Reset Password
            </Text>
        </Box>
        <Box
          w="md"
          p={8}
          bg="white"
          borderRadius="md"
          boxShadow="lg"
          border="1px"
          borderColor="gray.200"
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              errors,
              touched,
              isSubmitting,
              dirty,
              isValid,
              isValidating,
            }) => (
              <Form>
                <SimpleGrid w={"full"} gap={"16px"} p={"40px"}>
                  <GridItem>
                    <FormControl isInvalid={!!errors.email && touched.email}>
                      <FormLabel fontSize={"16px"} fontWeight={"600"}>
                        Email
                      </FormLabel>
                      <Field
                        as={Input}
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                      />
                      <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>
                  </GridItem>
                  <GridItem>
                    <Button
                      fontWeight={"600"}
                      fontSize={"16px"}
                      w={"full"}
                      bg="#0CBF94"
                      isLoading={isSubmitting}
                      type="submit"
                      isDisabled={!isValid || !dirty}
                      // onClick={()=>{ actions.setSubmitting(true);}}
                    >
                   Continue </Button>
                  </GridItem>
                 
                </SimpleGrid>
              </Form>
            )}
          </Formik>
        </Box>
     </VStack>
      </Center>
    </Box>
  );
}
