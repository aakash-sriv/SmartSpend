import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'


const DATE_RANGES = {
  "7D": {label: "Last 7 Days", days: 7},
  "1M": {label:"Last 1 Month", days: 30},
  "3M": {label:"Last 3 Months", days: 90},  
  "6M": {label:"Last 6 Months", days: 180},
}

const AccountChart = () => {
  return (
    <div>
        {/*
         <ResponsiveContainer width="100%" height="100%">
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5
                }}
            >
                <CartesianGrid />
                <XAxis />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="pv"
                  fill="#8884d8"
                  activeBar
                />
                <Bar 
                  dataKey="pv"
                  fill="#8884d8"
                  activeBar
                />
            </BarChart>
        </ResponsiveContainer> 
        */}
    </div>
  )
}

export default AccountChart