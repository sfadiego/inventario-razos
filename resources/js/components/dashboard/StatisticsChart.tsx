import { useServiceDashboardMasVendidos } from '@/Services/dashboard/useServiceDashboard';
import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';

const useStatisticsChart = () => {
    const { isLoading, data } = useServiceDashboardMasVendidos();

    const products = !isLoading && data ? data.map((item) => item.producto) : [];
    const cantidades = !isLoading && data ? data.map((item) => item.cantidad) : [];
    return {
        products,
        cantidades,
    };
};
export default function StatisticsChart() {
    const { products, cantidades } = useStatisticsChart();
    const options: ApexOptions = {
        legend: {
            show: false, // Hide legend
            position: 'top',
            horizontalAlign: 'left',
        },
        colors: ['#465FFF', '#9CB9FF'], // Define line colors
        chart: {
            fontFamily: 'Outfit, sans-serif',
            height: 310,
            type: 'line', // Set the chart type to 'line'
            toolbar: {
                show: false, // Hide chart toolbar
            },
        },
        stroke: {
            curve: 'straight', // Define the line style (straight, smooth, or step)
            width: [2, 2], // Line width for each dataset
        },

        fill: {
            type: 'gradient',
            gradient: {
                opacityFrom: 0.55,
                opacityTo: 0,
            },
        },
        markers: {
            size: 0, // Size of the marker points
            strokeColors: '#fff', // Marker border color
            strokeWidth: 2,
            hover: {
                size: 6, // Marker size on hover
            },
        },
        grid: {
            xaxis: {
                lines: {
                    show: false, // Hide grid lines on x-axis
                },
            },
            yaxis: {
                lines: {
                    show: true, // Show grid lines on y-axis
                },
            },
        },
        dataLabels: {
            enabled: false, // Disable data labels
        },
        tooltip: {
            enabled: true, // Enable tooltip
            x: {
                format: 'dd MMM yyyy', // Format for x-axis tooltip
            },
        },
        xaxis: {
            type: 'category', // Category-based x-axis
            categories: products, //['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            axisBorder: {
                show: false, // Hide x-axis border
            },
            axisTicks: {
                show: false, // Hide x-axis ticks
            },
            tooltip: {
                enabled: false, // Disable tooltip for x-axis points
            },
        },
        yaxis: {
            labels: {
                style: {
                    fontSize: '12px', // Adjust font size for y-axis labels
                    colors: ['#6B7280'], // Color of the labels
                },
            },
            title: {
                text: '', // Remove y-axis title
                style: {
                    fontSize: '0px',
                },
            },
        },
    };

    const series = [
        {
            name: 'Ventas',
            data: cantidades,
        },
    ];
    return (
        <div className="rounded-2xl border border-gray-200 bg-white px-5 pt-5 pb-5 sm:px-6 sm:pt-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="mb-6 flex flex-col gap-5 sm:flex-row sm:justify-between">
                <div className="w-full">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Mas vendidos</h3>
                    <p className="text-theme-sm mt-1 text-gray-500 dark:text-gray-400">Productos mas vendidos</p>
                </div>
                <div className="flex w-full items-start gap-3 sm:justify-end">{/* <ChartTab /> */}</div>
            </div>

            <div className="custom-scrollbar max-w-full overflow-x-auto">
                <div className="min-w-[1000px] xl:min-w-full">
                    <Chart options={options} series={series} type="area" height={310} />
                </div>
            </div>
        </div>
    );
}
