"use client";
import { Box, HStack,Text} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import OrderTable from "./OrderTable";
import { useAdminContext } from "../../Admincontext";
import { Fade } from "react-awesome-reveal";

const orderTypeColors = {
  "Type 1": "blue.500",
  "Type 2": "green.500",
  "Type 3": "red.500",
  // Add more types and colors as needed
};

const data = [
  {
    Status: "In-progress",
    Customers_info: "MATTHEW OLA OLUKOJU",
    Asset_received: "200,000.04 USDT",
    Amount_sent: "NGN 2,000,000,000.00",
    Date: "22/06/23  12:23PM",
  },
  {
    Status: "In-progress",
    Customers_info: "MATTHEW OLA OLUKOJU",
    Asset_received: "200,000.04 USDT",
    Amount_sent: "NGN 2,000,000,000.00",
    Date: "22/06/23  12:23PM",
  },
  {
    Status: "Declined",
    Customers_info: "MATTHEW OLA OLUKOJU",
    Asset_received: "200,000.04 USDT",
    Amount_sent: "NGN 2,000,000,000.00",
    Date: "22/06/23  12:23PM",
  },
  {
    Status: "Completed",
    Customers_info: "MATTHEW OLA OLUKOJU",
    Asset_received: "200,000.04 USDT",
    Amount_sent: "NGN 2,000,000,000.00",
    Date: "22/06/23  12:23PM",
  },
  // Add more data as needed
];
const bank = [
  "3092764731 | FIRSTBANK PLC",
  " 3088908714 | FIRSTBANK PLC",
  "3092764731 | FIRSTBANK PLC",
];

export default function Transaction_Table() {
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
  } = useAdminContext();
  const [Buy_Sell, setBuy_Sell] = useState();
  const [key, setKey] = useState(0);
  const reanimationTime = 2000;
  useEffect(() => {
    const interval = setInterval(() => {
      setKey((prevKey) => prevKey + 1);
    }, reanimationTime);

    return () => clearInterval(interval);
  }, [reanimationTime]);
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
 
// console.log('transactions',transaction)
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
        transaction_id:status._id,
        timeInDays, // Add timeInDays to the object for filtering
        // custo_infos: status.bank?.accountNumber, // Safely access accountName
        // custo_infosb: status.bank?.bankName, // Safely access accountName
        
      };
    })
    // First filter based on transactmnth (days difference)
    .filter((item: any) =>
      transactmnth === "" ? item : item.timeInDays <= transactmnth
    )

    // Then filter based on ontapBuy_sell
    .filter(
      (item: any) =>
        ontapBuy_sell === "Sell"
          ? item.Transaction_type === "SELL" // Show only SELL transactions
          : ontapBuy_sell === "Buy"
          ? item.Transaction_type === "BUY" // Show only BUY transactions
          : true // Show all if no specific filter is selected
    );
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
      transaction_id:status._id,
      timeInDays, // Add timeInDays to the object for filtering
      // custo_infos: status.bank?.accountNumber, // Safely access accountName
      // custo_infosb: status.bank?.bankName, // Safely access accountName
    };
  })
  // First filter based on transactmnth (days difference)
  .filter((item: any) =>
    transactmnth === "" ? item : item.timeInDays <= transactmnth
  )
  // Then filter based on ontapBuy_sell
  .filter(
    (item: any) =>
      ontapBuy_sell === "Sell"
        ? item.Transaction_type === "SELL" // Show only SELL transactions
        : ontapBuy_sell === "Buy"
        ? item.Transaction_type === "BUY" // Show only BUY transactions
        : true // Show all if no specific filter is selected
  );
// console.log("Filtered data:", data);
let data = ontapBuy_sell === "Sell" ? dataSell : dataBuy;


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
      ontapBuy_sell === "Sell"
        ? BankNo
        : ontapBuy_sell === "Buy"
        ? displayWalletAddress
        : "No Wallet Address"
    } | ${ontapBuy_sell === "Sell" ? bankName : "address"}`,
    fullWalletAddress:
      ontapBuy_sell === "Sell"
        ? BankNo
        : ontapBuy_sell === "Buy"
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
      ontapBuy_sell === "Sell"
        ? BankNo
        : ontapBuy_sell === "Buy"
        ? displayWalletAddress
        : "No Wallet Address"
    } | ${ontapBuy_sell === "Sell" ? bankName : "address"}`,
    fullWalletAddress:
      ontapBuy_sell === "Sell"
        ? BankNo
        : ontapBuy_sell === "Buy"
        ? walletAddress
        : "",
  };
});

let bank = ontapBuy_sell === "Sell" ? bankSELL : bankBUY;

  const filteredData = data.filter((row: any) => {
    const matchesSearch = Object.values(row).some((value) =>
      String(value).toLowerCase().includes(String(searchtr).toLowerCase())
    );
    return matchesSearch;
  });

  let header = ontapBuy_sell === "Sell" ? headers_For_Sell : headers_For_Buy;
  // if (Loadingtr) {
  //   return (
  //     <Box>
  //       <HStack
  //         gap={["15px", "40px"]}
  //         display={"flex"}
  //         justifyContent={"center"}
  //       >
  //         <Fade key={key} cascade damping={0.1}>
  //           <Text
  //             fontSize={["20px", "60px"]}
  //             fontWeight={"700"}
  //             color={"#0AA07C"}
  //           >
  //             B
  //           </Text>
  //           <Text
  //             fontSize={["20px", "60px"]}
  //             fontWeight={"700"}
  //             color={"#0AA07C"}
  //           >
  //             E
  //           </Text>
  //           <Text
  //             fontSize={["20px", "60px"]}
  //             fontWeight={"700"}
  //             color={"#0AA07C"}
  //           >
  //             B
  //           </Text>
  //           <Text
  //             fontSize={["20px", "60px"]}
  //             fontWeight={"700"}
  //             color={"#0AA07C"}
  //           >
  //             O
  //           </Text>
  //           <Text
  //             fontSize={["20px", "60px"]}
  //             fontWeight={"700"}
  //             color={"#0AA07C"}
  //           >
  //             .
  //           </Text>
  //           <Text
  //             fontSize={["20px", "60px"]}
  //             fontWeight={"700"}
  //             color={"#0AA07C"}
  //           >
  //             .
  //           </Text>
  //           <Text
  //             fontSize={["20px", "60px"]}
  //             fontWeight={"700"}
  //             color={"#0AA07C"}
  //           >
  //             .
  //           </Text>
  //           <Text
  //             fontSize={["20px", "60px"]}
  //             fontWeight={"700"}
  //             color={"#0AA07C"}
  //           >
  //             .
  //           </Text>
  //           <Text
  //             fontSize={["20px", "60px"]}
  //             fontWeight={"700"}
  //             color={"#0AA07C"}
  //           >
  //             .
  //           </Text>
  //         </Fade>
  //       </HStack>
  //     </Box>
  //   );
  // }
  return (
    <Box w={'full'}>
      <OrderTable
        headers={header}
        data={searchtr.length > 0 ? filteredData : data}
        bank={bank}
      />
    </Box>
  );
}
