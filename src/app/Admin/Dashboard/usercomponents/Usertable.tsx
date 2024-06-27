import React from 'react'
import TAble from '../dashboardcomponents/Table'
import { GrStatusGood } from 'react-icons/gr';
import TAbleuser from './tableuser';
import { IoFilterSharp } from "react-icons/io5";

export default function Usertable() {
  const orderTypeColors = {
    "Type 1": "blue.500",
    "Type 2": "green.500",
    "Type 3": "red.500",
    // Add more types and colors as needed
  };
  const headers = [
   'Customer info',
    "Email",
    "KYC Level",
    "No. of transactions",
   
  ];

  const data = [
    {
      CustomerInfo: "KHAdi osas",
      Email: "Kadirid9@gmail.com",
      KYCLevel: 'Bvn',
      NoOfTransactions: 900,
 
    },
    {
      CustomerInfo: "timi ade",
      Email: "Timi@gmail.com",
      KYCLevel: 'Bvn',
      NoOfTransactions: 900,
    },
    // Add more data as needed
  ];
  const bank=[
  '3092764731 | FIRSTBANK PLC',
  ' 3088908714 | FIRSTBANK PLC',
 '3092764731 | FIRSTBANK PLC'
  ]

  return (
    <TAbleuser headers={headers} data={data} bank={bank} />
  )
}
