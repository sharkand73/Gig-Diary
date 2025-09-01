import React from 'react';
import { Link } from 'react-router-dom';
import { Gig } from '../models/Gig';

interface GigItemProps {
    gig: Gig;
}

function GigItem({gig}: GigItemProps) {

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };


    return (
        <Link to={`/edit/${gig.id}`} className='text-decoration-none'>
            <div className='card mb-3 shadow-sm bg-light card-hover' style={{cursor: 'pointer'}}>
                <div className='card-body'>
                    <div className='row align-items-center'>
                        <div className='col-3'>
                            <small className='text-muted'>Date</small>
                            <div className='fw-bold'>{formatDate(gig.leaveDate)}</div>
                        </div>
                        <div className='col-4'>
                            <small className='text-muted'>Act</small>
                            <div className='fw-bold'>{gig.act}</div>
                        </div>
                        <div className='col-3'>
                            <small className='text-muted'>Venue</small>
                            <div>{gig.venue}</div>
                        </div>
                        <div className='col-2 text-end'>
                            <span className='badge bg-primary'>£{gig.fee}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
    
    
}

export default GigItem;
