"use client";

import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  Center,
  Input,
  SimpleGrid,
  GridItem,
  Button,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

const PersonalDetailsSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function Personaldetails() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const router = useRouter();

  return (
    <Box w={"full"}>
      <Center pb={["108px", "215px"]}>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={PersonalDetailsSchema}
          onSubmit={(values) => {
            console.log(values);
            router.push("/createAccount/createPin");
          }}
        >
          {({ errors, touched, isValid, dirty }) => (
            <Form>
              <SimpleGrid columns={2} rowGap={"24px"} w={["335px", "400px"]}>
                <GridItem colSpan={2} mb={"16px"}>
                  <Box>
                    <Text fontSize={["32px", "40px"]} fontWeight={"600"}>
                      Personal details
                    </Text>
                  </Box>
                  <Box>
                    <Text
                      fontSize={"14px"}
                      fontWeight={"600"}
                      color={"#666666"}
                    >
                      Enter your personal details correctly
                    </Text>
                  </Box>
                </GridItem>
                <GridItem colSpan={2}>
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
                    />
                    <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                  <FormControl
                    isInvalid={!!errors.lastName && touched.lastName}
                  >
                    <FormLabel fontSize={"16px"} fontWeight={"600"}>
                      Last name
                    </FormLabel>
                    <Field
                      as={Input}
                      type="text"
                      name="lastName"
                      placeholder="Enter your last name"
                    />
                    <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                  <FormControl
                    isInvalid={!!errors.password && touched.password}
                  >
                    <FormLabel fontSize={"16px"} fontWeight={"600"}>
                      Create password
                    </FormLabel>
                    <InputGroup>
                      <Field
                        as={Input}
                        type={show ? "text" : "password"}
                        name="password"
                        placeholder="Enter your password"
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
                <GridItem colSpan={2}>
                  <FormControl
                    isInvalid={
                      !!errors.confirmPassword && touched.confirmPassword
                    }
                  >
                    <FormLabel fontSize={"16px"} fontWeight={"600"}>
                      Confirm password
                    </FormLabel>
                    <InputGroup>
                      <Field
                        as={Input}
                        type={show ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm your password"
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
                <GridItem colSpan={2} mt={"4px"}>
                  <Button
                    type="submit"
                    bg="#0CBF94"
                    fontSize={"16px"}
                    fontWeight={"600"}
                    w={"100%"}
                    color={"#021D17"}
                    isDisabled={!isValid || !dirty}
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
