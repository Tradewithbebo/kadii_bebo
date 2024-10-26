import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  GridItem,
  HStack,
  Link,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import TAble from "./Table";
import { GrStatusGood } from "react-icons/gr";
import { IoIosArrowForward } from "react-icons/io";
import { AxiosGet } from "@/app/axios/axios";
import { useAdminContext } from "../../Admincontext";

export default function Dashboardcomponent() {
  const {
    Status,
    custo_info,
    Asset_received,
    Amount_sent,
    Dates,
    transaction,
    searchtr,
    setsearchtr,
    transactmnth,
    settransactionmnth,
    ontapBuy_sell,
    setontapBuy_sell,
    Loadingtr,
    transactionBUY,
        setTransactionBUY,
        transactionSELL,
        setTransactionSELL,
        currentPage, 
        setCurrentPage,
        totalItems,
        settotalItems,
        totalPages,
        settotalPages,
        currentPageSELL, 
        setCurrentPageSELL,
        totalPagesSELL,
        settotalPagesSELL,
        currentPageBUY, 
        setCurrentPageBUY,
        totalPagesBUY,
        settotalPagesBUY,
        buy_sell_all_state,
         setbuy_sell_all_state

  } = useAdminContext();
  const [convertedDate, setconvertedDate] = useState("");
  // Transform data into an array of objects
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-indexed, so add 1
    const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year

    const hours = date.getHours().toString().padStart(2, "0"); // Ensure two digits for hours
    const minutes = date.getMinutes().toString().padStart(2, "0"); // Ensure two digits for minutes

    return `${day}/${month}/${year} ${hours}:${minutes}`; // Format as DD/MM/YY HH:MM
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  const formatName = (name: string | undefined) => {
    if (!name) return "N/A"; // Return 'N/A' if name is undefined
    // if ( name.split(" ").length < 3) return name;

    return name.split(" ").slice(0, 2).join(" ");
    // / Takes the first two names
  };

  // const formatName = (name: string | undefined) => {
  //   // If name is undefined or an empty string, return "N/A"
  //   if (!name || name.trim() === "") return "N/A";

  //   // If the name is shorter than 3 characters, return the name as-is
  //   if (name.length < 3) return name;

  //   // Split the name by spaces, return the first two names joined together
  //   const nameParts = name.trim().split(" ");

  //   // If name contains only one part, return it as-is; otherwise, return the first two names
  //   return nameParts.length === 1 ? nameParts[0] : nameParts.slice(0, 2).join(" ");
  // };
  const capitalize = (str:any) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  //;

  const onTap = (condition: any) => {
    setbuy_sell_all_state(condition);
  };
  
  const dataSell = transactionSELL
  .map((status: any) => {
    const createdAt = new Date(status.createdAt);
    const today = new Date();

    // Calculate days difference
    const timeInDays = Math.floor(
      (today.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24)
    );
    // console.log("time", timeInDays);

    return {
      Status: status.status,
      Transaction_type: status.type,
      custo_Name: status.bank?.accountName, // Safely access accountName

      Asset_received: `${status.amountBlockchain} ${
        status.blockchain.toUpperCase() || ""
      }`, // Format currency for asset received
      Amount_to_send: formatCurrency(status.amountNaira), // Format currency for amount sent
      Date: formatDate(status.createdAt), // Format date and time
      Proof_of_payment: status.paymentReferenceUrl,
      // transaction_id:status._id,
      // timeInDays, // Add timeInDays to the object for filtering
      // custo_infos: status.bank?.accountNumber, // Safely access accountName
      // custo_infosb: status.bank?.bankName, // Safely access accountName
      
    };
  })
  // First filter based on transactmnth (days difference)
  .filter((item: any) =>
    transactmnth === "" ? item : item.timeInDays <= transactmnth
  )

  // Then filter based on ontapBuy_sell
 
// console.log("Filtered data:", data);
const dataALL = transaction
  .map((status: any) => {
    const createdAt = new Date(status.createdAt);
    const today = new Date();

    // Calculate days difference
    const timeInDays = Math.floor(
      (today.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24)
    );
    // console.log("time", timeInDays);

    return {
      Status: status.status,
      Transaction_type: status.type,
      custo_Name: status.bank?.accountName, // Safely access accountName

      Asset_received: `${status.amountBlockchain} ${
        status.blockchain.toUpperCase() || ""
      }`, // Format currency for asset received
      Amount_to_send: formatCurrency(status.amountNaira), // Format currency for amount sent
      Date: formatDate(status.createdAt), // Format date and time
      Proof_of_payment: status.paymentReferenceUrl,
      // transaction_id:status._id,
      // timeInDays, // Add timeInDays to the object for filtering
      // custo_infos: status.bank?.accountNumber, // Safely access accountName
      // custo_infosb: status.bank?.bankName, // Safely access accountName
      
    };
  })
  // First filter based on transactmnth (days difference)
  .filter((item: any) =>
    transactmnth === "" ? item : item.timeInDays <= transactmnth
  )

  // Then filter based on ontapBuy_sell
  
// console.log("Filtered data:", data);
const dataBuy = transactionBUY
.map((status: any) => {
  const createdAt = new Date(status.createdAt);
  const today = new Date();

  // Calculate days difference
  const timeInDays = Math.floor(
    (today.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24)
  );
  // console.log("time", timeInDays);

  return {
    Status: status.status,
    Transaction_type: status.type,
    custo_Name: status.bank?.accountName, // Safely access accountName

    Asset_to_send: `${status.amountBlockchain} ${
      status.blockchain.toUpperCase() || ""
    }`, // Format currency for asset received
    Amount_Recieved: formatCurrency(status.amountNaira), // Format currency for amount sent
    Date: formatDate(status.createdAt), // Format date and time
    Proof_of_payment: status.paymentReferenceUrl,
    // transaction_id:status._id,
    // timeInDays, // Add timeInDays to the object for filtering
    // custo_infos: status.bank?.accountNumber, // Safely access accountName
    // custo_infosb: status.bank?.bankName, // Safely access accountName
  };
})
// First filter based on transactmnth (days difference)
.filter((item: any) =>
  transactmnth === "" ? item : item.timeInDays <= transactmnth
)
// Then filter based on ontapBuy_sell

// console.log("Filtered data:", data);
let data = buy_sell_all_state === "SELL" ? dataSell :buy_sell_all_state === "BUY" ? dataBuy:dataALL


const bankSELL = transactionSELL.map((status: any) => {
// console.log(status); // Log the current status

const walletAddress = status.walletAddress || "No Wallet Address";
const bank = status.bank || {}; // Default to an empty object if bank is null/undefined
const BankNo = bank.accountNumber || "No Account Number"; // Handle null/undefined accountNumber
const bankName = bank.bankName || "No Bank Name"; // Handle null/undefined bankName

const displayWalletAddress =
  walletAddress.length > 5
    ? `${walletAddress.slice(0, 5)}...`
    : walletAddress;

return {
  display: `${
    buy_sell_all_state === "SELL"
      ? BankNo
      : buy_sell_all_state === "BUY"
      ? displayWalletAddress
      : "No Wallet Address"
  } | ${buy_sell_all_state === "SELL" ? bankName : "address"}`,
  fullWalletAddress:
  buy_sell_all_state === "SELL"
      ? BankNo
      : buy_sell_all_state === "BUY"
      ? walletAddress
      : "",
};
});
const bankBUY = transactionBUY.map((status: any) => {
// console.log(status); // Log the current status

const walletAddress = status.walletAddress || "No Wallet Address";
const bank = status.bank || {}; // Default to an empty object if bank is null/undefined
const BankNo = bank.accountNumber || "No Account Number"; // Handle null/undefined accountNumber
const bankName = bank.bankName || "No Bank Name"; // Handle null/undefined bankName

const displayWalletAddress =
  walletAddress.length > 5
    ? `${walletAddress.slice(0, 5)}...`
    : walletAddress;

return {
  display: `${
    buy_sell_all_state === "SELL"
      ? BankNo
      : buy_sell_all_state === "BUY"
      ? displayWalletAddress
      : "No Wallet Address"
  } | ${buy_sell_all_state === "SELL" ? bankName : "address"}`,
  fullWalletAddress:
  buy_sell_all_state === "SELL"
      ? BankNo
      : buy_sell_all_state === "BUY"
      ? walletAddress
      : "",
};
});
const bankALL = transaction.map((status: any) => {
  // console.log(status); // Log the current status
  
  const walletAddress = status.walletAddress || "No Wallet Address";
  const bank = status.bank || {}; // Default to an empty object if bank is null/undefined
  const BankNo = bank.accountNumber || "No Account Number"; // Handle null/undefined accountNumber
  const bankName = bank.bankName || "No Bank Name"; // Handle null/undefined bankName
  
  const displayWalletAddress =
    walletAddress.length > 5
      ? `${walletAddress.slice(0, 5)}...`
      : walletAddress;
  
  return {
    display: `${
      status.type === "SELL"
        ? BankNo
        : status.type === "BUY"
        ? displayWalletAddress
        : "No Wallet Address"
    } | ${ status.type === "SELL" ? bankName : "address"}`,
    fullWalletAddress:
    status.type=== "SELL"
        ? BankNo
        :  status.type === "BUY"
        ? walletAddress
        : "",
  };
  });

let bank = buy_sell_all_state === "SELL" ? bankSELL : buy_sell_all_state === "BUY" ? bankBUY:bankALL

// const filteredData = data.filter((row: any) => {
//   const matchesSearch = Object.values(row).some((value) =>
//     String(value).toLowerCase().includes(String(searchtr).toLowerCase())
//   );
//   return matchesSearch;
// });
const headerss = [
  "Status",
  "Order Type",
  "Customers’ Info",
  " Amount Trnx",
  "Blockchain Trnx",
  "Date",
];

const headers_For_Sell = [
  "Status",
  "TXN TYPE",
  "CUST INFO ",
  "ASSET RCVD",
  "AMT TO SEND",
  "DATE",
];
const headers_For_Buy = [
  "Status",
  "TXN TYPE",
  "CUST INFO ",
  "ASSET TO SEND",
  "AMT RCVD",
  "DATE",
];
let headers = buy_sell_all_state === "Sell" ? headers_For_Sell :buy_sell_all_state === "Buy" ?  headers_For_Buy :headerss

  const filteredData = data.filter((row: any) => {
    const matchesSearch = Object.values(row).some((value) =>
      String(value).toLowerCase().includes(String(searchtr).toLowerCase())
    );

    return matchesSearch;
  });

  
  const datas = [
    {
      // icon: <GrStatusGood size={'20px'}/>,
      status: "Completed",
      orderType: "Sell order",
      customerInfo: "MATTHEW OLA",
      assetAmountReceived: "200,000.04 USDT",
      amountToBeSent: "NGN 2,000,000,000.00",
      date: "22/06/23  12:23PM",
    },
    {
      icon: <GrStatusGood size={"20px"} />,
      status: "Completed",
      orderType: "Sell order",
      customerInfo: "MATTHEW OLA",
      assetAmountReceived: "200,000.04 USDT",
      amountToBeSent: "NGN 2,000,000,000.00",
      date: "22/06/23  12:23PM",
    },
    {
      icon: <GrStatusGood size={"20px"} />,
      status: "Completed",
      orderType: "Buy order",
      customerInfo: "MATTHEW OLA",
      assetAmountReceived: "200,000.04 USDT",
      amountToBeSent: "NGN 2,000,000,000.00",
      date: "22/06/23  12:23PM",
    },
    // Add more data as needed
  ];
  const banks = [
    "3092764731 | FIRSTBANK PLC",
    " 3088908714 | FIRSTBANK PLC",
    "3092764731 | FIRSTBANK PLC",
  ];
 
  // const buy_sell_all=[
  //   'BUY',
  //   'SELL',
  //   'ALL'
  // ]
 
  return (
    <Box mt={"24px"} w={"100%"} mb={"19px"}>
      <Card
        border="1px"
        borderColor="gray.200"
        borderRadius="md"
        borderBottomRightRadius={"none"}
        borderBottomLeftRadius={"none"}
        cursor="pointer"
        transition="transform 0.5s ease-in-out, background-color 0.7s ease"
        w={"100%"}
      >
        <CardBody>
          <SimpleGrid columns={[1, 6]} w={"full"} columnGap={"7px"}>
            <GridItem colSpan={1}>
              <Text fontWeight={"700"} fontSize={"16px"}>
                New orders
              </Text>
            </GridItem>
            <GridItem
              colSpan={[1, 2]}
              display={"flex"}
              justifyContent={"start"}
            >
              <HStack>
                <Box onClick={() => onTap("ALL")}>
                  {" "}
                  <Button bg={buy_sell_all_state==='ALL'?"#b3ecca":"#e5e7eb" } fontWeight={"700"} fontSize={"13px"}>
                    All
                  </Button>
                </Box>
                <Box onClick={() => onTap("BUY")}>
                  <Button bg={buy_sell_all_state==='BUY'?"#b3ecca":"#e5e7eb"} fontWeight={"700"} fontSize={"13px"}>
                    Buy
                  </Button>
                </Box>

                <Box onClick={() => onTap("SELL")}>
                  {" "}
                  <Button bg={buy_sell_all_state==='SELL'?"#b3ecca":"#e5e7eb"} fontWeight={"700"} fontSize={"13px"}>
                    Sell
                  </Button>
                </Box>
              </HStack>
            </GridItem>
            <GridItem colSpan={[1, 3]} display={"flex"} justifyContent={"end"}>
              <Box>
                <Link color={"#4F46E5"} fontWeight={"500"} fontSize={"12px"}>
                  <HStack>
                    {" "}
                    <Text>See All Order</Text> <IoIosArrowForward />
                  </HStack>
                </Link>
              </Box>
            </GridItem>
          </SimpleGrid>
        </CardBody>
      </Card>

      <TAble headers={headers} data={data} bank={bank}  />
    </Box>
  );
}
