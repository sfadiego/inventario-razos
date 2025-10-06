import { File, Loader, UploadIcon, X } from 'lucide-react';
import { Image } from '../images/Image';
import Button from '../ui/button/Button';
import { AcceptedTypes } from './DropzoneTypes';
import { DropzoneEmpty } from './partials/DropzoneEmpty';
import { DropzoneFile } from './partials/DropzoneFile';
import { useDropzoneComponent } from './useDropzoneComponent';
interface IDropzoneComponentProps {
  onSubmitFile: (files: File) => void;
  acceptedType?: AcceptedTypes;
  isLoading?: boolean;
}

const DropzoneComponent = ({ onSubmitFile, acceptedType = 'images', isLoading }: IDropzoneComponentProps) => {
  const { getRootProps, getInputProps, isDragActive, file, preview, resetFile } = useDropzoneComponent({ acceptedType });
  return (
    <>
      <div className="dark:hover:border-brand-500 hover:border-brand-500 cursor-pointer rounded-xl border border-dashed border-gray-300 transition dark:border-gray-700">
        {file && (
          <div className="flex justify-end p-2">
            <X className="cursor-pointer" onClick={resetFile} />
          </div>
        )}
        {acceptedType === 'images' && preview && <Image image={preview} />}
        {acceptedType === 'documents' && file && <DropzoneFile file={file} />}
        {!file && <DropzoneEmpty getRootProps={getRootProps} getInputProps={getInputProps} isDragActive={isDragActive} />}
      </div>
      <div className="mt-2 flex justify-end">
        <Button variant="primary" size="sm" disabled={!file || isLoading} onClick={() => file && onSubmitFile(file)}>
          {isLoading && <Loader className="ml-2 h-4 w-4 animate-spin" />}
          {!isLoading && <UploadIcon />}
          Subir
        </Button>
      </div>
    </>
  );
};

export default DropzoneComponent;
