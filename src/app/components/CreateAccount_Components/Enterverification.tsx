'use client';

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  GridItem,
  HStack,
  Link,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Formik, Field, Form, FieldProps } from "formik";
import * as Yup from "yup";
import Resendmailforgotpass from "./Resendmailforgotpass";

const CreatePasswordSchema = Yup.object().shape({
  pin: Yup.array()
    .of(
      Yup.string()
        .matches(/^[a-zA-Z0-9]$/, "Must be a letter or a number")
        .test("len", "Must be exactly 1 character", (val) => val?.length === 1)
        .required("Required")
    )
    .length(6, "Must be exactly 6 characters"),
});

export default function EnterVerification({
  setStep,
  setPin,
}: {
  setStep: any;
  setPin: any;
}) {
  const [initialEmail, setInitialEmail] = useState<string | null>(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setInitialEmail(storedEmail);
    }
  }, []);

  return (
    <Box w={"full"} pb={["192px", "374px"]}>
      <Center>
        <Formik
          initialValues={{ pin: ["", "", "", "", "", ""] }}
          validationSchema={CreatePasswordSchema}
          onSubmit={(values) => {
            setPin(values.pin.join('')); // Convert array to string
            setStep(2);
          }}
        >
          {({ errors, touched, setFieldValue, isValid, dirty, values }) => (
            <Form>
              <SimpleGrid
                columns={6}
                w={["335px", "400px"]}
                columnGap={["8px", "8px"]}
                px={["10px", "0px"]}
              >
                <GridItem colSpan={6}>
                  <Text fontSize={["30px", "39px"]} fontWeight={"600"} mb={"24px"}>
                    Enter verification code
                  </Text>
                </GridItem>

                <GridItem colSpan={6}>
                  <Text fontSize={["13px", "14px"]} fontWeight={"600"}>
                    Enter the verification code sent to {initialEmail}.
                  </Text>
                </GridItem>
                <GridItem colSpan={6} mb={"40px"}>
                  <Link _hover={{ outline: "none" }}>
                    <Text fontSize={["13px", "14px"]} fontWeight={"600"} color={"#0CBF94"}>
                      Not my email
                    </Text>
                  </Link>
                </GridItem>

                <GridItem colSpan={6} width={"full"}>
                  <HStack gap={["8px", "20px"]}>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <Field key={index} name={`pin[${index}]`}>
                        {({ field }: FieldProps) => (
                          <Input
                            {...field}
                            type="text"
                            maxLength={1}
                            value={field.value || ""}
                            onChange={(e) => {
                              const { value } = e.target;
                              if (/^[a-zA-Z0-9]?$/.test(value)) {
                                const pinArray = values.pin.slice();
                                pinArray[index] = value;
                                setFieldValue("pin", pinArray);
                              }
                            }}
                            size="lg"
                            width="50px"
                            height="50px"
                            textAlign="center"
                            borderColor={errors.pin && touched.pin && errors.pin[index] ? "red.500" : "gray.200"}
                            _focus={{
                              borderColor: errors.pin && touched.pin && errors.pin[index] ? "red.500" : "blue.500",
                            }}
                          />
                        )}
                      </Field>
                    ))}
                  </HStack>
                </GridItem>
                <GridItem colSpan={6} mb={"16px"} mt={"16px"}>
                  <Button
                    type="submit"
                    w={"full"}
                    bg={isValid ? "#0CBF94" : "gray.400"}
                    fontSize={"16px"}
                    fontWeight={"600"}
                    mt={"28px"}
                    color={isValid ? "#021D17" : "gray.600"}
                    isDisabled={!isValid || !dirty}
                    _hover={{
                      bg: isValid ? "#0CBF94" : "gray.400",
                    }}
                  >
                    Continue
                  </Button>
                </GridItem>
              </SimpleGrid>
            </Form>
          )}
        </Formik>
      </Center>
      <Box ml={"45px"}>
        <Resendmailforgotpass />
      </Box>
    </Box>
  );
}
