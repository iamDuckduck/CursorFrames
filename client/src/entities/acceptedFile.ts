import { FileStatus } from "./fileStatus";

export interface acceptedFile extends File {
  preview: string;
  status: FileStatus;
  downloadLink: string;
}
