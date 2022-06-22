import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { FaList } from 'react-icons/fa'
import { ADD_PROJECT } from '../mutation/projectMutation'
import { GET_PROJECTS } from '../query/projectQueries'
import { GET_CLIENTS } from '../query/clientQueries'
const AddProjectModal = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        status: 'new',
        clientId: ''
    })
    const { data } = useQuery(GET_CLIENTS);
    const [addProject] = useMutation(ADD_PROJECT, {
        variables: { name: formData.name, description: formData.description, status: formData.status, clientId: formData.clientId },
        update(cache, { data: { addProject } }) {
            const { projects } = cache.readQuery({
                query: GET_PROJECTS,
            })

            cache.writeQuery({
                query: GET_PROJECTS,
                data: { projects: [...projects, addProject] }
            })
        }
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        addProject(formData.name, formData.description, formData.status, formData.clientId);
        setFormData({
            name: '',
            description: '',
            status: 'Not Started',
            clientId: ''
        })
    }
    return (
        <>
            <button
                type='button'
                className='btn btn-secondary'
                data-bs-toggle='modal'
                data-bs-target='#addProjectModal'
            >
                <div className='d-flex align-items-center'>
                    <FaList className='icon' />
                    <div>Add Project</div>
                </div>
            </button>

            <div
                className='modal fade'
                id='addProjectModal'
                aria-labelledby='addProjectModalLabel'
                aria-hidden='true'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title' id='addProjectModalLabel'>
                                Add Project
                            </h5>
                            <button
                                type='button'
                                className='btn-close'
                                data-bs-dismiss='modal'
                                aria-label='Close'
                            ></button>
                        </div>
                        <div className='modal-body'>
                            <form onSubmit={onSubmit}>
                                <div className='mb-3'>
                                    <label className='form-label'>Name</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        id='name'
                                        name='name'
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Description</label>
                                    <textarea
                                        type='text'
                                        className='form-control'
                                        id='description'
                                        name='description'
                                        value={formData.description}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Status</label>
                                    <select name="status" id="status" className="form-select" defaultValue={formData.status} onChange={handleChange}>
                                        <option value="new">Not Started</option>
                                        <option value="progress">In Progess</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>

                                <div className='mb-3'>
                                    <label className='form-label'>ClientId</label>
                                    <select
                                        type='text'
                                        className='form-select'
                                        id='clientId'
                                        name='clientId'
                                        defaultValue={formData.clientId}
                                        onChange={handleChange}
                                    >
                                        <option value=''>Select Client</option>
                                        {data?.clients?.map(client => (
                                            <option value={client.id} key={client.id}>{client.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <button
                                    type='submit'
                                    data-bs-dismiss='modal'
                                    className='btn btn-secondary'
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddProjectModal