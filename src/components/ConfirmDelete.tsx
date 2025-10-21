import React, { useState } from 'react'

interface Props {
    setDeleting: (value: boolean) => void
    onDelete: () => Promise<void>
}

function ConfirmDelete({setDeleting, onDelete}: Props) {
    const [deleting, setDeletingState] = useState(false);

    const handleDelete = async () => {
        setDeletingState(true);
        try {
            await onDelete();
        } catch (error) {
            setDeletingState(false);
        }
    };

    return (
        (
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
                            <button type="button" className="btn btn-secondary" onClick={() => setDeleting(false)} disabled={deleting}>
                                Cancel
                            </button>
                            <button type="button" className="btn btn-danger" onClick={handleDelete} disabled={deleting}>
                                {deleting ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Deleting...
                                    </>
                                ) : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    ));
}

export default ConfirmDelete
