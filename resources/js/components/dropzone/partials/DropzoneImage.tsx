import { Image } from '@/components/images/Image';

export const DropZoneImages = ({ items, colSpan = 12 }: { items: string[]; colSpan?: number }) => {
  return (
    <>
      {items.map((image, index) => (
        <div key={index} className={`col-span-${colSpan}`}>
          <Image customClassName="mb-2" image={image} />
        </div>
      ))}
    </>
  );
};
