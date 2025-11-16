import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { KeyValuePair } from '../../models/KeyValuePair'

interface Props {
    totalEarnings: number,
    earningsByMonth: KeyValuePair<number>[]
}

function EarningsByMonthStats(props: Props) {
    const { earningsByMonth, totalEarnings } = props

    return (
        <div style={{ width: '100%', height: 300, marginBottom: 30 }}>
            <div>Total earnings: £{totalEarnings}</div>
            <ResponsiveContainer>
                <BarChart data={earningsByMonth}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Key" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="Value" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default EarningsByMonthStats
