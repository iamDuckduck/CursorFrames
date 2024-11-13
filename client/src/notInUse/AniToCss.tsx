import { Box } from "@chakra-ui/react";
import { convertAniBinaryToCSS } from "ani-cursor";
import { useEffect, useState } from "react";

interface Props {
  selector: string;
  aniFile: File;
}
const AniToCss = ({ selector, aniFile }: Props) => {
  //   const [aniData, setAniData] = useState<Uint8Array | null>(null);
  useEffect(() => {
    const processAniFile = async () => {
      const arrayBuffer = await aniFile.arrayBuffer();
      const data = new Uint8Array(arrayBuffer);

      const style = document.createElement("style");
      style.innerText = convertAniBinaryToCSS(
        `#${selector.split(".")[0]}`,
        data
      );
      console.log(style);
      document.head.appendChild(style);
      //   setAniData(data);
    };

    processAniFile();
  }, []);

  return <Box id={selector.split(".")[0]} height="100px" width="100px"></Box>;
};

export default AniToCss;
