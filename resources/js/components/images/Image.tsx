export const Image = ({
  image,
  customClassName = '',
  disabledWidth = false,
  width = 'w-[100px]',
}: {
  image: string;
  customClassName?: string;
  disabledWidth?: boolean;
  width?: string;
}) => {
  return (
    <img
      src={image}
      alt="Cover"
      className={`rounded-l border border-gray-200 dark:border-gray-800 ${customClassName} ${disabledWidth ? '' : width}`}
    />
  );
};
