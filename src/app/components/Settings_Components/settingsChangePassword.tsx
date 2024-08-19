"use client";

import React, { useState } from "react";
import {
  Text,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  SimpleGrid,
  GridItem,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
  VStack,
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";

const PasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Old password is required"),
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});

interface Edith_profile {
  isOpen: any;
  onOpen: any;
  onClose: any;
}

export default function SettingsChangePassword({
  isOpen,
  onOpen,
  onClose,
}: Edith_profile) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const handleSubmit = (values: any) => {
    // Handle form submission
    console.log("Form values", values);
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={["xs", "xs", "sm"]}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <VStack w={"full"}>
            <Box w={"full"}>
              <Text>Update password</Text>
            </Box>
            <Box w={"full"}>
              <Text fontSize={"16px"} fontWeight={"600"} color={"#666666"}>
                Update your password to a new one
              </Text>
            </Box>
          </VStack>
        </DrawerHeader>

        <DrawerBody>
          <Formik
            initialValues={{
              oldPassword: "",
              newPassword: "",
              confirmPassword: "",
            }}
            validationSchema={PasswordSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <SimpleGrid columns={1} gap={"28px"}>
                  <GridItem colSpan={1}>
                    <FormControl isInvalid={!!errors.oldPassword && touched.oldPassword}>
                      <FormLabel>Old password</FormLabel>
                      <InputGroup>
                        <Field
                          as={Input}
                          type={show ? "text" : "password"}
                          name="oldPassword"
                          placeholder="Enter old password"
                        />
                        <InputRightElement width="4.5rem">
                          <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? <FaRegEyeSlash /> : <IoEyeOutline />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>{errors.oldPassword}</FormErrorMessage>
                    </FormControl>
                  </GridItem>

                  <GridItem colSpan={1}>
                    <FormControl isInvalid={!!errors.newPassword && touched.newPassword}>
                      <FormLabel>New password</FormLabel>
                      <InputGroup>
                        <Field
                          as={Input}
                          type={show ? "text" : "password"}
                          name="newPassword"
                          placeholder="Enter new password"
                        />
                        <InputRightElement width="4.5rem">
                          <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? <FaRegEyeSlash /> : <IoEyeOutline />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>{errors.newPassword}</FormErrorMessage>
                    </FormControl>
                  </GridItem>

                  <GridItem colSpan={1}>
                    <FormControl isInvalid={!!errors.confirmPassword && touched.confirmPassword}>
                      <FormLabel>Confirm password</FormLabel>
                      <InputGroup>
                        <Field
                          as={Input}
                          type={show ? "text" : "password"}
                          name="confirmPassword"
                          placeholder="Confirm new password"
                        />
                        <InputRightElement width="4.5rem">
                          <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? <FaRegEyeSlash /> : <IoEyeOutline />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
                    </FormControl>
                  </GridItem>

                  <GridItem w={"full"}>
                    <Button type="submit" bg={"#0CBF94"} w={"full"}>
                      Update profile
                    </Button>
                  </GridItem>
                </SimpleGrid>
              </Form>
            )}
          </Formik>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
