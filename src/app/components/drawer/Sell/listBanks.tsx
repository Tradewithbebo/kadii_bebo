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
// import { AiOutlineSwaps, FaFolderMinuss, IoIosSettingss } from "./navicons";

interface Option {
    value: boolean | string;
    label: string;
  }
  
  interface Options {
    Banks: Option[];
  }

const bankName:Options= {
    Banks: [
      { value: 'Gtb', label: 'Gtb' },
      { value: 'firtbank', label: 'firstbank' },
      { value: 'UBA', label: 'UBA' },
      { value: 'opay', label: 'opay' },
      { value: 'palmpay', label: 'palmpay' },]
}
  export default bankName;