import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ServiceContainer from '../services/ServiceContainer';
import { Gig } from '../models/Gig';
import Loading from '../components/Loading';
import NavBar from '../components/NavBar';
import ConfirmDelete from '../components/ConfirmDelete';
import CompleteForm from '../components/CompleteForm';
import EditForm from '../components/EditForm';


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
                if (gigData) {                    
                    const formGigData = {
                        ...gigData,
                        leaveDate: convertToLocal(gigData.leaveDate),
                        returnDate: convertToLocal(gigData.returnDate)
                    };
                    
                    setGig({...formGigData});
                    setFormData({...formGigData});
                } else {
                    setGig(null);
                    setFormData(null);
                }
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

    // Convert UTC dates to local datetime-local format for form inputs
    const convertToLocal = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const offset = date.getTimezoneOffset() * 60000;
        const localDate = new Date(date.getTime() - offset);
        return localDate.toISOString().slice(0, 16);
    };

    
    if (!formData || !gig) return <Loading />

    return (
        <div className='container mt-5 pt-2 bg-light border-primary'>

            <NavBar 
            editing={editing} 
            setEditing={setEditing} 
            completing={completing} 
            setCompleting={setCompleting} 
            deleting={deleting}
            setDeleting={setDeleting} 
            />

            {deleting && 
            <ConfirmDelete 
            setDeleting={setDeleting} 
            onDelete={onDelete}
            />}
     
            <div className='card shadow'>
                {completing ?
                    <CompleteForm 
                    id={id}
                    gig={gig}
                    formData={formData}
                    setFormData={setFormData}
                    setCompleting={setCompleting}
                    setEditing={setEditing}
                    />:

                    <EditForm
                    id={id}
                    formData={formData}
                    setFormData={setFormData}
                    editing={editing}
                    />
                }
            </div>
        </div>
    );
}

export default Edit;
