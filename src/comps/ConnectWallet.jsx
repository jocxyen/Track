import {
  Button,
  Modal,
  Box,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
  useDisclosure,
  Center,
  Text,
  Image,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import UAuth from '@uauth/js';
import Identicon from 'react-hooks-identicons';

const ConnectWallet = ({ accounts, setAccounts, setAddr, user, setUser }) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const uauth = new UAuth({
    clientID: process.env.REACT_APP_ID,
    redirectUri: 'http://localhost:3000',
    scope: 'openid wallet',
  });
  useEffect(() => {
    uauth
      .user()
      .then(res => {
        console.log(res);
        setAccounts([res.sub]);
        setUser([res.wallet_address]);
      })
      .catch(console.error)
      .finally(() => {
        console.log('Accounts: ' + accounts);
        console.log('User: ' + user);
      });
  }, []);
  const login = async () => {
    onClose();
    try {
      uauth
        .loginWithPopup()
        .then(res =>
          setAccounts([res.sub]).then(res =>
            setAddr(res.idToken.wallet_address)
          )
        )
        .catch(setError)
        .finally(() => console.log('Account: ' + accounts));
    } catch (error) {
      console.error(error);
    }
  };
  const connect = async () => {
    onClose();
    if (window.ethereum) {
      try {
        const res = await window.ethereum
          .request({
            method: 'wallet_requestPermissions',
            params: [{ eth_accounts: {} }],
          })
          .then(() =>
            window.ethereum.request({ method: 'eth_requestAccounts' })
          );
        setAccounts(res);
        setAddr(res);
        console.log(res);
        toast({
          title: 'Connected',
          status: 'success',
          isClosable: true,
        });
      } catch (err) {
        console.log(err);
        toast({
          title: 'Error',
          status: 'error',
          isClosable: true,
        });
      }
    } else {
      toast({
        title: 'Metamask Not Found',
        status: 'warning',
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button
        onClick={onOpen}
        size="md"
        m={4}
        colorScheme="green"
        fontWeight="extrabold"
        borderRadius={20}
      >
        {accounts[0] ? 'Connected✅' : 'Connect Wallet🦊'}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w="100%">
          <ModalHeader>
            <Center>
              <Identicon string={accounts[0]} size={50} bg="white" />
            </Center>
            <Text textAlign="center" isTruncated>
              {accounts[0] && accounts ? `${accounts[0]}` : 'Not Connected'}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <Box
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
          >
            <ModalBody w="100%">
              <Box display="flex" flexDir="column">
                {accounts[0] ? (
                  <Button
                    w="100%"
                    onClick={() => setAccounts([])}
                    colorScheme="yellow"
                    mb={3}
                  >
                    Disconnect
                  </Button>
                ) : (
                  <>
                    <Button colorScheme="blue" onClick={login}>
                      Login with Unstoppable Domain
                      <Image
                        w="30px"
                        src="https://cdn.unstoppabledomains.com/zzVlwNPw9y5iVVt0QdGn5Yj171U=/images/logos/unstoppabledomains.png"
                      />
                    </Button>
                    <Button
                      w="100%"
                      onClick={connect}
                      colorScheme="yellow"
                      mb={3}
                    >
                      Connect Wallet🦊
                    </Button>
                  </>
                )}
              </Box>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="teal" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConnectWallet;
