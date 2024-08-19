"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  GridItem,
  HStack,
  PinInput,
  PinInputField,
  SimpleGrid,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { AxiosPost } from "@/app/axios/axios";

const ConfirmPasswordSchema = Yup.object().shape({
  confirmPin: Yup.string()
    .oneOf([Yup.ref("newPin")], "Passwords must match")
    .required("Required"),
});

export default function ConfirmPin({
  password,
  setStep,
}: {
  password: any;
  setStep: any;
}) {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const url = "auth/set-pin";

  const handleSubmit = async (values: any) => {
    if (values) {
      setLoading(true);
      try {
        const res = await AxiosPost(url, values);
        setLoading(false);
        if (res) {
          toast({
            title: "success",
            description: "pin successfully created",
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "top-left",
          });
          router.push("/");
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
    <Box w={"full"}>
      <Center>
        <Formik
          initialValues={{ newPin: password, confirmPin: "" }}
          validationSchema={ConfirmPasswordSchema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {({ errors, touched, setFieldValue, isValid, dirty, values }) => (
            <Form>
              <SimpleGrid
                columns={6}
                w={["335px", "400px"]}
                columnGap={["8px", "8px"]}
                pb={["192px", "440px"]}
                px={["10px", "0px"]}
              >
                <GridItem colSpan={6}>
                  <Text
                    fontSize={["32px", "40px"]}
                    fontWeight={"600"}
                    mb={"24px"}
                  >
                    Confirm Pin
                  </Text>
                </GridItem>
                <GridItem colSpan={6}>
                  <Text
                    fontSize={["13px", "14px"]}
                    fontWeight={"600"}
                    mb={"40px"}
                    color={"#666666"}
                  >
                    Confirm your 6-character alphanumeric password
                  </Text>
                </GridItem>
                <GridItem colSpan={6} width={"full"}>
                  <FormControl
                    isInvalid={!!errors.confirmPin && touched.confirmPin}
                  >
                    <HStack gap={["8px", "22px"]}>
                      <PinInput
                        placeholder=""
                        size="lg"
                        value={values.confirmPin}
                        onChange={(value) => setFieldValue("confirmPin", value)}
                      >
                        {Array.from({ length: 6 }).map((_, index) => (
                          <PinInputField
                            key={index}
                            name={`confirmPin.${index}`}
                          />
                        ))}
                      </PinInput>
                    </HStack>
                    <Text
                      color="red.500"
                      // ml={2}
                      cursor={"pointer"}
                      fontSize="sm"
                      onClick={() => setStep(1)}
                      fontWeight="400"
                    >
                      {!isValid
                        ? "passwords must match click to return and createpin"
                        : ""}
                    </Text>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={6} mb={"40px"}>
                  <Button
                    isLoading={loading}
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
                    Confirm
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
