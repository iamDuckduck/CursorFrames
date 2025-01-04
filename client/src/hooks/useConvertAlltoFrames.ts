import { useAcceptedFileStore, useConvertingStore } from "../store";
import useGiftoFrames from "../hooks/useGiftoFrames";
import { FileStatus } from "../entities/fileStatus";

const useConvertAlltoFrames = () => {
  const files = useAcceptedFileStore((s) => s.files); //stores accpetedFiles
  const setUpdateFiles = useAcceptedFileStore((s) => s.setUpdateFiles);
  const setIsConverting = useConvertingStore((s) => s.setIsConverting); //stores accpetedFiles
  const { mutateAsync } = useGiftoFrames();

  //maybe refactor the setIsConverting..? looks weird
  return async () => {
    setIsConverting(true);
    const updatedFiles = files.map((file) => {
      return Object.assign(file, { status: FileStatus.CONVERTING });
    });
    setUpdateFiles(updatedFiles);

    for (const file of files) {
      await mutateAsync(file);
    }
    setIsConverting(false);
  };

  // return () =>
  //   useEffect(() => {
  //     const matchedFile = files.find(
  //       (file) => file.status === FileStatus.UPLOADED
  //     );
  //     if (matchedFile) mutate(matchedFile);
  //   }, [files]);
};

export default useConvertAlltoFrames;
