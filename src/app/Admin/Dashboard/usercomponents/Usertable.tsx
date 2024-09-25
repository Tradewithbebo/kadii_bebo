"use client";
import React from "react";
import TAbleuser from "./tableuser";
import { useAdminContext } from "../../Admincontext";

export default function Usertable() {
  const headers = [
    "Customer info",
    "Email",
    "KYC Level",
    "No. of transactions",
  ];

  const bank = [
    "3092764731 | FIRSTBANK PLC",
    "3088908714 | FIRSTBANK PLC",
    "3092764731 | FIRSTBANK PLC",
  ];

  const {
    Users,
    searchUser,
  } = useAdminContext();

  // Prepare user data from Users context
  const userData = Users.map((status: any) => ({
    fullName: status.fullName,
    email: status.email,
    kycStatus: status.kycStatus,
    number_of_transactions: "10",
  }));

  // Filter user data based on the search input
  const filteredData = userData.filter((row: any) => {
    return Object.values(row).some((value) =>
      String(value).toLowerCase().includes(String(searchUser).toLowerCase())
    );
  });

  // Log the filtered data for debugging
  console.log("Filtered data:", filteredData);

  return (
    <TAbleuser
      headers={headers}
      data={searchUser.length > 0 ? filteredData : userData} // Use searchUser length to decide which data to show
      // bank={''}
    />
  );
}
