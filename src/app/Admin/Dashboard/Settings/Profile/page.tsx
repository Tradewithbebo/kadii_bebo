"use client";

import {
  Box,
  Button,
  Card,
  CardBody,
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Text,
  useToast,
  Image,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosPost } from "@/app/axios/axios";
import { FaRegEyeSlash } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";

export default function Page() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const url = "auth/register";
  const toast = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const PersonalDetailsSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    oldpassword: Yup.string().required("old password is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
        "uppercase,lowercase,number,special character"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = async (values: any) => {
    if (values) {
      setLoading(true);
      try {
        const res = await AxiosPost(url, values);
        setLoading(false);
        if (res) {
          localStorage.removeItem("email"); // Clear any existing email
          localStorage.setItem("email", values.email); // Store the new email
          router.push("/createAccount/verifyMail");
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
    <Box>
      <Card border="1px" borderColor="gray.200">
        <CardBody>
          <Formik
            initialValues={{
              firstName: "",
              oldpassword: "",
              password: "",
              confirmPassword: "",
              email: "",
            }}
            validationSchema={PersonalDetailsSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isValid, dirty }) => (
              <Form>
                <SimpleGrid column={2} w={"full"} pb={"67px"}>
                  <GridItem colSpan={1} mb={"24px"}>
                    <Text fontSize={"16px"} fontWeight={"700"}>
                      Personal Information
                    </Text>
                    <Text
                      fontSize={"12px"}
                      fontWeight={"400"}
                      color={"#71717A"}
                    >
                      Attend to active tickets as fast as possible
                    </Text>
                  </GridItem>
                  <GridItem colSpan={1} display={"flex"} justifyContent={"end"}>
                    <Button
                      fontSize={"16px"}
                      fontWeight={"600"}
                      onClick={() => setIsEditing(!isEditing)}
                      bg={isEditing ? "#0CBF94" : "Transpirent"}
                      border={isEditing ? "" : "1px"}
                      borderColor="gray.200"
                    >
                      {isEditing ? "Save Changes" : "Edit profile"}
                    </Button>
                  </GridItem>
                  <GridItem
                    mb={"24px"}
                    colSpan={2}
                    display={"flex"}
                    justifyContent={"start"}
                  >
                    <Image
                      borderRadius="full"
                      boxSize="50px"
                      src="https://bit.ly/dan-abramov"
                      alt="Dan Abramov"
                    />
                  </GridItem>
                  <GridItem colSpan={1} width={"90%"}>
                    <FormControl
                      isInvalid={!!errors.firstName && touched.firstName}
                    >
                      <FormLabel fontSize={"16px"} fontWeight={"600"}>
                        First name
                      </FormLabel>
                      <Field
                        as={Input}
                        type="text"
                        name="firstName"
                        placeholder="Enter your first name"
                        disabled={!isEditing}
                      />
                      <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={1} width={"90%"} mb={"40px"}>
                    <FormControl isInvalid={!!errors.email && touched.email}>
                      <FormLabel fontSize={"16px"} fontWeight={"600"}>
                        Email
                      </FormLabel>
                      <Field
                        as={Input}
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        disabled={!isEditing}
                      />
                      <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={1} mb={"24px"}>
                    <Text fontSize={"16px"} fontWeight={"700"}>
                      Security Information
                    </Text>
                    <Text
                      fontSize={"12px"}
                      fontWeight={"400"}
                      color={"#71717A"}
                    >
                      Change your password
                    </Text>
                  </GridItem>
                  <GridItem colSpan={1} display={"flex"} justifyContent={"end"}>
                    <Button
                      fontSize={"16px"}
                      fontWeight={"600"}
                      bg={"Transpirent"}
                      border={"1px"}
                      borderColor="gray.200"
                    >
                      Update password
                    </Button>
                  </GridItem>
                  <GridItem colSpan={2} width={"45%"}>
                    <FormControl
                      isInvalid={
                        !!errors.confirmPassword && touched.confirmPassword
                      }
                    >
                      <FormLabel fontSize={"16px"} fontWeight={"600"}>
                        Old password
                      </FormLabel>
                      <InputGroup>
                        <Field
                          as={Input}
                          type={show ? "text" : "password"}
                          name="oldPassword"
                          placeholder="Enter your previous password"
                          disabled={!isEditing}
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
                      <FormErrorMessage>
                        {errors.confirmPassword}
                      </FormErrorMessage>
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={1} width={"90%"}>
                    <FormControl
                      isInvalid={!!errors.password && touched.password}
                    >
                      <FormLabel fontSize={"16px"} fontWeight={"600"}>
                        New password
                      </FormLabel>
                      <InputGroup>
                        <Field
                          as={Input}
                          type={show ? "text" : "password"}
                          name="password"
                          placeholder="Enter your password"
                          disabled={!isEditing}
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
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={1} width={"90%"}>
                    <FormControl
                      isInvalid={
                        !!errors.confirmPassword && touched.confirmPassword
                      }
                    >
                      <FormLabel fontSize={"16px"} fontWeight={"600"}>
                        Confirm new password
                      </FormLabel>
                      <InputGroup>
                        <Field
                          as={Input}
                          type={show ? "text" : "password"}
                          name="confirmPassword"
                          placeholder="Confirm your password"
                          disabled={!isEditing}
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
                      <FormErrorMessage>
                        {errors.confirmPassword}
                      </FormErrorMessage>
                    </FormControl>
                  </GridItem>
                </SimpleGrid>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </Box>
  );
}
