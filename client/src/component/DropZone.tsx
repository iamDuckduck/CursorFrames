import { Box, Text, useToast } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { acceptedFile } from "../entities/acceptedFile";
import { useAcceptedFileStore } from "../store";
import { FileStatus } from "../entities/fileStatus";

const Dropzone = () => {
  const toast = useToast(); //ui toast
  const successToast = (fileLength: number) =>
    toast({
      title: `total ${fileLength} files uploaded`,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });

  const failedToast = (errorMessage: string, fileLength?: number) =>
    toast({
      title: `${fileLength} files have error`,
      description: <Text whiteSpace="pre-line">{errorMessage}</Text>, //pre-line
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top",
    });

  //style for drop area
  const style = {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const files = useAcceptedFileStore((s) => s.files); //stores accpetedFiles
  const setFiles = useAcceptedFileStore((s) => s.setAcceptedFiles);
  // const [rejected, setRejected] = useState<FileRejection[]>([]); //stores rejected files

  // avoid recreating the function by using useCallback
  const onDrop = useCallback(
    //function handles accepted files
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (acceptedFiles.length) {
        successToast(acceptedFiles.length);
        const newFiles = [
          ...files,
          ...acceptedFiles.map((file: File) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
              status: FileStatus.UPLOADED,
              downloadLink: "",
            })
          ),
        ];
        setFiles(newFiles);
      }

      //handles rejected files
      if (rejectedFiles?.length) {
        let errorMessage = "";
        rejectedFiles.forEach(
          (file) =>
            (errorMessage += `${file.file.name}: ${file.errors
              .map((error) => error.message)
              .join(", ")}\n`)
        );

        failedToast(errorMessage, rejectedFiles?.length);

        // setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]); //is this needed..?
      }
    },
    [] //was [setFiles]
  );

  //must include the style in getRootProps({})
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, //when file drops
    accept: { "image/gif": [".gif"], "image/ani": [".ani"] }, //files we accept
    maxSize: 1024 * 1000 * 10, //max size
    validator: duplicatedValidator(files), //custom validator that prevents duplication
  });

  return (
    <>
      <Box {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <Text textAlign="center">Drop the files here ...</Text>
        ) : (
          <Text textAlign="center">
            Drag 'n' drop some files here, or click to select files
          </Text>
        )}
      </Box>
    </>
  );
};

//utility function

//it receives savedFiles param and return a reference of the validation function that receives a File type Param
const duplicatedValidator = (savedFiles: acceptedFile[]) => (newFile: File) => {
  const duplicatedFile = savedFiles.find((file) => file.name === newFile.name);
  if (duplicatedFile)
    return {
      code: "duplicated file",
      message: "don't upload a duplicated file",
    };
  return null;
};

export default Dropzone;
