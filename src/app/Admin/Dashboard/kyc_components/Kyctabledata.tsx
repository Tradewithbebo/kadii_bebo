import React from "react";
import TAble from "../dashboardcomponents/Table";
import { GrStatusGood } from "react-icons/gr";
// import TAbleuser from './tableuser';
import { IoFilterSharp } from "react-icons/io5";
import KycTable from "./kycTable";
import { Link } from "@chakra-ui/react";
// import Link from 'next/link';

export default function Kyctabledata() {
  const orderTypeColors = {
    "Type 1": "blue.500",
    "Type 2": "green.500",
    "Type 3": "red.500",
    // Add more types and colors as needed
  };
  const headers = [
    "Status",
    "Name",
    "Email verification",
    "I.D/Drivers license",
    "BVN verification",
    "Preview",
    " Last KYC date",
  ];

  const data = [
    {
      Status: "completed",
      Name: "KHAdi osas",
      Emailverification: "verified",
      ID_Driverslicense: "verified",
      Bvn: "verified",
      Preview: (
        <Link color={"#4F46E5"} href="/Admin/Dashboard/kycdocument">
          view documents
        </Link>
      ),
      LastKYCdate: "22/06/23",
    },
    {
      Status: "started",
      Name: "Timi ade",
      Emailverification: "not verified",
      ID_Driverslicense: "verified",
      Bvn: "verified",
      Preview: (
        <Link color={"#4F46E5"} href="/Admin/Dashboard/kycdocument">
          view documents
        </Link>
      ),
      LastKYCdate: "22/06/23",
    },
    {
      Status: "not started",
      Name: "Timi ade",
      Emailverification: "verified",
      ID_Driverslicense: "verified",
      Bvn: "verified",
      Preview: (
        <Link color={"#4F46E5"} href="/Admin/Dashboard/kycdocument">
          view documents
        </Link>
      ),
      LastKYCdate: "22/06/23",
    },
    {
      Status: "completed",
      Name: "Timi ade",
      Emailverification: "not verified",
      ID_Driverslicense: "verified",
      Bvn: "verified",
      Preview: (
        <Link color={"#4F46E5"} href="/Admin/Dashboard/kycdocument">
          view documents
        </Link>
      ),
      LastKYCdate: "22/06/23",
    },
    // Add more data as needed
  ];
  const bank = [
    "matthew@bebo.ng",
    "081 677 02086",
    "matthew@bebo.ng",
    "081 677 02086",
  ];

  return <KycTable headers={headers} data={data} bank={bank} />;
}
