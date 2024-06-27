// import {
//     MdDashboard,
//     MdSupervisedUserCircle,
//     MdShoppingBag,
//     MdAttachMoney,
//     MdWork,
//     MdAnalytics,
//     MdPeople,
//     MdOutlineSettings,
//     MdHelpCenter,
//     MdLogout,
//   } from "react-icons/md";

import { AiOutlineSwap } from "react-icons/ai";
import { IoIosSettings } from "react-icons/io";
import { FaFolderMinus } from "react-icons/fa6";
import { AiOutlineSwaps, FaFolderMinuss, IoIosSettingss } from "./navicons";



const semiNavItems = [
    {
      title: "Sell Crypto",
     path:'/',
     icon:<AiOutlineSwaps path={'/'}/>
    },
    {
      title: " Buy crypto",
      path:   '',
      icon: <FaFolderMinuss path={undefined} />
     
    },
  ];
  export default semiNavItems;