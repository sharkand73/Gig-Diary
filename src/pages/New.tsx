import React, { useState } from 'react';

function New() {

    const [formData, setFormData] = useState({
        act: '',
        fee: 200,
        leaveDate: new Date().toISOString().slice(0, 16),
        returnDate: new Date().toISOString().slice(0, 16),        
        description: '',
        venue: '',
        postcode: '',
        instrument: 'Upright',
        calendarSync: false
    });

    function handleSubmit(e: any) {
        e.preventDefault();
        console.log(formData);
    }

    function onTextChange(e: any) {
        setFormData({...formData, [e.target.id]: e.target.value});
    }

    function onCheckboxChange(e: any) {
        setFormData({...formData, calendarSync: e.target.checked});
    }


    return (
        <div className='container mt-5 bg-light border-primary'>
            <div className='card shadow'>
                <div className='card-body bg-light'>

                    <h1 className='mb-5'>Enter Gig Details</h1>
                    
                    <form onSubmit={handleSubmit}>
                        <div className='mb-4'>
                            <div className='row'>
                                <div className='col'>
                                    <label htmlFor='act' className='form-label'>Act</label>
                                    <input type='text' className='form-control' id='act' value={formData.act} onChange={onTextChange} required />
                                </div>
                                <div className='col'>
                                    <label htmlFor='fee' className='form-label'>Fee</label>
                                    <input type='number' className='form-control' id='fee' min='0' max='2000' step='10' value={formData.fee} onChange={onTextChange} required />
                                </div>
                            </div>
                        </div>

                        <div className='mb-4'>
                            <div className='row'>
                                <div className='col'>
                                    <label htmlFor='leaveDate' className='form-label'>Leave</label>
                                    <input type='datetime-local' className='form-control' id='leaveDate' value={formData.leaveDate} onChange={onTextChange} />
                                </div>
                                <div className='col'>
                                    <label htmlFor='returnDate' className='form-label'>Return</label>
                                    <input type='datetime-local' className='form-control' id='returnDate' value={formData.returnDate} onChange={onTextChange} />
                                </div>
                            </div>
                        </div>

                        <div className='mb-4'>
                            <div className='row'>
                                <div className='col'>
                                    <label htmlFor='venue' className='form-label'>Venue</label>
                                    <input type='text' className='form-control' id='venue' value={formData.venue} onChange={onTextChange} required />
                                </div>
                                <div className='col'>
                                    <label htmlFor='postcode' className='form-label'>Postcode</label>
                                    <input type='text' className='form-control' id='postcode' value={formData.postcode} onChange={onTextChange} />
                                </div>
                            </div>
                        </div>

                        <div className='mb-4'>
                            <label htmlFor='description' className='form-label'>Description</label>
                            <textarea className='form-control' id='description' rows={6} value={formData.description} onChange={onTextChange} />
                        </div>

                        <div className='mb-4'>
                            <div className='row'>
                                <div className='col-9'>
                                    <label htmlFor='instrument' className='form-label'>Instrument</label>
                                    <select className='form-control' id='instrument' value={formData.instrument} onChange={onTextChange}>
                                        <option value='Upright'>Upright</option>
                                        <option value='Electric'>Electric</option>
                                    </select>
                                </div>
                                <div className='col-3 d-flex align-items-end'>
                                    <div className='form-check form-switch'>
                                        <input className='form-check-input' type='checkbox' id='calendarSync' checked={formData.calendarSync} onChange={onCheckboxChange} />
                                        <label className='form-check-label' htmlFor='calendarSync'>Calendar Sync</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary mt-4">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default New;