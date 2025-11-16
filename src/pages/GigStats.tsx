import React, { useEffect, useState } from 'react';
import ServiceContainer from '../services/ServiceContainer';
import { Stats } from '../models/Stats';
import Loading from '../components/Loading';
import EarningsByMonthStats from '../components/stats/EarningsByMonthStats';
import GigsByMonthStats from '../components/stats/GigsByMonthStats';
import TopPayerStats from '../components/stats/TopPayerStats';

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
            <h2 style = {{ marginBottom: 50 }}>Gig Stats</h2>
            <EarningsByMonthStats earningsByMonth={stats.EarningsByMonth} totalEarnings={stats.EarningsThisYear} />
            <GigsByMonthStats gigsByMonth={stats.MonthlyGigTally} totalGigs={stats.GigCount} />
            <TopPayerStats topPayers={stats.EarningsByPayer} />
        </>
    )
}

export default GigStats;
