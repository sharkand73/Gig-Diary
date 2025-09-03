import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ServiceContainer from '../services/ServiceContainer';
import { Gig } from '../models/Gig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faCancel, faList, faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';

function Edit() {
    const { id } = useParams();
    const [gig, setGig] = useState<Gig | null>(null);
    const [formData, setFormData] = useState<Gig | null>(null);
    const [editing, setEditing] = useState<boolean>(false);
    const [deleting, setDeleting] = useState<boolean>(false);
    const [completing, setCompleting] = useState<boolean>(false);
    const gigService = ServiceContainer.getGigService();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGig = async () => {
            if (id) {
                const gigData = await gigService.getById(id);
                setGig(gigData ? {...gigData} : null);
                setFormData(gigData ? {...gigData} : null);
            }
        };
        fetchGig();
    }, [id, gigService]);

    useEffect(() => console.log(gig), [gig])

    async function onDelete() {
        if (id) {
            await gigService.delete(id);
            setDeleting(false);
            navigate('/list');
        }
    }

    function resetPage() {
        setCompleting(false);
        setEditing(false);
        setFormData(gig ? {...gig} : null);
    }

    const nullableTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        if (formData) {
            setFormData({ ...formData, [id]: value === '' ? null : value });
        }
    }

    const nullableBoolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, checked } = e.target;
        if (formData) {
            setFormData({ ...formData, [id]: checked ?? false });
        }
    }

    const nullableNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        if (formData) {
            setFormData({ ...formData, [id]: value ? value : 0 });
        }
    }

    function onTextChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { id, value } = e.target;
        if (formData) {
            setFormData({ ...formData, [id]: value });
        }
    }

    function onCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { id, checked } = e.target;
        if (formData){
            setFormData({ ...formData, [id]: checked });
        }
    }

    
    if (!formData) return <div>Loading...</div>;
    return (
        <div className='container mt-5 pt-2 bg-light border-primary'>
            <div className='navbar mb-2'>
                <div className='navbar-Links ms-auto'>
                    {editing ?
                        <>
                            <button className='btn btn-link navbar-Link me-3' title="Delete gig" onClick={() => setDeleting(true)}>
                                <FontAwesomeIcon icon={faTrash} size="2x" style={{ color: 'red' }} />
                            </button>
                            <button className='btn btn-link navbar-Link me-3' title='Cancel' onClick={() => setEditing(false)}>
                                <FontAwesomeIcon icon={faCancel} size="2x" />
                            </button>
                        </> :
                        <>
                            <Link to='/list' className='btn btn-link navbar-Link me-3' title="View gig list">
                                <FontAwesomeIcon icon={faList} size="2x" />
                            </Link>
                            {completing ?
                                <button className='btn btn-link navbar-Link me-3' title='Cancel' onClick={() => setCompleting(false)}>
                                    <FontAwesomeIcon icon={faCancel} size="2x" />
                                </button> :
                                <>
                                    <button className='btn btn-link navbar-Link me-3' title='Complete gig' onClick={() => setCompleting(true)}>
                                        <FontAwesomeIcon icon={faCheck} size="2x" style={{ color: 'green' }} />
                                    </button>
                                    <button className='btn btn-link navbar-Link me-3' title='Edit gig' onClick={() => setEditing(true)}>
                                        <FontAwesomeIcon icon={faEdit} size="2x" />
                                    </button>
                                </>
                            }
                        </>
                    }

                </div>
            </div>
            <div className='card shadow'>
                {completing ?
                    <div className='card-body bg-light'>
                        <h1 className='mb-5'>Complete gig</h1>
                        <form>
                            <div className='mb-4'>
                                <div className='row'>
                                    <div className='col'>
                                        <label htmlFor='datePaid' className='form-label'>Date Paid</label>
                                        <input type='text' className='form-control' id='datePaid' value={formData.datePaid ?? ''} placeholder='yyyy-MM-dd'
                                        onChange={nullableTextChange} />
                                    </div>
                                    <div className='col-2 d-flex align-items-end'>
                                        <div className='form-check'>
                                            <input className='form-check-input' type='checkbox' id='isCash' checked={formData.isCash ?? false} onChange={nullableBoolChange} />
                                            <label className='form-check-label' htmlFor='isCash'>Cash Payment</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='mb-4'>
                                <div className='row'>
                                    <div className='col-10'>
                                        <label htmlFor='expenses' className='form-label'>Expenses</label>
                                        <input type='number' className='form-control' id='expenses' min={0} value={formData.expenses ?? 0} onChange={nullableNumberChange} />
                                    </div>
                                </div>
                            </div>
                            <div className='mb-4'>
                                <div className='row'>
                                    <div className='col-10'>
                                        <label htmlFor='mileage' className='form-label'>Kilometres Driven</label>
                                        <input type='number' className='form-control' id='mileage' min={0} value={formData.mileage ?? 0} onChange={nullableNumberChange} />
                                    </div>
                                </div>
                            </div>

                            <div className="text-end mt-4">
                                <button type="button" className="btn btn-outline-secondary me-2" onClick={() => resetPage()}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Complete</button>
                            </div>
                        </form>
                    </div> :

                    <div className='card-body bg-light'>
                        <h1 className='mb-5'>Gig Details</h1>
                        <form>
                            <div className='mb-4'>
                                <div className='row'>
                                    <div className='col'>
                                        <label htmlFor='act' className='form-label'>Act</label>
                                        <input type='text' className='form-control' id='act' value={formData.act} onChange={onTextChange} disabled={!editing} />
                                    </div>
                                    <div className='col'>
                                        <label htmlFor='fee' className='form-label'>Fee</label>
                                        <input type='number' className='form-control' id='fee' min='0' max='2000' step='10' value={formData.fee} onChange={onTextChange} disabled={!editing} />
                                    </div>
                                </div>
                            </div>

                            <div className='mb-4'>
                                <div className='row'>
                                    <div className='col'>
                                        <label htmlFor='leaveDate' className='form-label'>Leave</label>
                                        <input type='datetime-local' className='form-control' id='leaveDate' value={formData.leaveDate} onChange={onTextChange} disabled={!editing} />
                                    </div>
                                    <div className='col'>
                                        <label htmlFor='returnDate' className='form-label'>Return</label>
                                        <input type='datetime-local' className='form-control' id='returnDate' value={formData.returnDate} onChange={onTextChange} disabled={!editing} />
                                    </div>
                                </div>
                            </div>

                            <div className='mb-4'>
                                <div className='row'>
                                    <div className='col'>
                                        <label htmlFor='venue' className='form-label'>Venue</label>
                                        <input type='text' className='form-control' id='venue' value={formData.venue} disabled={!editing} />
                                    </div>
                                    <div className='col'>
                                        <label htmlFor='postcode' className='form-label'>Postcode</label>
                                        <input type='text' className='form-control' id='postcode' value={formData.postcode} disabled={!editing} />
                                    </div>
                                </div>
                            </div>

                            <div className='mb-4'>
                                <label htmlFor='description' className='form-label'>Description</label>
                                <textarea className='form-control' id='description' rows={6} value={formData.description} disabled={!editing} />
                            </div>

                            <div className='mb-4'>
                                <div className='row'>
                                    <div className='col-9'>
                                        <label htmlFor='instrument' className='form-label'>Instrument</label>
                                        <select className='form-control' id='instrument' value={formData.instrument} disabled={!editing}>
                                            <option value='Upright'>Upright</option>
                                            <option value='Electric'>Electric</option>
                                        </select>
                                    </div>
                                    <div className='col-3 d-flex align-items-end'>
                                        <div className='form-check form-switch'>
                                            <input className='form-check-input' type='checkbox' id='calendarSync' checked={formData.calendarSync} disabled={!editing} />
                                            <label className='form-check-label' htmlFor='calendarSync'>Calendar Sync</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {editing &&
                                <div className="text-end mt-4">
                                    <button type="button" className="btn btn-outline-secondary me-2" onClick={() => navigate(`/list`)}>Cancel</button>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            }
                        </form>
                    </div>
                }
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
