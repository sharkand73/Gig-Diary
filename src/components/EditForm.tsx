import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Gig } from '../models/Gig'
import ServiceContainer from '../services/ServiceContainer'

interface Props {
    id: string | undefined
    editing: boolean
    formData: Gig
    setFormData: React.Dispatch<React.SetStateAction<Gig | null>>
}

function EditForm(props: Props) {
    const { id, editing, formData, setFormData } = props;
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);

    function onTextChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
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

    function onNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { id, value } = e.target;
        if (formData) {
            setFormData({ ...formData, [id]: value === '' ? '' : parseFloat(value) || 0 });
        }
    }

    async function onEditSubmit(e: any){
        if (!id) return;
        e.preventDefault();

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
        setSubmitting(true);

        try {
            // Convert datetime-local format to UTC ISO strings for API
            const apiData = {
                ...formData,
                leaveDate: new Date(formData.leaveDate).toISOString(),
                returnDate: new Date(formData.returnDate).toISOString()
            };
            const gigService = ServiceContainer.getGigService();
            const newGig = await gigService.update(id, apiData as any, controller.signal);
            console.log('Updated gig:', newGig);
            clearTimeout(timeoutId);
            navigate('/list');

        } catch (error) {
            setSubmitting(false);
            alert('Failed to update gig: ' + error)
            console.error('Failed to update gig:', error);
        }
    }

    function onLeaveDateChange(e: any){
        const value = e.target.value;
        setFormData({ ...formData, leaveDate: value, returnDate: value })
    }



    return (
        <div className='card-body bg-light'>
            <h1 className='mb-5'>Gig Details</h1>
            <form onSubmit={onEditSubmit}>
                <div className='mb-4'>
                    <div className='row'>
                        <div className='col-12 col-md-6'>
                            <label htmlFor='act' className='form-label'>Act</label>
                            <input type='text' className='form-control' id='act' value={formData.act} onChange={onTextChange} disabled={!editing} />
                        </div>
                        <div className='col-12 col-md-6'>
                            <label htmlFor='fee' className='form-label'>Fee</label>
                            <input type='number' className='form-control' id='fee' min='0' max='2000' step='0.01' value={formData.fee} onChange={onNumberChange} disabled={!editing} />
                        </div>
                    </div>
                </div>

                <div className='mb-4'>
                    <div className='row'>
                        <div className='col-12 col-md-6'>
                            <label htmlFor='leaveDate' className='form-label'>Leave</label>
                            <input type='datetime-local' className='form-control' id='leaveDate' value={formData.leaveDate} onChange={onLeaveDateChange} disabled={!editing} />
                        </div>
                        <div className='col-12 col-md-6'>
                            <label htmlFor='returnDate' className='form-label'>Return</label>
                            <input type='datetime-local' className='form-control' id='returnDate' value={formData.returnDate} onChange={onTextChange} disabled={!editing} />
                        </div>
                    </div>
                </div>

                <div className='mb-4'>
                    <div className='row'>
                        <div className='col-12 col-md-6'>
                            <label htmlFor='venue' className='form-label'>Venue</label>
                            <input type='text' className='form-control' id='venue' value={formData.venue} onChange={onTextChange} disabled={!editing} />
                        </div>
                        <div className='col-12 col-md-6'>
                            <label htmlFor='postcode' className='form-label'>Postcode</label>
                            <input type='text' className='form-control' id='postcode' value={formData.postcode} onChange={onTextChange} disabled={!editing} />
                        </div>
                    </div>
                </div>

                <div className='mb-4'>
                    <div className='row'>
                        <div className='col-12 col-md-6'>
                            <label htmlFor='bookingDate' className='form-label'>Booking Date</label>
                            <input type='date' className='form-control' id='bookingDate' value={formData.bookingDate || ''} onChange={onTextChange} disabled={!editing} required />
                        </div>
                        <div className='col-12 col-md-6'>
                            <label htmlFor='contact' className='form-label'>Contact</label>
                            <input type='text' className='form-control' id='contact' value={formData.contact || ''} onChange={onTextChange} disabled={!editing} required />
                        </div>
                    </div>
                </div>

                <div className='mb-4'>
                    <label htmlFor='description' className='form-label'>Description</label>
                    <textarea className='form-control' id='description' rows={6} value={formData.description || ''} onChange={onTextChange} disabled={!editing} />
                </div>

                <div className='mb-4'>
                    <div className='row'>
                        <div className='col-12 col-md-9'>
                            <label htmlFor='instrument' className='form-label'>Instrument</label>
                            <select className='form-control' id='instrument' value={formData.instrument} onChange={onTextChange} disabled={!editing}>
                                <option value='Upright'>Upright</option>
                                <option value='Electric'>Electric</option>
                            </select>
                        </div>
                        <div className='col-12 col-md-3 d-flex align-items-end'>
                            <div className='form-check form-switch'>
                                <input className='form-check-input' type='checkbox' id='calendarSync' checked={formData.calendarSync} onChange={onCheckboxChange} disabled={!editing} />
                                <label className='form-check-label' htmlFor='calendarSync'>Calendar Sync</label>
                            </div>
                        </div>
                    </div>
                </div>
                {editing &&
                    <div className="text-end mt-4">
                        <button type="button" className="btn btn-outline-secondary me-2" onClick={() => navigate(`/list`)} disabled={submitting}>Cancel</button>
                        <button type="submit" className="btn btn-primary" disabled={submitting}>
                            {submitting ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Updating...
                                </>
                            ) : 'Submit'}
                        </button>
                    </div>
                }
            </form>
        </div>
    )
}

export default EditForm;
