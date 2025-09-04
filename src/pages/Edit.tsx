import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ServiceContainer from '../services/ServiceContainer';
import { Gig } from '../models/Gig';
import Loading from '../components/Loading';
import NavBar from '../components/NavBar';
import ConfirmDelete from '../components/ConfirmDelete';
import CompleteForm from '../components/CompleteForm';

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

    async function onEditSubmit(e: any){
        if (!id) return;
        e.preventDefault();

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout

        try {
            const newGig = await gigService.update(id, formData as any, controller.signal);
            console.log('Updated gig:', newGig);
            clearTimeout(timeoutId);
            navigate('/list');

        } catch (error) {
            alert('Failed to update gig: ' + error)
            console.error('Failed to update gig:', error);
        }
    }

    async function onCompleteSubmit(e: any){
        if (!id) return;
        e.preventDefault();

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        try {
            const updatedFormData = {...formData, isComplete: true};
            const newGig = await gigService.update(id, updatedFormData as any, controller.signal);
            console.log('Updated gig:', newGig);
            clearTimeout(timeoutId);
            navigate('/list');

        } catch (error) {
            alert('Failed to complete gig: ' + error)
            console.error('Failed to complete gig:', error);
        }
    }

    
    if (!formData) return <Loading />

    return (
        <div className='container mt-5 pt-2 bg-light border-primary'>
            <NavBar editing={editing} setEditing={setEditing} completing={completing} setCompleting={setCompleting} deleting={deleting}
            setDeleting={setDeleting} />
            {deleting && 
            <ConfirmDelete setDeleting={setDeleting} onDelete={onDelete}/>}
     
            <div className='card shadow'>
                {completing ?
                    <CompleteForm 
                    formData={formData}
                    onCompleteSubmit={onCompleteSubmit}
                    nullableTextChange={nullableTextChange}
                    nullableBoolChange={nullableBoolChange}
                    nullableNumberChange={nullableNumberChange}
                    resetPage={resetPage}
                />:

                    <div className='card-body bg-light'>
                        <h1 className='mb-5'>Gig Details</h1>
                        <form onSubmit={onEditSubmit}>
                            <div className='mb-4'>
                                <div className='row'>
                                    <div className='col'>
                                        <label htmlFor='act' className='form-label'>Act</label>
                                        <input type='text' className='form-control' id='act' value={formData.act} onChange={onTextChange} disabled={!editing} />
                                    </div>
                                    <div className='col'>
                                        <label htmlFor='fee' className='form-label'>Fee</label>
                                        <input type='number' className='form-control' id='fee' min='0' max='2000' value={formData.fee} onChange={onTextChange} disabled={!editing} />
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
                                        <input type='text' className='form-control' id='venue' value={formData.venue} onChange={onTextChange} disabled={!editing} />
                                    </div>
                                    <div className='col'>
                                        <label htmlFor='postcode' className='form-label'>Postcode</label>
                                        <input type='text' className='form-control' id='postcode' value={formData.postcode} onChange={onTextChange} disabled={!editing} />
                                    </div>
                                </div>
                            </div>

                            <div className='mb-4'>
                                <label htmlFor='description' className='form-label'>Description</label>
                                <textarea className='form-control' id='description' rows={6} value={formData.description} onChange={onTextChange} disabled={!editing} />
                            </div>

                            <div className='mb-4'>
                                <div className='row'>
                                    <div className='col-9'>
                                        <label htmlFor='instrument' className='form-label'>Instrument</label>
                                        <select className='form-control' id='instrument' value={formData.instrument} onChange={onTextChange} disabled={!editing}>
                                            <option value='Upright'>Upright</option>
                                            <option value='Electric'>Electric</option>
                                        </select>
                                    </div>
                                    <div className='col-3 d-flex align-items-end'>
                                        <div className='form-check form-switch'>
                                            <input className='form-check-input' type='checkbox' id='calendarSync' checked={formData.calendarSync} onChange={onCheckboxChange} disabled={!editing} />
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

        </div>
    );
}

export default Edit;
