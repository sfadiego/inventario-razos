import { ArrowUp, LucideIcon } from 'lucide-react';
import Badge from '../../ui/badge/Badge';

interface ISingleCardProps {
    title: string;
    ammount: number | string;
    badgeNumber?: number | string;
    IconComponent?: LucideIcon;
}
export const DashboardSingleCard = ({ title, ammount, IconComponent, badgeNumber }: ISingleCardProps) => {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
                {IconComponent && <IconComponent className='className="size-6 dark:text-white/90" text-gray-800' />}
            </div>

            <div className="mt-5 flex items-end justify-between">
                <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{title}</span>
                    <h4 className="text-title-sm mt-2 font-bold text-gray-800 dark:text-white/90">{ammount}</h4>
                </div>
                {badgeNumber && (
                    <Badge color="success">
                        <ArrowUp />
                        {badgeNumber}
                    </Badge>
                )}
            </div>
        </div>
    );
};
