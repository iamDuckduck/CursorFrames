import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import { AxiosError } from "axios";
import { useAcceptedFileStore } from "../store";
import { FileStatus } from "../entities/fileStatus";
import { updateFileStatus } from "./useConvertAlltoFrames";
import { acceptedFile } from "../entities/acceptedFile";
import { aniPostObject } from "../entities/aniPostObject";

const apiClent = new APIClient("/toFrames/aniToFrames");

const useAnitoFrames = () => {
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

      const aniObject: aniPostObject = {
        aniCss: fileToConvert.aniCss || "",
        fileName: fileToConvert.name,
      };
      return apiClent.aniToFramesPost(aniObject);
    },
    onSuccess(convertedFile: Blob, fileToConvert: acceptedFile) {
      const updatedFiles = updateFileStatus(
        files,
        fileToConvert,
        FileStatus.SUCCESS,
        convertedFile
      );
      setUpdateFiles(updatedFiles);
    },
    onError(errorMsg: AxiosError<unknown, any>, fileToConvert: acceptedFile) {
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

export default useAnitoFrames;
