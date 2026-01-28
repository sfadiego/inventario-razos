import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { acceptedFiles, AcceptedTypes } from './DropzoneTypes';
interface IDropzoneComponentProps {
  acceptedType: AcceptedTypes;
  onSubmitFile: (file: File | File[]) => void;
}
type DropzoneItems = File[];

export const useDropzoneComponent = ({ acceptedType = 'images', onSubmitFile }: IDropzoneComponentProps) => {
  const [items, setItems] = useState<DropzoneItems>([]);
  const [preview, setPreview] = useState<string[] | null>(null);
  const acceptFiles = acceptedFiles[acceptedType];
  const resetFile = () => {
    setPreview(null);
    setItems([]);
  };
  const onDrop = async (file: File[]) => {
    if (acceptedType === 'images') {
      const previews = file.map((file) => URL.createObjectURL(file));
      setPreview(previews);
      setItems(file);
    }
    setItems(file);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptFiles,
  });

  const handleSubmitFile = (file: File[]) => {
    const filesArray = Array.isArray(file) ? file : [file];
    onSubmitFile(filesArray);
    resetFile();
  };
  return { getRootProps, getInputProps, isDragActive, files: items, preview, resetFile, handleSubmitFile };
};
