import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { KeyValuePair } from '../../models/KeyValuePair'

interface Props {
    gigsByMonth: KeyValuePair<number>[]
}

function GigsByMonthStats(props: Props) {
    const { gigsByMonth } = props

    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <BarChart data={gigsByMonth}>
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

export default GigsByMonthStats
