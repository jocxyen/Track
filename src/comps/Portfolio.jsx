import {
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  VStack,
  Image,
  Spacer,
  Button,
  Link,
  Heading,
} from '@chakra-ui/react';
import React from 'react';

const Portfolio = ({ balance }) => {
  //console.log(balance[0]);
  //balance.map(i => console.log(i));
  return (
    <Box w="100%" p="4">
      <Tabs variant="enclosed" isFitted mt={8}>
        <TabList>
          <Tab _selected={{ bgGradient: 'linear(to-l, teal.300, purple.300)' }}>
            Tokens
          </Tab>
          <Tab
            _selected={{
              bgGradient: 'linear(to-l, teal.300, purple.300)',
            }}
          >
            Collectibles
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel h="50vh">
            {balance
              .filter(i => i.quote > 0.0001)

              .filter(i => i.balance > 0.001)
              .map((i, index) => {
                return (
                  <Box
                    key={index}
                    bgColor="rgba(255, 255, 255, .15)"
                    backdropBlur="5px"
                    m={4}
                    p={4}
                    borderRadius="20px"
                  >
                    <Flex>
                      <Image
                        w="50px"
                        h="50px"
                        src={i.logo_url}
                        borderRadius="100%"
                      />
                      <VStack>
                        <Text>{i.contract_ticker_symbol}</Text>
                        <Text>${i.quote_rate}</Text>
                      </VStack>
                      <Spacer />
                      <VStack>
                        <Text>
                          {(i.balance / 10 ** i.contract_decimals).toFixed(2)}
                        </Text>
                        <Text>${i.quote.toFixed(2)}</Text>
                      </VStack>
                    </Flex>
                  </Box>
                );
              })}
          </TabPanel>
          <TabPanel h="50vh">
            <Flex flexWrap="wrap">
              {balance.map(function (i) {
                if (i.nft_data != null && i.nft_data.length > 0) {
                  console.log(i);
                  return (
                    <Box
                      m={4}
                      p={2}
                      borderRadius="20px"
                      w="20%"
                      bgColor="rgba(255, 255, 255, .15)"
                      backdropBlur="5px"
                    >
                      <Flex flexDir="column" h="100%" alignItems="center">
                        {i.nft_data[0].external_data?.image ? (
                          <Image
                            w="80px"
                            h="80px"
                            src={i.nft_data[0].external_data.image}
                            borderRadius="100%"
                          />
                        ) : (
                          ''
                        )}
                        <Heading
                          fontWeight="extrabold"
                          fontSize="2xl"
                          bgGradient="linear(to-l, purple.200, teal.300)"
                          bgClip="text"
                        >
                          {i.nft_data[0]?.external_data?.name}
                        </Heading>

                        <Text>{i.contract_name}</Text>
                        <Text>{i.contract_ticker_symbol}</Text>
                        <Spacer />
                        <Link href={i.nft_data[0].token_url} isExternal>
                          <Button colorScheme="blue">Details</Button>
                        </Link>
                      </Flex>
                    </Box>
                  );
                }
              })}
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Portfolio;
