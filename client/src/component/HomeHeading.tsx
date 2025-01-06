import { Box, Heading, Text } from "@chakra-ui/react";

const homeHeading = () => {
  return (
    <Box textAlign="center">
      <Heading paddingBottom={2} fontSize="50px">
        Gif/Ani to Frames Converter
      </Heading>
      <Text fontSize="20px">
        A tool to convert Gif/Ani to individual Frames online for free.
      </Text>
    </Box>
  );
};

export default homeHeading;
