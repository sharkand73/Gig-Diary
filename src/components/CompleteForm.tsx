import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Gig } from '../models/Gig'
import ServiceContainer from '../services/ServiceContainer'

interface Props {
    id: string | undefined
    gig: Gig
    formData: Gig
    setFormData: (value: Gig) => void
    setCompleting: (value: boolean) => void
    setEditing: (value: boolean) => void
}

function CompleteForm(props: Props) {
    const { id, gig, formData, setFormData, setCompleting, setEditing } = props
    const navigate = useNavigate();

    function resetPage() {
        setCompleting(false);
        setEditing(false);
        setFormData({ ...gig });
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
            setFormData({ ...formData, [id]: value === '' ? null : parseFloat(value) || 0 });
        }
    }

    async function onCompleteSubmit(e: any) {
        if (!id) return;
        e.preventDefault();

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        try {
            const updatedFormData = { ...formData, isComplete: true };
            const gigService = ServiceContainer.getGigService();
            const newGig = await gigService.update(id, updatedFormData as any, controller.signal);
            console.log('Updated gig:', newGig);
            clearTimeout(timeoutId);
            navigate('/list');

        } catch (error) {
            alert('Failed to complete gig: ' + error)
            console.error('Failed to complete gig:', error);
        }
    }
    
    return (
        <div className='card-body bg-light'>
            <h1 className='mb-5'>Complete gig</h1>
            <form onSubmit={onCompleteSubmit}>
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
                            <input type='number' className='form-control' id='expenses' min={0} step={0.01} value={formData.expenses} onChange={nullableNumberChange} required/>
                        </div>
                    </div>
                </div>
                <div className='mb-4'>
                    <div className='row'>
                        <div className='col-10'>
                            <label htmlFor='mileage' className='form-label'>Kilometres Driven</label>
                            <input type='number' className='form-control' id='mileage' min={0} value={formData.mileage} onChange={nullableNumberChange} required/>
                        </div>
                    </div>
                </div>

                <div className="text-end mt-4">
                    <button type="button" className="btn btn-outline-secondary me-2" onClick={() => resetPage()}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Complete</button>
                </div>
            </form>
        </div>
    )
}

export default CompleteForm;
