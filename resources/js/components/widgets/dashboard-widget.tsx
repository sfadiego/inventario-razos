import React from 'react'
import { WidgetProps } from '@/interfaces/WidgetProps'


export const DashboardWidget = ({ title, value }: WidgetProps) => {
    return <>
        <div className="p-4 rounded-xl border justify-center items-center">
            <h1 className="text-2xl font-bold text-center">{title}</h1>
            <h4 className="text-1xl pt-2 text-center">{value}</h4>
        </div>
    </>
}
