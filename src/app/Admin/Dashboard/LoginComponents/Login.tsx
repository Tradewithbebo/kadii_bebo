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
import Router, { useRouter } from "next/navigation";

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
  password: Yup.string().required("Password is required"),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
const router=useRouter()
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
            Admin Sign in
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
                    <FormControl
                      isInvalid={!!errors.password && touched.password}
                    >
                      <FormLabel fontSize={"16px"} fontWeight={"600"}>
                        Password
                      </FormLabel>
                      <InputGroup>
                        <Field
                          as={Input}
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="Enter your password"
                        />
                        <InputRightElement>
                          <IconButton
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                            icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                            onClick={togglePasswordVisibility}
                            variant="ghost"
                          />
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>{errors.password}</FormErrorMessage>
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
                      onClick={()=>{ router.push('/Admin/Dashboard/dashboard')}}
                    >
                      Sign in
                    </Button>
                  </GridItem>
                  <GridItem
                    w={"full"}
                    justifyContent={"center"}
                    display={"flex"}
                  >
                    <Link
                      fontWeight={"600"}
                      fontSize={"16px"}
                      color={"#0CBF94"}
                      href="/Admin/Resetemail"
                    >
                      Reset password
                    </Link>
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
