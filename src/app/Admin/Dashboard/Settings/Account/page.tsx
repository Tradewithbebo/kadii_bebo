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
import { AxiosAuthPost, AxiosPost } from "@/app/axios/axios";
import { FaRegEyeSlash } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import Select from "react-select";

export default function Page() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const url = "Admin";
  const toast = useToast();
  const [Value, setValue] = useState("");
  // const networkOptions = [
  //   { value: "SuperAdmin", label: "Super Admin" },
  //   { value: "Admin", label: "Admin" },
  // ];
  // const handleValueChange = (
  //   selectedOption: any,
  //   setFieldValue: (
  //     field: string,
  //     value: any,
  //     shouldValidate?: boolean | undefined
  //   ) => void
  // ) => {
  //   setFieldValue("Network", selectedOption ? selectedOption.value : "");
  //   setValue(selectedOption);
  // };

  const PersonalDetailsSchema = Yup.object().shape({
    // firstName: Yup.string().required("First name is required"),
    email: Yup.string()
    .required('Email is required')
    .email('Invalid email format')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid email format'
    )
    .test('no-consecutive-dots', 'Invalid email format', (value) => {
      return !/\.{2,}/.test(value || '');
    })
    .test('no-consecutive-at', 'Invalid email format', (value) => {
      return !/@{2,}/.test(value || '');
    })
    .max(254, 'Email must be at most 254 characters long')

  });

  const handleSubmit = async (values: any) => {
    if (values) {
      setLoading(true);
      try {
        const res = await AxiosAuthPost(url, values);
        setLoading(false);
        if (res) {
          toast({
            title: "success",
            description: 'account created successfully',
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "top-left",
          });
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
              name: "",
              email: "",
            }}
            validationSchema={PersonalDetailsSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isValid, dirty, setFieldValue }) => (
              <Form>
                <SimpleGrid column={3} w={"full"} pb={"67px"}>
                  <GridItem colSpan={3} mb={"24px"}>
                    <Text fontSize={"16px"} fontWeight={"700"}>
                      Admin
                    </Text>
                    <Text
                      fontSize={"12px"}
                      fontWeight={"400"}
                      color={"#71717A"}
                    >
                      Add someone and give them a role
                    </Text>
                  </GridItem>

                  <GridItem colSpan={1} width={"90%"}>
                    <FormControl
                      // isInvalid={!!errors.firstName && touched.firstName}
                    >
                      <Field
                        as={Input}
                        type="text"
                        name="name"
                        placeholder="Enter your fullName"
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={1} width={"100%"} mb={"40px"}>
                    <Field
                      as={Input}
                      type="text"
                      name="email"
                      placeholder="Enter your email"
                    />
                  </GridItem>
                  <GridItem colSpan={1} width={"90%"} mb={"40px"} display={'flex'} justifyContent={'end'}>
                    <Button bg={'#0CBF94'} isLoading={loading} type="submit">
                      Add admin
                    </Button>
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