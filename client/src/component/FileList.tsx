import { Box, Heading, Text, Image, CloseButton } from "@chakra-ui/react";
import FileAniItem from "./FileAniItem";
import { useAcceptedFileStore } from "../store";

const FileList = () => {
  const files = useAcceptedFileStore((s) => s.files); //stores accpetedFiles
  const setFiles = useAcceptedFileStore((s) => s.setAcceptedFiles);

  const removeFile = (name: string) => {
    const filteredFile = files.filter((file) => file.name !== name);
    setFiles(filteredFile);
  };

  return (
    <>
      {files.length !== 0 && <Heading paddingY={5}>Your files</Heading>}
      {files.map((file) => (
        <Box
          key={file.name}
          padding={3}
          position="relative"
          border="1px"
          borderRadius={5}
          marginY={3}
        >
          <Text paddingBottom={5}>{file.name}</Text>

          {file.name.split(",")[1] == "gif" ? (
            <Image
              src={file.preview}
              alt={file.name}
              width={100}
              height={100}
              onLoad={() => {
                URL.revokeObjectURL(file.preview);
              }}
            ></Image>
          ) : (
            <FileAniItem aniFile={file}></FileAniItem>
          )}

          <CloseButton
            position="absolute"
            top="0"
            right="0"
            aria-label="cancel"
            onClick={() => removeFile(file.name)}
          ></CloseButton>
        </Box>
      ))}
    </>
  );
};

export default FileList;
