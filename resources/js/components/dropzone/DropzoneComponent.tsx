import { File, Loader, UploadIcon, X } from 'lucide-react';
import Button from '../ui/button/Button';
import { AcceptedTypes } from './DropzoneTypes';
import { DropzoneEmpty } from './partials/DropzoneEmpty';
import { DropzoneHandleItems } from './partials/DropzoneMultiple';
import { useDropzoneComponent } from './useDropzoneComponent';
interface IDropzoneComponentProps {
  onSubmitFile: (file: File | File[]) => void;
  acceptedType?: AcceptedTypes;
  isLoading?: boolean;
}

const DropzoneComponent = ({ onSubmitFile, acceptedType = 'images', isLoading }: IDropzoneComponentProps) => {
  const { getRootProps, getInputProps, isDragActive, files, preview, resetFile, handleSubmitFile } = useDropzoneComponent({
    acceptedType,
    onSubmitFile,
  });

  return (
    <>
      <div className="dark:hover:border-brand-500 hover:border-brand-500 cursor-pointer rounded-xl border border-dashed border-gray-300 transition dark:border-gray-700">
        {files && !!files.length && (
          <div className="flex justify-end p-2">
            <X className="cursor-pointer" onClick={resetFile} />
          </div>
        )}

        <div className="grid grid-cols-12">
          <DropzoneHandleItems acceptedType={acceptedType} items={acceptedType === 'images' ? preview || [] : files} />
        </div>
        {!files || (files.length === 0 && <DropzoneEmpty getRootProps={getRootProps} getInputProps={getInputProps} isDragActive={isDragActive} />)}
      </div>
      <div className="mt-2 flex justify-end">
        <Button variant="primary" size="sm" disabled={!files || isLoading} onClick={() => files && handleSubmitFile(files as File[])}>
          {isLoading && <Loader className="ml-2 h-4 w-4 animate-spin" />}
          {!isLoading && <UploadIcon />}
          Subir
        </Button>
      </div>
    </>
  );
};

export default DropzoneComponent;
