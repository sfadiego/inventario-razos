import React, { ReactNode } from 'react';

export type headers = 'h1' | 'h2' | 'h3';
type Size = 'sm' | 'md' | 'xl';
interface IHeaderProps {
  type: headers;
  size: Size;
  className?: string;
  children: ReactNode;
}
export const Headers = ({ children, type = 'h1', size = 'md', className = '' }: IHeaderProps) => {
  const types = {
    h1: `text-title-${size}`,
    h2: `text-xl`,
    h3: `text-lg`,
  };
  const baseClass = types[type];
  return React.createElement(type, { className: `${baseClass} font-semibold dark:text-white/90 text-gray-800 ${className}`.trim() }, children);
};
