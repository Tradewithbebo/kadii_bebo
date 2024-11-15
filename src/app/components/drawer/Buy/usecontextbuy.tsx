import { AxiosGet } from '@/app/axios/axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Create a Context for the crypto values
const CryptoContext = createContext<any>(null);

export const CryptoProvider = ({ children }: { children: React.ReactNode }) => {
  // State variables shared across components
  const [NotificationCount, setNotificationCount] = useState(null)
  const [userProfile, setUserProfile] = useState("")
  const [Conversion, setConversion] = useState<number | null>(null);
  const [Conversion2, setConversion2] = useState<number | null>(null);
  const [sellConversion2, setsellConversion2] = useState<number | null>(null);
  const [sellConversion, setsellConversion] = useState<number | null>(null);
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState(null);
  const [network, setNetwork] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [Name, setName] = useState('');
  const [refreshName, setrefreshName] = useState('');
  const [toprice, settoprice] = useState("");
  const [Symbols, setSymbols] = useState("");
  const [currentsImage, setcurrentsImage] = useState('');
  const [currentsName, setcurrentsName] = useState('');
  const [menucurrent_price, setmenucurrent_price] = useState('');
  const [menusymbol, setmenusymbol] = useState('');
  const [menuimage, setmenuimage] = useState('');
  const [menuname, setmenuname] = useState('');
  const [selectedimage, setselectedimage] = useState("/image/crypto.png");
  const [BTCrate, setBTCRate] = useState("");
  const [rate, setRate] = useState("");
  const [networkOptions, setNetworkOptions] = useState<NetworkOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState("");
  const [Refreshingprice, setRefreshingprice] = useState();
  const [Wetrade, setWetrade] = useState('');
  const [sellWetrade, setsellWetrade] = useState('');
  const [accountName, setaccountName] = useState('');
  const [accountid, setaccountid] = useState('');
  const [bankName, setbankName] = useState('');
  const [accountNumber, setaccountNumber] = useState('');
  const [blockchain, setblockchain] = useState('');
  const [sellRate, setsellRate] = useState(50);
  const [sellimage, setsellimage] = useState('');
  const [sellsymbol, setsellsymbol] = useState('');
  // const [selectedSellNetwork, setSelectedSellNetwork] = useState<Network>();
  // const [currency,setcurrency]=useState(false)
  const [sellvalueusdt, setsellvalueusdt] = useState('');
  const [sellvalunaira, setsellvaluenaira] = useState('');
  const [Address, setAddress] = useState('');
  const [transactionId, settransactionid] = useState("");
  
  const [NetValue, setNetValue] = useState<Network[]>([]);
  
  
  interface Network {
    image: any;
    symbol: any;
    name: any;
    current_price: any;
  }
  const networks = [
    {
      "cryptocurrency": "Bitcoin",
      "network": "Bitcoin Network",
      "Address":"1AQewX4JjNQ6Y6s3SRZYr1PFNQhsTAug1p"
    },
    {
      "cryptocurrency": "Tether",
      "network": "TRC20 Network",
      "Address":"TVUWkKu3HnAEiCxKJMGoYr6w5E74yofbyd"
    },
    {
      "cryptocurrency": "Ethereum",
      "network": "ERC20 Network",
       "Address":"0x5B19a7F1995adEa1AE60aE30eA59D4432B247bbF"
    },
    {
      "cryptocurrency": "TRON",
      "network": "TRC20 Network",
       "Address":"TUqW77ZvFip3sKVYmoCpgamfrAaPJKVU6n"
    },
    {
      "cryptocurrency": "Dogecoin",
      "network": "ERC20 Network",
       "Address":"DHcFsqLhzG7s74ZFKEf6X8iC5CQr8s3Ntj"
    },
    {
      "cryptocurrency": "BNB",
      "network": "BSC Network",
      "Address":"0x7857734A28cb4ecF5c5601D74D5131C88eDAC9b7"
    }
  ];
  useEffect(() => {
    // Find the selected network based on menuname (cryptocurrency)
    const selectedNetwork = networks.find(item => item.cryptocurrency === menuname);
    
    // If a match is found, update the Wetrade state with the network
    if (selectedNetwork) {
      setWetrade(selectedNetwork.network);
    } else {
      setWetrade('not available'); // Reset Wetrade if no match is found
    }
  }, [menuname]);
  useEffect(() => {
    // Find the selected network based on menuname (cryptocurrency)
    const selectedNetwork = networks.find(item => item.cryptocurrency === blockchain);
    
    // If a match is found, update the Wetrade state with the network
    if (selectedNetwork) {
      setsellWetrade(selectedNetwork.network);
      setAddress(selectedNetwork.Address)
    } else {
      setsellWetrade('not available'); // Reset Wetrade if no match is found
    }
  }, [blockchain]);

  const url = "wallet/assets";
  type NetworkOption = {
    title: string;
    current_price: any;
    name: string;
    symbol: any;
    // menu: JSX.Element;
    image?: string; // Optional if you have an image property
  };

  type UsersProfile = {
   
    // menu: JSX.Element;
    image?: string; // Optional if you have an image property
  };

  const getnetwork = async () => {
    try {
      const res = await AxiosGet(url);
      if (res) {
        const btcData = res.data.find(
          (crypto: any) => crypto.name === "Bitcoin"
        );
  
        if (btcData) {
          setRate(
            new Intl.NumberFormat("en-NG").format(btcData.current_price)
          );
          setmenucurrent_price(btcData.current_price);
          setmenuimage(btcData.image);
          setmenusymbol(btcData.symbol);
          setmenuname(btcData.name);
        }
  
        setNetworkOptions(res.data);
        setErrorMessage(""); // Clear error message on success
        return true;
      }
    } catch (err: any) {
      let message = "Check your Network and try again.";
      if (err.response && err.response.data && err.response.data.message) {
        message = err.response.data.message;
      }
      setErrorMessage(message);
    }
    return false;
  };
  

  const getUserProfile = async () => {
    const url0='auth/me'
    try {

      const res = await AxiosGet(url0);
      if (res) {
      
        setUserProfile(res.data);
        setErrorMessage(""); // Clear error message on success
        return true;
      }
    } catch (err: any) {
      let message = "Check your Network and try again.";
      if (err.response && err.response.data && err.response.data.message) {
        message = err.response.data.message;
      }
      setErrorMessage(message);
    }
    return false;
  };
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined = undefined;
  
    const fetchData = async () => {
      setLoading(true);
      const success = await getnetwork();
      setLoading(false);
  
      if (!success) {
        timeoutId = setTimeout(fetchData, 2000); // Retry after 2 seconds if failed
      }
    };
  
    fetchData(); // Initial call
    fetchUserData();
    getUserProfile()
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId); // Clear the timeout if it exists
      }
    };
  }, []);
  const url2='auth/me'
 // Example of setting the userId after an API call or another process
 const fetchUserData = async () => {
  try {
    const response = await AxiosGet(url2); // Your API endpoint
    console.log('Full response:', response); // Log the response to verify
    if (response && response.data && response.data._id) {
      // console.log('User ID:', response.data._id); // Log the user ID to confirm
      setUserId(response.data._id); // Set the user ID to state
    } else {
     
    }
  } catch (error) {
  }
};
useEffect(() => {
  
}, []);

  return (
    <CryptoContext.Provider
      value={{
        Address,
        setAddress,
        accountid,
        setaccountid,
        sellWetrade,
        setsellWetrade,
        // selectedNetwork,
        // selectedSellNetwork,
        // setSelectedSellNetwork,
        Refreshingprice,
        setmenucurrent_price,
        menucurrent_price,
        menuimage,
        setmenuimage,
        menusymbol,
        setmenusymbol,
        menuname,
        setmenuname,
        Symbols,
        setNetwork,
        setSymbols,
        setName,
        settoprice,
        toprice,
        setcurrentsImage,
        setcurrentsName,
        network,
        currentsImage,
        currentsName,
        Name,
        Conversion,
        setConversion,
        setConversion2,
        Conversion2,
        Wetrade,
        setWetrade,
        userId,
        setUserId,
        blockchain,
        setblockchain,
        setaccountName,
        setbankName,
        setaccountNumber,
        sellRate,
        setsellRate,
        sellimage,
        setsellimage,
        sellsymbol,
        setsellsymbol,
        sellConversion,
        setsellConversion,
        sellConversion2,
        setsellConversion2,
        // currency,
        // setcurrency,
        sellvalunaira,
        setsellvaluenaira,
        sellvalueusdt,
        setsellvalueusdt,
        transactionId,
        settransactionid,
        networks,
        userProfile,
        setUserProfile,
        NotificationCount,
         setNotificationCount
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};

// Custom hook to use the context in other components
export const useCryptoContext = () => useContext(CryptoContext);
