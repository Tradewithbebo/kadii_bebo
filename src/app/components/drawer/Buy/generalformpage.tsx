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
  DrawerFooter,
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
import { AxiosAuthPost, AxiosGet, AxiosPost } from "@/app/axios/axios";
import { useRouter } from "next/navigation";
import SuccessBuy from "./success";
import { useCryptoContext } from "./usecontextbuy";

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
  // const [network, setNetwork] = useState("");
  const [walletaddress, setWalletaddress] = useState("");
  const [asset, setasset] = useState("");
  const [USDT, setUSDT] = useState("");
  const [naira, setnaira] = useState("");
  const [transactionId, settransactionid] = useState("");
  // const [toprice, settoprice] = useState("");
  // const [Symbols, setSymbols] = useState("");
  // const [Name, setName] = useState("");
   // Allow null for initial state
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const toast = useToast();
  const url = "transactions/create";
  // const [currentsImage, setcurrentsImage] = useState('');
  // const [currentsName, setcurrentsName] = useState('');
  const {
    Symbols,
    setNetwork,
    setSymbols,
    setName,
    settoprice,
    toprice,
    setcurrentsImage,
    setcurrentsName,
    network,
    currentsImage,
    currentsName,
    Name,
    Conversion,
        setConversion,
        setConversion2,
        Conversion2,
    
  } = useCryptoContext();

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
  const url2 = "wallet/assets";
  const [errorMessage2, setErrorMessage2] = useState("");
  const getUpdatedPrice = async (
  ): Promise<boolean> => {
    try {
      const res = await AxiosGet(url2);
      console.log('update',res.data);
      if (res) { // Check if the request was successful
        const updatedNetwork = res.data.find(
          (network: any) => network.name === currentsName
        );
  
        // console.log('updatedNetwork',updatedNetwork);
        // console.log('selectedsellNetwork',selectedsellNetwork);
        if (updatedNetwork && toprice) {
          // Check if the price has changed
          if (updatedNetwork.current_price !== toprice) {
            // Show toast if price has changed
            toast({
              title: "Rate Updated",
              description: `${toprice}'s rate is now ${updatedNetwork.current_price}`,
              status: "success",
              duration: 5000,
              isClosable: true,
              position:"top-left"
            });
  
            // Update sell rate and selected network price
            settoprice(updatedNetwork.current_price);
          
          }
          return true; // Return true for a successful update
        }
      }
      return false; // Return false if no matching network or no update occurred
    } catch (err: any) {
      console.log("Error updating price:", err);
      setErrorMessage2("Failed to update rate. Please try again.");
      return false; // Return false on error
    }
  };
  
  // useEffect(() => {
  //   let timeoutId: NodeJS.Timeout | undefined;
  //   let intervalId: NodeJS.Timeout | undefined;
  
  //   const fetchData = async () => {
  //     if (toprice && currentsName !== "") {
  //       const success = await getUpdatedPrice();
        
  //       if (!success) {
  //         // Retry after 2 seconds if the fetch failed
  //         timeoutId = setTimeout(fetchData, 300000);
  //       }
  //     }
  //   };
  
  //   if (toprice && currentsName !== "") {
  //     fetchData(); // Trigger fetch immediately when selectedsellNetwork is set
  
  //     intervalId = setInterval(() => {
  //       fetchData();  // Fetch the updated price every 3 seconds
  //     }, 300000);  // Set a more reasonable interval (e.g., 3 seconds)
  //   }
  
  //   // Cleanup both interval and timeout when component unmounts or when selectedsellNetwork changes
  //   return () => {
  //     if (intervalId) clearInterval(intervalId); // Cleanup interval
  //     if (timeoutId) clearTimeout(timeoutId);    // Cleanup retry timeout
  //   };
  
  // }, [toprice]);
  // Re-run when selectedsellNetwork changes
  

  const handleProceed = async (values: any) => {
    if (values) {
      setLoading(true);
      try {
        const res = await AxiosAuthPost(url, values);
        setLoading(false);
        if (res && res.data) {
          const Id = res.data._id;
        
          if (Id) {
            settransactionid(Id)
        setStep(4);
       
        } else {
          throw new Error("Checkout URL not found in response.");
        }
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

  const resetInputs = () => {
    setcurrentsName("")
    setValue("");
    setCurrentprice("");
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
    setStep(1);
    onClose()
  };

  const handleProceeding = () => {
    setStep((cur: number) => cur + 1);
  };

  
  // const [scrollBehavior, setScrollBehavior] = React.useState("inside");
  useEffect(() => {
    if (toprice && (naira || USDT)) {
      updateNetworkOptions();
    }
  }, [naira, USDT, toprice]);
  
  const updateNetworkOptions = () => {
    const currentPrice = parseFloat(toprice);
  
    if (!isNaN(currentPrice) && currentPrice > 0) {
      if (Currency && naira) {
        const nairaValue = parseFloat(naira);
        if (!isNaN(nairaValue) && nairaValue > 0) {
          const value = nairaValue / currentPrice;
          const formattedValue = parseFloat(value.toFixed(13));
          setConversion(formattedValue);
        }
      } else if (USDT) {
        const USDTValue = parseFloat(USDT);
        if (!isNaN(USDTValue) && USDTValue > 0) {
          const value = USDTValue * currentPrice;
          const formattedValue = parseFloat(value.toFixed(20));
          setConversion2(formattedValue);
        }
      }
    }
  };
  
  
  const initialValues = {
    amountNaira: Currency ? parseFloat(naira) : Conversion2,
    amountBlockchain: Currency ? Conversion : parseFloat(USDT),
    blockchain: Symbols,
    address: walletaddress,
    transactionType: "BUY",
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
            display={step === 1 || step === 4  || step === 5?"none" : "block"}
          >
            <IoIosArrowBack size={"20px"} />
          </Box>
          <DrawerCloseButton
            onClick={() => {
              resetInputs();
            }}
          />
        </HStack>
        <Box p={4}>
          {step === 1 && (
            <InputReceiverDetails
              setStep={setStep}
              setNetwork={setNetwork}
              setWalletaddress={setWalletaddress}
              // setName={setName}
              Network={network}
              settoprice={settoprice}
              setSymbol={setSymbols}
              setcurrentsImage={setcurrentsImage}
              setcurrentsName={setcurrentsName}
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
                asset={currentsName}
                rate={new Intl.NumberFormat("en-NG", {
                  // style: 'currency',
                  // currency: 'NGN',
                }).format(toprice)}
                imgsybl={currentsImage}
                sybl={Symbols}
              />
            ) : (
              <SelectassetUSDT
                setStep={setStep}
                rate={toprice}
                BUY={"Buy in Naira"}
                handleclick={handleclick}
                setasset={setasset}
                setUSDT={setUSDT}
                Name={Name}
                setCurrentprice={setCurrentprice}
                sybl={Symbols}
                imgsybl={currentsImage}
                asset={currentsName}
              />
            ))}
          {step === 3 && (
            <>
              <ConfirmBuyOrder
                setStep={setStep}
                Amount={
                  Currency
                    ? new Intl.NumberFormat("en-NG", {
                        // style: 'currency',
                        // currency: 'NGN',
                      }).format(Number(naira))
                    : Number(USDT)
                }
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
              transactionId={transactionId}
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
        h={["50px", "50px", "44px"]}
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
