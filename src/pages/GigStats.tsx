import React, { useEffect, useState } from 'react';
import ServiceContainer from '../services/ServiceContainer';
import { Stats } from '../models/Stats';
import Loading from '../components/Loading';
import EarningsByMonthStats from '../components/stats/EarningsByMonthStats';

function GigStats() {
    const [stats, setStats] = useState<Stats | null>(null);
    const statsService = ServiceContainer.getStatsService();

    useEffect(() => {
        const fetchStats = async () => {
            const data = await statsService.getStats();
            setStats(data);
        };
        fetchStats();
    }, []);

    if (!stats) {
        return <Loading />;
    }

    return (
        <>
            <h2>Gig Stats</h2>
            <div>Earnings by Month</div>
            <EarningsByMonthStats earningsByMonth={stats.EarningsByMonth} />
        </>
    )
}

export default GigStats;
