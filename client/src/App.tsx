import HomeHeading from "./component/HomeHeading";
import Dropzone from "./component/DropZone";
import { Box } from "@chakra-ui/react";

function App() {
  return (
    <>
      <HomeHeading></HomeHeading>
      <Box margin={5} height="200px" border="dashed" borderRadius="40px">
        <Dropzone></Dropzone>
      </Box>
    </>
  );
}

export default App;
