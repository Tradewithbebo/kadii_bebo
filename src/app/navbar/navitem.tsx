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



const navItems = [
    // {
    //   title: " Buy/Sell",
    //  path:'/',
    //  icon:<AiOutlineSwaps path={'/'}/>
    // },
    {
      title: " Buy/Sell",
     path:'/',
     icon:<AiOutlineSwaps path={'/'}/>
    },
    {
      title: " Transactions",
      path:   '/Transactions',
      icon: <FaFolderMinuss path={'/Transactions'} />
     
    },
    {
      title: "  Settings",
      path:    '/settings',
      icon:<IoIosSettingss path={'/settings'} />
     
    },
  ];
  export default  navItems;
  