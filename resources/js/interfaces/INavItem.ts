export interface INavItem {
  path?: string;
  name: string;
  icon: React.ReactNode;
  subItems?: { name: string; path: string; icon?: React.ReactNode; pro?: boolean; new?: boolean }[];
}
