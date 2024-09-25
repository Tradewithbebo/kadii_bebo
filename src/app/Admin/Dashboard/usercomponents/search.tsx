'use client';

import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import React, { ChangeEvent } from 'react';
import { useAdminContext } from '../../Admincontext';

interface SearchProps {
  placeholder: string;
}

export default function Search({ placeholder }: SearchProps) {
  const { searchUser, setsearchUser } = useAdminContext();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setsearchUser(e.target.value);
  };

  return (
    <>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <FaSearch color="#A1A1AA" size={'13px'} />
        </InputLeftElement>
        <Input
          type="text"
          placeholder={placeholder} // Use the placeholder prop
          fontSize="12px"
          fontWeight="500" // Corrected from '500px'
          value={searchUser}
          onChange={handleInputChange}
        />
      </InputGroup>
    </>
  );
}
