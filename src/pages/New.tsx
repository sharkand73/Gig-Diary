import React, { useState } from 'react';
import ServiceContainer from '../services/ServiceContainer';
import { IGigService } from '../services/IGigService';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons';

function New() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        act: '',
        fee: 200,
        leaveDate: new Date().toISOString().slice(0, 16),
        returnDate: new Date().toISOString().slice(0, 16),
        description: '',
        venue: '',
        postcode: '',
        instrument: 'Upright',
        calendarSync: false,
        bookingDate: new Date().toISOString().slice(0, 10),
        contact: ''
    });

    async function handleSubmit(e: any) {
        e.preventDefault();

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

        try {
            const gigService: IGigService = ServiceContainer.getGigService();
            const newGig = await gigService.create(formData as any, controller.signal);
            console.log('Created gig:', newGig);
            clearTimeout(timeoutId);
            navigate('/list');

        } catch (error) {
            alert('Failed to create gig: ' + error)
            console.error('Failed to create gig:', error);
        }
    }

    function onTextChange(e: any) {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    function onCheckboxChange(e: any) {
        setFormData({ ...formData, calendarSync: e.target.checked });
    }

    function onNumberChange(e: any) {
        const value = e.target.value;
        setFormData({ ...formData, [e.target.id]: value === '' ? '' : parseFloat(value) || 0 });
    }


    return (
        <div className='container mt-5 pt-2 bg-light border-primary'>
            <div className='navbar mb-2'>
                <div className='navbar-Links ms-auto'>
                    <Link to='/list' className='navbar-Link me-3' title="View gig list">
                    <FontAwesomeIcon icon={faList} size="2x"/></Link>
                </div>
            </div>
            <div className='card shadow'>
                <div className='card-body bg-light'>

                    <h1 className='mb-5'>New Gig Details</h1>

                    <form onSubmit={handleSubmit}>
                        <div className='mb-4'>
                            <div className='row'>
                                <div className='col-12 col-md-6'>
                                    <label htmlFor='act' className='form-label'>Act</label>
                                    <input type='text' className='form-control' id='act' value={formData.act} onChange={onTextChange} required />
                                </div>
                                <div className='col-12 col-md-6'>
                                    <label htmlFor='fee' className='form-label'>Fee</label>
                                    <input type='number' className='form-control' id='fee' min='0' max='2000' step='10' value={formData.fee} onChange={onNumberChange} required />
                                </div>
                            </div>
                        </div>

                        <div className='mb-4'>
                            <div className='row'>
                                <div className='col-12 col-md-6'>
                                    <label htmlFor='leaveDate' className='form-label'>Leave</label>
                                    <input type='datetime-local' className='form-control' id='leaveDate' value={formData.leaveDate} onChange={onTextChange} />
                                </div>
                                <div className='col-12 col-md-6'>
                                    <label htmlFor='returnDate' className='form-label'>Return</label>
                                    <input type='datetime-local' className='form-control' id='returnDate' value={formData.returnDate} onChange={onTextChange} />
                                </div>
                            </div>
                        </div>

                        <div className='mb-4'>
                            <div className='row'>
                                <div className='col-12 col-md-6'>
                                    <label htmlFor='venue' className='form-label'>Venue</label>
                                    <input type='text' className='form-control' id='venue' value={formData.venue} onChange={onTextChange} required />
                                </div>
                                <div className='col-12 col-md-6'>
                                    <label htmlFor='postcode' className='form-label'>Postcode</label>
                                    <input type='text' className='form-control' id='postcode' value={formData.postcode} onChange={onTextChange} />
                                </div>
                            </div>
                        </div>

                        <div className='mb-4'>
                            <div className='row'>
                                <div className='col-12 col-md-6'>
                                    <label htmlFor='bookingDate' className='form-label'>Booking Date</label>
                                    <input type='date' className='form-control' id='bookingDate' value={formData.bookingDate} onChange={onTextChange} required />
                                </div>
                                <div className='col-12 col-md-6'>
                                    <label htmlFor='contact' className='form-label'>Contact</label>
                                    <input type='text' className='form-control' id='contact' value={formData.contact} onChange={onTextChange} required />
                                </div>
                            </div>
                        </div>

                        <div className='mb-4'>
                            <label htmlFor='description' className='form-label'>Description</label>
                            <textarea className='form-control' id='description' rows={6} value={formData.description} onChange={onTextChange} />
                        </div>

                        <div className='mb-4'>
                            <div className='row'>
                                <div className='col-12 col-md-9'>
                                    <label htmlFor='instrument' className='form-label'>Instrument</label>
                                    <select className='form-control' id='instrument' value={formData.instrument} onChange={onTextChange}>
                                        <option value='Upright'>Upright</option>
                                        <option value='Electric'>Electric</option>
                                    </select>
                                </div>
                                <div className='col-12 col-md-3 d-flex align-items-end'>
                                    <div className='form-check form-switch'>
                                        <input className='form-check-input' type='checkbox' id='calendarSync' checked={formData.calendarSync} onChange={onCheckboxChange} />
                                        <label className='form-check-label' htmlFor='calendarSync'>Calendar Sync</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-end mt-4">
                            <button type="button" className="btn btn-outline-secondary me-2" onClick={() => navigate('/list')}>Cancel</button>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default New;