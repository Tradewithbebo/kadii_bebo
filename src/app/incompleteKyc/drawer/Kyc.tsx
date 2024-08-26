import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay
} from '@chakra-ui/react';
import React from 'react';
import Kkyc from '@/app/Kyc/Kyc/page';

export default function Kyc({
  isOpenone,
  onCloseone,
}: {
  isOpenone: any;
  onCloseone: any;
}) {
  return (
    <Drawer
      isOpen={isOpenone}
      placement="right"
      onClose={onCloseone}
      size={["sm", "sm"]}
    >
      <DrawerOverlay />
      <DrawerContent overflowY="auto">
        <DrawerCloseButton />
        <Box pt={["30px", "0px"]}>
          <Kkyc />
        </Box>
      </DrawerContent>
    </Drawer>
  );
}
