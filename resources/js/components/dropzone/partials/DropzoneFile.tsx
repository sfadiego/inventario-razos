import { FileSpreadsheet } from 'lucide-react';

export const DropzoneFile = ({ file }: { file: File }) => {
  return (
    <div className="center-content flex p-2">
      <FileSpreadsheet />
      <div>{file.name}</div>
    </div>
  );
};

export const DropZoneHandleFiles = ({ items, colSpan = 12 }: { items: File[]; colSpan?: number }) => {
  return (
    <>
      {items.map((file, index) => (
        <div key={index} className={`col-span-${colSpan}`}>
          <DropzoneFile file={file} />
        </div>
      ))}
    </>
  );
};
