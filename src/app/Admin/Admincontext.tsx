import React, { createContext, useContext, useEffect, useState } from "react";
import { AxiosGet } from "../axios/axios";
import { Console } from "node:console";

// Context
const AdminCryptoContext = createContext<any>(null);

// Interface Definitions
interface Network {
  image: string;
  symbol: string;
  name: string;
  current_price: number;
}

interface User {
  fullName: string;
  email: string;
  kycStatus: string;
  current_price: number;
}

interface Transaction {
 [key:string]:any
}

// Helper function for error handling
const handleNetworkError = (err: any, setErrorMessage: (msg: string) => void) => {
  let message = "Check your Network and try again.";
  if (err.response && err.response.data && err.response.data.message) {
    message = err.response.data.message;
  }
  setErrorMessage(message);
};

// Main AdminContext Component
export const AdminContext = ({ children }: { children: React.ReactNode }) => {
  // States
  const [NotificationCount, setNotificationCount] = useState(null)
  const [buy_sell_all_state, setbuy_sell_all_state] = useState("ALL")
  const [adminId, setAdminId] = useState("");
  const [usersId, setUsersId] = useState("");
  const [LoadingAdminuser, setLoadingAdminuser] = useState(false);
  const [ErrorMessage4, setErrorMessage4] = useState("");
  const [NetValue, setNetValue] = useState<Network[]>([]);
  const [Loadingtr, setLoadingtr] = useState(false);
  const [transactmnth, settransactionmnth] = useState("");
  const [Dates, setDates] = useState<string[]>([]);
  const [Asset_received, setAsset_received] = useState<number[]>([]);
  const [Status, setStatus] = useState<string[]>([]);
  const [custo_info, setcusto_info] = useState<any[]>([]);
  const [transaction, setTransaction] = useState<Transaction[]>([]);
  const [transactionBUY, setTransactionBUY] = useState<Transaction[]>([]);
  const [transactionSELL, setTransactionSELL] = useState<Transaction[]>([]);
  const [transactionw, setTransactionw] = useState<Transaction[]>([]);
  const [searchtr, setsearchtr] = useState<Transaction[]>([]);
  const [searchUser, setsearchUser] = useState<User[]>([]);
  const [Loadingaset, setLoadingaset] = useState(false);
  const [errorMessage3, setErrorMessage3] = useState("");
  const [Loadinguser, setLoadinguser] = useState(false);
  const [Users, setUsers] = useState<User[]>([]);
  const [AdminUsers, setAdminUsers] = useState<User[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentSlice, setCurrentSlice] = useState<Network[]>([]);
  const [sliceIndex, setSliceIndex] = useState(0);
  const [ontapBuy_sell, setontapBuy_sell] = useState("Sell");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages,settotalPages]=useState()
  const [totalItems,settotalItems]=useState()


  const [currentPageSELL, setCurrentPageSELL] = useState(1);
  const [totalPagesSELL,settotalPagesSELL]=useState()
  const [totalItemsSELL,settotalItemsSELL]=useState()
  const [currentPageBUY, setCurrentPageBUY] = useState(1);
  const [totalPagesBUY,settotalPagesBUY]=useState()
  const [totalItemsBUY,settotalItemsBUY]=useState()


  // URLs
  const url = "wallet/assets";
  const url2 = `transactions?page=${currentPage}`;
  const url5 = `transactions?page=${currentPageBUY}&type=BUY`;
  const url6 = `transactions?page=${currentPageSELL}&type=SELL`;
  const url3 = `users?page=${currentPage}`;
  const url4 = "admin";

  // Fetch Transactions
  const gettransaction = async () => {
    setLoadingtr(true);
    try {
      const res = await AxiosGet(url2);
      setLoadingtr(false);
      if (res) {
        const fetchedTransactions = res.data.items;
        console.log('fetchedTransactions',fetchedTransactions);
        setTransaction(fetchedTransactions);
        settotalPages(res.data.meta.totalPages)
        settotalItems(res.data.meta.totalItems)
        console.log('fetchedTransactions',totalPages);
        console.log('fetchedTransactions',transaction);
      } else {
        console.error("No data found");
      }
    } catch (err: any) {
      setLoadingtr(false);
      handleNetworkError(err, setErrorMessage);
    }
  };
  const gettransactionBUY = async () => {
    setLoadingtr(true);
    try {
      const res = await AxiosGet(url5);
      setLoadingtr(false);
      if (res) {
        const fetchedTransactions = res.data.items;
        console.log('fetchedTransactions',fetchedTransactions);
        setTransactionBUY(fetchedTransactions);
        settotalPagesBUY(res.data.meta.totalPages)
        settotalItemsBUY(res.data.meta.totalItems)
        console.log('fetchedTransactions',transaction);
      } else {
        console.error("No data found");
      }
    } catch (err: any) {
      setLoadingtr(false);
      handleNetworkError(err, setErrorMessage);
    }
  };
  const gettransactionSELL= async () => {
    setLoadingtr(true);
    try {
      const res = await AxiosGet(url6);
      setLoadingtr(false);
      if (res) {
        const fetchedTransactions = res.data.items;
        // console.log('fetchedTransactions',fetchedTransactions);
        setTransactionSELL(fetchedTransactions);
        settotalPagesSELL(res.data.meta.totalPages)
        settotalItemsSELL(res.data.meta.totalItems)
        // console.log('fetchedTransactions',transaction);
      } else {
        console.error("No data found");
      }
    } catch (err: any) {
      setLoadingtr(false);
      handleNetworkError(err, setErrorMessage);
    }
  };

  // Fetch Assets Network Data
  const getnetwork = async (): Promise<boolean> => {
    setLoadingaset(true);
    try {
      const res = await AxiosGet(url);
      setLoadingaset(false);
      if (res) {
        setNetValue(res.data);
        setErrorMessage("");
        return true;
      } else {
        return false;
      }
    } catch (err: any) {
      setLoadingaset(false);
      handleNetworkError(err, setErrorMessage);
      return false;
    }
  };

  // Fetch Users
  const getusers = async (): Promise<boolean> => {
    setLoadinguser(true);
    try {
      const res = await AxiosGet(url3);
      setLoadinguser(false);
      if (res) {
        setUsers(res.data.items);
        settotalPages(res.data.meta.totalPages)
        settotalItems(res.data.meta.totalItems)
        setErrorMessage3("");
        return true;
      } else {
        return false;
      }
    } catch (err: any) {
      setLoadinguser(false);
      handleNetworkError(err, setErrorMessage3);
      return false;
    }
  };

  // Fetch Admin Users
  const getAdminusers = async (): Promise<boolean> => {
    setLoadingAdminuser(true);
    try {
      const res = await AxiosGet(url4);
      setLoadingAdminuser(false);
      if (res) {
        setAdminUsers(res.data);
        setErrorMessage4("");
        return true;
      } else {
        return false;
      }
    } catch (err: any) {
      setLoadingAdminuser(false);
      handleNetworkError(err, setErrorMessage4);
      return false;
    }
  };

  // Cycle Through NetValue for Display
  const cycleContent = () => {
    if (NetValue.length === 0) return;
    let nextIndex = sliceIndex + 2;
    if (nextIndex >= NetValue.length) {
      nextIndex = nextIndex - NetValue.length;
    }
    const newSlice = [
      ...NetValue.slice(sliceIndex, Math.min(sliceIndex + 2, NetValue.length)),
      ...NetValue.slice(0, Math.max(0, nextIndex - NetValue.length)),
    ];
    setCurrentSlice(newSlice);
    setSliceIndex(nextIndex);
  };

  // Effects
 

  useEffect(() => {
    // Fetch transactions when the component mounts or currentPage changes
    gettransaction();
    gettransactionSELL();
    gettransactionBUY();
  
    // Set up an interval to fetch transactions every 2 minutes
    const intervalId = setInterval(gettransaction, 120000);
  
    // Clear the interval when the component unmounts or currentPage changes
    return () => clearInterval(intervalId);
  }, [currentPage,currentPageBUY,currentPageSELL]);
  
  useEffect(() => {
    const fetchData = async () => {
      const success = await getnetwork();
      if (success && NetValue.length > 0) {
        setCurrentSlice(NetValue.slice(0, 2)); // Set first 2 items
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (NetValue.length > 0) {
      const intervalId = setInterval(cycleContent, 5000); // Cycle every 5 seconds
      return () => clearInterval(intervalId);
    }
  }, [NetValue, sliceIndex]);

  useEffect(() => {
    getusers();
    getAdminusers();
  }, []); // Only run once on mount

  return (
    <AdminCryptoContext.Provider
      value={{
        NetValue,
        currentSlice,
        setNetValue,
        getnetwork,
        transaction,
        setTransaction,
        transactionBUY,
        setTransactionBUY,
        transactionSELL,
        setTransactionSELL,
        // Amount_sent,
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
        usersId,
        setUsersId,
        Loadingtr,
        currentPage,
        setCurrentPage,
        totalItems,
        settotalItems,
        totalPages,
        settotalPages,
        currentPageSELL,
        setCurrentPageSELL,
        totalPagesSELL,
        settotalPagesSELL,
        currentPageBUY,
        setCurrentPageBUY,
        totalPagesBUY,
        settotalPagesBUY,
        buy_sell_all_state,
        setbuy_sell_all_state,
        NotificationCount,
        setNotificationCount,
      }}
    >
      {children}
    </AdminCryptoContext.Provider>
  );
};

// Custom Hook to use Admin Context
export const useAdminContext = () => {
  return useContext(AdminCryptoContext);
};
