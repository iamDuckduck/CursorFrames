import { create } from "zustand";
import { acceptedFile } from "./entities/acceptedFile";

interface acceptedFileStore {
  files: acceptedFile[];
  setAcceptedFiles: (newFiles: acceptedFile[]) => void;
  setUpdateFiles: (filteredFiles: acceptedFile[]) => void;
}

export const useAcceptedFileStore = create<acceptedFileStore>((set) => ({
  files: [],
  setAcceptedFiles: (newFiles: acceptedFile[]) =>
    set((state) => ({
      files: [...state.files, ...newFiles],
    })),
  setUpdateFiles: (filteredFiles: acceptedFile[]) =>
    set(() => ({
      files: filteredFiles,
    })),
}));

interface convertingStore {
  isConverting: boolean;
  setIsConverting: (isConverting: boolean) => void;
}

export const useConvertingStore = create<convertingStore>((set) => ({
  isConverting: false,
  setIsConverting: (isConverting: boolean) =>
    set(() => ({
      isConverting: isConverting,
    })),
}));
