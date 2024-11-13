import { Box, Text, useToast } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import FileList from "./FileList";
import { acceptedFile } from "../entities/acceptedFile";
import { useAcceptedFileStore } from "../store";

//it receives savedFiles param when it calls and return the actual validation function as reference
const duplicatedValidator = (savedFiles: acceptedFile[]) => (newFile: File) => {
  const duplicatedFile = savedFiles.find((file) => file.name === newFile.name);
  if (duplicatedFile)
    return {
      code: "duplicated file",
      message: "don't upload a duplicated file",
    };
  return null;
};

const Dropzone = () => {
  const style = {
    //style for drop area
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  // const [files, setFiles] = useState<acceptedFile[]>([]); //stores accpetedFiles
  const files = useAcceptedFileStore((s) => s.files); //stores accpetedFiles
  const setFiles = useAcceptedFileStore((s) => s.setAcceptedFiles);
  const [rejected, setRejected] = useState<FileRejection[]>([]); //stores rejected files

  const toast = useToast(); //ui toast

  // avoid recreating the function with useCallback
  const onDrop = useCallback(
    //the callback function file drops
    //handles accepted files
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (acceptedFiles.length) {
        toast({
          title: `total ${acceptedFiles.length} files uploaded`,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });

        const newFile = [
          ...files,
          ...acceptedFiles.map((file: File) =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
          ),
        ];

        setFiles(newFile);
        // setFiles((previousFiles) => [
        //   ...previousFiles,
        //   ...acceptedFiles.map((file: File) =>
        //     Object.assign(file, { preview: URL.createObjectURL(file) })
        //   ),
        // ]);
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

        toast({
          title: `${rejectedFiles.length} files have error`,
          description: errorMessage,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });

        setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
      }
    },
    []
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

      <FileList files={files} setFiles={setFiles}></FileList>
    </>
  );
};

export default Dropzone;
