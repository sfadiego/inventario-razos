import { useServiceDashboardVentas } from '@/Services/dashboard/useServiceDashboard';
import { ApexOptions } from 'apexcharts';
import { EllipsisVertical } from 'lucide-react';
import { useState } from 'react';
import Chart from 'react-apexcharts';
import { Dropdown } from '../ui/dropdown/Dropdown';
import { DropdownItem } from '../ui/dropdown/DropdownItem';

const useMonthlySalesChart = () => {
    const { isLoading, data } = useServiceDashboardVentas();
    const months = !isLoading ? data?.map((item) => item.month) : [];
    const total = !isLoading ? data?.map((item) => item.total) : [];
    return {
        months,
        total,
    };
};

export default function MonthlySalesChart() {
    const { months, total } = useMonthlySalesChart();
    console.log(months, total);
    const options: ApexOptions = {
        colors: ['#465fff'],
        chart: {
            fontFamily: 'Outfit, sans-serif',
            type: 'bar',
            height: 180,
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '39%',
                borderRadius: 5,
                borderRadiusApplication: 'end',
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 4,
            colors: ['transparent'],
        },
        xaxis: {
            categories: months,
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        legend: {
            show: true,
            position: 'top',
            horizontalAlign: 'left',
            fontFamily: 'Outfit',
        },
        yaxis: {
            title: {
                text: undefined,
            },
        },
        grid: {
            yaxis: {
                lines: {
                    show: true,
                },
            },
        },
        fill: {
            opacity: 1,
        },

        tooltip: {
            x: {
                show: false,
            },
            y: {
                formatter: (val: number) => `${val}`,
            },
        },
    };
    const series = [
        {
            name: 'Ventas',
            data: total,
        },
    ];
    const [isOpen, setIsOpen] = useState(false);

    function toggleDropdown() {
        setIsOpen(!isOpen);
    }

    function closeDropdown() {
        setIsOpen(false);
    }
    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 sm:px-6 sm:pt-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Monthly Sales</h3>
                <div className="relative inline-block">
                    <button className="dropdown-toggle" onClick={toggleDropdown}>
                        <EllipsisVertical className="size-6 text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
                    </button>
                    <Dropdown isOpen={isOpen} onClose={closeDropdown} className="w-40 p-2">
                        <DropdownItem
                            onItemClick={closeDropdown}
                            className="flex w-full rounded-lg text-left font-normal text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                        >
                            View More
                        </DropdownItem>
                        <DropdownItem
                            onItemClick={closeDropdown}
                            className="flex w-full rounded-lg text-left font-normal text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                        >
                            Delete
                        </DropdownItem>
                    </Dropdown>
                </div>
            </div>

            <div className="custom-scrollbar max-w-full overflow-x-auto">
                <div className="-ml-5 min-w-[650px] pl-2 xl:min-w-full">
                    <Chart options={options} series={series} type="bar" height={180} />
                </div>
            </div>
        </div>
    );
}
