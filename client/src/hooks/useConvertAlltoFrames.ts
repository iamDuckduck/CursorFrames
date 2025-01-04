import { useAcceptedFileStore } from "../store";
import useGiftoFrames from "../hooks/useGiftoFrames";
import { FileStatus } from "../entities/fileStatus";

const useConvertAlltoFrames = () => {
  const files = useAcceptedFileStore((s) => s.files); //stores accpetedFiles
  const setUpdateFiles = useAcceptedFileStore((s) => s.setUpdateFiles);
  const { mutateAsync } = useGiftoFrames();

  return async () => {
    const updatedFiles = files.map((file) => {
      return Object.assign(file, { status: FileStatus.CONVERTING });
    });
    setUpdateFiles(updatedFiles);

    for (const file of files) {
      await mutateAsync(file);
    }
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
