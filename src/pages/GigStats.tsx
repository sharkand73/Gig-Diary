import React, { useEffect, useState } from 'react';
import ServiceContainer from '../services/ServiceContainer';
import { Stats } from '../models/Stats';

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

    return (
        <h2>Stats Page</h2>
    )
}

export default GigStats;
