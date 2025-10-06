import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { acceptedFiles, AcceptedTypes } from './DropzoneTypes';
interface IDropzoneComponentProps {
  acceptedType: AcceptedTypes;
}

export const useDropzoneComponent = ({ acceptedType = 'images' }: IDropzoneComponentProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const acceptFiles = acceptedFiles[acceptedType];
  const resetFile = () => {
    setFile(null);
    setPreview(null);
  };
  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (acceptedType === 'images') {
      setPreview(URL.createObjectURL(file));
    }
    setFile(file);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptFiles,
  });
  return { getRootProps, getInputProps, isDragActive, preview, file, resetFile };
};
