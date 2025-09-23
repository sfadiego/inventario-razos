import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface IDropzoneComponentProps {
  onUploadFile: (files: File[]) => Promise<void>;
}
export const useDropzoneComponent = ({ onUploadFile }: IDropzoneComponentProps) => {
  const acceptFiles = {
    'image/png': [],
    'image/jpeg': [],
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => await onUploadFile(acceptedFiles), [onUploadFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptFiles,
  });
  return { getRootProps, getInputProps, isDragActive, onDrop };
};
