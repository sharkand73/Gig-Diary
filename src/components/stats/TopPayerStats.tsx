import React from 'react';
import { KeyValuePair } from '../../models/KeyValuePair';

interface Props {
    topPayers: KeyValuePair<number>[]
}

function TopPayerStats(props: Props) {
    const { topPayers } = props

    return (
        <div className="container" style={{ marginTop: 50 }}>
            <h5>Top Payer Stats</h5>
            <table className="table table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        <th className="text-start">Artist</th>
                        <th className="text-end">Earnings</th>
                    </tr>
                </thead>
                <tbody>
                    {topPayers.map((kvp, i) => (
                        <tr key={i}>
                            <td className="text-start">{kvp.Key}</td>
                            <td className="text-end font-monospace">£{kvp.Value.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TopPayerStats;
