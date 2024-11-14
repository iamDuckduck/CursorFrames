import HomeHeading from "./component/HomeHeading";
import Dropzone from "./component/DropZone";
import { Box } from "@chakra-ui/react";
import FileList from "./component/FileList";
import ConvertButton from "./component/ConvertButton";

function App() {
  return (
    <>
      <HomeHeading></HomeHeading>
      <Box margin={5} height="200px" border="dashed" borderRadius="40px">
        <Dropzone></Dropzone>
        <FileList></FileList>
        <ConvertButton></ConvertButton>
      </Box>
    </>
  );
}

export default App;
