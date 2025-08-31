import React, { useState, useEffect } from 'react';
import { IGigService } from '../services/IGigService';
import ServiceContainer from '../services/ServiceContainer';
import { Gig } from '../models/Gig';
import GigItem from '../components/GigItem';

function List() {

    const [gigs, setGigs] = useState<Gig[]>([]);

    const gigService: IGigService = ServiceContainer.getGigService();

    useEffect(() => {
        const fetchGigs = async () => {
            const gigData: Gig[] = await gigService.getAll();
            setGigs(gigData);
        };
        fetchGigs();
    }, []);

    return (
        <div className='container'>
            {gigs.map(g => <GigItem gig={g} key={g.id} />)}
        </div>
    )
}

export default List