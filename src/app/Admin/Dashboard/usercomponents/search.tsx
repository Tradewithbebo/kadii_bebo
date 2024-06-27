'use client';

import { Flex, HStack, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FaSearch } from "react-icons/fa";
import React from 'react'
import { MdSearch } from 'react-icons/md';
// import { useDebounce, useDebouncedCallback } from 'use-debounce';
interface searchProps{
  placeholder:string;
}
export default function Search({placeholder}:searchProps) {

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
    fontWeight={'500px'} />
  </InputGroup></>
  )
}
