import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Spinner,
} from '@chakra-ui/react';
import { AxiosAuthPatch } from '../axios/axios';

interface Notification {
  title: string;
  date: string;
  content: string;
  createdAt: any;
  read: boolean;
  _id: any;
}

type Modalopenin = {
  isOpen: any;
  onOpen: any;
  onClose: any;
  transactionId: any;
};

export default function Notifications({ isOpen, onOpen, onClose, transactionId }: Modalopenin) {
  const url2 = `notifications/${transactionId}/read`;
  const [Notifx, setNotifx] = useState<Notification>();
  const [loading, setLoading] = useState(true);

  const fetchNotfxById = async () => {
    try {
      const res = await AxiosAuthPatch(url2, {});
      if (res.data) {
        setNotifx(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setLoading(true); // Start loading
      fetchNotfxById(); // Fetch data
      setTimeout(() => {
        setLoading(false); // Stop loading after 2 seconds
      }, 2000);
    }
  }, [isOpen]);

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          width={['90%', '80%', '60%']}
          maxWidth="500px"
          mx="auto"
        >
          <ModalHeader>{loading ? 'Loading...' : Notifx?.title.toUpperCase() || 'Notification'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={'20px'}>
            {loading ? (
              <Spinner size="lg" /> // Display a loading spinner
            ) : (
              <p>{Notifx?.content.toLowerCase()  || 'No content available.'}</p>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
