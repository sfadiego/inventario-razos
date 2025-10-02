import { useAxios } from '@/hooks/useAxios';

const getInitials = (name: string) => {
  const names = name.split(' ');
  if (names.length > 1) {
    return names[0][0].toUpperCase() + names[1][0].toUpperCase();
  }
  return names[0][0].toUpperCase();
};
export const Avatar = () => {
  const { user } = useAxios();
  const initials = user ? getInitials(user.name) : 'U';
  const name = user ? user.name.toUpperCase() : 'User';
  return (
    <>
      <span className="mr-3 h-11 w-11 overflow-hidden rounded-full pt-2 dark:bg-black dark:text-white">{initials}</span>
      <span className="text-theme-sm mr-1 block font-medium">{name}</span>
    </>
  );
};
