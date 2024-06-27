// import Image from "next/image";
import styles from "./page.module.css";
import { Container,Box,Image } from "@chakra-ui/react";
import Navbar from './navbar/navbar';
import NavbarTwo from "./navbar/navbarTwo";
import SemiNav from './navbar/semiNav';
import HomePageBody from "./components/homePageBody";
import CreateAccount from './createAccount/createAccount/page';
import GeneralDisplay from "./createAccount/generalDisplay";
import PersonaDetail from "./createAccount/PersonalDetails/page";
import Login from './createAccount/Login/page';
import VerifyMail from "./components/CreateAccount_Components/VerifyMail";
import CreatePin from "./components/CreateAccount_Components/CreatePin";
import Confirmpin from "./createAccount/confirmPin/page";
import Bvn from "./Kyc/Bvn/Bvn";
import Nin from "./Kyc/Nin/Nin";
import Kkyc from "./Kyc/Kyc/page";
import Sell from "./components/drawer/Sell/Sell";
import AddBank from "./components/drawer/Sell/addBank";
import Add from "./components/drawer/Sell/nnn";
import ResetPassword from "./createAccount/ResetPassword/page";
import EnterVerification from "./createAccount/EnterVerification/page";
import Success from "./components/CreateAccount_Components/success";
import HomepageForIncompletekyc from "./incompleteKyc/HomepageForIncompletekyc";
 import Notification from "./incompleteKyc/Notification";
import NavbarTwo_nokyc from "./navbar/navbarTwo_nokyc";


export default function Home() {
  return (
   
<>
{/* <Notification/> */}
<NavbarTwo/>
<HomePageBody/>
</>
  
  );
}
