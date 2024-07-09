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
     path:'/HomeincompleteKyc',
     icon:<AiOutlineSwaps path={'/HomeincompleteKyc'}/>
    },
    {
      title: " Transactions",
      path:   '',
      icon: <FaFolderMinuss path={undefined} />
     
    },
    {
      title: "  Settings",
      path:    '',
      icon:<IoIosSettingss path={undefined} />
     
    },
  ];
  export default  navItems;
  