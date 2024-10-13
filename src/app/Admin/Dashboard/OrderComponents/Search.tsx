'use client';

import { Flex, HStack, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FaSearch } from "react-icons/fa";
import React from 'react'
import { MdSearch } from 'react-icons/md';
import { useAdminContext } from '../../Admincontext';

// import { useDebounce, useDebouncedCallback } from 'use-debounce';
interface searchProps{
  placeholder:string;
}
export default function Search({placeholder}:searchProps) {
const{searchtr, setsearchtr}=useAdminContext()
  // console.log(searchparams)
  // console.log(pathname)
  return (
   
 <>
  <InputGroup>
    <InputLeftElement pointerEvents='none'>
      <FaSearch color='#A1A1AA' size={'13px'} />
    </InputLeftElement>
    <Input type='tel' placeholder='Type to search'
    fontSize={'12px'}
    fontWeight={'500px'} 
    value={searchtr}
    onChange={(e:any)=>setsearchtr(e.target.value)}/>
  </InputGroup></>
  )
}
export  function Search2({placeholder}:searchProps) {
  const{searchtr, setsearchtr}=useAdminContext()
    // console.log(searchparams)
    // console.log(pathname)
    return (
     
   <>
    <InputGroup>
      <InputLeftElement pointerEvents='none'>
        <FaSearch color='#A1A1AA' size={'13px'} />
      </InputLeftElement>
      <Input type='tel' placeholder='Type to search'
      fontSize={'12px'}
      fontWeight={'500px'} 
      value={searchtr}
      onChange={(e:any)=>setsearchtr(e.target.value)}/>
    </InputGroup></>
    )
  }
  