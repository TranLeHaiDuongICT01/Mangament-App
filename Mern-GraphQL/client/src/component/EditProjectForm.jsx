import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { FaEdit } from 'react-icons/fa'
import { UPDATE_PROJECT } from '../mutation/projectMutation'
import { GET_PROJECT } from '../query/projectQueries'
const keyStatus = {
    'Not Started' : 'new',
    'In Progress' : 'progress',
    'Completed' : 'completed'
}
const EditProjectForm = ({ project }) => {
    const [formData, setFormData] = useState({
        name: project.name,
        description: project.description,
        status: keyStatus[`${project.status}`]
    })

    const [updateProject] = useMutation(UPDATE_PROJECT, {
        variables: {
            id: project.id,
            name: formData.name,
            description: formData.description,
            status: formData.status
        },
        refetchQueries: [{
            query: GET_PROJECT,
            variables: {id: project.id}
        }]
    })
    
    const handleChange = (e) => {
        setFormData({...formData, 
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        updateProject(project.id, formData.name, formData.description, formData.status)
    }
    return (
        <div className="mt-5">
            <h3>Update Project Details</h3>
            <button
                type='button'
                className='btn btn-secondary'
                data-bs-toggle='modal'
                data-bs-target='#editProjectModal'
            >
                <div className='d-flex align-items-center'>
                    <FaEdit className='icon' />
                    <div>Edit Project</div>
                </div>
            </button>

            <div
                className='modal fade'
                id='editProjectModal'
                aria-labelledby='editProjectModalLabel'
                aria-hidden='true'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title' id='editProjectModalLabel'>
                                Edit Project
                            </h5>
                            <button
                                type='button'
                                className='btn-close'
                                data-bs-dismiss='modal'
                                aria-label='Close'
                            ></button>
                        </div>
                        <div className='modal-body'>
                            <form onSubmit={handleSubmit}>
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
                                        <option value="progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>

                                <button
                                    type='submit'
                                    data-bs-dismiss='modal'
                                    className='btn btn-secondary mb-3'
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProjectForm