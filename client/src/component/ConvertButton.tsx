import { Button } from "@chakra-ui/react";
import { useAcceptedFileStore } from "../store";
import useConvertAlltoFrames from "../hooks/useConvertAlltoFrames";

const ConvertButton = () => {
  const files = useAcceptedFileStore((s) => s.files); //stores accpetedFiles
  const ConvertAlltoFrames = useConvertAlltoFrames();
  return (
    <>
      {files.length !== 0 && (
        <Button onClick={ConvertAlltoFrames}>Convert</Button>
      )}
    </>
  );
};

export default ConvertButton;
