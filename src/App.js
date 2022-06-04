import { React, useState } from 'react';
import {
  ChakraProvider,
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Grid,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import ConnectWallet from './comps/ConnectWallet';
import DashBoard from './comps/DashBoard';
import theme from './.theme';
import Background from './comps/Background';

function App() {
  const [address, setAddr] = useState('');
  const [accounts, setAccount] = useState([]);
  const [user, setUser] = useState([]);
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Background />
        <Flex>
          <ColorModeSwitcher justifySelf="flex-end" />
          <Spacer />

          <Spacer />
          <ConnectWallet
            setAddr={setAddr}
            accounts={accounts}
            setAccounts={setAccount}
            setUser={setUser}
            user={user}
          />
        </Flex>
        <Box
          alignItems="center"
          justifyContent="center"
          display="flex"
          flexDir="column"
        >
          <DashBoard setAddr={setAddr} address={address} user={user} />
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
