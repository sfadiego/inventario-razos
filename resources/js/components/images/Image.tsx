export const Image = ({ image }: { image: string }) => {
  return <img src={image} alt="Cover" className="w-[100px] rounded-xl border border-gray-200 dark:border-gray-800" />;
};
