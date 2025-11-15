import React, { useState, useEffect } from 'react';
import { IGigService } from '../services/IGigService';
import ServiceContainer from '../services/ServiceContainer';
import { Gig } from '../models/Gig';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import GigList from '../components/gigs/GigList';

function List() {

    const [gigs, setGigs] = useState<Gig[] | null>(null);

    const gigService: IGigService = ServiceContainer.getGigService();

    useEffect(() => {
        const fetchGigs = async () => {
            const gigData: Gig[] = await gigService.getAll();
            setGigs(gigData);
        };
        fetchGigs();
    }, []);

    if (!gigs || gigs.length === 0) return <Loading />

    return (
        <div className='container-fluid vh-100 d-flex flex-column bg-light border-primary'>
            <div className='navbar mb-2 flex-shrink-0'>
                <div className='navbar-Links ms-auto'>
                    <Link to='/new' className='navbar-Link me-3' title="View gig list">
                        <FontAwesomeIcon icon={faAdd} size="2x"/>
                    </Link>
                </div>
            </div>
            <div className='flex-grow-1 overflow-hidden'>
                <GigList gigs = {gigs} />
            </div>
        </div>
    )
}

export default List