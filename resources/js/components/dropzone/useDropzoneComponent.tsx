import { useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { AlertToast } from '../alertToast/AlertToast';
import { acceptedFiles, AcceptedTypes } from './DropzoneTypes';
interface IDropzoneComponentProps {
  acceptedType: AcceptedTypes;
  onSubmitFile: (file: File | File[]) => void;
}
type DropzoneItems = File[];
export const MAX_SIZE_MB = 5;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
export const MAX_FILE_LIMIT = 5;
type ErrorCode = 'file-too-large' | 'file-invalid-type' | 'too-many-files' | string;

const handleDropErrors = (fileName: string, code: ErrorCode) => {
  const errors: Record<string, string> = {
    'file-too-large': 'Archivo muy pesado',
    'file-invalid-type': 'Tipo de archivo no permitido ',
    'too-many-files': 'Demasiados archivos ',
  };
  return `${fileName}: ${errors[code] || 'Error desconocido'}`;
};
export const validateFiles = (files: File[]): boolean => {
  if (files.length > MAX_FILE_LIMIT) {
    throw new Error(`Solo se permiten ${MAX_FILE_LIMIT} archivo(s)`);
  }

  const totalSize = files.reduce((size, file) => size + file.size, 0);

  if (totalSize > MAX_SIZE_BYTES) {
    throw new Error(`El tamaño total de los archivos es demasiado grande`);
  }

  return true;
};

export const useDropzoneComponent = ({ acceptedType = 'images', onSubmitFile }: IDropzoneComponentProps) => {
  const [items, setItems] = useState<DropzoneItems>([]);
  const [preview, setPreview] = useState<string[] | null>(null);
  const acceptFiles = acceptedFiles[acceptedType];
  const resetFile = () => {
    setPreview(null);
    setItems([]);
  };

  const onDrop = async (file: File[], fileRejections: FileRejection[]) => {
    try {
      if (!validateFiles(file)) {
        return;
      }

      if (fileRejections.length > 0) {
        fileRejections.map((error) => {
          const fileName = error.file.name;
          const { code } = error.errors[0];
          AlertToast({ type: 'error', message: handleDropErrors(fileName, code) });
        });
        return;
      }

      if (acceptedType === 'images') {
        const previews = file.map((file) => URL.createObjectURL(file));
        setPreview(previews);
        setItems(file);
      }
      setItems(file);
    } catch (error) {
      AlertToast({ type: 'error', message: String(error) });
    }
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptFiles,
    maxFiles: MAX_FILE_LIMIT,
    maxSize: MAX_SIZE_BYTES,
  });

  const handleSubmitFile = (file: File[]) => {
    const filesArray = Array.isArray(file) ? file : [file];
    onSubmitFile(filesArray);
    resetFile();
  };
  return { getRootProps, getInputProps, isDragActive, files: items, preview, resetFile, handleSubmitFile };
};
