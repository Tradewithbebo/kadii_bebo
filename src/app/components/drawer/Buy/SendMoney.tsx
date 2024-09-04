"use client";

import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  HStack,
  Input,
  SimpleGrid,
  Text,
  useToast,
  VStack,
  // useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ConfirmBuy, ConfirmBuyAlert } from "./NotificationBuy";
import { IoCopyOutline, IoDocumentOutline } from "react-icons/io5";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { AxiosAuthPatchfile, AxiosAuthPostfile } from "@/app/axios/axios";

export default function SendMoney({
  setStep,
  amountNaira,
  amountUsdt,
  currentcurrency,
  transactionId
}: {
  setStep: any;
  amountUsdt: any;
  amountNaira: any;
  currentcurrency: any;
  transactionId:any
}) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const id=transactionId
  // const toast = useToast();
  const url = `transactions/${id}/upload-reference`;
 
  const handleProceed = async (values: any) => {
    if (values.paymentReference) {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("paymentReference", values.paymentReference);
  
        const res = await AxiosAuthPatchfile(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        setLoading(false);
        if (res && res.data) {
          setStep(5);
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
  const validationSchema = Yup.object().shape({
    paymentReference: Yup.mixed()
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const toast = useToast();
  // const [Wallet, setWallet] = useState(
  //   "0xy83929ruhdi23uhbd92bf9g2bjbfbfvxtyuv..."
  // );

  // const handleCopy = (text: string) => {
  //   navigator.clipboard
  //     .writeText(text)
  //     .then(() => {
  //       toast({
  //         title: "Copied to clipboard.",
  //         description: `Copied: ${text}`,
  //         status: "success",
  //         duration: 2000,
  //         isClosable: true,
  //         position: "top-right",
  //       });
  //     })
  //     .catch((err) => {
  //       console.error("Could not copy text: ", err);
  //     });
  // };

  return (
    <Box p={4}>
      <Formik
        initialValues={{ paymentReference: null}}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(values) => {
          handleProceed(values);
        }}
      >
        {({ isSubmitting, setFieldValue, errors, touched }) => (
          <Form>
            <SimpleGrid columns={1}>
              <GridItem colSpan={1}>
                <Text fontWeight="600" fontSize="25px">
                  Send money
                </Text>
              </GridItem>
              <GridItem colSpan={1} mt="18px">
                <Text fontWeight="600" fontSize="15px" color="#666666">
                  Send funds to the account details below
                </Text>
              </GridItem>

              <GridItem mt="40px">
                <ConfirmBuyAlert />
              </GridItem>
              <GridItem colSpan={1} mt="28px">
                <SimpleGrid
                  columns={2}
                  bg="#F8F8F8"
                  px="16px"
                  py="24px"
                  rounded="10px"
                >
                  <GridItem colSpan={2}>
                    <Text fontSize="16px" fontWeight="600" color="#021D17">
                      Send only ₦ {amountNaira} for {amountUsdt}{" "}
                      {currentcurrency} to the account details below :
                    </Text>
                  </GridItem>
                  <GridItem colSpan={1} mt="45px">
                    <Text fontSize="16px" fontWeight="600" color="#808080">
                      Account name
                    </Text>
                  </GridItem>
                  <GridItem
                    colSpan={1}
                    width="full"
                    justifyContent="end"
                    display="flex"
                    mt="45px"
                  >
                    <Text fontSize="16px" fontWeight="600" color="#808080">
                      Account number
                    </Text>
                  </GridItem>
                  <GridItem colSpan={1} mt="12px">
                    <Text fontSize="16px" fontWeight="600" color="#021D17">
                      Bebo cryptocurrency limited (ltd)
                    </Text>
                  </GridItem>
                  <GridItem
                    colSpan={1}
                    width="full"
                    justifyContent="end"
                    display="flex"
                    mt="12px"
                  >
                    <Text fontSize="16px" fontWeight="600" color="#021D17">
                      0163568964
                    </Text>
                  </GridItem>
                  <GridItem colSpan={2} mt="28px">
                    <Text fontSize="16px" fontWeight="600" color="#808080">
                      Bank Name
                    </Text>
                  </GridItem>
                  <GridItem colSpan={2} mt="12px">
                    <Text fontSize="16px" fontWeight="600" color="#021D17">
                      GTbank
                    </Text>
                  </GridItem>
                </SimpleGrid>
              </GridItem>

              <GridItem colSpan={1} mt="28px">
                <SimpleGrid
                  overflow="hidden"
                  columns={2}
                  bg="#F8F8F8"
                  px="16px"
                  py="24px"
                  rounded="10px"
                >
                  <GridItem colSpan={2}>
                    <Text fontSize="16px" fontWeight="600" color="#021D17">
                      Please submit proof :
                    </Text>
                  </GridItem>
                  <GridItem
                    colSpan={2}
                    width="full"
                    justifyContent="start"
                    display="flex"
                    mt="45px"
                  >
                    <Text fontSize="16px" fontWeight="600" color="#808080">
                      Proof of Payment
                    </Text>
                  </GridItem>
                  <GridItem colSpan={2} mt="12px">
                    <VStack spacing={4} align="flex-start">
                      <FormControl
                        isInvalid={!!errors.paymentReference && touched.paymentReference}
                      >
                        {/* <FormLabel fontSize={"16px"} fontWeight={"600"}>
                      Upload picture of National ID number
                    </FormLabel> */}
                        <Input
                          type="file"
                          accept=".pdf, .docx"
                          onChange={(event) => {
                            const file = event.currentTarget.files?.[0];
                            if (file) {
                              // console.log("Selected file:", file);
                              setFieldValue("paymentReference", file); // This will update Formik's state
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
                              {selectedFile
                                ? selectedFile.name
                                : "proof of payment . jpeg"}
                            </Text>
                          </HStack>
                        </FormLabel>
                        {selectedFile ? (
                          <Text mt={2}>File selected: {selectedFile.name}</Text>
                        ) : (
                          <FormErrorMessage>{errors.paymentReference}</FormErrorMessage>
                        )}
                      </FormControl>
                      {/* <Field
                      as={Input}
                      h={["50px", "50px", "44px"]}
                      type="text"
                      id={"transactionId"}
                      name={"transactionId"}
                      placeholder={transactionId.toString()}
                      value={transactionId}
                     
                    /> */}
                    </VStack>
                  </GridItem>

                  <GridItem colSpan={2} mt="28px">
                    <Text fontSize="16px" fontWeight="600" color="#808080">
                      Network
                    </Text>
                  </GridItem>
                  <GridItem colSpan={2} mt="12px">
                    <Text fontSize="16px" fontWeight="600" color="#021D17">
                      {currentcurrency.toUpperCase()}
                    </Text>
                  </GridItem>
                </SimpleGrid>
              </GridItem>

              <GridItem colSpan={1} mt="28px">
                <Button
                  // onClick={handleProceed}
                  type="submit"
                  w="full"
                  bg="#0CBF94"
                  fontSize="16px"
                  fontWeight="600"
                  color="#021D17"
                  h={['50px','50px','44px']}
                >
                  I have paid
                </Button>
              </GridItem>
            </SimpleGrid>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
