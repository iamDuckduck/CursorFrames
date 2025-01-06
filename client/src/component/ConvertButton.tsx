import { Button } from "@chakra-ui/react";
import { useAcceptedFileStore, useConvertingStore } from "../store";
import useConvertAlltoFrames from "../hooks/useConvertAlltoFrames";
import { FileStatus } from "../entities/fileStatus";

const ConvertButton = () => {
  const files = useAcceptedFileStore((s) => s.files); //stores accpetedFiles
  const isConverting = useConvertingStore((s) => s.isConverting); //stores accpetedFiles
  const ConvertAlltoFrames = useConvertAlltoFrames();

  const notProcessedFiles = files.find(
    (file) =>
      file.status === FileStatus.UPLOADED || file.status === FileStatus.ERROR
  );
  return (
    <>
      {notProcessedFiles && !isConverting && (
        <Button onClick={ConvertAlltoFrames}>Convert</Button>
      )}
    </>
  );
};

export default ConvertButton;
