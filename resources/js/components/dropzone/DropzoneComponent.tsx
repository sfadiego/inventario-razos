import { UploadIcon } from 'lucide-react';
import { Image } from '../images/Image';
import Button from '../ui/button/Button';
import { DropzoneEmpty } from './partials/DropzoneEmpty';
import { useDropzoneComponent } from './useDropzoneComponent';
interface IDropzoneComponentProps {
  onSubmitFile: (files: File) => void;
}

const DropzoneComponent = ({ onSubmitFile }: IDropzoneComponentProps) => {
  const { getRootProps, getInputProps, isDragActive, image, preview } = useDropzoneComponent();
  return (
    <>
      <div className="dark:hover:border-brand-500 hover:border-brand-500 cursor-pointer rounded-xl border border-dashed border-gray-300 transition dark:border-gray-700">
        {preview ? (
          <Image image={preview} />
        ) : (
          <DropzoneEmpty getRootProps={getRootProps} getInputProps={getInputProps} isDragActive={isDragActive} />
        )}
      </div>
      <div className="mt-2 flex justify-end">
        <Button variant="primary" size="sm" disabled={!image} onClick={() => image && onSubmitFile(image)}>
          <UploadIcon />
          Subir
        </Button>
      </div>
    </>
  );
};

export default DropzoneComponent;
