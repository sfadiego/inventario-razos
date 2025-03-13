import React from 'react'

interface DashboardWidget {
    title: string,
    subtitle?: string,
    value: string | number | Array<string | number>,
}

export const DashboardWidget = ({ title, value }: DashboardWidget) => {
    return <>
        <div className="p-4 rounded-xl border justify-center items-center">
            <h1 className="text-2xl font-bold text-center">{title}</h1>
            <h4 className="text-1xl pt-2 text-center">{value}</h4>
        </div>
    </>
}
