import { Button } from "@chakra-ui/react";
import { useAcceptedFileStore } from "../store";

const ConvertButton = () => {
  const files = useAcceptedFileStore((s) => s.files); //stores accpetedFiles

  return <>{files.length !== 0 && <Button>Convert</Button>}</>;
};

export default ConvertButton;
