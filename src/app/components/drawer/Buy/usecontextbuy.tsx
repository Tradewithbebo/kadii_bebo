import { AxiosGet } from '@/app/axios/axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Create a Context for the crypto values
const CryptoContext = createContext<any>(null);

export const CryptoProvider = ({ children }: { children: React.ReactNode }) => {
  // State variables shared across components
  const [Conversion, setConversion] = useState<number | null>(null);
  const [Conversion2, setConversion2] = useState<number | null>(null);
  const [step, setStep] = useState(1);
  const [network, setNetwork] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [Name, setName] = useState('');
  const [refreshName, setrefreshName] = useState('');
  const [toprice, settoprice] = useState(0);
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
  const networks = [
    {
      "cryptocurrency": "Bitcoin",
      "network": "Bitcoin Network"
    },
    {
      "cryptocurrency": "USDT",
      "network": "TRC20 Network"
    },
    {
      "cryptocurrency": "Ethereum",
      "network": "ERC20 Network"
    },
    {
      "cryptocurrency": "TRON",
      "network": "TRC20 Network"
    },
    {
      "cryptocurrency": "Dogecoin",
      "network": "ERC20 Network"
    },
    {
      "cryptocurrency": "BNB",
      "network": "BSC Network"
    }
  ];
  useEffect(() => {
    // Find the selected network based on menuname (cryptocurrency)
    const selectedNetwork = networks.find(item => item.cryptocurrency === menuname);
    
    // If a match is found, update the Wetrade state with the network
    if (selectedNetwork) {
      setWetrade(selectedNetwork.network);
    } else {
      setWetrade(''); // Reset Wetrade if no match is found
    }
  }, [menuname]);

  const url = "wallet/assets";
  type NetworkOption = {
    title: string;
    current_price: any;
    name: string;
    symbol: any;
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
  
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId); // Clear the timeout if it exists
      }
    };
  }, []);
  
 
  return (
    <CryptoContext.Provider
      value={{
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
        setWetrade
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};

// Custom hook to use the context in other components
export const useCryptoContext = () => useContext(CryptoContext);
