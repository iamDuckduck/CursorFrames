import { useAcceptedFileStore } from "../store";
import useGiftoFrames from "../hooks/useGiftoFrames";

const useConvertAlltoFrames = () => {
  const files = useAcceptedFileStore((s) => s.files); //stores accpetedFiles
  const { mutate } = useGiftoFrames();

  return () => {
    files.forEach((file) => {
      mutate(file);
    });
  };
};

export default useConvertAlltoFrames;
