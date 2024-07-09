'use client'

import React, { useEffect } from 'react'
import Bard, { Bardtwo } from '../card/card'
import { Box } from '@chakra-ui/react'
import Dashboardcomponent from '../dashboardcomponents/dashboard'
// import { useAuth } from '../../useAuth'

export default function page() {

  return (
   
   <> 
   <Box mb={'24px'}><Bard></Bard></Box>
    <Bardtwo/>
    <Dashboardcomponent/>
    </>
  )
}
