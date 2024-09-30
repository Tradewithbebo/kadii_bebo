import React from 'react'

import { Box } from '@chakra-ui/react'
import Usercard from '../Adminusercomponents/AdminUsercard'
import Usersearch from '../usercomponents/Usersearch'
import Usertable from '../Adminusercomponents/AdminUsertable'
// import Usertable from '../Adminusercomponents/AdminUsertable'

export default function page() {
  return (
    <Box mb={'24px'}><Usercard/>
    <Usersearch/>
    <Usertable/>
    </Box>
  )
}
