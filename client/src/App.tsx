import HomeHeading from "./component/HomeHeading";
import Dropzone from "./component/DropZone";
import { Box } from "@chakra-ui/react";
import { useAcceptedFileStore } from "./store";
import FileList from "./component/FileList";

function App() {
  return (
    <>
      <HomeHeading></HomeHeading>
      <Box margin={5} height="200px" border="dashed" borderRadius="40px">
        <Dropzone></Dropzone>
        <FileList></FileList>
      </Box>
    </>
  );
}

export default App;
