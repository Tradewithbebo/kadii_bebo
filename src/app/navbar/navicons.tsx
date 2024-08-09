'use client'

import React from 'react'
import { AiOutlineSwap } from "react-icons/ai";
import { IoIosSettings } from "react-icons/io";
import { FaFolderMinus } from "react-icons/fa6";
import { usePathname } from 'next/navigation';

// const pathname =usePathname

export  function AiOutlineSwaps({path}:{path:any}) {
    const pathname = usePathname() == path
  return (
    <AiOutlineSwap size={"18px"} color={pathname ? "#099137" :"#999999"} />
  )
}
export  function IoIosSettingss({path}:{path:any}) {
    const pathname = usePathname() == path;
    return (
      <IoIosSettings size={"18px"} color={pathname ? "#099137" :"#999999"} />
    )
  }
  export  function FaFolderMinuss({path}:{path:any}) {
    const pathname = usePathname() == path;
    return (
        <FaFolderMinus size={"18px"}color={pathname ? "#099137" :"#999999"}/>
    )
  }
  export  function AiOutlineSwapsM({path}:{path:any}) {
    const pathname = usePathname() == path
  return (
    <AiOutlineSwap size={"18px"} color={pathname ? "#099137" :"#999999"} />
  )
}
export  function IoIosSettingssM({path}:{path:any}) {
    const pathname = usePathname() == path;
    return (
      <IoIosSettings size={"18px"} color={pathname ? "#099137" :"#999999"} />
    )
  }
  export  function FaFolderMinussM({path}:{path:any}) {
    const pathname = usePathname() == path;
    return (
        <FaFolderMinus size={"16px"}color={pathname ? "#099137" :"#999999"}/>
    )
  }
