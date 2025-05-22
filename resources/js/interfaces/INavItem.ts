
export interface NavItem {
  path?: string;
  name: string;
  icon: React.ReactNode;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};