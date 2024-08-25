import {
  Box,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  Input,
  SimpleGrid,
  Text,
  Button,
  HStack,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import { myStyles } from "../Sell/selectrix";
import NotificationBuy from "./NotificationBuy";
import InputReceiverDetails from "./inputReceiverDetails";
import Selectasset from "./Selectassetnaira";
import Selectassetnaira from "./Selectassetnaira";
import SelectassetUSDT from "./SelectassetUSDT";
// import Testing from './testing';
import { IoIosArrowBack } from "react-icons/io";
import ConfirmBuyOrder from "./ConfirmBuyOrder";
import SendMoney from "./SendMoney";
import { AxiosAuthPost, AxiosPost } from "@/app/axios/axios";
import { useRouter } from "next/navigation";
import SuccessBuy from "./success";

export default function GeneralFormPage({
  isOpen,
  onClose,
}: {
  isOpen: any;
  onClose: any;
}) {
  const [Value, setValue] = useState("");
  const [Currentprice, setCurrentprice] = useState("");
  const [Currency, setCurrency] = useState(true);
  const [network, setNetwork] = useState("");
  const [walletaddress, setWalletaddress] = useState("");
  const [asset, setasset] = useState("");
  const [USDT, setUSDT] = useState("");
  const [naira, setnaira] = useState("");
  const [toprice, settoprice] = useState("");
  const [Symbols, setSymbols] = useState("");
  const [Name, setName] = useState("");
  const [Conversion, setConversion] = useState<number | null>(null);
  const [Conversion2, setConversion2] = useState<number | null>(null); // Allow null for initial state
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const toast = useToast();
  const url = "orders/buy";
  const handleclick = () => {
    {
      Currency ? setCurrency(false) : setCurrency(true);
    }
  };
  const Backward = () => {
    setStep((cur: number) => cur - 1);
    step == 1
      ? setNetwork("")
      : step == 2
      ? setnaira("")
      : step == 2
      ? setUSDT("")
      : "";
  };

  const handleProceed = async (values: any) => {
    if (values) {
      setLoading(true);
      try {
        // const res = await AxiosAuthPost(url, values);
        setLoading(false);
        // if (res && res.data) {
        //   const checkoutUrl = res.data.checkout_url;
        //   if (checkoutUrl) {
        // Set the step to 4
        setStep(4);

        // Close the modal and reset inputs after 2000ms
        // setTimeout(() => {
        //   onClose(); // Close the modal
        //   resetInputs(); // Reset all inputs
        //   window.open(checkoutUrl, "_blank"); // Open the new window
        //   // }, 2000); // Adjust the delay time as needed
        // } else {
        //   throw new Error("Checkout URL not found in response.");
        // }
        // }
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

  // Function to reset all input fields
  const resetInputs = () => {
    setValue("");
    setCurrentprice("");
    // setCurrency(true);
    setNetwork("");
    setWalletaddress("");
    setasset("");
    setUSDT("");
    setnaira("");
    settoprice("");
    setSymbols("");
    setName("");
    setConversion(null);
    setConversion2(null);
    setStep(4);
  };

  const handleProceeding = () => {
    setStep((cur: number) => cur + 1);
  };
  // const [scrollBehavior, setScrollBehavior] = React.useState("inside");
  useEffect(() => {
    // console.log('Currentprice:',Currentprice)
    updateNetworkOptions();
  });
  const updateNetworkOptions = () => {
    // console.log('Currentprice:',toprice)
    const currentPrice = parseFloat(toprice);
    // console.log('Currentprice:',Currentprice)
    if (Currency) {
      const nairaValue = parseFloat(naira);
      // console.log('naira:',nairaValue)
      const value = nairaValue / currentPrice;
      // console.log('Currentprice:',value)
      const formattedValue = parseFloat(value.toFixed(13));
      setConversion(formattedValue);
    } else {
      console.log("USDTValue:", USDT);
      const USDTValue = parseFloat(USDT);
      // console.log("USDTValue:", USDTValue);
      // console.log("Currentprice:", currentPrice);
      const value = USDTValue * currentPrice;
      // console.log("Currentprice:", currentPrice);
      const formattedValue = parseFloat(value.toFixed(20));
      setConversion2(formattedValue);
    }
  };

  const initialValues = {
    amountNaira: Currency ? parseFloat(naira) : Conversion2,
    amountBlockchain: Currency ? Conversion : parseFloat(USDT),
    blockchain: Symbols,
    address: walletaddress,
    transactionType: "buy",
  };

  // const validationSchema = Yup.object().shape({
  //   Walletaddress: Yup.string().required("Wallet address is required"),
  //   Network: Yup.string().required("Network is required"),
  //   asset: Yup.string().required("Wallet address is required"),
  //   naira: Yup.number().required("naira is required it cann't be a letter "),
  //   // USDT: Yup.number().required("USDT is required and it cann't be a letter"),
  // });
  const [step, setStep] = useState(1);
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      size={["sm", "sm"]}
    >
      <DrawerOverlay />
      <DrawerContent overflowY="auto">
        <HStack>
          <Box
            cursor={"pointer"}
            onClick={Backward}
            position={"absolute"}
            mt={["45px", "40px"]}
            ml={["15px", "10px"]}
            display={step === 1 ? "none" : "block"}
          >
            <IoIosArrowBack size={"20px"} />
          </Box>
          <DrawerCloseButton />
        </HStack>
        <Box p={4}>
          {step === 1 && (
            <InputReceiverDetails
              setStep={setStep}
              setNetwork={setNetwork}
              setWalletaddress={setWalletaddress}
              setName={setName}
              Network={network}
              settoprice={settoprice}
              setSymbol={setSymbols}
            />
          )}
          {step === 2 &&
            (Currency ? (
              <Selectassetnaira
                setStep={setStep}
                BUY={"Buy in Crypto"}
                handleclick={handleclick}
                setasset={setasset}
                setnaira={setnaira}
                Name={Name}
                setCurrentprice={setCurrentprice}
              />
            ) : (
              <SelectassetUSDT
                setStep={setStep}
                BUY={"Buy in Naira"}
                handleclick={handleclick}
                setasset={setasset}
                setUSDT={setUSDT}
                Name={Name}
                setCurrentprice={setCurrentprice}
                sybl={Symbols}
              />
            ))}
          {step === 3 && (
            <>
              <ConfirmBuyOrder
                setStep={setStep}
                Amount={Currency ? naira : USDT}
                conversion={Currency ? Conversion : Conversion2}
                currency={Currency ? "₦" : Symbols}
                crypto={Name}
                loading={loading}
                sybl={Name}
                nn={Currency}
              />
              <Box justifyContent={"center"}>
                <Formik
                  initialValues={initialValues}
                  // validationSchema={validationSchema}
                  enableReinitialize
                  onSubmit={handleProceed}
                >
                  <Form>
                    <FormControl mb="4" display={"none"}>
                      <FormLabel htmlFor="amountNaira">
                        Amount in Naira
                      </FormLabel>
                      <Field name="amountNaira" as={Input} type="number" />
                      {/* <ErrorMessage name="amountNaira" component={FormErrorMessage} /> */}
                    </FormControl>

                    <FormControl mb="4" display={"none"}>
                      <FormLabel htmlFor="amountBlockchain">
                        Amount in Blockchain
                      </FormLabel>
                      <Field name="amountBlockchain" as={Input} type="number" />
                      {/* <ErrorMessage name="amountBlockchain" component={FormErrorMessage} /> */}
                    </FormControl>

                    <FormControl mb="4" display={"none"}>
                      <FormLabel htmlFor="blockchain">Blockchain</FormLabel>
                      <Field name="blockchain" as={Input} />
                      {/* <ErrorMessage name="blockchain" component={FormErrorMessage} /> */}
                    </FormControl>

                    <FormControl mb="4" display={"none"}>
                      <FormLabel htmlFor="address">Wallet Address</FormLabel>
                      <Field name="address" as={Input} />
                    </FormControl>
                    <Press loading={loading} />
                    {/* <Button type="submit"  colorScheme="teal">
                          Submit
                      </Button> */}
                  </Form>
                </Formik>
              </Box>
            </>
          )}
          {/* {step === 4 && <SendMoney setStep={setStep} />} */}
          {step === 4 && (
            <SendMoney
              setStep={setStep}
              amountUsdt={Currency ? Conversion : USDT}
              amountNaira={Currency ? naira : Conversion2}
              currentcurrency={Symbols}
            />
          )}
          {step === 5 && <SuccessBuy />}
        </Box>
      </DrawerContent>
    </Drawer>
  );
}

export const Press = ({ loading }: { loading: any }) => {
  return (
    <Box w={"full"} justifyContent={"center"} display={"flex"} mt={"-30px"}>
      <Button
        type="submit"
        w={"90%"}
        bg={"#0CBF94"}
        fontSize={"16px"}
        fontWeight={"600"}
        color={"#021D17"}
        isLoading={loading}
        // onClick={handleProceed}>
      >
        Proceed
      </Button>
    </Box>
  );
};
