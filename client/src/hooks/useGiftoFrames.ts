import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import { AxiosError } from "axios";
import { useAcceptedFileStore } from "../store";
import { FileStatus } from "../entities/fileStatus";
import { acceptedFile } from "../entities/acceptedFile";

const apiClent = new APIClient("/toFrames/gifToFrames");

const updateFileStatus = (
  files: acceptedFile[],
  gifFile: File,
  status: FileStatus,
  zipFile?: Blob
) => {
  let updateProperty = { status: status, downloadLink: "" };
  //update the status of specific file
  const updatedFiles = files.map((file) => {
    if (file.name === gifFile.name && status == FileStatus.SUCCESS && zipFile) {
      updateProperty.downloadLink = URL.createObjectURL(zipFile);
      return Object.assign(file, updateProperty);
    } else if (file.name === gifFile.name) {
      return Object.assign(file, updateProperty);
    } else return file;
  });
  return updatedFiles;
};

const useGiftoFrames = () => {
  const files = useAcceptedFileStore((s) => s.files); //stores accpetedFiles
  const setUpdateFiles = useAcceptedFileStore((s) => s.setUpdateFiles);

  return useMutation<any, AxiosError, File>({
    mutationFn: (fileToConvert: File) => {
      const updatedFiles = updateFileStatus(
        files,
        fileToConvert,
        FileStatus.CONVERTING
      );
      setUpdateFiles(updatedFiles);
      return apiClent.post(fileToConvert);
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
    onError() {
      //set file property status as error..?
    },
  });
};

export default useGiftoFrames;
