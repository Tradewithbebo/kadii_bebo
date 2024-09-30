"use client";
import React from "react";
// import TAbleuser from "./tableuser";
import { useAdminContext } from "../../Admincontext";
import TAbleuser from "./Admintableuser";

export default function Usertable() {
  const headers = [
    "Admin Name",
    "Admin Email",
    "Created At",
    
  ]

  const bank = [
    "3092764731 | FIRSTBANK PLC",
    "3088908714 | FIRSTBANK PLC",
    "3092764731 | FIRSTBANK PLC",
  ];

  const {
    
    AdminUsers,
    searchUser, 
    setAdminUsers
  } = useAdminContext();
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-indexed, so add 1
    const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year

    const hours = date.getHours().toString().padStart(2, "0"); // Ensure two digits for hours
    const minutes = date.getMinutes().toString().padStart(2, "0"); // Ensure two digits for minutes

    return `${day}/${month}/${year} ${hours}:${minutes}`; // Format as DD/MM/YY HH:MM
  }

  // Prepare user data from Users context
  const userData = AdminUsers.map((status: any) => ({
    _id: status._id,
    fullName: status.name,
    email: status.email,
    createdAt:formatDate (status.createdAt),
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
