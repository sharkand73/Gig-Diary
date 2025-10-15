import React from 'react';
import { Link } from 'react-router-dom';
import { Gig } from '../models/Gig';
import { formatDate } from '../utilities/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamation } from '@fortawesome/free-solid-svg-icons';

interface GigItemProps {
    gig: Gig;
}

function GigItem({gig}: GigItemProps) {

    return (
        <Link to={`/edit/${gig.id}`} className='text-decoration-none'>
            <div className='card mb-3 shadow-sm bg-light card-hover' style={{cursor: 'pointer'}}>
                <div className='card-body'>
                    {/* Desktop layout */}
                    <div className='row align-items-center d-none d-md-flex'>
                        <div className='col-3'>
                            <small className='text-muted'>Date</small>
                            <div className='fw-bold'>{formatDate(gig.leaveDate)}</div>
                        </div>
                        <div className='col-3'>
                            <small className='text-muted'>Act</small>
                            <div className='fw-bold'>{gig.act}</div>
                        </div>
                        <div className='col-3'>
                            <small className='text-muted'>Venue</small>
                            <div>{gig.venue}</div>
                        </div>
                        <div className='col-1 text-end'>
                            <span>
                                {
                                    !gig.isComplete ? <span className='text-danger'>
                                        <FontAwesomeIcon icon={faExclamation} size="lg"/>
                                    </span> : null
                                }
                            </span>
                        </div>
                        <div className='col-2 text-end'>
                            <span className='badge bg-primary'>£{gig.fee}</span>
                        </div>
                    </div>
                    
                    {/* Mobile layout */}
                    <div className='d-md-none'>
                        <div className='mb-2 fw-bold'>{formatDate(gig.leaveDate)}</div>
                        <div className='mb-2 fw-bold'>{gig.act}</div>
                        <div className='mb-2'>{gig.venue}</div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <span className='badge bg-primary'>£{gig.fee}</span>
                            {!gig.isComplete && <span className='text-danger'><FontAwesomeIcon icon={faExclamation} size="lg"/></span>}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
    
    
}

export default GigItem;
