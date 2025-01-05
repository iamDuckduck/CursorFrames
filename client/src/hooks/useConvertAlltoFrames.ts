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
      if (
        file.status === FileStatus.UPLOADED ||
        file.status === FileStatus.ERROR
      )
        return Object.assign(file, { status: FileStatus.CONVERTING });
      else return file;
    });
    setUpdateFiles(updatedFiles);

    for (const file of files) {
      if (file.status === FileStatus.CONVERTING)
        //the error handling is handled by onError inside mutation
        //here we have to catch the rejected promise
        await mutateAsync(file).catch((err) => err);
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
