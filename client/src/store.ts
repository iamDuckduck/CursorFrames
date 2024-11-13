import { create } from "zustand";
import { acceptedFile } from "./entities/acceptedFile";

interface acceptedFileStore {
  files: acceptedFile[];
  setAcceptedFiles: (newFiles: acceptedFile[]) => void;
}

export const useAcceptedFileStore = create<acceptedFileStore>((set) => ({
  files: [],
  setAcceptedFiles: (newFiles: acceptedFile[]) =>
    set((state) => ({
      files: [...state.files, ...newFiles],
    })),
}));
