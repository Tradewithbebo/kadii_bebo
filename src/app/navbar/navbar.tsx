'use client'
import { Container,Box,Image, HStack,Text, Link } from "@chakra-ui/react";
import { useRouter,usePathname } from "next/navigation";
// import { useRouter } from "next/router";
import React from "react";
import { SlArrowLeft } from "react-icons/sl";
export default function Navbar() {

  const pathname=usePathname();
  const router = useRouter();

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default link behavior
    router.back(); // Go back in the browser history
  };

  return (
    <>
    <Box display={{ base: 'none', md: 'block' }}
   py={'60px'}
   px={'70px'}
   width={'full'}
   >
  <HStack
  justifyContent='space-between'
  width={'100%'}>
    <Link href="#" onClick={handleBackClick}     display= {pathname==='/createAccount/createAccount' && '/createAccount/Login' && '/createAccount/ResetPassword'&& '/createAccount/SuccesS'? 'none':'block'}>
    <Box>
       <HStack
       gap={'1px'}>
       <Box>
          <SlArrowLeft size={12} />
        </Box>
       <Text 
        fontWeight={'600'}
        fontSize={'14px'}
        >
            Back
        </Text>

      
       </HStack>
    </Box>
     </Link>
  <HStack
    gap={'5px'}>
    <Image
    height='15px'
    width='12px'
    objectFit='cover'
    src='/image/logo.png'
    alt='Bebo'
  />
  <Box  height='13px'
    width='39px'>
  <Image src='/image/Bebo.png'
    alt='Bebo' />
</Box>
    </HStack>


  </HStack>
    
   </Box>
   <Box display={{ base: 'block', md: 'none' }}
   pt={'31px'}
   pb={'32px'}
   px={'22px'}
   width={'full'}>
   <HStack
    gap={'5px'}>
      <Box>
      <Link href="#" onClick={handleBackClick}     display= {pathname==='/createAccount/createAccount' && '/createAccount/Login' && '/createAccount/ResetPassword'&& '/createAccount/SuccesS'? 'none':'block'}>
          <SlArrowLeft size={12} />
      </Link>
      </Box>
    <Image
    height='15px'
    width='12px'
    objectFit='cover'
    src='/image/logo.png'
    alt='Bebo'
  />
  <Box  height='13px'
    width='39px'>
  <Image src='/image/Bebo.png'
    alt='Bebo' />
</Box>

    </HStack>
   </Box>
    </>
  )
}
