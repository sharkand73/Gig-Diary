import React, { useState, useEffect } from 'react';
import { IGigService } from '../services/IGigService';
import ServiceContainer from '../services/ServiceContainer';
import { Gig } from '../models/Gig';
import GigItem from '../components/GigItem';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd } from '@fortawesome/free-solid-svg-icons';

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
        <div className='container mt-5 pt-2 bg-light border-primary'>
            <div className='navbar mb-2'>
                <div className='navbar-Links ms-auto'>
                    <Link to='/new' className='navbar-Link me-3' title="View gig list">
                        <FontAwesomeIcon icon={faAdd} size="2x"/>
                    </Link>
                </div>
            </div>
            {gigs.map(g => <GigItem gig={g} key={g.id} />)}
        </div>
    )
}

export default List