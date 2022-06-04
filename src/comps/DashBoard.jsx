import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Portfolio from './Portfolio';
const DashBoard = ({ account, address, setAddr, user }) => {
  const [chainId, setChainId] = useState(137);
  const [balance, setBalance] = useState({});

  // Covalent API request setup

  const nft = true;
  const url = new URL(
    `https://api.covalenthq.com/v1/${chainId}/address/${address}/balances_v2/?quote-currency=USD&format=JSON&nft=true&no-nft-fetch=false&key=${process.env.REACT_APP_API_KEY}`
  );

  const fetchData = async () => {
    console.log(address);
    Axios.get(url).then(res => {
      setBalance(res.data.data.items);
      return res.data.data.items;
    });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    fetchData();
  };
  const handleMine = async e => {
    e.preventDefault();
    setAddr(user ? user[0] : '');
    fetchData();
  };
  return (
    <>
      <Box w="30%">
        <Button colorScheme="yellow" m={3} onClick={handleMine}>
          My Portfolio
        </Button>
        <form onSubmit={handleSubmit}>
          <Flex>
            <FormControl isRequired>
              <Input
                id="address"
                placeholder="wallet address"
                onChange={e => setAddr(e.target.value)}
              />
            </FormControl>
            <Button type="submit" colorScheme="purple">
              Search
            </Button>
          </Flex>
        </form>
      </Box>
      {JSON.stringify(balance) !== '{}' && <Portfolio balance={balance} />}
    </>
  );
};

export default DashBoard;
