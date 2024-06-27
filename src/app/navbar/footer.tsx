import { HStack } from '@chakra-ui/react'
import React from 'react'
import navItems from './navitem'
import NavLink, { NavLinkMobile } from './navLink'
import navItemsM from './navItemMobile'

export default function Footer() {
  return (
    <HStack gap={'30'} >
    {navItemsM.map((item) => (
      <NavLinkMobile  key={item.title} items={item} />
    ))}
  </HStack>
  )
}

