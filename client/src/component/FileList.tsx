import {
  Box,
  Heading,
  Text,
  Image,
  CloseButton,
  Spinner,
  Button,
} from "@chakra-ui/react";
import FileAniItem from "./FileAniItem";
import { useAcceptedFileStore, useConvertingStore } from "../store";
import { FileStatus } from "../entities/fileStatus";
import { acceptedFile } from "../entities/acceptedFile";

const FileList = () => {
  const files = useAcceptedFileStore((s) => s.files); //stores accpetedFiles
  const setUpdateFiles = useAcceptedFileStore((s) => s.setUpdateFiles);
  const removeFile = (name: string) => {
    const filteredFile = files.filter((file) => file.name !== name);
    setUpdateFiles(filteredFile);
  };

  const isConverting = useConvertingStore((s) => s.isConverting); //stores accpetedFiles

  const handleDownload = (URL: string, file: acceptedFile) => {
    // Create a temporary link element to trigger the download
    const downloadLink = document.createElement("a");
    downloadLink.href = URL;
    downloadLink.download = `${file.name.split(".")[0]}.zip`; // Default filename for the download
    downloadLink.click(); // Programmatically click the link to trigger the download
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
          {file.status === FileStatus.ERROR && <Text>{file.errorMsg}</Text>}
          {file.name.split(".")[1] == "gif" ? (
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

          <Box position="absolute" bottom="5" right="5">
            {file.status == FileStatus.CONVERTING && <Spinner></Spinner>}
            {file.downloadLink && (
              <Button onClick={() => handleDownload(file.downloadLink, file)}>
                Download
              </Button>
            )}
          </Box>

          {!isConverting && file.status !== FileStatus.CONVERTING && (
            <CloseButton
              position="absolute"
              top="0"
              right="0"
              aria-label="cancel"
              onClick={() => removeFile(file.name)}
            ></CloseButton>
          )}
        </Box>
      ))}
    </>
  );
};

export default FileList;
