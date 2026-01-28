import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { acceptedFiles, AcceptedTypes } from './DropzoneTypes';
interface IDropzoneComponentProps {
  acceptedType: AcceptedTypes;
}

export const useDropzoneComponent = ({ acceptedType = 'images' }: IDropzoneComponentProps) => {
  const [preview, setPreview] = useState<string[] | null>(null);
  const [file, setFile] = useState<File[] | null>(null);
  const acceptFiles = acceptedFiles[acceptedType];
  const resetFile = () => {
    setFile(null);
    setPreview(null);
  };
  const onDrop = async (file: File[]) => {
    const multiple = file.length > 1;
    const fileType: AcceptedTypes = acceptedType == 'images' ? 'images' : 'documents';
    if (multiple && fileType === 'images') {
      const previews = file.map((file) => URL.createObjectURL(file));
      setPreview(previews);
    }
    setFile(file);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptFiles,
  });
  return { getRootProps, getInputProps, isDragActive, preview, file, resetFile };
};
