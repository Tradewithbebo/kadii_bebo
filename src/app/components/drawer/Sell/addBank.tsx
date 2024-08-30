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
  Image
} from "@chakra-ui/react";
import { Formik, Form, Field, useFormik } from "formik";
import { GrStatusGood } from "react-icons/gr";
import React, { useEffect, useState } from "react";
import { myStyles } from "./selectrix";
import bankName from "./listBanks";
import Select from "react-select";
import { AxiosAuthPost, AxiosGet } from "@/app/axios/axios";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

export default function AddBank({setStep}:{setStep:any}) {
  const [message, setmessage] = useState("");
  const [Value, setValue] = useState("");
  const [Banks, setBanks] = useState([]);
  const [Banksno, setBanksno] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [accountNo, setAccountNo] = useState<string>('');
  const handleValueChange = (selectedOption: any, setFieldValue: any) => {
    setFieldValue("Bank", selectedOption ? selectedOption.value : "");
    setValue(selectedOption);
    setBanksno(selectedOption ? selectedOption.code:"");
  };
  const handleAccountNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const inputValue = event.target.value;
    setFieldValue("accountnumber", inputValue); // Set Formik's account number value
    setAccountNo(inputValue);
  
  };
  useEffect(()=>{
    handleSave()
  })
  const handleSave = () => {
    const url2 = `banks/accounts/verify/${bankCode}/${accountNumber}`;
    console.log('url:',url2);
    // You can now use `url2` as needed, such as making an API call.
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
    let timeoutId: NodeJS.Timeout | undefined = undefined;// Typing timeoutId as NodeJS.Timeout
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
  const url = "banks";
  const bankCode=Banksno
  const accountNumber=accountNo
  const url2 = `banks/accounts/verify/${bankCode}/${accountNumber}`;

  const getBanksName = async () => {
    setLoading(true);
    try {
      const res = await AxiosAuthPost(url2,{});
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
    Bank: "",
    accountnumber: "",
    accountname: "",
  };
const handleSubmit=()=>{
  setStep(1)
}
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={() => {
          handleSubmit();
        }}
      >
        {({
          errors,
          touched,
          isValid,
          setFieldValue,
        }) => (
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
                    fontSize={["11px", "15px"]}
                    color="#666666"
                  >
                    Add your preferred bank for instant payout
                  </Text>
                </GridItem>
                <GridItem colSpan={2}>
                  <FormControl isInvalid={!!errors.Bank && touched.Bank}>
                    <Field
                      as={Select}
                      id="Bank"
                      name="Bank"
                      options={Banks}
                      isSearchable
                      isLoading={loading}
                      placeholder="Select bank"
                      value={Value}
                      noOptionsMessage={() => errorMessage}
                      onChange={(selectedOption:any) => {
                        handleValueChange(selectedOption, setFieldValue);
                      }}
                      styles={{
                        control: (provided:any) => ({
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
                    {errors.Bank && touched.Bank && (
                      <FormErrorMessage color={"Crimson"}>
                        {errors.Bank}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                  <FormControl
                    isInvalid={!!errors.accountnumber && touched.accountnumber}
                  >
                    <FormLabel fontSize={"16px"} fontWeight={"600"}>
                      Account number
                    </FormLabel>
                    <Field
                      h={["50px", "50px", "44px"]}
                      as={Input}
                      id="accountnumber"
                      type="text"
                      placeholder="Enter account number"
                      name="accountnumber"
                      onChange={(event:any) =>
                        handleAccountNumberChange(event, setFieldValue)
                      }
                    />
                    <FormErrorMessage color={"Crimson"}>
                      {errors.accountnumber}
                    </FormErrorMessage>
                  </FormControl>
                  <Box
                    mt={"8px"}
                    w={"fit-content"}
                    bg={"#E7F6EC"}
                    p={"5px"}
                    borderRadius={"5px"}
                  >
                    <HStack>
                      <IoIosCheckmarkCircleOutline
                        color={"#0F973D"}
                        size={"20px"}
                      />
                      <Text
                        fontSize={"14px"}
                        fontWeight={"600"}
                        color={"#0F973D"}
                      >
                        OSHODI DAVID OLUWATOBI
                      </Text>
                    </HStack>
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
                    isDisabled={!isValid}
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
