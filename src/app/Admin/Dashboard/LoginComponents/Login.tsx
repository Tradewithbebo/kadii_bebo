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
import { useRouter } from "next/navigation";
import { AxiosPost } from "@/app/axios/axios";

// Validation Schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const initialValues = { email: "", password: "" };
  const url = "admin/login";

  const handleSubmit = async (values: any) => {
    if (values) {
      setLoading(true);
      try {
        const res = await AxiosPost(url, values);
        setLoading(false);
        if (res) {
          localStorage.setItem("stk-apk", JSON.stringify({ authToken: res.data.accessToken }));
          router.push("/Admin/Dashboard/dashboard");
        }
      } catch (err: any) {
        setLoading(false);
        if (err.response && err.response.data && err.response.data.message) {
          setErrorMessage(err.response.data.message);
        } else {
          setErrorMessage("An unexpected error occurred.");
        }
      }
    }
  };

  return (
    <Box bg={"#186B53"} minH="100vh">
      <Center w="full" h="100vh" alignItems={'center'} display={'flex'}>
        <VStack w={{ base: "90%", md: "50%", lg: "40%" }}>
          <Box pb={"30px"}>
            <Text fontSize={{ base: "28px", md: "36px" }} fontWeight={"800"} color={"#FFFFFF"}>
              Admin Sign in
            </Text>
          </Box>
          <Box
            w="full"
            p={{ base: 6, md: 8 }}
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
              {({ errors, touched, dirty, isValid }) => (
                <Form>
                  <SimpleGrid w={"full"} gap={6}>
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
                              aria-label={showPassword ? "Hide password" : "Show password"}
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
                        type="submit"
                        isDisabled={!isValid || !dirty}
                      >
                        {loading ? <Spinner /> : "Sign in"}
                      </Button>
                      <Text color={"red.500"}>{errorMessage}</Text>
                    </GridItem>
                    <GridItem w={"full"} justifyContent={"center"} display={"flex"}>
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
