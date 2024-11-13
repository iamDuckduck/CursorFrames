import React, { useState } from "react";
import { Box, Image, VStack } from "@chakra-ui/react";

//DragDropFile is a interface that fixed the viewpoint, it only appears when user drag a gif/ani file to the window
function DragDropFile() {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    console.log("handleDragEnter");
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    console.log("handleDragLeave");
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    console.log("handleDrop");

    const files = e.dataTransfer.files;
  };

  return (
    <Box
      position="fixed" // Ensure it stays fixed even when scrolling
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      zIndex="1000"
      // borderColor={isDragging ? "blue.400" : "transparent"}
      // bg={isDragging ? "blue.50" : "transparent"}
      display="flex"
      alignItems="center"
      justifyContent="center"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <VStack spacing={4} pointerEvents="none">
        {isDragging && (
          <Image
            src="https://via.placeholder.com/150?text=Drop+file+here"
            alt="Drop file here"
            boxSize="600px"
          />
        )}
      </VStack>
    </Box>
  );
}

export default DragDropFile;
