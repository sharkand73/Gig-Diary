import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ServiceContainer from '../services/ServiceContainer';
import { Gig } from '../models/Gig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faCancel, faList, faTrash } from '@fortawesome/free-solid-svg-icons';

function Edit() {
    const { id } = useParams();
    const [gig, setGig] = useState<Gig | null>(null);
    const [editing, setEditing] = useState<Boolean>(false);
    const [deleting, setDeleting] = useState<Boolean>(false);
    const gigService = ServiceContainer.getGigService();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGig = async () => {
            if (id) {
                const gigData = await gigService.getById(id);
                setGig(gigData);
            }
        };
        fetchGig();
    }, [id, gigService]);

    async function onDelete() {
        if (id) {
            await gigService.delete(id);
            setDeleting(false);
            navigate('/list');
        }
    }
    

    if (!gig) return <div>Loading...</div>;
    return (
        <div className='container mt-5 pt-2 bg-light border-primary'>
            <div className='navbar mb-2'>
                <div className='navbar-Links ms-auto'>
                    {editing ?
                        <button className='btn btn-link navbar-Link me-3' title="Delete gig" onClick={() => setDeleting(true)}>
                            <FontAwesomeIcon icon={faTrash} size="2x" style={{ color: 'red' }} />
                        </button> :
                        <Link to='/list' className='btn btn-link navbar-Link me-3' title="View gig list">
                            <FontAwesomeIcon icon={faList} size="2x" />
                        </Link>
                    }
                    <button className='btn btn-link navbar-Link me-3' title={editing ? 'Cancel' : 'Edit gig'} onClick={() => setEditing(!editing)}>
                        {editing ? <FontAwesomeIcon icon={faCancel} size="2x" /> : <FontAwesomeIcon icon={faEdit} size="2x" />}
                    </button>
                </div>
            </div>
            <div className='card shadow'>
                <div className='card-body bg-light'>

                    <h1 className='mb-5'>Gig Details</h1>

                    <form>
                        <div className='mb-4'>
                            <div className='row'>
                                <div className='col'>
                                    <label htmlFor='act' className='form-label'>Act</label>
                                    <input type='text' className='form-control' id='act' value={gig.act} disabled={!editing} />
                                </div>
                                <div className='col'>
                                    <label htmlFor='fee' className='form-label'>Fee</label>
                                    <input type='number' className='form-control' id='fee' min='0' max='2000' step='10' value={gig.fee} disabled={!editing} />
                                </div>
                            </div>
                        </div>

                        <div className='mb-4'>
                            <div className='row'>
                                <div className='col'>
                                    <label htmlFor='leaveDate' className='form-label'>Leave</label>
                                    <input type='datetime-local' className='form-control' id='leaveDate' value={gig.leaveDate} disabled={!editing} />
                                </div>
                                <div className='col'>
                                    <label htmlFor='returnDate' className='form-label'>Return</label>
                                    <input type='datetime-local' className='form-control' id='returnDate' value={gig.returnDate} disabled={!editing} />
                                </div>
                            </div>
                        </div>

                        <div className='mb-4'>
                            <div className='row'>
                                <div className='col'>
                                    <label htmlFor='venue' className='form-label'>Venue</label>
                                    <input type='text' className='form-control' id='venue' value={gig.venue} disabled={!editing} />
                                </div>
                                <div className='col'>
                                    <label htmlFor='postcode' className='form-label'>Postcode</label>
                                    <input type='text' className='form-control' id='postcode' value={gig.postcode} disabled={!editing} />
                                </div>
                            </div>
                        </div>

                        <div className='mb-4'>
                            <label htmlFor='description' className='form-label'>Description</label>
                            <textarea className='form-control' id='description' rows={6} value={gig.description} disabled={!editing} />
                        </div>

                        <div className='mb-4'>
                            <div className='row'>
                                <div className='col-9'>
                                    <label htmlFor='instrument' className='form-label'>Instrument</label>
                                    <select className='form-control' id='instrument' value={gig.instrument} disabled={!editing}>
                                        <option value='Upright'>Upright</option>
                                        <option value='Electric'>Electric</option>
                                    </select>
                                </div>
                                <div className='col-3 d-flex align-items-end'>
                                    <div className='form-check form-switch'>
                                        <input className='form-check-input' type='checkbox' id='calendarSync' checked={gig.calendarSync} disabled={!editing} />
                                        <label className='form-check-label' htmlFor='calendarSync'>Calendar Sync</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {deleting && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Delete</h5>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete this gig? This action cannot be undone.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setDeleting(false)}>
                                    Cancel
                                </button>
                                <button type="button" className="btn btn-danger" onClick={() => {
                                    onDelete();
                                }}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Edit;
