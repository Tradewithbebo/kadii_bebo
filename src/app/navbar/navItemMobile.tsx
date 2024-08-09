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
import { AiOutlineSwaps, AiOutlineSwapsM, FaFolderMinuss, FaFolderMinussM, IoIosSettingss, IoIosSettingssM } from "./navicons";



const navItemsM = [
    {
      title: " Buy/Sell",
     path:'/',
     icon:<AiOutlineSwapsM path={'/'}/>
    },
    {
      title: " Transactions",
      path:   '',
      icon: <FaFolderMinussM path={undefined} />
     
    },
    {
      title: "  Settings",
      path:    '',
      icon:<IoIosSettingssM path={undefined}  />
     
    },
  ];
  export default  navItemsM;
  