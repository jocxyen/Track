import { Box, Center, HStack } from "@chakra-ui/react";
import React from "react";

const Background = () => {
  return (
    <Box pos="fixed" zIndex={-1}>
      <Center>
        <HStack>
          <Box
            opacity="0.6"
            filter="auto"
            blur="95px"
            bgGradient="linear(to-r, blue.400, cyan.200)"
            h="400px"
            w="400px"
            borderRadius="50%"
            marginY={28}
          />
          <Box
            opacity="0"
            filter="auto"
            blur="95px"
            bgGradient="linear(to-r, purple.300, yellow.300)"
            h="400px"
            w="400px"
            borderRadius="50%"
          />
        </HStack>
        <Box
          top="60%"
          left="80%"
          opacity="0.6"
          filter="auto"
          blur="95px"
          h="400px"
          w="400px"
          borderRadius="50%"
          bgColor="teal.300"
        />
      </Center>
      <Box
        opacity="0.6"
        filter="auto"
        blur="95px"
        bgGradient="linear(to-r, purple.500, yellow.400)"
        h="400px"
        w="400px"
        borderRadius="50%"
        bottom={["-50%", "-20%"]}
        left="51%"
        pos="absolute"
      />
    </Box>
  );
};

export default Background;
