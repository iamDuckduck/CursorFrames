import { Box, Text, useToast } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import FileList from "./FileList";

export interface savedFile extends File {
  preview: string;
}

//it receives savedFiles param when it calls and return the actual validation function as reference
const duplicatedValidator = (savedFiles: savedFile[]) => (newFile: File) => {
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
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const [files, setFiles] = useState<savedFile[]>([]); //stores accpetedFiles
  const [rejected, setRejected] = useState<FileRejection[]>([]);

  const toast = useToast();

  // avoid recreating the function
  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      //handles accepted files
      if (acceptedFiles.length) {
        toast({
          title: `total ${acceptedFiles.length} files uploaded`,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        setFiles((previousFiles) => [
          ...previousFiles,
          ...acceptedFiles.map((file: File) =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
          ),
        ]);
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
    accept: { "image/gif": [".gif"], "image/ani": [".ani"] },
    maxSize: 1024 * 1000 * 10,
    validator: duplicatedValidator(files),
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
