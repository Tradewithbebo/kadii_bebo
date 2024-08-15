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
  Text,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { IoDocumentOutline } from "react-icons/io5";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { AxiosAuthPost, AxiosAuthPostfile } from "@/app/axios/axios";
import { Console } from "console";

// Yup validation schema
const BvnSchema = Yup.object().shape({
  documentNumber: Yup.string()
    .matches(/^\d+$/, "Must be a number")
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits")
    .required("National ID number is required"),
  document: Yup.mixed()
    .required("A file is required")
    .test(
      "fileSize",
      "File size is too large",
      (value) => !value || (value && (value as File).size <= 5242880) // 5MB
    )
    .test(
      "fileFormat",
      "Unsupported Format",
      (value) =>
        !value ||
        (value &&
          ["application/pdf", "application/msword"].includes(
            (value as File).type
          ))
    ),
});

export default function Bvn() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const toast = useToast();
  const url = "kyc";

  const handleProceed = async (values: any) => {
    if (values) {
      setLoading(true);
      try {
        // Create a new FormData object
        const formData = new FormData();
        formData.append("documentType", values.documentType);
        formData.append("documentNumber", values.documentNumber);
        if (values.document) {
          formData.append("document", values.document);
        }

        const res = await AxiosAuthPostfile(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setLoading(false);
        if (res && res.data) {
        //  console.log( res.data);
          
          Router.push("/createAccount/Login");
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

  const Router = useRouter();
  return (
    <Box w={"full"}>
      <Center pb={["127px", "235px"]}>
        <Formik
          initialValues={{
            documentType: "NIN",
            documentNumber: "",
            document: null,
          }}
          enableReinitialize
          validationSchema={BvnSchema}
          onSubmit={handleProceed}
        >
          {({ setFieldValue, errors, touched, isValid, dirty }) => (
            <Form>
              <SimpleGrid columns={2} rowGap={"24px"} w={["335px", "400px"]}>
                <Box display={'none'}> 
                  <Field
                    as={Input}
                    type="text"
                    name="documentType"
                    placeholder="1245678904"
                  />
                </Box>
                <GridItem colSpan={2}>
                  <FormControl
                    isInvalid={
                      !!errors.documentNumber && touched.documentNumber
                    }
                  >
                    <FormLabel fontSize={"16px"} fontWeight={"600"}>
                      Enter national ID number
                    </FormLabel>
                    <Field
                      as={Input}
                      type="text"
                      name="documentNumber"
                      placeholder="1245678904"
                    />
                    <FormErrorMessage>{errors.documentNumber}</FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2} pt={"28px"}>
                  <FormControl
                    isInvalid={!!errors.document && touched.document}
                  >
                    <FormLabel fontSize={"16px"} fontWeight={"600"}>
                      Upload picture of National ID number
                    </FormLabel>
                    <Input
                      type="file"
                      accept=".pdf, .docx"
                      onChange={(event) => {
                        const file = event.currentTarget.files?.[0];
                        if (file) {
                          // console.log("Selected file:", file);
                          setFieldValue("document", file); // This will update Formik's state
                          setSelectedFile(file);
                        }
                      }}
                      style={{ display: "none" }}
                      id="file-upload"
                    />

                    <FormLabel
                      htmlFor="file-upload"
                      w={"full"}
                      fontSize={"16px"}
                      fontWeight={"600"}
                      border={"2px dashed #CCCCCC"}
                      rounded={"8px"}
                      py={"8px"}
                      textAlign={"center"}
                      cursor={"pointer"}
                    >
                      <HStack justifyContent={"center"}>
                        <IoDocumentOutline color={"#0CBF94"} />
                        <Text
                          color={"#0CBF94"}
                          fontSize={"16px"}
                          fontWeight={"600"}
                        >
                          {selectedFile ? selectedFile.name : "my nin . jpeg"}
                        </Text>
                      </HStack>
                    </FormLabel>
                    {selectedFile ? (
                      <Text mt={2}>File selected: {selectedFile.name}</Text>
                    ) : (
                      <FormErrorMessage>{errors.document}</FormErrorMessage>
                    )}
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
