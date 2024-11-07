import { HStack } from '@chakra-ui/react';
import React from 'react';
import navItems from './navitem';
import NavLink, { NavLinkMobile } from './navLink';
import navItemsM from './navItemMobile';

export default function Footer() {
  return (
    <HStack
      // gap={[ '80px']} // Adjusting gap for mobile, tablet, and desktop
      justifyContent={'space-between'}
      display={'flex'}
      py={['10px', '15px', '20px']} // Padding for mobile, tablet, and desktop
     w={'100dvw'}
      alignItems={'center'}
      px={'35px'}
    >
      {navItemsM.map((item) => (
        <NavLinkMobile key={item.title} items={item} />
      ))}
    </HStack>
  );
}
