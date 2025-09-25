import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface IDropzoneComponentProps {
  onSubmitFile: (files: File[]) => Promise<void>;
}
export const useDropzoneComponent = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const acceptFiles = {
    'image/png': [],
    'image/jpeg': [],
  };

  const onDrop = async (acceptedFiles: File[]) => {
    const img = acceptedFiles[0];
    setPreview(URL.createObjectURL(img));
    setImage(img);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptFiles,
  });
  return { getRootProps, getInputProps, isDragActive, preview, image };
};
