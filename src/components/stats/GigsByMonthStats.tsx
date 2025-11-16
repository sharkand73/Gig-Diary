import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { KeyValuePair } from '../../models/KeyValuePair'

interface Props {
    totalGigs: number,
    gigsByMonth: KeyValuePair<number>[]
}

function GigsByMonthStats(props: Props) {
    const { gigsByMonth, totalGigs } = props

    return (
        <div style={{ width: '100%', height: 300 }}>
            <div>Total gigs: {totalGigs}</div>
            <ResponsiveContainer>
                <BarChart data={gigsByMonth}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Key" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="Value" fill="#84d8afff" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default GigsByMonthStats
