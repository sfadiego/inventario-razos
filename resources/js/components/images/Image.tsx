export const Image = ({ image }: { image: string }) => {
  return <img src={image} alt="Cover" className="w-[100px] rounded-l border border-gray-200 dark:border-gray-800" />;
};
