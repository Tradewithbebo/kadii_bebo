"use client";

// import { Box } from "@chakra-ui/react";
import { Box, HStack,Text} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import TransactionTable from "./TransactionTable";
import { useAdminContext } from "../../Admincontext";
import { Fade } from "react-awesome-reveal";

const headers = [
  "Trnx Type",
  "Customers’ info",
  "Asset Trnx",
  "Amount Trnx",
  "Date",
];
// const bank = [
//   "3092764731 | FIRSTBANK PLC",
//   "3088908714 | FIRSTBANK PLC",
//   "3092764731 | FIRSTBANK PLC",
// ];

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
    Loadingtr
  } = useAdminContext();
  const [key, setKey] = useState(0);
  const reanimationTime = 2000;
  useEffect(() => {
    const interval = setInterval(() => {
      setKey((prevKey) => prevKey + 1);
    }, reanimationTime);

    return () => clearInterval(interval);
  }, [reanimationTime]);
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

  // const [timeFilter, setTimeFilter] = useState("1day");
  const data = transaction
    .map((status: any) => {
      const createdAt = new Date(status.createdAt);
      const today = new Date();

      // Calculate days difference
      const timeInDays = Math.floor(
        (today.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24)
      );
      // console.log("time", timeInDays);

      return {
        Status: status.type,
        custo_info: status.bank?.accountName, // Safely access accountName
        Asset_received: formatCurrency(status.amountNaira), // Format currency for asset received
        Amount_sent: formatCurrency(status.amountNaira), // Format currency for amount sent
        Date: formatDate(status.createdAt), // Format date and time
        timeInDays, // Add timeInDays to the object for filtering
      };
    })

    .filter((item: any) =>
      transactmnth === "" ? item : item.timeInDays <= transactmnth
    );

  // console.log("Filtered data:", data);

  // Ensure that searchtr is a string and that it's not null or undefined
  // const filteredData = data.filter((row: any) =>
  //   Object.values(row).some((value) =>
  //     String(value).toLowerCase().includes(String(searchtr).toLowerCase())
  //   )
  // );
  const bank = transaction.map(
    (status: any) => `${status.bank?.accountNumber} | ${status.bank?.bankName}`
  );
  // const matchesTimeFilter = (row:any) => {
  //   if (timeFilter === "12months") return row.timeInDays <= 365;
  //   if (timeFilter === "6months") return row.timeInDays <= 180;
  //   if (timeFilter === "30days") return row.timeInDays <= 30;
  //   return true; // "all" filter shows all transactions
  // };
  //   const filteredDataday = data.filter((row:any) => {
  // ;
  //     // const timeMatch = matchesTimeFilter(timeFilter, row);

  //     // return   timeMatch; // Only return rows that match both filters
  //   });

  // const [timeFilter, setTimeFilter] = useState("all");
  const filteredData = data.filter((row: any) => {
    const matchesSearch = Object.values(row).some((value) =>
      String(value).toLowerCase().includes(String(searchtr).toLowerCase())
    );
    return matchesSearch;
  });

  if (Loadingtr) {
    return (
      <Box>
        <HStack
          gap={["15px", "40px"]}
          display={"flex"}
          justifyContent={"center"}
        >
          <Fade key={key} cascade damping={0.1}>
            <Text
              fontSize={["20px", "60px"]}
              fontWeight={"700"}
              color={"#0AA07C"}
            >
              B
            </Text>
            <Text
              fontSize={["20px", "60px"]}
              fontWeight={"700"}
              color={"#0AA07C"}
            >
              E
            </Text>
            <Text
              fontSize={["20px", "60px"]}
              fontWeight={"700"}
              color={"#0AA07C"}
            >
              B
            </Text>
            <Text
              fontSize={["20px", "60px"]}
              fontWeight={"700"}
              color={"#0AA07C"}
            >
              O
            </Text>
            <Text
              fontSize={["20px", "60px"]}
              fontWeight={"700"}
              color={"#0AA07C"}
            >
              .
            </Text>
            <Text
              fontSize={["20px", "60px"]}
              fontWeight={"700"}
              color={"#0AA07C"}
            >
              .
            </Text>
            <Text
              fontSize={["20px", "60px"]}
              fontWeight={"700"}
              color={"#0AA07C"}
            >
              .
            </Text>
            <Text
              fontSize={["20px", "60px"]}
              fontWeight={"700"}
              color={"#0AA07C"}
            >
              .
            </Text>
            <Text
              fontSize={["20px", "60px"]}
              fontWeight={"700"}
              color={"#0AA07C"}
            >
              .
            </Text>
          </Fade>
        </HStack>
      </Box>
    );
  }

  return (
    <Box>
      <TransactionTable
        headers={headers}
        data={searchtr.length > 0 ? filteredData : data}
        bank={bank}
      />
    </Box>
  );
}
