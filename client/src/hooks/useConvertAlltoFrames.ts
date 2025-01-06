import { useAcceptedFileStore, useConvertingStore } from "../store";
import useGiftoFrames from "../hooks/useGiftoFrames";
import { FileStatus } from "../entities/fileStatus";
import { acceptedFile } from "../entities/acceptedFile";
import useAnitoFrames from "./useAnitoFrames";

const useConvertAlltoFrames = () => {
  const files = useAcceptedFileStore((s) => s.files); //stores accpetedFiles
  const setUpdateFiles = useAcceptedFileStore((s) => s.setUpdateFiles);
  const setIsConverting = useConvertingStore((s) => s.setIsConverting); //stores accpetedFiles
  const { mutateAsync: asyncGifMutate } = useGiftoFrames();
  const { mutateAsync: asyncAniMutate } = useAnitoFrames();

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
      if (
        file.status === FileStatus.CONVERTING &&
        file.name.split(".")[1] == "gif"
      )
        //the error handling is handled by onError inside mutation
        //here we have to catch the rejected promise
        await asyncGifMutate(file).catch((err) => err);
      else if (
        file.status === FileStatus.CONVERTING &&
        file.name.split(".")[1] == "ani"
      )
        await asyncAniMutate(file).catch((err) => err);
    }
    setIsConverting(false);
  };
};

//utility function
export const updateFileStatus = (
  files: acceptedFile[],
  fileToConvert: File,
  status: FileStatus,
  zipFile?: Blob,
  errorMsg?: string
) => {
  let updateProperty = {
    status: status,
    downloadLink: "",
    errorMsg: errorMsg,
  };
  //update the status of specific file
  const updatedFiles = files.map((file) => {
    if (
      file.name === fileToConvert.name &&
      status == FileStatus.SUCCESS &&
      zipFile
    ) {
      updateProperty.downloadLink = URL.createObjectURL(zipFile);
      return Object.assign(file, updateProperty);
    } else if (file.name === fileToConvert.name) {
      return Object.assign(file, updateProperty);
    } else return file;
  });
  return updatedFiles;
};

export default useConvertAlltoFrames;

// return () =>
//   useEffect(() => {
//     const matchedFile = files.find(
//       (file) => file.status === FileStatus.UPLOADED
//     );
//     if (matchedFile) mutate(matchedFile);
//   }, [files]);
