"use client";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
  useDisclosure,
  ChakraProvider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  SimpleGrid,
  GridItem,
  FormControl,
  FormLabel,
  VStack,
  Box,
  Text,
  FormErrorMessage,
  HStack,
  Image,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useDebounce, useDebouncedCallback } from "use-debounce";
import { Formik, Form, Field, useFormik } from "formik";
import { GrStatusGood } from "react-icons/gr";
import React, { useEffect, useState } from "react";
import { myStyles } from "./selectrix";
import bankName from "./listBanks";
import Select from "react-select";
import { AxiosAuthPost, AxiosGet } from "@/app/axios/axios";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import * as Yup from "yup";
const validationSchema = Yup.object({
  // accountName: Yup.string()
  //   .required('Account Name is required')
  //   .min(2, 'Account Name must be at least 2 characters long'),
  accountNumber: Yup.string()
    .required("Account Number is required")
    .min(10, "Account Number must be at least 11 characters long") // Adjust length based on your needs
    .matches(/^\d+$/, "Account Number must be digits only"),
  bankCode: Yup.string().required("Bank Code is required"),
});
export default function AddBank({ setStep }: { setStep: any }) {
  const toast = useToast();
  const [message, setmessage] = useState("");
  const [Value, setValue] = useState("");
  const [Banks, setBanks] = useState([]);
  const [Banksno, setBanksno] = useState("");
  const [BanksName, setBankName] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [accountNo, setAccountNo] = useState<string>("");
  const handleValueChange = (selectedOption: any, setFieldValue: any) => {
    setFieldValue("accountName", selectedOption ? selectedOption.value : "");
    setValue(selectedOption);
    setBanksno(selectedOption ? selectedOption.code : "");
  };
  const handleAccountNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const inputValue = event.target.value;
    setFieldValue("accountNumber", inputValue);
    setAccountNo(inputValue);
    
    // Reset bank name when account number changes
    if (BanksName) {
      setBankName(""); // Clear the bank name when account number changes
    }
  };
  
  const url = "banks";
  const bankCode = Banksno;
  // const [accountNumber] = useDebounce(accountNo, 500);
  const accountNumber = accountNo;
  // const url2 = `banks/accounts/verify/${bankCode}/${accountNumber}`;
  useEffect(() => {
    if (accountNumber.length === 10) {
      const newUrl2 = `banks/accounts/verify/${bankCode}/${accountNumber}`;
      // console.log('url',newUrl2)
      // setUrl2(newUrl2);
      handleSave(newUrl2);
    }
  }, [accountNumber, bankCode]);
  const handleSave = async (url2: any) => {
    try {
      setLoading2(true);
      const res = await AxiosGet(url2);
      if (res) {
        // console.log('url',res.data.accountName)
        setLoading2(false);
        setBankName(res.data.accountName);
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
        position: "bottom-right",
        size: "sm",
      });
    }
  };

  const BanksOptions = (data: any) => {
    const updatedOptions = data.map((item: any) => ({
      value: item.name,
      label: <Text>{item.name}</Text>,

      code: item.code,
      name: item.name,
    }));
    setBanks(updatedOptions);
  };
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined = undefined; // Typing timeoutId as NodeJS.Timeout
    const fetchData = async () => {
      const success = await getBanks();
      if (!success) {
        setTimeout(fetchData, 2000); // Retry after 2 seconds if failed
      }
    };

    fetchData(); // Initial call
    return () => {
      // Cleanup function to clear the timeout if it was set
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  const getBanks = async () => {
    setLoading(true);
    try {
      const res = await AxiosGet(url);
      setLoading(false);
      if (res) {
        // console.log(res.data);
        BanksOptions(res.data);
        setLoading(false);
        setErrorMessage(""); // Clear error message on success
        return true;
      }
    } catch (err: any) {
      setLoading(false);
      let message = "Check your Network and try again.";
      if (err.response && err.response.data && err.response.data.message) {
        message = err.response.data.message;
      }
      setErrorMessage(message);
    }
  };

  const initialValues = {
    accountName: BanksName,
    accountNumber: accountNumber,
    bankCode: Banksno,
  };

  const url3 = "banks/accounts";
  const addBank = async (values: any) => {
    try {
      const res = await AxiosAuthPost(url3, values); // Pass form values to the API call
      if (res) {
        toast({
          title: "Error",
          description: "Bank added successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "bottom-right",
          size: "sm",
        });
        // Handle success response here
        // console.log("Bank added successfully:", res.data);
        setStep(1);
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
        position: "bottom-right",
        size: "sm",
      });
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(values) => {
          // console.log("Form values:", values);
          addBank(values);
        }}
      >
        {({ errors, touched, isValid, setFieldValue }) => (
          <Form>
            <Box p={4}>
              <SimpleGrid columns={2} rowGap={"28px"}>
                <GridItem colSpan={2}>
                  <Text fontWeight="600" fontSize="25px">
                    Add bank details
                  </Text>
                </GridItem>
                <GridItem colSpan={2} mt={"-10px"}>
                  <Text
                    fontWeight="600"
                    fontSize={["15px", "15px"]}
                    color="#666666"
                  >
                    Add your preferred bank for instant payout
                  </Text>
                </GridItem>
                <GridItem colSpan={2}>
                  <FormControl
                    isInvalid={!!errors.accountName && touched.accountName}
                  >
                    <Field
                      as={Select}
                      id="accountName"
                      name="accountName"
                      options={Banks}
                      isSearchable
                      isLoading={loading}
                      placeholder="Select bank"
                      value={Value}
                      noOptionsMessage={() => errorMessage}
                      onChange={(selectedOption: any) => {
                        handleValueChange(selectedOption, setFieldValue);
                      }}
                      styles={{
                        control: (provided: any) => ({
                          ...provided,
                          height: "50px", // Default for mobile screens
                          [`@media (min-width: 768px)`]: {
                            height: "50px", // Medium screens
                          },
                          [`@media (min-width: 992px)`]: {
                            height: "44px", // Large screens
                          },
                        }),
                      }}
                    />
                    {errors.accountName && touched.accountName && (
                      <FormErrorMessage color={"Crimson"}>
                        {errors.accountName}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                  <FormControl
                    isInvalid={!!errors.accountNumber && touched.accountNumber}
                  >
                    <FormLabel fontSize={"16px"} fontWeight={"600"}>
                      Account number
                    </FormLabel>
                    <Field
                      h={["50px", "50px", "44px"]}
                      as={Input}
                      id="accountNumber"
                      type="text"
                      placeholder="Enter account number"
                      name="accountNumber"
                      onChange={(event: any) =>
                        handleAccountNumberChange(event, setFieldValue)
                      }
                    />

                    <FormErrorMessage color={"Crimson"}>
                      {errors.accountNumber}
                    </FormErrorMessage>
                  </FormControl>
                  <Box
                    mt={"8px"}
                    w={"fit-content"}
                    bg={
                      BanksName.length === 0
                        ? "white"
                        : loading
                        ? "white"
                        : "#E7F6EC"
                    }
                    p={"5px"}
                    borderRadius={"5px"}
                  >
                    {loading2 ? (
                      <Spinner color="#E7F6EC" />
                    ) : (
                      <HStack>
                        {BanksName.length === 0 ? (
                          ""
                        ) : (
                          <IoIosCheckmarkCircleOutline
                            color={"#0F973D"}
                            size={"20px"}
                          />
                        )}
                        <Text
                          fontSize={"14px"}
                          fontWeight={"600"}
                          color={"#0F973D"}
                        >
                          {BanksName}
                        </Text>
                      </HStack>
                    )}
                  </Box>
                </GridItem>

                <GridItem colSpan={2}>
                  <Button
                    h={["50px", "50px", "44px"]}
                    bg="#0CBF94"
                    w={"full"}
                    color={"#021D17"}
                    fontSize={"16px"}
                    fontWeight={"600"}
                    type="submit"
                    isDisabled={!isValid || BanksName.length === 0}
                  >
                    Save bank account
                  </Button>
                </GridItem>
              </SimpleGrid>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
}
