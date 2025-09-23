import { useEffect, useState } from 'react';
import { Image } from '../images/Image';
import { DropzoneEmpty } from './partials/DropzoneEmpty';
import { useDropzoneComponent } from './useDropzoneComponent';
interface IDropzoneComponentProps {
  onUploadFile: (files: File[]) => Promise<void>;
  image?: string;
}

const DropzoneComponent = ({ onUploadFile, image }: IDropzoneComponentProps) => {
  const [preview, setPreview] = useState<string | null>(image ?? null);
  const { getRootProps, getInputProps, isDragActive } = useDropzoneComponent({
    onUploadFile: async (file) => {
      const img = file[0];
      if (img) {
        setPreview(URL.createObjectURL(img));
      }
      await onUploadFile(file);
    },
  });

  useEffect(() => {
    if (image) {
      if (image) setPreview(image);
    }
  }, [image]);

  return (
    <div className="dark:hover:border-brand-500 hover:border-brand-500 cursor-pointer rounded-xl border border-dashed border-gray-300 transition dark:border-gray-700">
      {preview ? <Image image={preview} /> : <DropzoneEmpty getRootProps={getRootProps} getInputProps={getInputProps} isDragActive={isDragActive} />}
    </div>
  );
};

export default DropzoneComponent;
