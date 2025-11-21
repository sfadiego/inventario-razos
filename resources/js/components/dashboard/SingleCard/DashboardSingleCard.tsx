import { LucideIcon } from 'lucide-react';
import Badge from '../../ui/badge/Badge';

interface ISingleCardProps {
  title: string;
  ammount: number | string;
  BadgeIcon?: LucideIcon;
  badgeNumber?: number | string;
  IconComponent?: LucideIcon;
}
export const DashboardSingleCard = ({ title, ammount, IconComponent, badgeNumber, BadgeIcon }: ISingleCardProps) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex rounded-xl">
        <div>{IconComponent && <IconComponent className="size-6 text-gray-800 dark:text-white/90" />}</div>
        <div className="ml-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">{title}</span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2">
        <div className="col-span-2">
          <span className="text-sm font-bold text-gray-500 dark:text-gray-400">{ammount}</span>
        </div>
        <div className="col-span-1 mt-2">
          {badgeNumber && (
            <Badge color="success">
              {BadgeIcon && <BadgeIcon />}
              {badgeNumber}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};
