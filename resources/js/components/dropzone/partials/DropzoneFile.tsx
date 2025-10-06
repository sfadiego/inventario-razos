import { FileSpreadsheet } from 'lucide-react';

export const DropzoneFile = ({ file }: { file: File }) => {
  return (
    <div className="center-content flex p-2">
      <FileSpreadsheet />
      <div>{file.name}</div>
    </div>
  );
};
