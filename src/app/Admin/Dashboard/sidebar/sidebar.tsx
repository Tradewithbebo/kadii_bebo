'use client'

import { Box, GridItem, SimpleGrid, Text, List, ListIcon, Button } from '@chakra-ui/react';
import React from 'react'
import menuItems, { dashboard, settings } from './menuItems'
import Menulink, { Menulinkdasboard, Settings } from './menulink'
import { useRouter } from 'next/navigation';
import { MdLogout } from 'react-icons/md';
// import { settings } from './menuItems';

export default function 
Sidebar() {
  const router=useRouter()
  return (
   <SimpleGrid  position="sticky" top="40px" pt={'56px'} column={1} pl={'40px'} >
    <GridItem>
        <Menulinkdasboard items={dashboard.list}/>

    </GridItem>
   { menuItems.map((origin)=>(<GridItem key={origin.title} > 
        
       <Text color={'#A1A1AA'} fontWeight={'500'} fontSize={'16px'} mb={'16px'}>{origin.title}</Text>
     { origin.list.map((item)=>(<Menulink items={item} key={item.title}/>)) }
        </GridItem>
    ))}
   <GridItem mt={'40px'}>
{ settings.list.map((set,index)=>(
        <Settings items={set}  key={set.title}/>))}
        
<Button  variant={''} color={'#3F3F46'} fontWeight={'500'} fontSize={'13px'} onClick={ () => {
  localStorage.removeItem("stk-apk");
  router.push("/Admin/Login");}
}><MdLogout/>&nbsp;&nbsp;&nbsp;Logout</Button>
    </GridItem>
   </SimpleGrid>
  )
}
