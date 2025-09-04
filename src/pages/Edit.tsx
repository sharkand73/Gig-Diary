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
                    formData={formData}
                    onCompleteSubmit={onCompleteSubmit}
                    nullableTextChange={nullableTextChange}
                    nullableBoolChange={nullableBoolChange}
                    nullableNumberChange={nullableNumberChange}
                    resetPage={resetPage}
                    />:

                    <EditForm
                    formData={formData}
                    editing={editing}
                    onEditSubmit={onEditSubmit}
                    onTextChange={onTextChange}
                    onCheckboxChange={onCheckboxChange}
                    />
                }
            </div>
        </div>
    );
}

export default Edit;
