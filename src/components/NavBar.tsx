import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faCancel, faList, faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';

interface Props { 
    editing: boolean,
    setEditing: React.Dispatch<React.SetStateAction<boolean>>,
    completing: boolean,
    setCompleting: React.Dispatch<React.SetStateAction<boolean>>,
    deleting: boolean,
    setDeleting: React.Dispatch<React.SetStateAction<boolean>>
}

function NavBar(props: Props) {
    const { editing, setEditing, completing, setCompleting, deleting, setDeleting } = props

    return (
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
    )
}

export default NavBar
