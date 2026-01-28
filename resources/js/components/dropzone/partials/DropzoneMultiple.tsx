import { AcceptedTypes } from '../DropzoneTypes';
import { DropZoneHandleFiles } from './DropzoneFile';
import { DropZoneImages } from './DropzoneImage';

export const DropzoneHandleItems = ({ acceptedType, items }: { acceptedType: AcceptedTypes; items: File[] | string[] }) => {
  if (acceptedType === 'images') {
    return <DropZoneImages items={items as string[]} />;
  }
  if (acceptedType === 'documents') {
    return <DropZoneHandleFiles items={items as File[]} />;
  }

  return null;
};
