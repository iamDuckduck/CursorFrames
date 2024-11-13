import React, { useState } from "react";
import { Box, Button, Image, Input, Text, VStack } from "@chakra-ui/react";

const FileInput = () => {
  return (
    <Box>
      <Input type="file" accept="image/gif" cursor="pointer" />
      <Button colorScheme="red">click</Button>
    </Box>
  );
};

export default FileInput;
