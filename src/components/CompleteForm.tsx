import React from 'react'
import { Gig } from '../models/Gig'

interface Props {
    onCompleteSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    formData: Gig 
    nullableTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    nullableBoolChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    nullableNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    resetPage: () => void
}

function CompleteForm(props: Props) {
    const { formData, onCompleteSubmit, nullableTextChange, nullableBoolChange, nullableNumberChange, resetPage } = props

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
                                        <input type='number' className='form-control' id='expenses' min={0} step={0.01} value={formData.expenses ?? 0} onChange={nullableNumberChange} />
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
                    </div>
    )
}

export default CompleteForm;
