import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import { AxiosError } from "axios";
import { useAcceptedFileStore } from "../store";
import { FileStatus } from "../entities/fileStatus";
import { acceptedFile } from "../entities/acceptedFile";

const apiClent = new APIClient("/toFrames/gifToFrames");

const handleDownload = (blob: Blob) => {
  // Create a temporary link element to trigger the download
  const downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(blob); // Create a Blob URL
  downloadLink.download = "frames.zip"; // Default filename for the download
  downloadLink.click(); // Programmatically click the link to trigger the download
};

const updateStatus = (
  files: acceptedFile[],
  gifFile: File,
  status: FileStatus
) => {
  return files.map((file) => {
    if (file.name === gifFile.name) {
      const returnedTarget = Object.assign(file, {
        status: status,
      });
      return returnedTarget;
    } else return file;
  });
};

const useGiftoFrames = () => {
  const files = useAcceptedFileStore((s) => s.files); //stores accpetedFiles
  const setUpdateFiles = useAcceptedFileStore((s) => s.setUpdateFiles);
  return useMutation<any, AxiosError, File>({
    mutationFn: (fileToConvert: File) => {
      const updatedFiles = updateStatus(
        files,
        fileToConvert,
        FileStatus.CONVERTING
      );
      setUpdateFiles(updatedFiles);
      return apiClent.post(fileToConvert);
    },
    onSuccess(zipFile: Blob, fileToConvert: File) {
      const updatedFiles = updateStatus(
        files,
        fileToConvert,
        FileStatus.SUCCESS
      );
      setUpdateFiles(updatedFiles);
      handleDownload(zipFile);
    },
    onError() {
      //set file property status as error..?
    },
  });
};

export default useGiftoFrames;
