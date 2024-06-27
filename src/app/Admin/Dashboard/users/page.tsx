import React from 'react'
import Usercard from '../usercomponents/Usercard'
import Usersearch from '../usercomponents/Usersearch'
import Usertable from '../usercomponents/Usertable'
import { Box } from '@chakra-ui/react'

export default function page() {
  return (
    <Box mb={'24px'}><Usercard/>
    <Usersearch/>
    <Usertable/>
    </Box>
  )
}
