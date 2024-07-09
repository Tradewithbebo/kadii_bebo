"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Center,
  GridItem,
  HStack,
  PinInput,
  PinInputField,
  SimpleGrid,
  Text,
  Link,
  Button,
  Input,
  useToast,
} from "@chakra-ui/react";
import { Formik, useField, Form, useFormikContext, FieldArray, Field } from "formik";
import * as Yup from "yup";
import { AxiosPost } from "@/app/axios/axios";
import ResendMail from "./ResendMail";

const VerifyMailSchema = Yup.object().shape({
  pin: Yup.array()
    .of(
      Yup.string()
        .matches(/^[a-zA-Z0-9]$/, "Must be a letter or a number")
        .test("len", "Must be exactly 1 character", (val) => val?.length === 1)
        .required("Required")
    )
    .length(6, "Must be exactly 6 characters"),
});

interface CustomPinInputFieldProps {
  name: string;
}

const CustomPinInputField: React.FC<CustomPinInputFieldProps> = ({
  name,
  ...props
}) => {
  const [field, meta] = useField(name);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (/^[a-zA-Z0-9]?$/.test(value)) {
      field.onChange(e);
    }
  };

  return (
    <PinInputField
      {...field}
      {...props}
      value={field.value || ""}
      onChange={handleInputChange}
      borderColor={meta.error && meta.touched ? "red.500" : "gray.200"}
      _focus={{
        borderColor: meta.error && meta.touched ? "red.500" : "blue.500",
      }}
    />
  );
};

const AutoSubmitToken = () => {
  const { values, isValid, dirty } = useFormikContext();
  const [shouldSubmit, setShouldSubmit] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isValid && dirty) {
      setShouldSubmit(true);
    } else {
      setShouldSubmit(false);
    }
  }, [isValid, dirty]);

  useEffect(() => {
    if (shouldSubmit === true) {
      const hiddenButton = document.getElementById("hiddenSubmitButton");
      if (hiddenButton) {
        hiddenButton.click();
      }
    }
  }, [shouldSubmit]);

  return null;
};

export default function VerifyMail() {
  const [initialEmail, setInitialEmail] = useState<string | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const toast = useToast();
  const url = "auth/verify-email";

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setInitialEmail(storedEmail);
    }
  }, []);

  const handleSubmit = async (values: any) => {
    if (values) {
      setLoading(true);
      try {
        const res = await AxiosPost(url, values);
        setLoading(false);
        if (res) {
          router.push("/createAccount/Login");
          localStorage.removeItem("email");
        }
      } catch (err: any) {
        setLoading(false);
        let message = "Check your Network and try again.";
        if (err.response && err.response.data && err.response.data.message) {
          message = err.response.data.message;
        }
        setErrorMessage(message = err.response.data.message ? 'Invalid verification code' : message);
        toast({
          title: "Error",
          description: message,
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    }
  }

  return (
    <Box w={"full"}   pb={["205px", "465px"]}>
      <Center>
        <Formik
          initialValues={{ pin: ["", "", "", "", "", ""], email: initialEmail }}
          validationSchema={VerifyMailSchema}
          enableReinitialize
          onSubmit={(values) => {
            { initialEmail !== null && handleSubmit(values) }
          }}
        >
          {({ errors, touched, setFieldValue, isValid, dirty }) => (
            <Form id="verifyMailForm">
              <SimpleGrid
                columns={6}
                w={["335px", "400px"]}
                columnGap={["8px", "8px"]}
              
              >
                <GridItem colSpan={6}>
                  <Text
                    fontSize={["32px", "40px"]}
                    fontWeight={"600"}
                    mb={"24px"}
                  >
                    Verify your email
                  </Text>
                </GridItem>
                <GridItem colSpan={6}>
                  <Field
                    as={Input}
                    type="hidden"
                    name="email"
                    placeholder={initialEmail ?? "Your email"}
                  />
                </GridItem>
                <GridItem colSpan={6}>
                  <Text fontSize={["12px", "14px"]} fontWeight={"600"}>
                    <span style={{ color: "#666666" }}>
                      Enter the verification code sent to
                    </span>{" "}
                    {initialEmail}.
                  </Text>
                </GridItem>
                <GridItem colSpan={6} mb={"40px"}>
                  <Link
                    _hover={{
                      outline: "none",
                    }}
                  >
                    <Text
                      fontSize={["13px", "14px"]}
                      fontWeight={"600"}
                      color={"#0CBF94"}
                    >
                    </Text>
                  </Link>
                  {errorMessage && (
                    <Text pt={'10px'}
                      color="red.500"
                      fontSize="sm"
                      fontWeight="400"
                    >
                      {errorMessage}
                    </Text>
                  )}
                </GridItem>
                <GridItem colSpan={6} mb={"40px"}>
                  <FieldArray name="pin">
                    {({ form }) => (
                      <HStack gap={["8px", "22px"]}>
                        <PinInput
                          placeholder=""
                          size="lg"
                          value={form.values.pin.join("")}
                          onChange={(value) => {
                            const pins = value.split("");
                            pins.forEach((pin, index) =>
                              setFieldValue(`pin[${index}]`, pin)
                            );
                          }}
                        >
                          {form.values.pin.map(
                            (_: any, index: React.Key | null | undefined) => (
                              <CustomPinInputField
                                key={index}
                                name={`pin[${index}]`}
                              />
                            )
                          )}
                        </PinInput>
                      </HStack>
                    )}
                  </FieldArray>
                </GridItem>
                <GridItem colSpan={6} mb={"0px"}>
                  <Button
                    id="hiddenSubmitButton"
                    type="submit"
                    display={"none"}
                    colorScheme="teal"
                    size="xm"
                    mt={'4px'}
                    isDisabled={!isValid || !dirty}
                  >
                    Submit
                  </Button>
                </GridItem>
              </SimpleGrid>
             <Box position={'absolute'}> <AutoSubmitToken /></Box>
            </Form>
          )}
        </Formik>
        
      </Center>
      <Box ml={['30px','45px']}><ResendMail /></Box>
    </Box>
  );
}
