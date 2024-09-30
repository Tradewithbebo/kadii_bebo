import {
    MdDashboard,
    MdSupervisedUserCircle,
    MdShoppingBag,
    MdAttachMoney,
    MdWork,
    MdAnalytics,
    MdPeople,
    MdOutlineSettings,
    MdHelpCenter,
    MdLogout,
    MdNetworkCell,
    MdNetworkWifi,
    MdNetworkCheck,
    MdNetworkLocked,
    MdBarChart,
    MdSignalWifi0Bar,
    MdPieChart,
    MdBarcodeReader,
    MdStackedBarChart,
    MdSettings,
  } from "react-icons/md";
  import { AiOutlineHome } from "react-icons/ai";
  import { HiOutlineChartBar } from "react-icons/hi";
  import { HiOutlineChartSquareBar } from "react-icons/hi";
export const dashboard= {
  title: "Dashboard",
      list: 
        {
          title: "Dashboard",
          path: "/Admin/Dashboard/dashboard",
          icon: <AiOutlineHome />,
        },
   
}

const menuItems = [
    {
      title: "Activities",
      list: [
        {
          title: "Transactions",
          path: "/Admin/Dashboard/Transactions",
          icon: <HiOutlineChartSquareBar />,
        },
        {
          title: "KYC & Verification",
          path: "/Admin/Dashboard/kyc",
          icon: <HiOutlineChartBar/>,
        },
        {
          title: "Orders",
          path: "/Admin/Dashboard/Order",
          icon: <HiOutlineChartBar />,
        },
      ],
    },
    {
      title: "User type",
      list: [
        {
          title: "Users",
          path: "/Admin/Dashboard/users",
          icon: <MdOutlineSettings />,
        },
        {
          title: "Admin users",
          path: "/Admin/Dashboard/Adminusers",
          icon: <MdOutlineSettings />,
        }
      ],
    },
  ];
  export default  menuItems;
  export const settings= {
    title: "Settings",
        list: 
         [  {
          title: "Settings",
          path: "/Admin/Dashboard/Settings/Profile",
          icon: <MdSettings />,
        },
        {
          title: "",
          path: "",
          icon: "",
        },]
     
  }

  // export const settings= [
  //   {
  //     title: "Settings",
  //     list: [
  //       {
  //         title: "Settings",
  //         path: "/dashboard/revenue",
  //         icon: <MdSettings />,
  //       },
  //       {
  //         title: "Logout",
  //         path: "/dashboard/reports",
  //         icon: <MdLogout/>,
  //       },]}]