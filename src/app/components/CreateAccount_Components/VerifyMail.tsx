"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Center,
  GridItem,
  HStack,
  SimpleGrid,
  Text,
  Link,
  Button,
  Input,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form, Field, useFormikContext, FieldProps } from "formik";
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

const AutoSubmitToken = () => {
  const { isValid, dirty } = useFormikContext();
  const [shouldSubmit, setShouldSubmit] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setShouldSubmit(isValid && dirty);
  }, [isValid, dirty]);

  useEffect(() => {
    if (shouldSubmit) {
      const hiddenButton = document.getElementById("hiddenSubmitButton");
      if (hiddenButton) hiddenButton.click();
    }
  }, [shouldSubmit]);

  return null;
};

export default function VerifyMail() {
  const [initialEmail, setInitialEmail] = useState<string | null>(null)
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const toast = useToast()
  const url = "auth/verify-email";
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    const storedEmail = localStorage.getItem("email")
    if (storedEmail) {
      setInitialEmail(storedEmail)
    }
  }, [])

  const handleSubmit = async (values: { pin: string[]; email: string }) => {
    const code = values.pin.join("")
    const email = values.email
    const payload = { email, code }
    console.log("payload", payload)

    setLoading(true)
    try {
      const res = await AxiosPost(url, payload)
      setLoading(false)
      if (res) {
        router.push("/createAccount/Login")
        localStorage.removeItem("email")
      }
    } catch (err: any) {
      setLoading(false)
      let message = "Check your Network and try again."
      if (err.response?.data?.message) {
        message = err.response.data.message
      }
      setErrorMessage(message)
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom-left",
      })
    }
  }

  return (
    <Box w={"full"} pb={["205px", "465px"]}>
      <Center>
        <Formik
         initialValues={{ pin: ["", "", "", "", "", ""], email: initialEmail || "" }}
         validationSchema={VerifyMailSchema}
         onSubmit={handleSubmit}
         enableReinitialize
        >
          {({ errors, touched, setFieldValue, values, isValid, dirty }) => (
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
                  <Link _hover={{ outline: "none" }}>
                    <Text
                      fontSize={["13px", "14px"]}
                      fontWeight={"600"}
                      color={"#0CBF94"}
                    />
                  </Link>
                  {errorMessage && (
                    <Text
                      pt={"10px"}
                      color="red.500"
                      fontSize="sm"
                      fontWeight="400"
                    >
                      {errorMessage}
                    </Text>
                  )}
                </GridItem>
                <GridItem colSpan={6} mb={"40px"} width={"full"}>
                  <HStack gap={["8px", "20px"]}>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <Field key={index} name={`pin[${index}]`}>
                        {({ field }: FieldProps) => (
                          <Input
                            {...field}
                            type="text"
                            ref={(el) => {
                              inputRefs.current[index] = el;
                            }}
                            maxLength={1}
                            value={field.value || ""}
                            onChange={(e) => {
                              const { value } = e.target;
                              if (/^[a-zA-Z0-9]?$/.test(value)) {
                                const pinArray = values.pin.slice();
                                pinArray[index] = value;
                                setFieldValue("pin", pinArray);
                                if (value && index < 5) {
                                  inputRefs.current[index + 1]?.focus();
                                }
                                if (value === "" && index > 0) {
                                  pinArray[index] = value;
                                  setFieldValue("pin", pinArray);
                                  inputRefs.current[index - 1]?.focus();
                                }
                              }
                            }}
                            size="lg"
                            width="50px"
                            height="50px"
                            textAlign="center"
                            borderColor={
                              errors.pin && touched.pin && errors.pin[index]
                                ? "red.500"
                                : "gray.200"
                            }
                            _focus={{
                              borderColor:
                                errors.pin && touched.pin && errors.pin[index]
                                  ? "red.500"
                                  : "blue.500",
                            }}
                          />
                        )}
                      </Field>
                    ))}
                  </HStack>
                </GridItem>
                <GridItem colSpan={6} mb={"0px"}>
                  <Button
                    id="hiddenSubmitButton"
                    type="submit"
                    display={"none"}
                    colorScheme="teal"
                    size="xm"
                    mt={"4px"}
                    isDisabled={!isValid || !dirty}
                    h={['50px','50px','44px']}
                  >
                    Submit
                  </Button>
                </GridItem>
              </SimpleGrid>
              <Box position={"absolute"}>
                {" "}
                <AutoSubmitToken />
              </Box>
            </Form>
          )}
        </Formik>
      </Center>
      <Box ml={["30px", "45px"]}>
        <ResendMail />
      </Box>
    </Box>
  );
}
