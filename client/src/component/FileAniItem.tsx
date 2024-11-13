import { Box } from "@chakra-ui/react";
import { convertAniBinaryToCSS } from "ani-cursor";
import { useEffect, useState } from "react";

interface Props {
  aniFile: File;
}

async function loadArrayBuffer(buffer: ArrayBuffer, fileName: string) {
  const arr = new Uint8Array(buffer); // Convert the buffer to a Uint8Array
  let css = convertAniBinaryToCSS(".preview", arr); //cursor css
  css = makeCSSForBackground(css); //background css
  return css;
}

function makeCSSForBackground(css: string) {
  let output = "";

  output += css
    .replace(/cursor:/g, "background-image:")
    .replace(/cursor:/g, "background-image:")
    .replace(/, auto/g, "")
    .replace(/:hover/g, "")
    // Ensure animation names don't collide
    .replace(/ani-cursor/g, "ani-cursor-bg")
    .replace(/\.preview/g, "#current")
    .replace(/#current\s*{([^}]+)}/, "$1") // it removes the rule that it onlys apply for element with current ID
    .trim();
  return output;
}

const FileAniItem = ({ aniFile }: Props) => {
  const [backgroundCss, setBackgroundCSS] = useState<string>();

  useEffect(() => {
    async function loadExample() {
      const buffer = await aniFile.arrayBuffer();
      const css = await loadArrayBuffer(buffer, aniFile.name); //it returns the background css string
      setBackgroundCSS(css);
    }

    loadExample();
  }, []);

  return (
    <Box
      height="50px"
      width="50px"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      css={backgroundCss || ""}
    ></Box>
  );
};

export default FileAniItem;
