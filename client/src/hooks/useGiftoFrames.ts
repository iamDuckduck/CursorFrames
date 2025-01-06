import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import { AxiosError } from "axios";
import { useAcceptedFileStore } from "../store";
import { FileStatus } from "../entities/fileStatus";
import { acceptedFile } from "../entities/acceptedFile";
import { updateFileStatus } from "./useConvertAlltoFrames";

const apiClent = new APIClient("/toFrames/gifToFrames");

const useGiftoFrames = () => {
  const files = useAcceptedFileStore((s) => s.files); //stores accpetedFiles
  const setUpdateFiles = useAcceptedFileStore((s) => s.setUpdateFiles);

  return useMutation<any, AxiosError, acceptedFile>({
    mutationFn: (fileToConvert: acceptedFile) => {
      const updatedFiles = updateFileStatus(
        files,
        fileToConvert,
        FileStatus.CONVERTING
      );
      setUpdateFiles(updatedFiles);
      return apiClent.gifToFramesPost(fileToConvert);
    },
    onSuccess(convertedFile: Blob, fileToConvert: File) {
      const updatedFiles = updateFileStatus(
        files,
        fileToConvert,
        FileStatus.SUCCESS,
        convertedFile
      );
      setUpdateFiles(updatedFiles);
    },
    onError(errorMsg: AxiosError<unknown, any>, fileToConvert: File) {
      //set file property status as error..?
      const updatedFiles = updateFileStatus(
        files,
        fileToConvert,
        FileStatus.ERROR,
        undefined,
        errorMsg.message
      );
      setUpdateFiles(updatedFiles);
    },
  });
};

export default useGiftoFrames;
