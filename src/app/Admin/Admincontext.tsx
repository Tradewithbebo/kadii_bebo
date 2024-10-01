import React, { createContext, useContext, useEffect, useState } from "react";
import { AxiosGet } from "../axios/axios";

const AdminCryptoContext = createContext<any>(null);

interface Network {
  image: any;
  symbol: any;
  name: any;
  current_price: any;
}
interface User {
  fullName: any;
  email: any;
  kycStatus: any;
  current_price: any;
}

interface Transaction {
  status: string;
  amountNaira: number;
  amountBlockchain: number;
  createdAt: string;
}
export const AdminContext = ({ children }: { children: React.ReactNode }) => {
  const[adminId,setAdminId]=useState("")
  const[usersId, setUsersId]=useState("")
  const [LoadingAdminuser,setLoadingAdminuser]=useState(false)
  const [ErrorMessage4,setErrorMessage4]=useState('')
  const [NetValue, setNetValue] = useState<Network[]>([]);
  const [Loadingtr, setLoadingtr] = useState(false);
  const [transactmnth, settransactionmnth] = useState("");
  const [Dates, setDates] = useState<string[]>([]); // Array of strings for dates
  const [Asset_received, setAsset_received] = useState<number[]>([]); // Array of numbers
  const [Status, setStatus] = useState<string[]>([]); // Array of strings for status
  const [Amount_sent, setAmount_sent] = useState<number[]>([]); // Array of numbers
  const [custo_info, setcusto_info] = useState<any[]>([]);

  const [transaction, setTransaction] = useState([]);
  const [transactionw, setTransactionw] = useState([]);
  const [searchtr, setsearchtr] = useState([]);
  const [searchUser, setsearchUser] = useState([]);

  const [Loadingaset, setLoadingaset] = useState(false);
  const [errorMessage3, setErrorMessage3] = useState("");
  const [Loadinguser, setLoadinguser] = useState(false);
  const [Users, setUsers] = useState<User[]>([]);
  const [AdminUsers, setAdminUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentSlice, setCurrentSlice] = useState<Network[]>([]); // To hold the current 2 items to display
  const [sliceIndex, setSliceIndex] = useState(0); // To track the current slice index
  const [ontapBuy_sell, setontapBuy_sell] = useState('Sell'); // To track the current slice index
  const url = "wallet/assets";
  const url2 = "transactions";
  const gettransaction = async () => {
    setLoadingtr(true);
    try {
      const res = await AxiosGet(url2);
      setLoadingtr(false);
      if (res) {
        const fetchedTransactions = res.data.items;

        // Explicitly type the arrays
        const newDates: string[] = [];
        const newAmountSent: number[] = [];
        const newAssetReceived: number[] = [];
        const newStatus: string[] = [];
        const newCustoInfo: string[] = [];

        fetchedTransactions.forEach((item: any) => {
          newAmountSent.push(item.amountNaira);
          newDates.push(item.createdAt);
          newAssetReceived.push(item.amountNaira);
          newStatus.push(item.type);
          newCustoInfo.push(item.bank.accountName);
        });

        setTransaction(fetchedTransactions); // Set all transactions
        setAmount_sent(newAmountSent);
        setDates(newDates);
        setAsset_received(newAssetReceived);
        setStatus(newStatus);
        setcusto_info(newCustoInfo);
      } else {
        console.error("No data found");
      }
    } catch (err: any) {
      setLoadingtr(false);
      const message =
        err.response?.data?.message || "Check your Network and try again.";
      setErrorMessage(message);
    }
  };

  // Effect to fetch transactions every 2 minutes
  useEffect(() => {
    gettransaction(); // Initial fetch
    const intervalId = setInterval(() => {
      gettransaction(); // Fetch every 2 minutes
    }, 120000); // 120000 milliseconds = 2 minutes

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);
  const getnetwork = async (): Promise<boolean> => {
    setLoadingaset(true);
    try {
      const res = await AxiosGet(url);
      setLoadingaset(false);
      if (res) {
        console.log("Networks fetched:", res.data); // Log fetched networks
        setNetValue(res.data);
        setErrorMessage("");
        return true;
      } else {
        return false; // Return false if no response or empty data
      }
    } catch (err: any) {
      setLoadingaset(false);
      let message = "Check your Network and try again.";
      if (err.response && err.response.data && err.response.data.message) {
        message = err.response.data.message;
      }
      setErrorMessage(message);
      return false; // Return false on failure
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const success = await getnetwork();
      if (success && NetValue.length > 0) {
        setCurrentSlice(NetValue.slice(0, 2)); // Initially set the first 2 items
      }
    };

    fetchData();
    
  }, [NetValue]);

  // Effect to cycle through NetValue and display two items every 5 seconds
  useEffect(() => {
    if (NetValue.length > 0) {
      // Start the interval for cycling content every 5 seconds
      const intervalId = setInterval(() => {
        cycleContent();
      }, 5000);

      return () => clearInterval(intervalId); // Cleanup on component unmount
    }
  }, [NetValue, sliceIndex]); // Re-run when NetValue or sliceIndex changes

  const cycleContent = () => {
    if (NetValue.length === 0) return;

    // Calculate the next index while wrapping around the array
    let nextIndex = sliceIndex + 2;

    // Wrap around if the next index exceeds the array length
    if (nextIndex >= NetValue.length) {
      nextIndex = nextIndex - NetValue.length;
    }

    // If we're near the end, slice should wrap around from the start
    const newSlice = [
      ...NetValue.slice(sliceIndex, Math.min(sliceIndex + 2, NetValue.length)),
      ...NetValue.slice(0, Math.max(0, nextIndex - NetValue.length)),
    ];

    // Update the state with the new slice
    setCurrentSlice(newSlice);

    // Update slice index to move forward by 2, with wrap-around
    setSliceIndex(nextIndex);
  };
  useEffect(()=>{
    getusers();
    getAdminusers()
  })

  const url3 = "users";
  const getusers = async (): Promise<boolean> => {
    setLoadinguser(true);
    try {
      const res = await AxiosGet(url3);
      setLoadinguser(false);
      if (res) {
        // console.log("Networks fetched:", res.data); // Log fetched networks
        setUsers(res.data.items);
        setErrorMessage3("");
        return true;
      } else {
        return false; // Return false if no response or empty data
      }
    } catch (err: any) {
      setLoadinguser(false);
      let message = "Check your Network and try again.";
      if (err.response && err.response.data && err.response.data.message) {
        message = err.response.data.message;
      }
      setErrorMessage3(message);
      return false; // Return false on failure
    }
  };
  const url4 = "admin";
  
  const getAdminusers = async (): Promise<boolean> => {
    setLoadingAdminuser(true);
    try {
      const res = await AxiosGet(url4);
      setLoadingAdminuser(false);
      if (res) {
        // console.log("Networks fetched:", res.data); // Log fetched networks
        setAdminUsers(res.data);
        setErrorMessage4("");
        return true;
      } else {
        return false; // Return false if no response or empty data
      }
    } catch (err: any) {
      setLoadingAdminuser(false);
      let message = "Check your Network and try again.";
      if (err.response && err.response.data && err.response.data.message) {
        message = err.response.data.message;
      }
      setErrorMessage4(message);
      return false; // Return false on failure
    }
  };
  return (
    <AdminCryptoContext.Provider
      value={{
        NetValue,
        currentSlice,
        setNetValue,
        getnetwork,
        transaction,
        setTransaction,
        Amount_sent,
        Dates,
        Asset_received,
        Status,
        custo_info,
        searchtr,
        setsearchtr,
        transactmnth,
        settransactionmnth,
        Users,
        searchUser,
        setsearchUser,
        ontapBuy_sell,
        setontapBuy_sell,
        transactionw,
        AdminUsers,
        setAdminUsers,
        adminId,
        setAdminId,
        usersId, setUsersId
      }}
    >
      {children}
    </AdminCryptoContext.Provider>
  );
};

// Optionally, you can create a custom hook to use the context
export const useAdminContext = () => {
  return useContext(AdminCryptoContext);
};
